"use client";

/**
 * Warm-up engine for free-tier cold starts (Render spins idle instances down
 * after ~15 minutes, and waking one takes 10–50s).
 *
 * Two halves:
 *  1. `pingWarmup()` — fired the instant the frontend opens. Two fire-and-forget
 *     /health pings (server + AI) wake instances while the visitor is still on
 *     the landing page, so the real requests find warm services.
 *  2. `withWarmupRetry()` — wraps an api call. When the call fails with a
 *     cold-start signature ("Failed to fetch", "timed out", 502/503/504, the
 *     api layer's "server is not running" probe, or the backend's AI
 *     timeout/unavailable messages) it flips the shared status the
 *     `WakingUpModal` listens to, waits for the service to come healthy, then
 *     retries the caller's original action once. If it is still cold after the
 *     wait, it throws `WarmupStillDownError` — the modal shows its gentle
 *     "Try again" state instead of an error toast ever appearing.
 *
 * Only pages that opt in (login, products, inputs, AI recommendation) mount the
 * modal; everywhere else keeps the previous toast behaviour untouched.
 */

import { useEffect, useState } from "react";

export type WarmKind = "server" | "ai";
export type WarmStatus = "idle" | "waking" | "ready" | "down";

/** Public /health of the AI service (no key needed for that path). */
const AI_HEALTH_URL =
  process.env.NEXT_PUBLIC_AI_HEALTH_URL || "https://pvt-farmpath-ai.onrender.com";

function apiBase(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
  ).replace(/\/+$/, "");
}

/**
 * Render wakes a free instance on an inbound web request, and a cold AI boot
 * (uvicorn + XGBoost model load) is bounded by roughly half a minute — the
 * browser cannot read the AI's opaque `no-cors` health response, so the wait
 * is time-based, followed by one real retry.
 */
const SERVER_MAX_WAIT_MS = 65_000;
const AI_WAKE_GRACE_MS = 25_000;
const POLL_INTERVAL_MS = 4_000;

/**
 * Cold-start signatures across the two call paths:
 *  - raw fetch TypeError ("Failed to fetch")
 *  - api.ts timeout wrapper ("Request to <url> timed out.")
 *  - api.ts network probe ("Backend server is not running…")
 *  - backend AI passthrough ("AI recommendation service timed out / is
 *    unavailable right now / returned 502")
 */
const COLD_START_RE =
  /failed to fetch|timed out|server is not running|\b(502|503|504)\b/i;

export function isColdStart(message: unknown): boolean {
  if (typeof message !== "string" || !message) return false;
  return COLD_START_RE.test(message);
}

/** Thrown by `withWarmupRetry` when the service is still cold after the wait —
 *  pages check this to suppress their regular error toast (the modal owns it). */
export class WarmupStillDownError extends Error {
  constructor(target: WarmKind) {
    super(
      target === "ai"
        ? "The AI service is still waking up. Please try again shortly."
        : "The server is still waking up. Please try again shortly."
    );
    this.name = "WarmupStillDownError";
  }
}

export function isStillDown(err: unknown): boolean {
  return err instanceof WarmupStillDownError;
}

// ─── Shared status store (module-level pub/sub, no context needed) ──────

let status: WarmStatus = "idle";
let kind: WarmKind = "server";
const listeners = new Set<() => void>();

function setWarm(next: WarmStatus, target: WarmKind = kind): void {
  status = next;
  kind = target;
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // A listener throwing never breaks the warm-up flow.
    }
  });
}

