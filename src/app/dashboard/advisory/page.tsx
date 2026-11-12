"use client";
import { PortalGate } from "@/features/layout/PortalGate";
import { AdvisoryManagement } from "@/features/admin/advisory";

/**
 * Admin-only module. The sidebar only shows it to the admin portal, and the
 * gate keeps a manually-typed URL from firing admin API calls that would
 * just 403 for every other role.
 */
export default function Page() {
  return (
    <PortalGate allow={["admin"]} moduleLabel="Advisory Management">
      <AdvisoryManagement />
    </PortalGate>
  );
}