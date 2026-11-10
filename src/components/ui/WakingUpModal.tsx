"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWarmupState, type WarmKind, type WarmStatus } from "@/lib/warmup";
import { Button } from "./Button";

/**
 * The "warming up" modal — FarmPath's answer to free-tier cold starts.
 *
 * Instead of an error toast, a cold server or cold AI recommendation shows a
 * friendly sprout that "wakes the farm up" while the wrapped request waits,
 * then auto-dismisses the moment the service answers. Only the pages that opt
 * in (login, products, inputs, AI recommendation) mount this; everything else
 * keeps the regular toast behaviour.
 *
 * Rendered states (driven entirely by `lib/warmup`'s shared store):
 *   waking → sprout animation + reassurance copy (no close button)
 *   down   → same card switches to a gentle "Try again" (calls `onRetry`)
 *   ready/idle → nothing renders
 */
export const WakingUpModal: React.FC<{ onRetry?: () => void }> = ({
  onRetry,
}) => {
  const { language } = useLanguage();
  const { status, kind } = useWarmupState();

  const open = status === "waking" || status === "down";
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);
  const iconFor = (target: WarmKind) => (target === "ai" ? "🧑‍🌾" : "🌱");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="waking-up-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs dark:bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0.9, y: 14, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 8, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-white shadow-2xl dark:border-[#1e3327] dark:from-[#0d1812] dark:via-[#0a0a0a] dark:to-[#0a0a0a]"
          >
            <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
              {/* ── The sprout ─────────────────────────────────────── */}
              {/* A soft glow, a bouncing sprout-emoji "growing" out of a
                  soil mound, and two drifting leaf sparks around it. */}
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-200/40 blur-xl dark:bg-emerald-500/10" />
                <motion.span
                  aria-hidden="true"
                  className="absolute -left-1 top-2 text-lg"
                  animate={{ y: [0, -6, 0], opacity: [0.35, 0.85, 0.35] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  🍃
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  className="absolute right-0 top-6 text-base"
                  animate={{ y: [0, 6, 0], opacity: [0.75, 0.3, 0.75] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
                >
                  🍂
                </motion.span>
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: [0.9, 1.05, 0.95, 1], y: [0, -8, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  className="relative text-6xl drop-shadow-sm"
                >
                  {status !== "down" ? iconFor(kind) : "🐑"}
                </motion.div>
                {/* soil mound */}
                <div className="absolute -bottom-1 h-3 w-16 rounded-full bg-[#8d6e4b]/60 blur-[1px] dark:bg-[#5b4a33]" />
              </div>

              {/* ── Copy ───────────────────────────────────────────── */}
              {status !== "down" ? (
                <>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#f0f0f0]">
                    {kind === "ai"
                      ? t("আমাদের কৃষি AI পরামর্শ দিচ্ছে…", "Consulting our agronomist AI…")
                      : t("খামার জাগিয়ে তুলছি…", "Warming up the farm…")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                    {kind === "ai"
                      ? t(
                          "AI বীজ এখন অঙ্কুরিত হচ্ছে — অনুমান তৈরি হতে মুহূর্ত লাগবে। একটু অপেক্ষা করুন!",
                          "The AI seed is sprouting right now — your recommendation is on its way. Hang tight!"
                        )
                      : t(
                          "ধন্যবাদ অপেক্ষার জন্য! আমাদের সার্ভার শান্ত থাকলে একটু বিশ্রাম নেয় — জেগে উঠতে সাধারণত ১০–২০ সেকেন্ড লাগে।",
                          "Thanks for waiting! Our servers take a short nap when quiet — waking up usually takes 10–20 seconds."
                        )}
                  </p>

                  {/* Shimmering progress bar with drifting dots */}
                  <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-emerald-100 dark:bg-[#17251c]">
                    <motion.div
                      className="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <motion.p
                    className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                    animate={{ opacity: [1, 0.45, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {t("অপেক্ষা করছেন… ধন্যবাদ!", "Hanging in there… thank you!")}
                  </motion.p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#f0f0f0]">
                    {kind === "ai"
                      ? t("AI খান এখনো ঘুমুত্ত!", "The AI is a sleepy sprout still!")
                      : t("সার্ভার এখনো জাগছে", "Still waking up")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                    {t(
                      "ওরা খারাপ কিছু করছে না — শুধু জেগে ওঠার সময় বেশি লেগেছে। আবার চেষ্টা করুন, প্রায় প্রস্তুত!",
                      "They're not misbehaving — just taking their time. Try again, we're almost there!"
                    )}
                  </p>
                  <Button
                    variant="primary"
                    className="mt-5 w-full"
                    onClick={() => onRetry?.()}
                  >
                    {t("আবার চেষ্টা করুন", "Try again")} 🌱
                  </Button>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {kind === "ai"
                      ? t("আপনার তথ্য এখনো এখানেই সংরক্ষিত আছে", "Your inputs are still filled in")
                      : t("পেজ রিফ্রেশ হয়ে আবার চেষ্টা করবে", "The page will retry for you")}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WakingUpModal;
