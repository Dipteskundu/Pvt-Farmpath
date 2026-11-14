"use client";

import React from "react";
import Image from "next/image";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";
import { COMMUNITY_STATS, TESTIMONIALS } from "./landingData";

export function CommunityTestimonialsSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="community" className="overflow-hidden bg-slate-50 py-16 dark:bg-[#050505] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
              {t("বাস্তব গল্প, বাস্তব প্রভাব", "Real Stories, Real Impact")}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-[#a0a0a0]">
              {t("FarmPath ব্যবহারকারী কৃষকদের অভিজ্ঞতা জানুন।", "Hear from farmers who grow with FarmPath.")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={20}>
          <div className="marquee-paused relative mt-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent dark:from-[#050505] sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent dark:from-[#050505] sm:w-20" />
            <div className="overflow-hidden">
              <div className="animate-marquee-rtl flex w-max gap-6 py-2">
                {items.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] sm:w-[360px] sm:p-7"
                  >
                    <div className="flex items-center gap-1 text-amber-400" aria-label={t("৫ তারকা", "5 stars")}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name={"Star" as IconName} size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 dark:text-[#cfcfcf] sm:text-base">
                      “{t(item.quoteBn, item.quoteEn)}”
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-[#222222]">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-[#333333]">
                        <Image src={item.avatar} alt={item.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-[#888888] sm:text-sm">{t(item.locationBn, item.locationEn)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>


      </div>
    </section>
  );
}
