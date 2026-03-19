"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarColor: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: { name?: string; avatarColor?: string }) => void;
}

const USERS_KEY = "arclearn-users";
const SESSION_KEY = "arclearn-session";

const avatarColors = [
  "#007AFF", "#BF5AF2", "#FF9F0A", "#30D158", "#FF2D55",
  "#32D7FF", "#FF453A", "#AC8E68", "#5E5CE6", "#64D2FF",
];

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getUsers();
      const found = users.find((u) => u.id === sessionId);
      if (found) setUser(found);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "Account not found" };
    if (found.passwordHash !== simpleHash(password)) {
      return { success: false, error: "Incorrect password" };
    }
    setUser(found);
    localStorage.setItem(SESSION_KEY, found.id);
    return { success: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email: email.toLowerCase(),
      passwordHash: simpleHash(password),
      avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const updateProfile = useCallback((updates: { name?: string; avatarColor?: string }) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      const users = getUsers().map((u) => (u.id === updated.id ? updated : u));
      saveUsers(users);
      localStorage.setItem(SESSION_KEY, updated.id);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { avatarColors };
