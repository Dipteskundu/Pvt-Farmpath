"use client";

import React from "react";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { RevealStagger, RevealItem } from "@/components/motion";
import { FEATURE_PILLARS } from "./landingData";

export function FeaturePillarsStrip() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="features" className="border-y border-emerald-100 bg-[#eaf5ec] py-10 dark:border-[#1f2a23] dark:bg-[#0b1710]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealStagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {FEATURE_PILLARS.map((item) => (
            <RevealItem key={item.titleEn}>
              <div className="group h-full rounded-2xl border border-emerald-100/80 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md dark:border-[#24332b] dark:bg-[#111111]/70 dark:hover:bg-[#141414]">
                <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Icon name={item.icon as IconName} size={18} />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-[#f0f0f0] sm:text-sm">
                  {t(item.titleBn, item.titleEn)}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-[#888888] sm:text-xs">
                  {t(item.descBn, item.descEn)}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
