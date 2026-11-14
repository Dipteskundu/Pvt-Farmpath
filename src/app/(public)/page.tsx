"use client";

import React from "react";
import {
  HeroSection,
  FeatureDestinationsSection,
  AiCropRecommendationSection,
  MarketplaceDemandSection,
  QualityVerificationSection,
  LogisticsPaymentsProfitSection,
  HowItWorksSection,
  DashboardShowcaseSection,
  CommunityTestimonialsSection,
  FaqSection,
  BottomCtaBanner,
} from "@/components/public/landing";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureDestinationsSection />
      <AiCropRecommendationSection />
      <MarketplaceDemandSection />
      <QualityVerificationSection />
      <LogisticsPaymentsProfitSection />
      <HowItWorksSection />
      <DashboardShowcaseSection />
      <CommunityTestimonialsSection />
      <FaqSection />
      <BottomCtaBanner />
    </div>
  );
}
