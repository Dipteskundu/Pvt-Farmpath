"use client";
import { useParams, useRouter } from "next/navigation";
import { CropDetail } from "@/features/farmer/crops";
import { getRoute } from "@/features/layout/navConfig";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Recommended-crop detail profile.
 *
 * The segment is the recommendation-card id — either the master-crop
 * MongoDB `_id` (catalog-backed crops) or the AI canonical crop name
 * (everything else), both resolved server-side by
 * `GET /farmer/crops/:cropId/detail`.
 */
export default function Page() {
  const params = useParams<{ crop: string }>();
  const router = useRouter();
  const { portal } = useAuth();

  const cropId = params?.crop ? decodeURIComponent(Array.isArray(params.crop) ? params.crop[0] : params.crop) : "";

  return (
    <CropDetail
      cropId={cropId}
      onBack={() => router.push(portal ? getRoute(portal, 'recommendation') : '/dashboard/crops/recommend')}
    />
  );
}
