"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";

const TRACKS = [
  {
    icon: "Truck" as IconName,
    titleBn: "লজিস্টিকস ও ডেলিভারি",
    titleEn: "Logistics & Delivery",
    descBn: "পিকআপ সমন্বয়, শিপমেন্ট ট্র্যাকিং ও ডেলিভারি নিশ্চিতকরণ এক জায়গায়।",
    descEn: "Coordinate pickup, track shipments, and confirm delivery in one flow.",
    href: "/dashboard/deliveries",
    ctaBn: "ডেলিভারি ট্র্যাক করুন",
    ctaEn: "Track Deliveries",
  },
  {
    icon: "CreditCard" as IconName,
    titleBn: "অর্ডার ও নিরাপদ পেমেন্ট",
    titleEn: "Orders & Secure Payments",
    descBn: "অর্ডার, ইনভয়েস ও স্বচ্ছ পেমেন্ট ট্র্যাকিংয়ের মাধ্যমে নিরাপদ লেনদেন।",
    descEn: "Manage orders, invoices, and transparent payment tracking with confidence.",
    href: "/dashboard/orders",
    ctaBn: "অর্ডার দেখুন",
    ctaEn: "View Orders",
  },
  {
    icon: "TrendingUp" as IconName,
    titleBn: "খরচ, আয় ও লাভ বিশ্লেষণ",
    titleEn: "Profitability & Insights",
    descBn: "খরচ, বিক্রয় ও লাভের হিসাব দেখে খামারের অর্থনৈতিক সিদ্ধান্ত নিন।",
    descEn: "Analyze expenses, revenue, and profit to guide smarter farm decisions.",
    href: "/dashboard/profitability",
    ctaBn: "লাভ বিশ্লেষণ দেখুন",
    ctaEn: "View Profitability",
  },
];

export function LogisticsPaymentsProfitSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="sell-get-paid" className="scroll-mt-24 relative overflow-hidden bg-[#f7faf8] py-16 dark:bg-[#060a08] lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5 space-y-6">

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                {t("ডেলিভারি থেকে পেমেন্ট ও লাভ—সবকিছু নিয়ন্ত্রণে", "From Delivery to Payments & Profit—All in Control")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
                {t(
                  "অর্ডার নিশ্চিত হওয়ার পর লজিস্টিকস সমন্বয়, নিরাপদ পেমেন্ট ও ইনভয়েস ট্র্যাকিং থেকে শুরু করে খরচ-আয় বিশ্লেষণ—FarmPath পুরো বাণিজ্য চক্রকে স্বচ্ছ ও সহজ রাখে।",
                  "From coordinating logistics after an order to secure payments, invoices, and cost-revenue insights, FarmPath keeps the entire trade cycle transparent and easy to manage."
                )}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-emerald-100 shadow-lg dark:border-[#24332b]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
                    alt={t("কৃষিপণ্য পরিবহন ও লজিস্টিকস", "Agricultural transport and logistics")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {[t("ডেলিভারি ট্র্যাকিং", "Delivery tracking"), t("স্বচ্ছ পেমেন্ট", "Transparent payments"), t("লাভের অন্তর্দৃষ্টি", "Profit insights")].map((tag) => (
                      <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealStagger className="grid gap-4 sm:grid-cols-2">
              {TRACKS.map((track, idx) => (
                <RevealItem key={track.titleEn} className={idx === 2 ? "sm:col-span-2" : ""}>
                  <Link
                    href={track.href}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-[#0f0f0f] ${
                      idx === 2
                        ? "border-emerald-200/70 dark:border-emerald-500/20"
                        : "border-slate-200/80 dark:border-[#222222]"
                    }`}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl transition group-hover:bg-emerald-200/60 dark:bg-emerald-500/10" />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={track.icon} size={22} />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:bg-[#1a1a1a] dark:text-[#a0a0a0]">
                        <Icon name={"Lock" as IconName} size={11} />
                        {t("সাইন ইন", "Sign in")}
                      </span>
                    </div>
                    <div className="relative mt-5 flex-1">
                      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-xl">{t(track.titleBn, track.titleEn)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{t(track.descBn, track.descEn)}</p>
                    </div>
                    <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      <span>{t(track.ctaBn, track.ctaEn)}</span>
                      <Icon name={"ArrowRight" as IconName} size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
            <Reveal delay={0.15}>
              <p className="mt-4 text-xs text-slate-500 dark:text-[#888888]">
                {t(
                  "এই সেকশনগুলোর ফিচার ব্যবহার করতে সাইন ইন করুন—লগইনের পর আপনি অনুরোধকৃত পেজে ফিরে যাবেন।",
                  "Sign in to access these features—after login you’ll be returned to the page you requested."
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
