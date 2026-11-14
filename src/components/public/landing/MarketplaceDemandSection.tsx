"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";

export function MarketplaceDemandSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="marketplace-demand" className="scroll-mt-24 relative overflow-hidden bg-white py-16 dark:bg-[#050505] lg:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl dark:bg-amber-500/5" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
              {t("তাজা পণ্য বিক্রি করুন ও ক্রেতার চাহিদা পূরণ করুন", "Sell Fresh Produce & Fulfill Buyer Demand")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
              {t(
                "উন্মুক্ত বাজারে পণ্য ব্রাউজ করুন এবং সাইন ইন করে ক্রেতাদের ডিমান্ড বোর্ডে চাহিদা মিলিয়ে সরাসরি বাণিজ্যের সুযোগ তৈরি করুন।",
                "Browse the open marketplace and, when signed in, match buyer requirements on the demand board to unlock direct trade opportunities."
              )}
            </p>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-5 lg:grid-cols-2">
          <RevealItem>
            <Link
              href="/products"
              className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#222222] dark:bg-[#0f0f0f]"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
                  alt={t("তাজা কৃষিপণ্য বাজার", "Fresh produce marketplace")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-900/10" />
              </div>
              <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-emerald-700 shadow-lg backdrop-blur dark:bg-[#111111]/90 dark:text-emerald-400">
                    <Icon name={"ShoppingCart" as IconName} size={22} />
                  </div>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                    {t("উন্মুক্ত ব্রাউজ", "Open to Browse")}
                  </span>
                </div>
                <div className="mt-auto pt-20">
                  <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{t("প্রোডিউস মার্কেটপ্লেস", "Produce Marketplace")}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-100/90">
                    {t(
                      "যাচাইকৃত কৃষকদের তালিকাভুক্ত তাজা ফসল দেখুন, দাম তুলনা করুন এবং বিশ্বস্ত সরবরাহের সাথে যুক্ত হোন।",
                      "Explore fresh harvests from verified farmers, compare listings, and connect with trusted supply."
                    )}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition group-hover:bg-emerald-50">
                    {t("পণ্য ব্রাউজ করুন", "Browse Products")}
                    <Icon name={"ArrowRight" as IconName} size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>

          <RevealItem>
            <Link
              href="/dashboard/demands"
              className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-[#f3faf5] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#1f2a23] dark:bg-[#0b1710]"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
                  alt={t("ক্রেতার চাহিদা ও ব্যবসায়িক বৈঠক", "Buyer demand and business planning")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-25 transition duration-700 group-hover:scale-105 dark:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/80 to-amber-50/60 dark:from-[#0b1710] dark:via-[#0b1710]/95 dark:to-[#07140d]/90" />
              </div>
              <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                    <Icon name={"ClipboardList" as IconName} size={22} />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                    <Icon name={"Lock" as IconName} size={11} />
                    {t("সাইন ইন প্রয়োজন", "Sign in required")}
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { bn: "ক্রেতার নির্দিষ্ট চাহিদা দেখুন", en: "View specific buyer requirements" },
                    { bn: "পরিমাণ, মান ও লোকেশন মিলান", en: "Match quantity, quality & location" },
                    { bn: "উপযুক্ত কৃষক/লটের সাথে সংযোগ", en: "Connect suitable farmers & lots" },
                    { bn: "দ্রুত ও স্বচ্ছ অর্ডার সম্ভাবনা", en: "Faster, transparent order potential" },
                  ].map((item) => (
                    <div key={item.en} className="flex items-start gap-2 rounded-xl border border-white/70 bg-white/70 p-3 dark:border-[#24332b] dark:bg-[#111111]/60">
                      <Icon name={"CheckCircle" as IconName} size={15} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-medium leading-snug text-slate-700 dark:text-[#d0d0d0]">{t(item.bn, item.en)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-3xl">{t("ডিমান্ড বোর্ড ও ম্যাচিং", "Demand Board & Matching")}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                    {t(
                      "ক্রেতারা তাদের প্রয়োজন পোস্ট করলে উপযুক্ত কৃষক ও হার্ভেস্ট লটের সাথে মিলিয়ে সরাসরি বিক্রির সুযোগ বাড়ান।",
                      "When buyers post requirements, match them with suitable farmers and harvest lots to accelerate direct sales."
                    )}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:group-hover:bg-emerald-400">
                    {t("ডিমান্ড বোর্ড খুলুন", "Open Demand Board")}
                    <Icon name={"ArrowRight" as IconName} size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
