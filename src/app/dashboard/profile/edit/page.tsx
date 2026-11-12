"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, MapPin } from "lucide-react";
import { PortalGate } from "@/features/layout/PortalGate";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfilePhotoUpload } from "@/components/profile/ProfilePhotoUpload";
import { getUserProfile, updateUserProfile, ProfileResponse, type ProfileUpdateData } from "@/services/user.service";
import { uploadFile } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";

export default function ProfileEditPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    nationalId: "",
    farmingExperienceYears: "",
    division: "",
    district: "",
    upazila: "",
    village: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    routingNumber: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setProfileData(data);

        const extended = data.extendedProfile;
        const location = extended?.primaryLocation;
        const bank = extended?.bankDetails;

        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          nationalId: extended?.nationalId || "",
          farmingExperienceYears: extended?.farmingExperienceYears?.toString() || "",
          division: location?.division || "",
          district: location?.district || "",
          upazila: location?.upazila || "",
          village: location?.village || "",
          accountName: bank?.accountName || "",
          accountNumber: bank?.accountNumber || "",
          bankName: bank?.bankName || "",
          branchName: bank?.branchName || "",
          routingNumber: bank?.routingNumber || "",
        });
      } catch {
        // The toast/redirect UX reports the failure; nothing to log.
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoSelect = (file: File) => {
    setPhotoFile(file);
  };

  const handlePhotoRemove = () => {
    setPhotoFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let photoUrl = profileData?.user.profileImage;

      if (photoFile) {
        setUploadingPhoto(true);
        try {
          const result = await uploadFile<{ avatarUrl: string }>(
            "/user/profile/photo",
            photoFile,
            "photo"
          );
          photoUrl = result.avatarUrl;
        } catch {
          showToast("error", t('profilePhotoUploadError', 'Failed to upload photo'));
        } finally {
          setUploadingPhoto(false);
        }
      }

      const updateData: ProfileUpdateData = {
        name: formData.name,
        phone: formData.phone,
        nationalId: formData.nationalId,
        farmingExperienceYears: formData.farmingExperienceYears ? parseInt(formData.farmingExperienceYears, 10) : undefined,
        primaryLocation: {
          division: formData.division,
          district: formData.district,
          upazila: formData.upazila,
          village: formData.village,
        },
        bankDetails: {
          accountName: formData.accountName,
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          branchName: formData.branchName,
          routingNumber: formData.routingNumber,
        },
      };

      if (photoUrl) {
        updateData.avatarUrl = photoUrl;
      }

      const result = await updateUserProfile(updateData);
      setProfileData(result);
      showToast("success", t('profileSaveSuccess', 'Profile updated successfully'));
    } catch {
      showToast("error", t('profileSaveError', 'Failed to update profile'));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const displayUser = profileData?.user || user;

  return (
    <PortalGate
      allow={["farmer", "buyer", "supplier", "inspector", "logistics", "support", "admin"]}
      moduleLabel="Edit Profile"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-[#f0f0f0]">
            {t('profileEditTitle', 'Edit Profile')}
          </h2>
          <Button variant="ghost" onClick={() => router.push("/dashboard/profile")}>
            {t('profileCancel', 'Cancel')}
          </Button>
        </div>

        <ProfileHero
          name={displayUser.name}
          email={displayUser.email}
          avatarUrl={displayUser.profileImage}
          roles={displayUser.roles}
          onPhotoChange={() => {}}
        />

        <ProfileCard title={t('profilePhotoUpload', 'Profile Photo')} icon={User}>
          <ProfilePhotoUpload
            currentPhoto={displayUser.profileImage}
            onPhotoSelect={handlePhotoSelect}
            onPhotoRemove={handlePhotoRemove}
            uploading={uploadingPhoto}
          />
        </ProfileCard>

        <form onSubmit={handleSubmit}>
          <ProfileCard title={t('profileBasicInfo', 'Basic Information')} icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="name"
                label={t('fullName', 'Full Name')}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
              <FormInput
                id="email"
                label={t('email', 'Email')}
                value={displayUser.email}
                disabled
              />
              <FormInput
                id="phone"
                label={t('phoneNumber', 'Phone Number')}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                type="tel"
              />
            </div>
          </ProfileCard>

          <ProfileCard title={t('profileExtendedInfo', 'Extended Profile')} icon={User}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="nationalId"
                  label={t('profileNationalId', 'National ID')}
                  value={formData.nationalId}
                  onChange={(e) => handleChange("nationalId", e.target.value)}
                />
                <FormInput
                  id="farmingExperience"
                  label={t('profileFarmingExperience', 'Farming Experience')}
                  value={formData.farmingExperienceYears}
                  onChange={(e) => handleChange("farmingExperienceYears", e.target.value)}
                  type="number"
                  placeholder={t('profileYears', 'years')}
                />
              </div>

              <div className="border-t border-slate-100 dark:border-[#1a1a1a] pt-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-[#f0f0f0] mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {t('profileLocation', 'Location')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormInput
                    id="division"
                    label="Division"
                    value={formData.division}
                    onChange={(e) => handleChange("division", e.target.value)}
                  />
                  <FormInput
                    id="district"
                    label="District"
                    value={formData.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                  />
                  <FormInput
                    id="upazila"
                    label="Upazila"
                    value={formData.upazila}
                    onChange={(e) => handleChange("upazila", e.target.value)}
                  />
                  <FormInput
                    id="village"
                    label="Village"
                    value={formData.village}
                    onChange={(e) => handleChange("village", e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-[#1a1a1a] pt-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-[#f0f0f0] mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  {t('profileBankDetails', 'Bank Details')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    id="accountName"
                    label={t('profileBankDetails', 'Account Name')}
                    value={formData.accountName}
                    onChange={(e) => handleChange("accountName", e.target.value)}
                  />
                  <FormInput
                    id="accountNumber"
                    label="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                  />
                  <FormInput
                    id="bankName"
                    label="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                  />
                  <FormInput
                    id="branchName"
                    label="Branch Name"
                    value={formData.branchName}
                    onChange={(e) => handleChange("branchName", e.target.value)}
                  />
                  <FormInput
                    id="routingNumber"
                    label="Routing Number"
                    value={formData.routingNumber}
                    onChange={(e) => handleChange("routingNumber", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </ProfileCard>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/profile")}
              className="flex-1"
            >
              {t('profileCancel', 'Cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={saving || uploadingPhoto}
            >
              {t('profileSaveChanges', 'Save Changes')}
            </Button>
          </div>
        </form>
      </div>

    </PortalGate>
  );
}
