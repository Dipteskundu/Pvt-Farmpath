"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem, EASE } from "@/components/motion";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = useCallback((bn: string, en: string) => (language === "bn" ? bn : en), [language]);

  const helpItems = [
    {
      icon: "Lightbulb" as IconName,
      title: t("স্মার্ট ফসল পরামর্শ", "Smart Crop Guidance"),
      desc: t("মাটি, মৌসুম ও এলাকার তথ্য অনুযায়ী সঠিক ফসল ও চাষ পরিকল্পনা করতে সাহায্য করি।", "We help you choose the right crops and plan cultivation based on soil, season, and location."),
    },
    {
      icon: "CloudSun" as IconName,
      title: t("আবহাওয়া ও সময়মতো সতর্কতা", "Weather & Timely Alerts"),
      desc: t("স্থানীয় আবহাওয়া পূর্বাভাস ও কৃষি-উপযোগী সতর্কতা দিয়ে ফসল সুরক্ষায় সহায়তা করি।", "Local forecasts and farm-ready alerts help you protect crops and act on time."),
    },
    {
      icon: "GraduationCap" as IconName,
      title: t("প্রশিক্ষণ ও জ্ঞান", "Training & Knowledge"),
      desc: t("সহজ ভাষায় কৃষি প্রশিক্ষণ, গাইড ও সেরা চাষাবাদ পদ্ধতি শেখার সুযোগ দিই।", "Access easy training, guides, and best practices to improve your farming skills."),
    },
    {
      icon: "TrendingUp" as IconName,
      title: t("বাজার ও আয়ের সুযোগ", "Market & Income Access"),
      desc: t("উৎপাদন থেকে বিক্রয় পর্যন্ত তথ্য ও সংযোগ দিয়ে ভালো আয়ের পথ তৈরি করি।", "From production to selling, we provide insights and connections for better income."),
    },
  ];

  const audiences = [
    {
      icon: "Sprout" as IconName,
      title: t("ক্ষুদ্র ও প্রান্তিক কৃষক", "Small & Marginal Farmers"),
      desc: t("যারা সহজ উপায়ে সঠিক পরামর্শ, পরিকল্পনা ও সহায়তা পেতে চান।", "Farmers seeking simple, reliable guidance, planning, and support."),
    },
    {
      icon: "Users" as IconName,
      title: t("কৃষি উদ্যোক্তা ও সংগঠক", "Agri-Entrepreneurs & Organizers"),
      desc: t("যারা কৃষি কার্যক্রম, উৎপাদন ও সরবরাহ ব্যবস্থাপনা উন্নত করতে চান।", "Those managing farming operations, production, and supply more efficiently."),
    },
    {
      icon: "Store" as IconName,
      title: t("ক্রেতা ও কৃষি অংশীদার", "Buyers & Agri Partners"),
      desc: t("যারা যাচাইকৃত উৎপাদক ও স্বচ্ছ কৃষি তথ্যের সাথে যুক্ত হতে চান।", "Partners looking to connect with verified producers and transparent farm data."),
    },
    {
      icon: "GraduationCap" as IconName,
      title: t("নতুন ও শিক্ষানবিশ কৃষক", "New & Aspiring Farmers"),
      desc: t("যারা আধুনিক কৃষি শিখতে এবং আত্মবিশ্বাসের সাথে শুরু করতে চান।", "Learners who want to start and grow with modern, practical farming knowledge."),
    },
  ];

  const whyItems = [
    {
      icon: "CheckCircle" as IconName,
      title: t("কৃষক-বান্ধব ও সহজ", "Farmer-Friendly & Simple"),
      desc: t("বাংলা ও ইংরেজি ভাষায় সহজ ইন্টারফেস, যাতে কম ডিজিটাল অভিজ্ঞতাতেও ব্যবহার করা যায়।", "Simple Bangla and English experience designed for easy use, even with low digital literacy."),
    },
    {
      icon: "Database" as IconName,
      title: t("বিশ্বস্ত তথ্যনির্ভর", "Trusted & Data-Driven"),
      desc: t("গবেষণা ও প্রাসঙ্গিক কৃষি তথ্যের ভিত্তিতে কার্যকর পরামর্শ প্রদান করি।", "Actionable guidance grounded in research and relevant agricultural information."),
    },
    {
      icon: "ShieldCheck" as IconName,
      title: t("স্বচ্ছ ও নিরাপদ", "Transparent & Secure"),
      desc: t("যাচাইকরণ, স্বচ্ছ প্রক্রিয়া ও নিরাপদ লেনদেনের ওপর গুরুত্ব দিয়ে প্ল্যাটফর্ম গড়েছি।", "Built around verification, transparent processes, and safer interactions."),
    },
  ];

  const fraudItems = [
    {
      icon: "BadgeCheck" as IconName,
      title: t("পরিচয় ও প্রোফাইল যাচাই", "Identity & Profile Verification"),
      desc: t("ব্যবহারকারী ও অংশীদারদের তথ্য যাচাই করে বিশ্বাসযোগ্য অংশগ্রহণ নিশ্চিত করি।", "We verify users and partners to encourage trustworthy participation."),
    },
    {
      icon: "ClipboardCheck" as IconName,
      title: t("পণ্য ও মান যাচাই", "Product & Quality Checks"),
      desc: t("তালিকাভুক্ত পণ্য ও লটভিত্তিক যাচাইয়ের মাধ্যমে ভুল তথ্য ও প্রতারণার ঝুঁকি কমাই।", "Listing reviews and lot-based checks help reduce misinformation and fraud risk."),
    },
    {
      icon: "Eye" as IconName,
      title: t("কার্যক্রম পর্যবেক্ষণ", "Activity Monitoring"),
      desc: t("সন্দেহজনক আচরণ শনাক্ত করতে সিস্টেমে নজরদারি ও নিয়ম প্রয়োগ করি।", "We monitor activity and enforce rules to detect and limit suspicious behavior."),
    },
    {
      icon: "AlertTriangle" as IconName,
      title: t("রিপোর্ট ও দ্রুত ব্যবস্থা", "Reporting & Rapid Action"),
      desc: t("ব্যবহারকারীরা সহজে রিপোর্ট করতে পারেন এবং প্রয়োজনীয় পদক্ষেপ নেওয়া হয়।", "Users can report concerns easily so issues can be reviewed and acted on quickly."),
    },
  ];

  const futureItems = [
    {
      icon: "BrainCircuit" as IconName,
      title: t("উন্নত AI সহায়তা", "Advanced AI Assistance"),
      desc: t("আরও ব্যক্তিগতকৃত কৃষি পরামর্শ ও স্মার্ট সিদ্ধান্ত সহায়তা নিয়ে কাজ করছি।", "Expanding toward more personalized advisory and smarter decision support."),
    },
    {
      icon: "MapPin" as IconName,
      title: t("আরও বিস্তৃত কভারেজ", "Wider Coverage"),
      desc: t("আরও অঞ্চল, ফসল ও কৃষক সম্প্রদায়ের কাছে সেবা পৌঁছে দেওয়ার পরিকল্পনা রয়েছে।", "Plans to reach more regions, crops, and farming communities."),
    },
    {
      icon: "BarChart3" as IconName,
      title: t("উন্নত অন্তর্দৃষ্টি ও বিশ্লেষণ", "Deeper Insights & Analytics"),
      desc: t("উৎপাদন, খরচ ও বাজার বিশ্লেষণে আরও শক্তিশালী টুল যুক্ত করা হবে।", "Building stronger tools for production, cost, and market insights."),
    },
  ];

  const recSources = [
    {
      icon: "CloudSun" as IconName,
      title: t("আবহাওয়া ও মৌসুম তথ্য", "Weather & Seasonal Data"),
      desc: t("স্থানীয় আবহাওয়া ধারা ও মৌসুমী তথ্য বিবেচনা করে সুপারিশ তৈরি হয়।", "Recommendations consider local weather patterns and seasonal conditions."),
    },
    {
      icon: "Sprout" as IconName,
      title: t("মাটি ও জমির তথ্য", "Soil & Land Information"),
      desc: t("মাটির ধরন, উর্বরতা ও জমির বৈশিষ্ট্য ফসল নির্বাচনে সহায়তা করে।", "Soil type, fertility, and land characteristics help guide crop choices."),
    },
    {
      icon: "Database" as IconName,
      title: t("কৃষি গবেষণা ও জ্ঞানভান্ডার", "Agricultural Research & Knowledge"),
      desc: t("BARI, BRRI ও SRDI-সহ বিশ্বস্ত কৃষি গবেষণা ও নির্দেশিকা থেকে তথ্য নেওয়া হয়।", "Insights draw from trusted agricultural research and guidance, including BARI, BRRI, and SRDI."),
    },
    {
      icon: "MapPin" as IconName,
      title: t("এলাকা ও প্রেক্ষাপট", "Region & Local Context"),
      desc: t("আপনার অবস্থান ও স্থানীয় চাষাবাদের প্রেক্ষাপটের সাথে মিলিয়ে পরামর্শ দেওয়া হয়।", "Suggestions are aligned with your location and local farming context."),
    },
  ];

  return (
    <div className="flex flex-col bg-white dark:bg-[#050505]">
      {/* ─── Hero (unchanged) ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0.15} y={18}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-[#f0f0f0] leading-[1.08]">
                {t("আমরা তৈরি করছি", "We're building the future of")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-emerald-600 dark:text-emerald-400">{t("বাংলাদেশের কৃষির ভবিষ্যৎ", "Bangladeshi agriculture")}</span>
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                    className="absolute bottom-1 left-0 w-full h-3 bg-emerald-100 dark:bg-emerald-500/15 -z-0 rounded origin-left"
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.3} y={18}>
              <p className="mt-6 text-base text-slate-500 dark:text-[#a0a0a0] leading-relaxed max-w-xl mx-auto">
                {t("AgriNova ৬০ লক্ষ কৃষককে নির্ভুল সরকারি পরামর্শ, যাচাইকৃত বাজার ও তাৎক্ষণিক এসক্রো-সুরক্ষিত পেমেন্টের সাথে সংযুক্ত করে — সবকিছু বাংলা ও ইংরেজিতে।", "AgriNova connects 6 million farmers to precision government advisory, verified marketplaces, and instant escrow-protected payments — all in Bangla and English.")}
              </p>
            </Reveal>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #059669 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
      </section>

      {/* ─── How we will help farmers ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Icon name="HeartHandshake" size={14} />
                  <span>{t("আমাদের সহায়তা", "How we help")}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                  {t("কীভাবে আমরা কৃষকদের সাহায্য করি", "How we will help farmers")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                  {t(
                    "পরিকল্পনা থেকে ফলন ও বিক্রয় পর্যন্ত—FarmPath কৃষকদের সঠিক তথ্য, ব্যবহারিক পরামর্শ এবং প্রয়োজনীয় টুল দিয়ে প্রতিটি ধাপে সহায়তা করে।",
                    "From planning to harvest and selling, FarmPath supports farmers at every step with the right information, practical guidance, and essential tools."
                  )}
                </p>
              </Reveal>
              <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2">
                {helpItems.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="h-full rounded-2xl border border-slate-200/80 bg-slate-50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={0.1} y={24}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                    <Image
                      src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80"
                      alt={t("ক্ষেতে কাজ করা কৃষক", "Farmer working in the field")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-6">
                    <p className="text-sm font-medium text-white/95">
                      {t("কৃষকের প্রয়োজন বুঝে গড়া সমাধান", "Solutions built around farmers' real needs")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who can use our application ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-100 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <Reveal delay={0.05} y={24}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                    <Image
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80"
                      alt={t("বিভিন্ন কৃষক ও অংশীদার", "Farmers and agricultural partners")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Icon name="Users" size={14} />
                  <span>{t("আমাদের ব্যবহারকারী", "Who can use FarmPath")}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                  {t("কারা আমাদের অ্যাপ ব্যবহার করতে পারবেন", "Who can use our application")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                  {t(
                    "FarmPath কৃষি-সম্পর্কিত সকলের জন্য—যারা শিখতে, উৎপাদন করতে, পরিচালনা করতে বা কৃষিপণ্যের সাথে যুক্ত হতে চান।",
                    "FarmPath is for everyone in the agricultural journey—those who want to learn, produce, manage, or connect through agriculture."
                  )}
                </p>
              </Reveal>
              <RevealStagger className="mt-8 space-y-4">
                {audiences.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-300 hover:border-emerald-200 hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0] sm:text-base">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why FarmPath ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Icon name="Sparkles" size={14} />
                <span>{t("কেন FarmPath", "Why FarmPath")}</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                {t("কেন FarmPath বেছে নেবেন", "Why choose FarmPath")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                {t(
                  "আমরা কৃষির বাস্তব চ্যালেঞ্জ বুঝে এমন একটি প্ল্যাটফর্ম তৈরি করছি যা সহজ, নির্ভরযোগ্য এবং ফলাফলমুখী।",
                  "We understand real farming challenges and build a platform that is simple, reliable, and focused on outcomes."
                )}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal delay={0.05} y={24}>
                <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                    alt={t("সবুজ কৃষি জমি", "Lush green farmland")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-lg font-bold text-white sm:text-xl">
                      {t("বিশ্বাস, সহজতা ও প্রযুক্তির সমন্বয়", "A blend of trust, simplicity, and technology")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <RevealStagger className="grid h-full gap-4 sm:grid-rows-3">
                {whyItems.map((item, idx) => (
                  <RevealItem key={item.title}>
                    <div className="flex h-full gap-5 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20 dark:hover:bg-[#111111]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                          {t(`কারণ ${idx + 1}`, `Reason ${idx + 1}`)}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-[#f0f0f0] sm:text-lg">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How we handle fraud ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-100 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Icon name="ShieldCheck" size={14} />
                  <span>{t("বিশ্বাস ও নিরাপত্তা", "Trust & safety")}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                  {t("কীভাবে আমরা প্রতারণা প্রতিরোধ করি", "How we handle fraud")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                  {t(
                    "ব্যবহারকারীদের নিরাপদ অভিজ্ঞতা দিতে আমরা যাচাই, পর্যবেক্ষণ এবং স্বচ্ছ নিয়মের মাধ্যমে প্রতারণা ও অপব্যবহার কমাতে কাজ করি।",
                    "To keep users safe, we work to reduce fraud and misuse through verification, monitoring, and clear, transparent rules."
                  )}
                </p>
              </Reveal>
              <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2">
                {fraudItems.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={0.1} y={24}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                    <Image
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80"
                      alt={t("নিরাপদ ও স্বচ্ছ প্রক্রিয়া", "Secure and transparent process")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-6">
                    <p className="text-sm font-medium text-white/95">
                      {t("প্রতিটি ধাপে স্বচ্ছতা ও জবাবদিহিতা", "Transparency and accountability at every step")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Future plan ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <Reveal delay={0.05} y={24}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                    <Image
                      src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1400&q=80"
                      alt={t("কৃষিতে প্রযুক্তির ভবিষ্যৎ", "Future of technology in agriculture")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Icon name="Rocket" size={14} />
                  <span>{t("ভবিষ্যৎ পরিকল্পনা", "Future plan")}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                  {t("আমাদের অ্যাপ্লিকেশনের ভবিষ্যৎ পরিকল্পনা", "Future plan of our application")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                  {t(
                    "কৃষকদের চাহিদা ও প্রযুক্তির অগ্রগতির সাথে তাল মিলিয়ে FarmPath-কে আরও কার্যকর, সহজলভ্য ও প্রভাবশালী করে তুলতে আমরা প্রতিনিয়ত কাজ করছি।",
                    "We continue to evolve FarmPath—making it more capable, accessible, and impactful as farmer needs and technology grow."
                  )}
                </p>
              </Reveal>
              <RevealStagger className="mt-8 space-y-4">
                {futureItems.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 transition duration-300 hover:border-emerald-200 hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0] sm:text-base">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Where crop recommendation is coming from ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal delay={0.05} y={24}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 dark:border-[#222222]">
                  <div className="relative aspect-[4/3] lg:aspect-[4/5]">
                    <Image
                      src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80"
                      alt={t("মাটি ও ফসল গবেষণা", "Soil and crop research")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-6">
                    <p className="text-sm font-medium text-white/95">
                      {t("বিজ্ঞান ও স্থানীয় তথ্যের সমন্বয়ে সুপারিশ", "Recommendations shaped by science and local context")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Icon name="Sprout" size={14} />
                  <span>{t("ফসল সুপারিশের উৎস", "Crop recommendation source")}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#f0f0f0] sm:text-4xl">
                  {t("ফসল সুপারিশ কোথা থেকে আসে", "Where our crop recommendations come from")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
                  {t(
                    "আমাদের ফসল সুপারিশ স্থানীয় বাস্তবতা ও বিশ্বস্ত কৃষি জ্ঞানের সমন্বয়ে তৈরি—যাতে কৃষকরা তাদের জমি ও পরিস্থিতির জন্য উপযুক্ত সিদ্ধান্ত নিতে পারেন।",
                    "Our crop recommendations combine local realities with trusted agricultural knowledge—helping farmers make choices suited to their land and conditions."
                  )}
                </p>
              </Reveal>
              <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2">
                {recSources.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-[#222222] dark:bg-[#0f0f0f] dark:hover:border-emerald-500/20">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">{item.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/dashboard/crops/recommend"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
                  >
                    {t("ফসল সুপারিশ দেখুন", "Explore Crop Recommendations")}
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                  <span className="text-xs text-slate-500 dark:text-[#888888]">
                    {t("ব্যবহার করতে সাইন ইন প্রয়োজন হতে পারে", "Sign in may be required to access")}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
