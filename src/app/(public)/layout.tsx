"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { PublicNavbar } from "@/components/public/PublicNavbar";
import { PublicFooter } from "@/components/public/PublicFooter";
import { RouteTransition } from "@/components/motion";

/**
 * Public site shell. `MotionConfig reducedMotion="user"` makes every
 * animation on the public pages (scroll reveals, card cascades, count-ups)
 * degrade to plain opacity fades for visitors whose OS asks for reduced
 * motion — transforms are dropped, nothing lerps across the screen.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white dark:bg-[#000000]">
        <PublicNavbar />
        <main className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <PublicFooter />
      </div>
    </MotionConfig>
  );
}
