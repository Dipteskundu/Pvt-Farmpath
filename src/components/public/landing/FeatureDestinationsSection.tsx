"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion";

type Feature = {
  key: string;
  icon: IconName;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  href: string;
  ctaBn: string;
  ctaEn: string;
  image: string;
  badgeBn?: string;
  badgeEn?: string;
  external?: boolean;
};

const FEATURES: Feature[] = [
  {
    key: "agriculture-training",
    icon: "GraduationCap",
    titleBn: "কৃষি প্রশিক্ষণ",
    titleEn: "Agriculture Training",
    descBn: "আমাদের অ্যাপ্লিকেশনের মাধ্যমে আধুনিক কৃষি কৌশল, ফসল ব্যবস্থাপনা ও সেরা চাষাবাদ পদ্ধতি শিখুন—ধাপে ধাপে গাইড ও ব্যবহারিক প্রশিক্ষণ কন্টেন্ট নিয়ে।",
    descEn: "Learn modern farming techniques, crop management, and best practices through our in-app training—step-by-step guides and practical learning content to grow your skills.",
    href: "/dashboard/training",
    ctaBn: "প্রশিক্ষণ শুরু করুন",
    ctaEn: "Start Training",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    badgeBn: "দক্ষতা উন্নয়ন",
    badgeEn: "Learn to Grow More Crops"
  },
  {
    key: "crop-management",
    icon: "Wheat",
    titleBn: "ফসল ব্যবস্থাপনা",
    titleEn: "Crop Management",
    descBn: "আপনার ফসলের তথ্য, চাষাবাদের ধাপ ও দৈনন্দিন কার্যক্রম সহজে পরিচালনা করুন—স্বাস্থ্যকর ফলন ও উন্নত উৎপাদনের জন্য।",
    descEn: "Manage your crop details, growth stages, and daily farming activities in one place to support healthier yields and better production.",
    href: "/dashboard/crops",
    ctaBn: "ফসল পরিচালনা করুন",
    ctaEn: "Manage Crops",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjA5L7vaGiCIMnnaUzkCAQ3i4SseITnxsC-P2JkMo7mw&s=10",
    badgeBn: "খামার টুল",
    badgeEn: "Farm Tool",
  },
  {
    key: "inputs",
    icon: "PackageCheck",
    titleBn: "কৃষি উপকরণ",
    titleEn: "Farm Inputs",
    descBn: "বীজ, সার, সেচ ও সরঞ্জামের মতো প্রয়োজনীয় ইনপুট খুঁজুন এবং আপনার খামারের জন্য সঠিক উপকরণ বেছে নিন।",
    descEn: "Find certified seeds, fertilizers, irrigation tools, and equipment to support every stage of farming.",
    href: "/inputs",
    ctaBn: "ইনপুট দেখুন",
    ctaEn: "Explore Inputs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wVbWziFU9ilSQOs9PYYG98tniBmYFnVtqNGpcjDr7w&s=10",
    badgeBn: "যাচাইকৃত সরবরাহ",
    badgeEn: "Verified Supplies",
    external: true,
  },
  {
    key: "calendar",
    icon: "Calendar",
    titleBn: "ফসল ক্যালেন্ডার",
    titleEn: "Crop Calendar",
    descBn: "বপন, পরিচর্যা ও ফসল কাটার সময়সূচি পরিকল্পনা করুন যাতে কোনো গুরুত্বপূর্ণ কাজ মিস না হয়।",
    descEn: "Plan sowing, care, and harvest schedules so you never miss a critical farming activity.",
    href: "/dashboard/calendar",
    ctaBn: "ক্যালেন্ডার খুলুন",
    ctaEn: "Open Calendar",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    badgeBn: "পরিকল্পনা সরঞ্জাম",
    badgeEn: "Planning Tool",
  },
  {
    key: "weather",
    icon: "CloudSun",
    titleBn: "আবহাওয়া পরামর্শ",
    titleEn: "Weather Suggestions",
    descBn: "স্থানীয় আবহাওয়া পূর্বাভাস ও কৃষি-উপযোগী সতর্কতা দেখে সেচ, স্প্রে ও ফসল সুরক্ষার সিদ্ধান্ত নিন।",
    descEn: "View local forecasts and farm-friendly alerts to plan irrigation, spraying, and crop protection with confidence.",
    href: "/dashboard/weather",
    ctaBn: "আবহাওয়া দেখুন",
    ctaEn: "View Weather",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80",
    badgeBn: "তাৎক্ষণিক আপডেট",
    badgeEn: "Live Updates",
  },
];

