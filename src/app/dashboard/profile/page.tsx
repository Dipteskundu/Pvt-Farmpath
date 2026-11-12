"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Calendar, MapPin, Award, Building2 } from "lucide-react";
import { PortalGate } from "@/features/layout/PortalGate";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileCard, ProfileField } from "@/components/profile/ProfileCard";
import { ProfileStatCard } from "@/components/profile/ProfileStatCard";
import { getUserProfile, ProfileResponse } from "@/services/user.service";
import { Reveal } from "@/components/motion";

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch {
        // Loading state clears below; the empty profile renders its own state.
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handlePhotoChange = () => {
    router.push("/dashboard/profile/edit");
  };

  const handleEditProfile = () => {
    router.push("/dashboard/profile/edit");
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const displayUser = profileData?.user ?? {
    ...user,
    phone: "",
    accountStatus: "Active",
    registeredAt: "",
    lastLoginAt: "",
  };
  const extendedProfile = profileData?.extendedProfile;
  const activityStats = profileData?.activityStats;

  const canEdit = user?.roles?.includes("farmer") || user?.roles?.includes("buyer") || user?.roles?.includes("supplier");

  return (
    <PortalGate
      allow={["farmer", "buyer", "supplier", "inspector", "logistics", "support", "admin"]}
      moduleLabel="Profile"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Reveal y={12}>
        <ProfileHero
          name={displayUser.name}
          email={displayUser.email}
          avatarUrl={displayUser.profileImage}
          roles={displayUser.roles}
          onPhotoChange={canEdit ? handlePhotoChange : undefined}
        />
        </Reveal>

        {canEdit && (
          <Reveal delay={0.06} y={10}>
          <div className="flex gap-3">
            <Button
              onClick={handleEditProfile}
              variant="primary"
              size="md"
            >
              {t('profileEditButton', 'Edit Profile')}
            </Button>
          </div>
          </Reveal>
        )}

        <Reveal delay={0.1} y={12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard title={t('profileBasicInfo', 'Basic Information')} icon={User}>
            <div className="space-y-1">
              <ProfileField
                label={t('fullName', 'Full Name')}
                value={displayUser.name}
              />
              <ProfileField
                label={t('email', 'Email')}
                value={displayUser.email}
              />
              <ProfileField
                label={t('phoneNumber', 'Phone Number')}
                value={displayUser.phone}
              />
            </div>
          </ProfileCard>

          <ProfileCard title={t('profileAccountDetails', 'Account Details')} icon={Shield}>
            <div className="space-y-1">
              <div className="py-2">
                <label className="block text-[10px] font-semibold text-slate-500 dark:text-[#666666] uppercase tracking-wider mb-1">
                  {t('role', 'Role')}
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {displayUser.roles.map((role) => (
                    <Badge key={role} variant="success" size="sm">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <ProfileField
                label={t('accountStatus', 'Account Status')}
                value={displayUser.accountStatus || "Active"}
              />
              <ProfileField
                label={t('profileMemberSince', 'Member Since')}
                value={displayUser.registeredAt ? new Date(displayUser.registeredAt).toLocaleDateString() : "N/A"}
              />
              <ProfileField
                label={t('profileLastLogin', 'Last Login')}
                value={displayUser.lastLoginAt ? new Date(displayUser.lastLoginAt).toLocaleDateString() : "N/A"}
              />
            </div>
          </ProfileCard>
        </div>
        </Reveal>

        {activityStats && (user.roles.includes("farmer") || user.roles.includes("buyer")) && (
          <Reveal delay={0.14} y={12}>
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-[#666666] uppercase tracking-wider mb-4">
              {t('profileActivityStats', 'Activity Overview')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ProfileStatCard
                title={t('profileTotalFarms', 'Total Farms')}
                value={activityStats.totalFarms}
                icon={Building2}
              />
              <ProfileStatCard
                title={t('profileActiveCrops', 'Active Crops')}
                value={activityStats.activeCrops}
                icon={Award}
              />
              <ProfileStatCard
                title={t('profileTotalAcreage', 'Total Acreage')}
                value={activityStats.totalAcreage}
                icon={MapPin}
                subtitle="acres"
              />
              <ProfileStatCard
                title={t('profileHarvestRecords', 'Harvest Records')}
                value={activityStats.harvestRecords}
                icon={Calendar}
              />
            </div>
          </div>
          </Reveal>
        )}

        {extendedProfile && (
          <Reveal delay={0.18} y={12}>
          <ProfileCard title={t('profileExtendedInfo', 'Extended Profile')} icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="space-y-1">
                <ProfileField
                  label={t('profileNationalId', 'National ID')}
                  value={extendedProfile.nationalId}
                />
                <ProfileField
                  label={t('profileFarmingExperience', 'Farming Experience')}
                  value={extendedProfile.farmingExperienceYears ? `${extendedProfile.farmingExperienceYears} ${t('profileYears', 'years')}` : null}
                />
                {extendedProfile.primaryLocation && (
                  <ProfileField
                    label={t('profileLocation', 'Location')}
                    value={`${extendedProfile.primaryLocation.upazila}, ${extendedProfile.primaryLocation.district}`}
                  />
                )}
              </div>

              {extendedProfile.bankDetails && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-slate-500 dark:text-[#666666] uppercase tracking-wider mb-1">
                    {t('profileBankDetails', 'Bank Details')}
                  </label>
                  <p className="text-sm font-medium text-slate-800 dark:text-[#e0e0e0]">
                    {extendedProfile.bankDetails.bankName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#666666]">
                    ****{extendedProfile.bankDetails.accountNumber.slice(-4)}
                  </p>
                </div>
              )}

              {extendedProfile.certifications && extendedProfile.certifications.length > 0 && (
                <div className="md:col-span-2 py-2">
                  <label className="block text-[10px] font-semibold text-slate-500 dark:text-[#666666] uppercase tracking-wider mb-2">
                    {t('profileCertifications', 'Certifications')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {extendedProfile.certifications.map((cert, idx) => (
                      <Badge key={idx} variant={cert.verified ? "success" : "warning"} size="sm">
                        {cert.name}
                        {cert.verified && ` • ${t('profileVerified', 'Verified')}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ProfileCard>
          </Reveal>
        )}
      </div>
    </PortalGate>
  );
}
