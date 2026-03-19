"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { TelegramProvider, useTelegram } from "@/context/TelegramContext";

function TelegramAutoLogin({ children }: { children: React.ReactNode }) {
  const { isTelegram, tgUser, ready: tgReady } = useTelegram();
  const { user, isLoading, login, register } = useAuth();
  const [autoLoginDone, setAutoLoginDone] = useState(false);

  useEffect(() => {
    if (!tgReady || isLoading) return;

    // If we're in Telegram and not logged in, auto-create/login with Telegram user
    if (isTelegram && tgUser && !user) {
      const tgEmail = `tg-${tgUser.id}@telegram.user`;
      const tgPassword = `tg-auto-${tgUser.id}`;
      const tgName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(" ") || `User ${tgUser.id}`;

      // Try login first
      const loginResult = login(tgEmail, tgPassword);
      if (!loginResult.success) {
        // Account doesn't exist, register
        register(tgName, tgEmail, tgPassword);
      }
    }

    setAutoLoginDone(true);
  }, [tgReady, isLoading, isTelegram, tgUser, user, login, register]);

  if (!tgReady || !autoLoginDone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const { isTelegram } = useTelegram();
  const pathname = usePathname();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Handle redirects in useEffect to avoid setState-during-render
  useEffect(() => {
    if (isLoading) return;

    // In Telegram, never redirect to login — auto-login handles it
    if (isTelegram) {
      setRedirecting(false);
      return;
    }

    if (pathname === "/login" && user) {
      setRedirecting(true);
      router.replace("/");
    } else if (pathname !== "/login" && !user) {
      setRedirecting(true);
      router.replace("/login");
    } else {
      setRedirecting(false);
    }
  }, [isLoading, user, pathname, router, isTelegram]);

  // Show spinner while loading or redirecting
  if (isLoading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page — no auth required
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // Authenticated pages — wrap with ProgressProvider
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ProgressProvider userId={user.id}>
      {children}
    </ProgressProvider>
  );
}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TelegramProvider>
        <AuthProvider>
          <TelegramAutoLogin>
            <AuthGate>{children}</AuthGate>
          </TelegramAutoLogin>
        </AuthProvider>
      </TelegramProvider>
    </LanguageProvider>
  );
}
