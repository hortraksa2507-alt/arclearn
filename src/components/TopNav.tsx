"use client";

import React from "react";
import Link from "next/link";
import { Bell, Search, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function TopNav({ title, subtitle }: { title: string; subtitle?: string }) {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();

  return (
    <header className="glass-nav fixed top-0 md:left-[var(--sidebar-width)] left-0 right-0 h-[var(--nav-height)] z-30 flex items-center justify-between px-4 md:px-8">
      <div className="min-w-0 flex-1">
        <h2 className="text-base md:text-lg font-semibold text-white truncate">{title}</h2>
        {subtitle && (
          <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Search - desktop only */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-tertiary)" }} />
          <input
            type="text"
            placeholder={t("courses.searchPlaceholder")}
            className="glass-subtle rounded-xl pl-9 pr-4 py-2 text-xs w-56 outline-none focus:border-[var(--accent-blue)] transition-all placeholder:text-white/20"
          />
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === "en" ? "km" : "en")}
          className="glass-btn h-9 px-3 rounded-xl flex items-center gap-1.5 text-xs font-medium"
          title={lang === "en" ? "Switch to Khmer" : "Switch to English"}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "EN" : "ខ្មែរ"}</span>
        </button>

        {/* Notifications */}
        <button className="glass-btn w-9 h-9 rounded-xl flex items-center justify-center relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF2D55] border-2 border-[#0a0a1a]" />
        </button>

        {/* Avatar */}
        <Link href="/profile">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden text-sm font-bold text-white"
            style={{
              background: user
                ? `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}90)`
                : "linear-gradient(135deg, #007AFF, #BF5AF2)",
            }}
          >
            {user ? user.name.charAt(0).toUpperCase() : "?"}
          </button>
        </Link>
      </div>
    </header>
  );
}
