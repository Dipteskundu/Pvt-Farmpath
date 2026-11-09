"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
}

export const ProfileStatCard: React.FC<ProfileStatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
}) => {
  useLanguage();

  return (
    <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-slate-200/80 dark:border-[#222222] p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 dark:text-[#666666] uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-[#f0f0f0]">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400 dark:text-[#888888]">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
