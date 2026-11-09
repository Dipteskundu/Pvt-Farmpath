"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  onPhotoSelect: (file: File) => void;
  onPhotoRemove: () => void;
  uploading?: boolean;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentPhoto,
  onPhotoSelect,
  onPhotoRemove,
  uploading = false,
}) => {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onPhotoSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const displayImage = preview || currentPhoto;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        {displayImage && (
          <div className="relative group">
            <img
              src={displayImage}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-[#333333]"
            />
            <button
              onClick={onPhotoRemove}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
              aria-label={t('profilePhotoRemove', 'Remove Photo')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
              : "border-slate-300 dark:border-[#333333] hover:border-emerald-400 dark:hover:border-emerald-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full" />
              <p className="mt-2 text-sm text-slate-600 dark:text-[#999999]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {displayImage ? (
                <ImageIcon className="w-8 h-8 text-slate-400 dark:text-[#666666]" />
              ) : (
                <Upload className="w-8 h-8 text-slate-400 dark:text-[#666666]" />
              )}
              <p className="mt-2 text-sm font-medium text-slate-700 dark:text-[#a0a0a0]">
                {t('profilePhotoDragDrop', 'Drag and drop or click to upload')}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-[#666666]">
                {t('profilePhotoFormats', 'JPG, PNG or WebP. Max 5MB')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
