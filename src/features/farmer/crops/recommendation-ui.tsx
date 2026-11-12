"use client";

import React, { useId } from "react";
import { tr } from "@/lib/localize";
import type { LucideIcon } from "@/components/icons";

/**
 * Shared presentation primitives for the AI crop-recommendation surface
 * (result cards + detail profile). Purely visual — no data fetching,
 * no API contracts. Every component degrades gracefully when the
 * upstream source has no verified value (`value == null`).
 */

/* ------------------------------------------------------------------ */
/* Suitability ring                                                    */
/* ------------------------------------------------------------------ */

export const SuitabilityRing: React.FC<{
  /** 0–100 model confidence / suitability score */
  value: number;
  size?: number;
  className?: string;
}> = ({ value, size = 84, className = "" }) => {
  const gradientId = useId();
  const stroke = 7;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - pct / 100);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${pct}% match`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-200/80 dark:stroke-[#262626]"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-black tabular-nums text-slate-900 dark:text-[#f0f0f0] leading-none"
          style={{ fontSize: size * 0.28 }}
        >
          {pct}%
        </span>
        <span
          className="uppercase tracking-widest text-slate-400 dark:text-[#666666] font-semibold mt-1"
          style={{ fontSize: Math.max(8, size * 0.1) }}
        >
          {tr("match")}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Metric tile                                                         */
/* ------------------------------------------------------------------ */

export const MetricTile: React.FC<{
  icon: LucideIcon;
  label: string;
  /** Rendered value; when null/undefined an honest em-dash state is shown */
  value: React.ReactNode;
  tone?: "emerald" | "indigo" | "amber";
  className?: string;
}> = ({ icon: Icon, label, value, tone = "emerald", className = "" }) => {
  const hasValue =
    value !== null && value !== undefined && value !== "" && value !== false;

  const toneRing = {
    emerald:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    indigo:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
    amber:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  }[tone];

  return (
    <div
      className={`group p-4 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-slate-200/80 dark:border-[#222222] transition-all duration-200 hover:border-emerald-300 dark:hover:border-[#3a3a3a] hover:shadow-[0_4px_16px_rgba(2,44,34,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`p-1.5 rounded-lg ${toneRing} transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-[#666666] font-semibold leading-tight">
          {label}
        </span>
      </div>
      {hasValue ? (
        <p className="text-lg font-bold text-slate-900 dark:text-[#f0f0f0] tabular-nums leading-snug">
          {value}
        </p>
      ) : (
        <p className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-300 dark:text-[#3a3a3a] leading-none">
            —
          </span>
          <span className="text-[10px] text-slate-400 dark:text-[#555555]">
            {tr("Awaiting verified source")}
          </span>
        </p>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Risk pill                                                           */
/* ------------------------------------------------------------------ */

type RiskLevel = "Low" | "Medium" | "High" | "Unknown";

export const RiskPill: React.FC<{ risk: RiskLevel; className?: string }> = ({
  risk,
  className = "",
}) => {
  const styles: Record<RiskLevel, string> = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/25",
    Medium:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/25",
    High:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/25",
    Unknown:
      "bg-slate-100 text-slate-500 border-slate-200 dark:bg-[#1a1a1a] dark:text-[#777777] dark:border-[#333333]",
  };

  const label: Record<RiskLevel, string> = {
    Low: tr("Low risk"),
    Medium: tr("Medium risk"),
    High: tr("High risk"),
    Unknown: tr("Risk not classified"),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${styles[risk]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label[risk]}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Range bar (min — optimal — max visualization)                       */
/* ------------------------------------------------------------------ */

export const RangeBar: React.FC<{
  label: string;
  min: number;
  max: number;
  optimal: number;
  scaleMin: number;
  scaleMax: number;
  unit: string;
  format?: (n: number) => string;
}> = ({ label, min, max, optimal, scaleMin, scaleMax, unit, format }) => {
  const span = scaleMax - scaleMin || 1;
  const clamp = (n: number) =>
    Math.max(0, Math.min(100, ((n - scaleMin) / span) * 100));

  const lo = clamp(min);
  const hi = clamp(max);
  const opt = clamp(optimal);
  const fmt = format ?? ((n: number) => `${n}`);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-slate-500 dark:text-[#a0a0a0]">{label}</span>
        <span className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0] tabular-nums">
          {fmt(optimal)}
          <span className="text-xs font-medium text-slate-400 dark:text-[#666666]">
            {" "}
            {unit}
          </span>
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-slate-100 dark:bg-[#1a1a1a]">
        {/* Tolerance envelope */}
        <div
          className="absolute inset-y-0 rounded-full bg-emerald-200/70 dark:bg-emerald-500/25"
          style={{ left: `${lo}%`, width: `${Math.max(hi - lo, 1.5)}%` }}
        />
        {/* Optimal marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-600 dark:bg-emerald-400 ring-2 ring-white dark:ring-[#0a0a0a] shadow-xs"
          style={{ left: `${opt}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-slate-400 dark:text-[#555555] tabular-nums">
        <span>
          {fmt(min)} {unit}
        </span>
        <span>
          {fmt(max)} {unit}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Empty section hint                                                  */
/* ------------------------------------------------------------------ */

export const EmptyHint: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => (
  <div
    className={`p-4 rounded-xl border border-dashed border-slate-200 dark:border-[#333333] text-center bg-slate-50/50 dark:bg-[#0f0f0f] ${className}`}
  >
    <p className="text-xs text-slate-400 dark:text-[#555555] leading-relaxed">
      {text}
    </p>
  </div>
);
