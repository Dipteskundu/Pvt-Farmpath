"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";
import { FAQS } from "./landingData";

export function FaqSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-slate-100 py-14 dark:border-[#1a1a1a] lg:py-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          <Reveal delay={0.05}>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm dark:text-[#f0f0f0] sm:text-3xl lg:text-4xl">
              {t("সচরাচর জিজ্ঞাসা", "Frequently Asked Questions")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-2 max-w-xl text-sm font-medium text-slate-700 dark:text-[#d0d0d0] sm:text-base">
              {t("সাধারণ প্রশ্নের দ্রুত উত্তর খুঁজুন।", "Find quick answers to common questions.")}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 w-full space-y-3 sm:mt-12">
          {FAQS.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={faq.questionEn} delay={idx * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-sm backdrop-blur-sm transition dark:border-[#222222] dark:bg-[#111111]/95">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-900 transition hover:bg-emerald-50/50 dark:text-[#f0f0f0] dark:hover:bg-[#151515] sm:px-6"
                  >
                    <span>{t(faq.questionBn, faq.questionEn)}</span>
                    <Icon
                      name={"ChevronDown" as IconName}
                      size={18}
                      className={`shrink-0 text-emerald-700 transition-transform duration-300 dark:text-emerald-400 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-left text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:px-6">
                        {t(faq.answerBn, faq.answerEn)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
