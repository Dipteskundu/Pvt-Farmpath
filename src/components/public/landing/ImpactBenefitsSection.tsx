"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";
import { IMPACT_BENEFITS } from "./landingData";

export function ImpactBenefitsSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="impact" className="border-y border-emerald-100 bg-[#eaf5ec] py-16 dark:border-[#1f2a23] dark:bg-[#0b1710] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Icon name={"Sprout" as IconName} size={14} />
                <span>{t("বাস্তব প্রভাব", "Real Impact")}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                {t("FarmPath কীভাবে সাহায্য করে?", "How FarmPath Helps You?")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
                {t(
                  "কৃষকদের জন্য, কৃষকদের দ্বারা তৈরি। FarmPath কৃষিকে সহজ, লাভজনক ও টেকসই করে তোলে।",
                  "Built for farmers, by farmers. FarmPath makes agriculture easier, more profitable and more sustainable."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="pt-2">
                <Link
                  href="#dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
                >
                  {t("সুবিধা দেখুন", "Discover Benefits")}
                  <Icon name={"ArrowRight" as IconName} size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <RevealStagger className="grid gap-3.5 sm:grid-cols-2">
              {IMPACT_BENEFITS.map((benefit) => (
                <RevealItem key={benefit.titleEn}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#24332b] dark:bg-[#111111]">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <Icon name={benefit.icon as IconName} size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-[#f0f0f0] sm:text-sm">{t(benefit.titleBn, benefit.titleEn)}</h3>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-[#888888] sm:text-xs">{t(benefit.descBn, benefit.descEn)}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          <div className="relative flex justify-center lg:col-span-3">
            <Reveal delay={0.1} y={24}>
              <div className="relative">
                <div className="relative w-56 rounded-[2rem] border-4 border-slate-800 bg-slate-900 p-2.5 shadow-2xl dark:border-[#2a2a2a]">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white dark:bg-[#0a0a0a]">
                    <div className="flex items-center justify-between bg-emerald-50 px-3 py-2.5 dark:bg-emerald-500/10">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">FarmPath</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="space-y-2.5 p-3">
                      <p className="text-[11px] font-bold text-slate-900 dark:text-[#f0f0f0]">{t("আপনার খামারের সারাংশ", "Your Farm Overview")}</p>
                      <div className="relative h-20 overflow-hidden rounded-xl">
                        <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" alt={t("ফসল ক্ষেত্র", "Crop field")} fill sizes="220px" className="object-cover" />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-center">
                        <div className="rounded-lg bg-emerald-50 p-2 dark:bg-[#111111]">
                          <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">92%</p>
                          <p className="text-[9px] text-slate-500 dark:text-[#888888]">{t("মাটির স্বাস্থ্য", "Soil Health")}</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-2 dark:bg-[#111111]">
                          <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">28°C</p>
                          <p className="text-[9px] text-slate-500 dark:text-[#888888]">{t("আদর্শ", "Optimal")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-float-slow absolute -right-4 bottom-8 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 text-center shadow-lg backdrop-blur dark:border-emerald-500/20 dark:bg-[#111111]/95 sm:-right-8">
                  <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">+32%</p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-[#888888]">{t("ফলন বৃদ্ধি", "Yield Growth")}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
