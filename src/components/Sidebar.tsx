"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  Trophy,
  Compass,
  GraduationCap,
  User,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/study", labelKey: "nav.studyHub", icon: Brain },
  { href: "/courses", labelKey: "nav.courses", icon: BookOpen },
  { href: "/practice", labelKey: "nav.commandLab", icon: Terminal },
  { href: "/progress", labelKey: "nav.progress", icon: Trophy },
  { href: "/profile", labelKey: "nav.profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="glass-sidebar fixed left-0 top-0 bottom-0 w-[var(--sidebar-width)] z-40 flex-col hidden md:flex">
        {/* Logo */}
        <div className="p-6 pb-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#32D7FF] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">{t("brand.name")}</h1>
              <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
                {t("brand.subtitle")}
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-4 mb-3 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
            {t("nav.navigation")}
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`nav-item ${isActive ? "active" : ""}`}>
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{t(item.labelKey)}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom - User Card */}
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-4 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#BF5AF2]/20 blur-xl" />
            {user ? (
              <Link href="/profile" className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}90)` }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[10px] truncate" style={{ color: "var(--text-tertiary)" }}>{user.email}</p>
                </div>
              </Link>
            ) : (
              <>
                <GraduationCap className="w-8 h-8 text-[#007AFF] mb-2" />
                <p className="text-sm font-semibold text-white mb-1">{t("nav.proUpgrade")}</p>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {t("nav.unlockAll")}
                </p>
                <button className="glass-btn-primary w-full py-2 rounded-xl text-xs font-semibold">
                  {t("nav.upgradeNow")}
                </button>
              </>
            )}
          </motion.div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around px-2 py-1 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition-colors ${
                isActive ? "text-[#007AFF]" : "text-white/40"
              }`}>
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium leading-tight">{t(item.labelKey)}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
