import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import { WarmupPing } from "@/components/WarmupPing";
import { MotionConfig } from "framer-motion";

export const metadata: Metadata = {
  title: "FarmPath - Smart Agriculture & Farm-to-Market Platform",
  description: "A comprehensive platform for farmers to manage their agricultural journey from planning to selling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <MotionConfig reducedMotion="user">
                <ToastProvider>
                  {/* Wake the free-tier server + AI instances the instant the
                      app opens, so real requests find warm services. */}
                  <WarmupPing />
                  {children}
                </ToastProvider>
              </MotionConfig>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