export function FeatureDestinationsSection() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  return (
    <section id="explore-features" className="relative overflow-hidden bg-white py-16 dark:bg-[#050505] lg:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-500/5" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
              {t("আপনার প্রয়োজন অনুযায়ী সঠিক টুল বেছে নিন", "Choose the right tool for your farm")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0] sm:text-base">
              {t(
                "কৃষি প্রশিক্ষণ, ফসল ব্যবস্থাপনা, ইনপুট, ক্যালেন্ডার ও আবহাওয়া — প্রতিটি সেকশনে ট্যাপ করে সরাসরি সংশ্লিষ্ট পেজে যান। সুরক্ষিত ফিচারে প্রবেশ করতে লগইন প্রয়োজন হবে এবং সফল লগইনের পর আপনাকে অনুরোধকৃত পেজে ফিরিয়ে নেওয়া হবে।",
                "Jump straight into agriculture training, crop management, inputs, calendar, and weather. Tap any section to open it — protected features will ask you to log in and return you to the requested page."
              )}
            </p>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <RevealItem key={feature.key} className={idx === 0 ? "md:col-span-2 xl:col-span-2" : ""}>
              <Link
                href={feature.href}
                className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#222222] dark:bg-[#0f0f0f]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={t(feature.titleBn, feature.titleEn)}
                    fill
                    sizes={idx === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className={`object-cover transition duration-700 group-hover:scale-105 ${feature.image.endsWith('.svg') ? 'object-contain p-10 opacity-20 dark:opacity-10' : ''}`}
                    unoptimized={feature.image.startsWith('/')}
                  />
                  <div className={`absolute inset-0 ${feature.image.endsWith('.svg') ? 'bg-gradient-to-br from-white via-emerald-50/90 to-emerald-100/70 dark:from-[#0f0f0f] dark:via-[#0b1710]/95 dark:to-[#07140d]/90' : 'bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-slate-900/10 dark:from-black/85 dark:via-black/45 dark:to-black/20'}`} />
                </div>

                <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${feature.image.endsWith('.svg') ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white/90 text-emerald-700 shadow-lg backdrop-blur dark:bg-[#111111]/90 dark:text-emerald-400'}`}>
                      <Icon name={feature.icon} size={20} />
                    </div>
                    {feature.badgeEn && (
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${feature.image.endsWith('.svg') ? 'bg-white/80 text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20' : 'bg-white/15 text-white ring-1 ring-white/20 backdrop-blur'}`}>
                        {t(feature.badgeBn || "", feature.badgeEn)}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-16">
                    <h3 className={`text-xl font-extrabold tracking-tight sm:text-2xl ${feature.image.endsWith('.svg') ? 'text-slate-900 dark:text-[#f0f0f0]' : 'text-white'}`}>
                      {t(feature.titleBn, feature.titleEn)}
                    </h3>
                    <p className={`mt-2 max-w-xl text-sm leading-relaxed ${feature.image.endsWith('.svg') ? 'text-slate-600 dark:text-[#a0a0a0]' : 'text-slate-100/90'}`}>
                      {t(feature.descBn, feature.descEn)}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${feature.image.endsWith('.svg') ? 'bg-emerald-700 text-white group-hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:group-hover:bg-emerald-400' : 'bg-white text-slate-900 group-hover:bg-emerald-50'}`}>
                        {t(feature.ctaBn, feature.ctaEn)}
                        <Icon name={"ArrowRight" as IconName} size={15} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                      {!feature.external && (
                        <span className={`text-xs ${feature.image.endsWith('.svg') ? 'text-slate-500 dark:text-[#888888]' : 'text-white/80'}`}>
                          {t("লগইন প্রয়োজন হতে পারে", "Login may be required")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
