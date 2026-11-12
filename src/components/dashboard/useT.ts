"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback } from "react";

/**
 * One bilingual helper for the whole dashboard kit.
 *
 * The codebase currently carries three i18n styles: `t('dictKey')` from
 * `LanguageContext`, a locally-scoped `t(bn, en)` arrow function, and
 * `tr(string)` from `localize`. Dashboards written against this hook use the
 * `(bn, en)` signature everywhere, so new screens never have to decide which
 * of the three to reach for — English-only copy is passed as `t("Same", "Same")`.
 */
export function useT() {
  const { language } = useLanguage();
  // Memoized so `t` has a stable identity across renders and only changes
  // when the language actually does — callers can safely list it in hook
  // dependency arrays (re-running on language switches is the intent).
  return useCallback(
    (bn: string, en: string) => (language === "bn" ? bn : en),
    [language]
  );
}