export function subscribeWarmup(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getWarmStatus(): WarmStatus {
  return status;
}

export function getWarmKind(): WarmKind {
  return kind;
}

/** Reactive view for the modal (or anything else that wants to know). */
export function useWarmupState(): { status: WarmStatus; kind: WarmKind } {
  const [snapshot, setSnapshot] = useState<{
    status: WarmStatus;
    kind: WarmKind;
  }>({ status: getWarmStatus(), kind: getWarmKind() });

  useEffect(
    () =>
      subscribeWarmup(() =>
        setSnapshot({ status: getWarmStatus(), kind: getWarmKind() })
      ),
    []
  );

  return snapshot;
}

// ─── Health pings ────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * `mode: "no-cors"` matters: the AI service has no CORS middleware, so a
 * plain browser call would be blocked from *reading* any response — but the
 * request itself still reaches Render and wakes the instance, which is all
 * this ping wants. Failures are expected while instances are asleep.
 */
async function wakePing(url: string): Promise<void> {
  try {
    await fetch(`${url}/health`, { mode: "no-cors", cache: "no-store" });
  } catch {
    // Failed fetch = still asleep; the next poll (or a real request) retries.
  }
}

function aiHealthURL(): string {
  return AI_HEALTH_URL.replace(/\/+$/, "");
}

/** Fires once the user opens the app — first second, before any auth. */
export function pingWarmup(): void {
  void wakePing(aiHealthURL());
  void wakePing(apiBase());
}

/**
 * Wait until `target` is answering. The server runs CORS-friendly `/health`
 * (backend sets no origin restriction for it), so its status is readable.
 * The AI can only be pinged opaquely, so it gets a fixed wake grace period.
 */
export async function waitForWarm(target: WarmKind): Promise<boolean> {
  if (target === "ai") {
    // The recommendation request goes through the Node server first, so make
    // sure *it* is warm too (readable health) before the AI grace period.
    const serverUntil = Date.now() + SERVER_MAX_WAIT_MS;
    while (Date.now() < serverUntil) {
      if (await serverHealthy()) break;
      await sleep(POLL_INTERVAL_MS);
    }
    if (!(await serverHealthy())) {
      setWarm("down", "ai");
      return false;
    }

    const aiUntil = Date.now() + AI_WAKE_GRACE_MS;
    while (Date.now() < aiUntil) {
      void wakePing(aiHealthURL());
      await sleep(POLL_INTERVAL_MS);
    }
    setWarm("ready", "ai");
    return true;
  }

  const until = Date.now() + SERVER_MAX_WAIT_MS;
  while (Date.now() < until) {
    try {
      const res = await fetch(`${apiBase()}/health`, { cache: "no-store" });
      if (res.ok) {
        setWarm("ready", "server");
        return true;
      }
    } catch {
      // not answering yet
    }
    await sleep(POLL_INTERVAL_MS);
  }
  setWarm("down", "server");
  return false;
}

/** Readable server health, used by both wait paths. */
async function serverHealthy(): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase()}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function notifyColdStart(target: WarmKind): Promise<void> {
  setWarm("waking", target);
}

/**
 * `"auto"` lets the failing message decide: "AI recommendation service …"
 * means the FastAPI instance is cold (the Node server reached it fine);
 * everything else (server-down probe, raw fetch/timeout) means the Node
 * server is the cold one.
 */
export type WarmTarget = WarmKind | "auto";

export function resolveWarmKind(
  target: WarmTarget,
  message?: string
): WarmKind {
  if (target !== "auto") return target;
  return /ai recommendation/i.test(message ?? "") ? "ai" : "server";
}

// ─── The wrapper the four pages call ─────────────────────────────────────

class ColdStartSignal extends Error {}

/**
 * Run an api action; if it fails cold, show the sprout modal (via the store),
 * wait for warmth and retry the action once.
 *
 * `messageFrom` lets `ApiResponse`-style callers surface a swallowed failure:
 * e.g. `(res) => (res.success ? undefined : res.message)` — those wrappers
 * catch fetch errors internally and return `{ success: false, message }`.
 */
export async function withWarmupRetry<T>(
  run: () => Promise<T>,
  target: WarmTarget = "server",
  messageFrom?: (res: T) => string | undefined
): Promise<T> {
  let kind: WarmKind = target === "auto" ? "server" : target;

  const attempt = async (): Promise<T> => {
    const res = await run();
    const hint = messageFrom?.(res);
    if (hint && isColdStart(hint)) {
      kind = resolveWarmKind(target, hint);
      throw new ColdStartSignal(hint);
    }
    return res;
  };

  let firstError: unknown;
  try {
    return await attempt();
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (err instanceof ColdStartSignal) firstError = err;
    else if (isColdStart(message)) {
      kind = resolveWarmKind(target, message);
      firstError = err;
    } else throw err;
  }

  await notifyColdStart(kind);
  const warm = await waitForWarm(kind);
  if (!warm) throw new WarmupStillDownError(kind);

  try {
    return await attempt();
  } catch (retryErr) {
    if (isColdStart(retryErr instanceof Error ? retryErr.message : "")) {
      setWarm("down", kind);
      throw new WarmupStillDownError(kind);
    }
    // A genuine (non-cold) failure after warming: surface it normally.
    void firstError;
    throw retryErr;
  }
}
