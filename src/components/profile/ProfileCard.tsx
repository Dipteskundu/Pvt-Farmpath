"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  icon: Icon,
  children,
  className = "",
}) => {
  useLanguage();

  return (
    <div className={`bg-white dark:bg-[#0a0a0a] rounded-xl border border-slate-200/80 dark:border-[#222222] shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-[#1a1a1a]">
          {Icon && <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f0f0f0]">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

interface ProfileFieldProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  className = "",
}) => {
  useLanguage();

  return (
    <div className={`py-2 ${className}`}>
      <label className="block text-[10px] font-semibold text-slate-500 dark:text-[#666666] uppercase tracking-wider mb-1">
        {label}
      </label>
      <p className="text-sm font-medium text-slate-800 dark:text-[#e0e0e0]">
        {value || "-"}
      </p>
    </div>
  );
};
