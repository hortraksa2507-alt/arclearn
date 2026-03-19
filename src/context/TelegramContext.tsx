"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramContextValue {
  isTelegram: boolean;
  tgUser: TelegramUser | null;
  ready: boolean;
  expand: () => void;
  close: () => void;
  showBackButton: (show: boolean) => void;
  onBackButtonClick: (cb: () => void) => void;
  hapticFeedback: (type: "impact" | "notification" | "selection") => void;
}

const TelegramContext = createContext<TelegramContextValue>({
  isTelegram: false,
  tgUser: null,
  ready: false,
  expand: () => {},
  close: () => {},
  showBackButton: () => {},
  onBackButtonClick: () => {},
  hapticFeedback: () => {},
});

/* eslint-disable @typescript-eslint/no-explicit-any */
function getWebApp(): any {
  if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
    return (window as any).Telegram.WebApp;
  }
  return null;
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [isTelegram, setIsTelegram] = useState(false);
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait a tick for the Telegram SDK to load
    const timer = setTimeout(() => {
      const webapp = getWebApp();
      if (webapp && webapp.initDataUnsafe?.user) {
        setIsTelegram(true);
        setTgUser(webapp.initDataUnsafe.user);

        // Tell Telegram the app is ready
        webapp.ready();

        // Expand to full height
        webapp.expand();

        // Set header/bg color to match our dark theme
        try {
          webapp.setHeaderColor("#0a0a1a");
          webapp.setBackgroundColor("#0a0a1a");
        } catch {
          // Older Telegram clients may not support this
        }

        setReady(true);
      } else {
        // Not inside Telegram
        setReady(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const expand = () => {
    getWebApp()?.expand();
  };

  const close = () => {
    getWebApp()?.close();
  };

  const showBackButton = (show: boolean) => {
    const webapp = getWebApp();
    if (webapp?.BackButton) {
      if (show) {
        webapp.BackButton.show();
      } else {
        webapp.BackButton.hide();
      }
    }
  };

  const onBackButtonClick = (cb: () => void) => {
    const webapp = getWebApp();
    if (webapp?.BackButton) {
      webapp.BackButton.onClick(cb);
    }
  };

  const hapticFeedback = (type: "impact" | "notification" | "selection") => {
    const webapp = getWebApp();
    if (webapp?.HapticFeedback) {
      if (type === "impact") {
        webapp.HapticFeedback.impactOccurred("medium");
      } else if (type === "notification") {
        webapp.HapticFeedback.notificationOccurred("success");
      } else {
        webapp.HapticFeedback.selectionChanged();
      }
    }
  };

  return (
    <TelegramContext.Provider
      value={{
        isTelegram,
        tgUser,
        ready,
        expand,
        close,
        showBackButton,
        onBackButtonClick,
        hapticFeedback,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  return useContext(TelegramContext);
}
