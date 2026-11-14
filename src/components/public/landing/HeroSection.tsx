"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";
import { HERO_STATS } from "./landingData";

export function HeroSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f4faf5] dark:bg-[#07140d]">
      <div className="absolute inset-0">
        <Image
          src="/farmer-hero-exact.jpg"
          alt={t("সবুজ ক্ষেতে স্মার্টফোন ব্যবহার করা কৃষক", "Farmer in a lush green crop field")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">


            <Reveal delay={0.08} y={18}>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-5xl lg:text-[3.4rem]">
                {t("স্মার্টভাবে চাষ করুন,", "Grow Smarter,")}
                <br />
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                  {t("ভালো ফলন পান,", "Farm Better,")}
                </span>
                <br />
                <span className="whitespace-nowrap">{t("সুন্দর ভবিষ্যৎ গড়ুন", "Build a Greener Future")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14} y={18}>
              <p className="max-w-xl text-base leading-relaxed text-white text-[#a0a0a0] sm:text-lg">
                {t(
                  "FarmPath কৃষকদের আধুনিক সরঞ্জাম, বিশেষজ্ঞ পরামর্শ ও বিশ্বস্ত বাজারের সুযোগ এক জায়গায় এনে দেয়।",
                  "FarmPath connects farmers with modern tools, expert advice and trusted market opportunities — all in one powerful platform."
                )}
              </p>
            </Reveal>

            <Reveal delay={0.2} y={16}>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-700/25 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
                >
                  {t("প্ল্যাটফর্ম দেখুন", "Explore Platform")}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    <Icon name={"ArrowRight" as IconName} size={16} />
                  </span>
                </Link>
                <Link
                  href="#community"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200/80 bg-white/90 px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white dark:border-[#333333] dark:bg-[#111111]/90 dark:text-[#f0f0f0] dark:hover:border-emerald-500/30"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Icon name={"PlayCircle" as IconName} size={14} />
                  </span>
                  {t("ভিডিও দেখুন", "Watch Stories")}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.26} y={14}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3">
                {HERO_STATS.map((stat) => (
                  <div key={stat.labelEn} className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                      <Icon name={stat.icon as IconName} size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-[#f0f0f0]">{stat.value}</p>
                      <p className="text-xs text-white text-[#888888]">{t(stat.labelBn, stat.labelEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>


        </div>
      </div>
    </section>
  );
}
