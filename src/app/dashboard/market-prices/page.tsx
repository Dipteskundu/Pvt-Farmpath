"use client";
import { PortalGate } from "@/features/layout/PortalGate";
import { MarketPriceManagement } from "@/features/admin/marketplace";

/**
 * Admin-only module. The sidebar only shows it to the admin portal, and the
 * gate keeps a manually-typed URL from firing admin API calls that would
 * just 403 for every other role.
 */
export default function Page() {
  return (
    <PortalGate allow={["admin"]} moduleLabel="MarketPrice Management">
      <MarketPriceManagement />
    </PortalGate>
  );
}