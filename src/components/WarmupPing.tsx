"use client";

import { useEffect } from "react";
import { pingWarmup } from "@/lib/warmup";

/**
 * Fires the wake pings within the first second of the app opening — two
 * fire-and-forget /health requests (Node server + AI service) so their free
 * Render instances start booting while the visitor is reading the page.
 *
 * Mounted once in the root layout. The sessionStorage guard keeps React
 * StrictMode's double-effect (and any hydration remounts) from double-firing,
 * while every fresh open of the app — the moment the user asked about —
 * re-arms it naturally.
 */
export function WarmupPing() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("farmPath_ping_done")) return;
      sessionStorage.setItem("farmPath_ping_done", "1");
    } catch {
      // Private browsing mode etc. — still ping, just ungated.
    }
    pingWarmup();
  }, []);

  return null;
}

export default WarmupPing;
