"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { getCart, onCartCountChange } from "@/lib/marketplaceApi";
import { useT } from "@/components/dashboard/useT";
import { EASE } from "@/components/motion";

/**
 * Marketplace entries sit alongside the site's own pages — the two public
 * catalogue routes are part of the main application, not a separate area, so
 * they get the same treatment as About.
 */
const NAV_LINKS: { key: string; href: string; icon: IconName }[] = [
  { key: "home", href: "/", icon: "Sprout" },
  { key: "products", href: "/products", icon: "Store" },
  { key: "inputs", href: "/inputs", icon: "PackageCheck" },
  { key: "about", href: "/about", icon: "BookOpen" },
];

interface PublicNavbarProps {
  transparent?: boolean;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ transparent = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  /**
   * Shared-basket badge. `onCartCountChange` covers mutations made anywhere
   * in this tab (adding from a detail page, emptying at checkout); the
   * `pathname` dep re-reads localStorage when the visitor navigates, in case
   * the cart changed while this navbar was not mounted.
   */
  const [cartCount, setCartCount] = useState(0);

  /**
   * Scroll-aware chrome: once the page scrolls past the threshold the bar
   * picks up a shadow and a solid border, so content clearly slides
   * underneath it. Listeners are passive; the class flip is pure CSS.
   */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setCartCount(getCart().length));
    const unsubscribe = onCartCountChange(setCartCount);
    return () => {
      cancelAnimationFrame(frameId);
      unsubscribe();
    };
  }, [pathname]);

  const openMenu = useCallback(() => {
    setMobileOpen(true);
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      setMobileOpen(false);
      setMounted(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (mounted && mobileOpen) {
      requestAnimationFrame(() => setShow(true));
    }
  }, [mounted, mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  const navLinkClass = (href: string) => {
    // Prefix-aware so `/products` stays lit while viewing `/products/:id`.
    // `/` is excluded, otherwise Home would match every route in the app.
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
    return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      transparent
        ? isActive
          ? "bg-white/20 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
        : isActive
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-[#a0a0a0] dark:hover:bg-[#1a1a1a] dark:hover:text-[#f0f0f0]"
    }`;
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    closeMenu();
    await logout();
  };

  const navLabel = (key: string) =>
    ({
      home: t("হোম", "Home"),
      products: t("পণ্য", "Products"),
      inputs: t("ইনপুট", "Inputs"),
      about: t("আমাদের সম্পর্কে", "About"),
    }[key] ?? key);

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-300 ${
      transparent
        ? "bg-white/10 border-b border-white/10"
        : `bg-white/80 border-b border-slate-200/80 dark:bg-[#0a0a0a]/80 dark:border-[#222222] ${
            scrolled && !mobileOpen
              ? "shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]"
              : ""
          }`
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="FarmPath" className="h-8 w-8 rounded-lg object-cover" />
          <span className={`text-lg font-bold tracking-tight ${
            transparent ? "text-white" : "text-slate-900 dark:text-[#f0f0f0]"
          }`}>
            FarmPath
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {navLabel(link.key)}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" className={navLinkClass("/dashboard")}>
              {t("ড্যাশবোর্ড", "Dashboard")}
            </Link>
          )}
          {user && (
            <Link href="/dashboard/cart" className={navLinkClass("/dashboard/cart")}>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="ShoppingCart" size={16} />
                {t("কার্ট", "Cart")}
                {cartCount > 0 && (
                  <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />

          {user ? (
            /* Profile Button — desktop/tablet only; on phones the slide-in
               menu's bottom section covers Profile and Logout. */
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  transparent
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                }`}
              >
                {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || ""}
                className="h-7 w-7 rounded-full object-cover border-2 border-white/20"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
                <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                <Icon name="ChevronRight" size={14} className={`transition-transform ${profileOpen ? "rotate-90" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    style={{ transformOrigin: "top right" }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#222222] shadow-xl py-2 z-50"
                  >
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-[#222222]">
                    <p className="text-sm font-semibold text-slate-900 dark:text-[#f0f0f0]">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-[#a0a0a0] truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-[#e0e0e0] hover:bg-slate-50 dark:hover:bg-[#111111] transition-colors"
                  >
                    <Icon name="User" size={16} className="text-slate-400 dark:text-[#666666]" />
                    {t("প্রোফাইল", "Profile")}
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-[#e0e0e0] hover:bg-slate-50 dark:hover:bg-[#111111] transition-colors"
                  >
                    <Icon name="LayoutDashboard" size={16} className="text-slate-400 dark:text-[#666666]" />
                    {t("ড্যাশবোর্ড", "Dashboard")}
                  </Link>

                  <div className="my-1 h-px bg-slate-100 dark:bg-[#222222]" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full"
                  >
                    <Icon name="LogOut" size={16} />
                    {t("লগআউট", "Logout")}
                  </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Login / Register Buttons */
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  transparent
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-[#a0a0a0] dark:hover:bg-[#1a1a1a] dark:hover:text-[#f0f0f0]"
                }`}
              >
                {t("লগইন", "Login")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:shadow-[0_0_16px_rgba(16,185,129,0.3)]"
              >
                {t("রেজিস্টার", "Register")}
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={mobileOpen ? closeMenu : openMenu}
            className={`md:hidden rounded-lg p-2 transition-colors ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-slate-600 hover:bg-slate-100 dark:text-[#a0a0a0] dark:hover:bg-[#1a1a1a]"
            }`}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Panel */}
      {mounted && createPortal(
        <>
          <div
            onClick={closeMenu}
            className={`md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${
              show ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 9998 }}
          />

          <div
            className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
              show ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ zIndex: 9999 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-[#222222]">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <img src="/logo.png" alt="FarmPath" className="h-7 w-7 rounded-lg object-cover" />
                <span className="text-base font-bold text-slate-900 dark:text-[#f0f0f0]">FarmPath</span>
              </Link>
              <button
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-[#1a1a1a] dark:hover:text-[#a0a0a0] transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a0a0a0] dark:hover:bg-[#111111] dark:hover:text-[#f0f0f0]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={link.icon} size={18} className={isActive ? "text-emerald-600 dark:text-emerald-400" : ""} />
                        {navLabel(link.key)}
                      </span>
                      <Icon name="ChevronRight" size={16} className="text-slate-300 dark:text-[#444444]" />
                    </Link>
                  );
                })}
                {user && (
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      pathname === "/dashboard"
                        ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a0a0a0] dark:hover:bg-[#111111] dark:hover:text-[#f0f0f0]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="LayoutDashboard" size={18} />
                      {t("ড্যাশবোর্ড", "Dashboard")}
                    </span>
                    <Icon name="ChevronRight" size={16} className="text-slate-300 dark:text-[#444444]" />
                  </Link>
                )}
                {user && (
                  <Link
                    href="/dashboard/cart"
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      pathname.startsWith("/dashboard/cart")
                        ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#a0a0a0] dark:hover:bg-[#111111] dark:hover:text-[#f0f0f0]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
<Icon name="ShoppingCart" size={18} />
                  {t("কার্ট", "Cart")}
                    </span>
                    <span className="flex items-center gap-2">
                      {cartCount > 0 && (
                        <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {cartCount}
                        </span>
                      )}
                      <Icon name="ChevronRight" size={16} className="text-slate-300 dark:text-[#444444]" />
                    </span>
                  </Link>
                )}
              </div>

              <div className="my-5 h-px bg-slate-100 dark:bg-[#222222]" />

              {/* Language row — full-width menu row with a large segmented
                  বাংলা / EN switch. The theme toggle lives in the top navbar,
                  so it is intentionally not repeated here. */}
              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-2.5 dark:bg-[#111111]">
                <span className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-[#a0a0a0]">
                  <Icon name="Globe" size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t("ভাষা", "Language")}
                </span>
                <div
                  className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 dark:bg-[#0a0a0a] dark:border-[#333333] shadow-2xs"
                  role="group"
                  aria-label={t("ভাষা নির্বাচন", "Language selector")}
                >
                  <button
                    type="button"
                    onClick={() => setLanguage("bn")}
                    className={`min-w-[4.5rem] px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      language === "bn"
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "text-slate-600 dark:text-[#a0a0a0] hover:text-slate-900 dark:hover:text-[#f0f0f0]"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`min-w-[4.5rem] px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      language === "en"
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "text-slate-600 dark:text-[#a0a0a0] hover:text-slate-900 dark:hover:text-[#f0f0f0]"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </nav>

            {/* Auth buttons at bottom */}
            <div className="px-5 pb-6 pt-4 border-t border-slate-100 dark:border-[#222222]">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-[#f0f0f0] truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-[#a0a0a0] truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#333333] dark:bg-[#0a0a0a] dark:text-[#e0e0e0] dark:hover:bg-[#111111]"
                  >
<Icon name="User" size={16} />
                    {t("প্রোফাইল", "Profile")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700"
                  >
                    {t("লগআউট", "Logout")}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#333333] dark:bg-[#0a0a0a] dark:text-[#e0e0e0] dark:hover:bg-[#111111]"
                  >
                    {t("লগইন", "Login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                  >
                    {t("রেজিস্টার", "Register")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};
