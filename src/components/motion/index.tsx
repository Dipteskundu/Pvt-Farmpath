"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";

/**
 * Shared motion toolkit for the public pages.
 *
 * One source of truth for the "premium" language the auth screens already
 * use (`AuthShell`'s `[0.16, 1, 0.3, 1]` ease and staggered entrances), so
 * public pages, marketplace cards and auth forms all feel like one product.
 *
 * Guardrails baked in:
 * - Only `transform` / `opacity` are animated (GPU-composited, no layout work).
 * - Scroll reveals play once; durations stay ≤ 0.7s.
 * - `CountUp` short-circuits to the final value when the OS asks for
 *   reduced motion, and callers wrap whole routes in `MotionConfig
 *   reducedMotion="user"` so transforms drop to plain fades.
 */

/** Signature ease shared with AuthShell. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Route-level entrance used by the public, auth, and dashboard shells.
 * Keying by pathname replays a short entrance when navigation changes while
 * keeping the previous page from delaying the next route.
 */
export function RouteTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  return (
    <motion.div
      key={pathname}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll reveal ──────────────────────────────────────────────────── */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds — used to choreograph adjacent blocks. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
}

/**
 * Fade + rise on first scroll into view. Drop-in for a plain `<div>`:
 * wraps content, keeps layouts untouched, and never re-triggers.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered group reveal ─────────────────────────────────────────── */

/** Container: children animate one after another as the group scrolls in. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

/** Item: the fade + rise each staggered child plays. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Grid/stack wrapper: put the layout classes on it (`grid`, `flex`, …) and
 * wrap every card in `<RevealItem>` to get the cascade.
 */
export function RevealStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/** One child inside a `<RevealStagger>`; renders its own wrapper div. */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ─── Stat count-up ──────────────────────────────────────────────────── */

/**
 * Animates a marketing stat ("6M+", "480+", "1,245", "24hr") from 0 to its
 * numeric part when it scrolls into view, keeping any prefix/suffix intact.
 * Non-numeric values render untouched; reduced-motion users see the final
 * number immediately.
 */
export function CountUp({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const parts = value.match(/^([^\d]*)([\d.,]+)(.*)$/);

  useEffect(() => {
    const parts = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!parts) return;
    const num = Number(parts[2].replace(/,/g, ""));
    if (Number.isNaN(num)) return;
    if (reduceMotion || !inView) return;
    const controls = animate(0, num, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [value, inView, reduceMotion, duration]);

  if (!parts) {
    return (
      <span className={className}>{value}</span>
    );
  }

  const [, prefix, digits, suffix] = parts;
  const decimals = (digits.split(".")[1] ?? "").length;
  const shown = reduceMotion ? Number(digits.replace(/,/g, "")) : display;
  const formatted = shown.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
