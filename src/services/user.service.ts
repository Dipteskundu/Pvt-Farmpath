import { api, uploadFile } from "@/lib/api";

export interface ProfileUpdateData {
  avatarUrl?: string;
  name?: string;
  phone?: string;
  nationalId?: string;
  dateOfBirth?: string;
  farmingExperienceYears?: number;
  primaryLocation?: {
    division: string;
    district: string;
    upazila: string;
    village: string;
  };
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    routingNumber: string;
  };
}

export interface ProfileActivityStats {
  totalFarms: number;
  activeCrops: number;
  totalAcreage: number;
  harvestRecords: number;
}

export interface ProfileResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    roles: string[];
    profileImage?: string;
    accountStatus?: string;
    registeredAt?: string;
    lastLoginAt?: string;
  };
  extendedProfile?: {
    nationalId?: string;
    dateOfBirth?: string;
    farmingExperienceYears?: number;
    primaryLocation?: {
      division: string;
      district: string;
      upazila: string;
      village: string;
    };
    bankDetails?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      branchName: string;
      routingNumber: string;
    };
    certifications?: Array<{
      name: string;
      issuingAuthority: string;
      issuedYear: number;
      verified: boolean;
    }>;
    totalAcreage?: number;
    registeredSince?: string;
  };
  activityStats?: ProfileActivityStats;
}

export async function getUserProfile(): Promise<ProfileResponse> {
  return api.get<ProfileResponse>("/user/profile");
}

export async function updateUserProfile(data: ProfileUpdateData): Promise<ProfileResponse> {
  return api.put<ProfileResponse>("/user/profile", data);
}

export async function uploadProfilePhoto(file: File): Promise<{ avatarUrl: string }> {
  return uploadFile<{ avatarUrl: string }>("/user/profile/photo", file, "photo");
}

export async function removeProfilePhoto(): Promise<{ success: boolean }> {
  return api.delete<{ success: boolean }>("/user/profile/photo");
}
