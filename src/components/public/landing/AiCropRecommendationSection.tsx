"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";
import { AI_RECOMMENDATION_POINTS } from "./landingData";

export function AiCropRecommendationSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="ai-recommendation" className="scroll-mt-24 relative overflow-hidden bg-[#f6fbf7] py-16 dark:bg-[#07110b] lg:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-6">

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl lg:text-[2.6rem]">
                {t("আপনার জমির জন্য সেরা ফসল ও বীজ সুপারিশ", "Smart Crop & Seed Recommendations for Your Field")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
                {t(
                  "FarmPath আপনার অবস্থান, জমির আকার, মৌসুম ও কৃষি তথ্য বিশ্লেষণ করে উপযুক্ত ফসল ও বীজ বাছাই করতে সাহায্য করে—যাতে পরিকল্পনা থেকে ফলন পর্যন্ত প্রতিটি সিদ্ধান্ত হয় আরও নির্ভুল ও লাভজনক।",
                  "FarmPath analyzes your location, land area, season, and agricultural data to recommend the right crops and seeds—so every decision from planning to harvest is smarter and more profitable."
                )}
              </p>
            </Reveal>

            <RevealStagger className="grid gap-3 sm:grid-cols-1">
              {AI_RECOMMENDATION_POINTS.map((point) => (
                <RevealItem key={point.titleEn}>
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#24332b] dark:bg-[#111111]/70">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <Icon name={point.icon as IconName} size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{t(point.titleBn, point.titleEn)}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-[#888888]">{t(point.descBn, point.descEn)}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard/crops/recommend"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
                >
                  {t("ফসল সুপারিশ পান", "Get Crop Recommendation")}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    <Icon name={"ArrowRight" as IconName} size={16} />
                  </span>
                </Link>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-[#888888]">
                  <Icon name={"Lock" as IconName} size={13} />
                  {t("ব্যবহার করতে সাইন ইন প্রয়োজন", "Sign in to access this feature")}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12} y={24}>
              <Link
                href="/dashboard/crops/recommend"
                className="group relative block overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#24332b] dark:bg-[#0f0f0f]"
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80"
                    alt={t("সবুজ ক্ষেতে ফসল পর্যবেক্ষণ", "Monitoring crops in a green field")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{t("পরিকল্পনা → ক্রয় → চাষ", "Plan → Buy → Grow")}</p>
                      <p className="mt-1 text-base font-bold text-white sm:text-lg">{t("মাটি, মৌসুম ও বাজার চাহিদা মিলিয়ে সঠিক ফসল বেছে নিন", "Pick the right crop by soil, season, and market demand")}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
