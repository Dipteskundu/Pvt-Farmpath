"use client";

import React from "react";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileHeroProps {
  name: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  onPhotoChange?: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  name,
  email,
  avatarUrl,
  roles,
  onPhotoChange,
}) => {
  const { t } = useLanguage();

  const getRoleBadgeVariant = (role: string): "success" | "info" | "warning" | "purple" | "neutral" | "danger" => {
    const variants: Record<string, "success" | "info" | "warning" | "purple" | "neutral" | "danger"> = {
      farmer: "success",
      buyer: "info",
      supplier: "warning",
      inspector: "purple",
      logistics: "info",
      support: "warning",
      admin: "danger",
    };
    return variants[role] || "neutral";
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-emerald-900 py-16 px-8 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="relative flex flex-col items-center">
        <div className="relative group">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl flex items-center justify-center text-5xl font-bold text-white">
              {initials}
            </div>
          )}
          
          {onPhotoChange && (
            <button
              onClick={onPhotoChange}
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              aria-label={t('profileChangePhoto', 'Change Photo')}
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">{name}</h1>
        <p className="mt-2 text-emerald-100 text-sm">{email}</p>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {roles.map((role) => (
            <Badge key={role} variant={getRoleBadgeVariant(role)} size="md">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
