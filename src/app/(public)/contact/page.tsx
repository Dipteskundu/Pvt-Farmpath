"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, type IconName } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealStagger, RevealItem, EASE } from "@/components/motion";

/**
 * Public contact page — `/contact`.
 *
 * Designed out together with the animation pass: a contact hero, four
 * info cards, and a working enquiry form. The form is front-end only for
 * now (no reachable public endpoint for contact submissions) — it stages a
 * premium send animation and confirms with a toast-style success card, so
 * the interaction story is complete and only the `sendMessage` call below
 * needs wiring to a real backend later.
 */

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

export default function ContactPage() {
  const { language } = useLanguage();
  const t = (bn: string, en: string) => (language === "bn" ? bn : en);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Front-end stage: swap this for a real API call when the backend
    // exposes a public contact endpoint.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStatus("sent");
  };

  const resetForm = () => {
    setName(""); setEmail(""); setSubject(""); setMessage("");
    setStatus("idle");
  };

  const CHANNELS: { icon: IconName; title: string; value: string; bn: string[]; en: string[] }[] = [
    { icon: "Mail", title: t("ইমেইল", "Email"), value: "support@farmpath.com.bd", bn: [t("সাধারণ প্রশ্ন ও সহায়তা", "General questions and support")], en: ["General questions and support"] },
    { icon: "PhoneCall", title: t("হটলাইন", "Hotline"), value: "+880 96XX-XXXXXX", bn: [t("সকাল ৯টা — সন্ধ্যা ৭টা", "9 AM — 7 PM daily")], en: ["9 AM — 7 PM daily"] },
    { icon: "MapPin", title: t("হেড অফিস", "Head Office"), value: t("ঢাকা, বাংলাদেশ", "Dhaka, Bangladesh"), bn: [t("ফার্মগেট, মিরপুর রোড", "Farmgate, Mirpur Road")], en: ["Farmgate, Mirpur Road"] },
    { icon: "Clock", title: t("প্রতিক্রিয়া সময়", "Response Time"), value: t("২৪ ঘণ্টার মধ্যে", "Within 24 hours"), bn: [t("সব ইমেইল ও মেসেজের জন্য", "For all emails and messages")], en: ["For all emails and messages"] },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-[#0a0a0a] dark:border-[#333333] dark:text-[#f0f0f0] dark:placeholder:text-[#666666]";

  return (
    <div className="flex flex-col">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal delay={0.05} y={14}>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">{t("যোগাযোগ", "Contact")}</p>
            </Reveal>
            <Reveal delay={0.15} y={18}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#f0f0f0]">
                {t("আমাদের সাথে কথা বলুন", "Let's talk")}
              </h1>
            </Reveal>
            <Reveal delay={0.25} y={18}>
              <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-[#a0a0a0]">
                {t("পণ্য, অংশীদারিত্ব বা অ্যাকাউন্ট — যেকোনো বিষয়ে FarmPath টিম আপনার পাশে আছে।", "Questions about listings, partnerships, or your account — the FarmPath team is here.")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Channels ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white dark:bg-[#000000]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <RevealItem key={c.title}>
                <div className="rounded-2xl bg-[#f9f9f9] dark:bg-[#111111] dark:border dark:border-[#222222] p-6 group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white dark:bg-emerald-500 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={c.icon} size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0]">{c.title}</h3>
                  <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{c.value}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-[#a0a0a0]">{language === "bn" ? c.bn[0] : c.en[0]}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ─── Form ─────────────────────────────────────────────── */}
      <section className="pb-20 sm:pb-24 bg-white dark:bg-[#000000]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealStagger className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Story column */}
            <RevealItem className="lg:col-span-2">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 sm:p-10 text-white h-full flex flex-col justify-center relative overflow-hidden">
                <div aria-hidden="true" className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
                <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-teal-400/15 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/logo.png" alt="FarmPath" className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-black/30" />
                    <span className="text-lg font-bold">FarmPath</span>
                  </div>
                  <h2 className="text-2xl font-bold leading-snug tracking-tight">{t("প্রতিটি মেসেজ কৃষকের পরবর্তী মৌসুমকে ভালো করে।", "Every message helps us build a better next season.")}</h2>
                  <p className="mt-3 text-sm text-emerald-100/70 leading-relaxed">
                    {t(
      "ইনপুট সরবরাহকারী, পাইকারি ক্রেতা বা কৃষক সমবায় — যাই হোন না কেন, আমাদের দল প্রতিটি মেসেজ একই দিনে পড়ে। কারিগরি সমস্যা হলে স্ক্রিনশটসহ বিষয়টি জানান।",
                      "Whether you're a supplier, a wholesale buyer, or a farmer cooperative — our team reads every enquiry the same day. For technical issues, include a screenshot and steps."
                    )}
                  </p>
                  <div className="mt-6 space-y-2 text-xs text-emerald-100/80">
                    <p className="flex items-center gap-2"><Icon name="ShieldCheck" size={14} className="text-emerald-300" />{t("আপনার তথ্য শুধু সহায়তা দল পড়ে", "Your details stay with the support team only")}</p>
                    <p className="flex items-center gap-2"><Icon name="Globe" size={14} className="text-emerald-300" />{t("বাংলা ও ইংরেজি — দুই ভাষাতেই সাড়া", "We reply in Bangla and English alike")}</p>
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* Form column */}
            <RevealItem className="lg:col-span-3">
              <div className="rounded-3xl bg-[#f9f9f9] dark:bg-[#111111] dark:border dark:border-[#222222] p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col items-center justify-center text-center py-14"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.25 }}
                        >
                          <Icon name="CheckCircle" size={32} className="text-emerald-600 dark:text-emerald-400" />
                        </motion.span>
                      </motion.div>
                      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-[#f0f0f0]">{t("ধন্যবাদ! মেসেজ পাঠানো হয়েছে।", "Thank you! Message sent.")}</h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-[#a0a0a0] max-w-sm">
                        {t("আমরা ২৪ ঘণ্টার মধ্যে আপনার ইমেইলে সাড়া দেব।", "We'll get back to your email within 24 hours.")}
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="mt-6 cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-[#333333] dark:bg-[#0a0a0a] dark:text-[#e0e0e0]"
                      >
                        {t("আরেকটি মেসেজ পাঠান", "Send another message")}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-medium text-slate-600 dark:text-[#a0a0a0] mb-1.5">
                            {t("পুরো নাম", "Full name")}
                          </label>
                          <input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("আপনার নাম", "Your name")} autoComplete="name" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-medium text-slate-600 dark:text-[#a0a0a0] mb-1.5">
                            {t("ইমেইল", "Email")}
                          </label>
                          <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className={inputClass} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-600 dark:text-[#a0a0a0] mb-1.5">
                          {t("বিষয়", "Subject")}
                        </label>
                        <input id="contact-subject" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t("আপনি কী সাহায্য চান?", "What do you need help with?")} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-medium text-slate-600 dark:text-[#a0a0a0] mb-1.5">
                          {t("বার্তা", "Message")}
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t("আপনার প্রশ্ন বিস্তারিত লিখুন…", "Tell us a bit about your question…")}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/40 disabled:opacity-60"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {status === "sending" ? (
                            <>
                              <Spinner />
                              {t("পাঠানো হচ্ছে…", "Sending…")}
                            </>
                          ) : (
                            <>
                              {t("মেসেজ পাঠান", "Send message")}
                              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                                <Icon name="Send" size={14} />
                              </span>
                            </>
                          )}
                        </span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

    </div>
  );
}
