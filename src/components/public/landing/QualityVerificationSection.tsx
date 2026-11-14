"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";
import { QUALITY_STEPS } from "./landingData";

export function QualityVerificationSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="quality-verification" className="scroll-mt-24 relative overflow-hidden bg-slate-950 py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal delay={0.05} y={24}>
              <Link
                href="/dashboard/quality"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-emerald-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                    alt={t("কৃষিপণ্য মান যাচাই ও পরিদর্শন", "Agricultural quality inspection and verification")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                    {t("লট-ভিত্তিক যাচাইকৃত গ্রেড", "Lot-based verified grade")}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-2xl border border-white/15 bg-slate-950/50 p-4 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                          <Icon name={"BadgeCheck" as IconName} size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{t("২৪ ঘণ্টার মধ্যে লক্ষ্য", "Target within 24 hours")}</p>
                          <p className="text-xs text-slate-300">{t("অনুরোধ থেকে যাচাইকৃত রিপোর্ট", "From request to verified report")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
                {t("হার্ভেস্ট লটের মান যাচাই ও গ্রেডিং", "Harvest Lot Quality Verification & Grading")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {t(
                  "প্রতিটি হার্ভেস্ট লটের জন্য স্বতন্ত্র মান যাচাই অনুরোধ করুন, পরিদর্শন ও মূল্যায়নের মাধ্যমে যাচাইকৃত গ্রেড ও রিপোর্ট পান—যা ক্রেতার আস্থা বাড়ায় এবং ন্যায্য মূল্যে বিক্রি সহজ করে।",
                  "Request quality checks for each harvest lot, complete inspection and evaluation, and receive a verified grade and report—building buyer trust and enabling fair, confident sales."
                )}
              </p>
            </Reveal>

            <RevealStagger className="grid gap-4 sm:grid-cols-3">
              {QUALITY_STEPS.map((item) => (
                <RevealItem key={item.step}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/10">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-extrabold tracking-widest text-emerald-300/80">{item.step}</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                        <Icon name={item.icon as IconName} size={16} />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white">{t(item.titleBn, item.titleEn)}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{t(item.descBn, item.descEn)}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard/quality"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  {t("মান যাচাই শুরু করুন", "Start Quality Verification")}
                  <Icon name={"ArrowRight" as IconName} size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Icon name={"Lock" as IconName} size={13} />
                  {t("সাইন ইন করলে অনুরোধকৃত পেজে ফিরবেন", "Sign in and return to your requested page")}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
