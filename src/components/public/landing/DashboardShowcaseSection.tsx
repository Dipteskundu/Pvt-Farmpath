"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";
import { DASHBOARD_CHECKLIST, DASHBOARD_NAV } from "./landingData";

export function DashboardShowcaseSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="dashboard" className="relative overflow-hidden bg-[#164a2c] py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(78,184,112,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.12),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {t("সহজে আপনার খামার পরিচালনা করুন", "Manage Your Farm with Ease")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-emerald-100/90">
                {t(
                  "অগ্রগতি ট্র্যাক করুন, অন্তর্দৃষ্টি পান এবং সহজ ড্যাশবোর্ড দিয়ে ভালো সিদ্ধান্ত নিন।",
                  "Track progress, get insights and make better decisions with our easy-to-use dashboard."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#4eb870] px-5 py-3 text-sm font-bold text-[#0d2e1b] transition hover:-translate-y-0.5 hover:bg-[#5fd183]"
              >
                {t("ড্যাশবোর্ড দেখুন", "Explore Dashboard")}
                <Icon name={"ArrowRight" as IconName} size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08} y={28}>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white text-slate-900 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-medium text-slate-500">app.farmpath.ag/dashboard</div>
                  <Icon name={"Bell" as IconName} size={14} className="text-slate-400" />
                </div>

                <div className="grid min-h-[260px] grid-cols-12">
                  <div className="col-span-4 space-y-2 border-r border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Icon name={"Sprout" as IconName} size={15} className="text-emerald-700" />
                      <span className="text-xs font-extrabold text-emerald-800">FarmPath</span>
                    </div>
                    {DASHBOARD_NAV.map((nav) => (
                      <div
                        key={nav.en}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium ${
                          nav.active ? "bg-emerald-100 text-emerald-800 font-bold" : "text-slate-500"
                        }`}
                      >
                        <Icon name={nav.icon as IconName} size={13} />
                        <span>{t(nav.bn, nav.en)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="col-span-8 space-y-3 p-3.5">
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">{t("স্বাগতম, কৃষক!", "Welcome back, Farmer!")}</p>
                      <p className="text-[10px] text-slate-500">{t("আজকের খামারের সারাংশ দেখুন", "Here is your farm performance today")}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2">
                        <p className="text-xs font-extrabold text-slate-900">2.5 {t("একর", "Acres")}</p>
                        <p className="text-[9px] text-slate-500">{t("মোট জমি", "Total Land")}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2">
                        <p className="text-xs font-extrabold text-emerald-700">85%</p>
                        <p className="text-[9px] text-slate-500">{t("ফসলের স্বাস্থ্য", "Crop Health")}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2">
                        <p className="text-xs font-extrabold text-slate-900">৳12,500</p>
                        <p className="text-[9px] text-slate-500">{t("আনুমানিক ফলন", "Est. Yield")}</p>
                      </div>
                    </div>

                    <div className="relative h-24 overflow-hidden rounded-xl">
                      <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" alt={t("সক্রিয় ফসল ক্ষেত্র", "Active crop field")} fill sizes="400px" className="object-cover" />
                      <div className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-900 backdrop-blur-sm">
                        {t("ফিল্ড #০১ · সেচযুক্ত ও সুস্থ", "Field #01 · Irrigated & Healthy")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <RevealStagger className="space-y-4">
              {DASHBOARD_CHECKLIST.map((item) => (
                <RevealItem key={item.en}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4eb870]/20 text-[#6ee794] ring-1 ring-[#4eb870]/30">
                      <Icon name={"CheckCircle" as IconName} size={16} />
                    </div>
                    <span className="text-sm font-medium text-emerald-50">{t(item.bn, item.en)}</span>
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
