"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";
import { HOW_IT_WORKS_STEPS } from "./landingData";

export function HowItWorksSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="process" className="relative overflow-hidden bg-white py-16 dark:bg-[#050505] lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                {t("FarmPath কীভাবে কাজ করে?", "How FarmPath Works?")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
                {t(
                  "পরিকল্পনা থেকে লাভ — স্মার্ট কৃষির জন্য একটি সহজ যাত্রা।",
                  "From planning to profit — a simple journey to smarter farming."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="pt-2">
                <Link
                  href="#dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
                >
                  {t("সম্পূর্ণ প্রক্রিয়া দেখুন", "See Full Process")}
                  <Icon name={"ArrowRight" as IconName} size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS_STEPS.map((card) => (
                <RevealItem key={card.step}>
                  <div className="group relative flex h-full flex-col pt-4">
                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white shadow-md ring-4 ring-white dark:bg-emerald-500 dark:text-emerald-950 dark:ring-[#050505]">
                      {card.step}
                    </div>
                    <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#222222] dark:bg-[#111111]">
                      <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl">
                        <Image src={card.img} alt={t(card.titleBn, card.titleEn)} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{t(card.titleBn, card.titleEn)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-[#888888]">{t(card.descBn, card.descEn)}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
