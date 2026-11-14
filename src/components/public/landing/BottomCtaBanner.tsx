"use client";

import React from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";

export function BottomCtaBanner() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="get-started" className="relative overflow-hidden bg-[#164a2c] py-12">
      <div className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(circle_at_80%_50%,rgba(78,184,112,0.3),transparent_40%)] blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <Reveal className="md:max-w-2xl">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            {t("FarmPath-এর সাথে আরও ভালোভাবে বাড়তে প্রস্তুত?", "Ready to grow better with FarmPath?")}
          </h2>
          <p className="mt-1.5 text-sm text-emerald-100/90">
            {t(
              "হাজার হাজার কৃষকের সাথে যুক্ত হয়ে সবুজ ও সমৃদ্ধ ভবিষ্যৎ গড়ুন।",
              "Join thousands of farmers who are building a greener, more prosperous future."
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            href="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#164a2c] shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
          >
            {t("বিনামূল্যে শুরু করুন", "Get Started Free")}
            <Icon name={"ArrowRight" as IconName} size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
