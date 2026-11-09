import React from "react";
import { RouteTransition } from "@/components/motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
