"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      if (!name.trim()) { setError(t("auth.nameRequired")); return; }
      if (!email.trim()) { setError(t("auth.emailRequired")); return; }
      if (password.length < 4) { setError(t("auth.passwordMin")); return; }
      const result = register(name.trim(), email.trim(), password);
      if (!result.success) setError(result.error || t("auth.registerFailed"));
    } else {
      if (!email.trim()) { setError(t("auth.emailRequired")); return; }
      if (!password) { setError(t("auth.passwordRequired")); return; }
      const result = login(email.trim(), password);
      if (!result.success) setError(result.error || t("auth.loginFailed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="glass-bg-mesh" />

      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "km" : "en")}
        className="glass-btn fixed top-6 right-6 h-9 px-3 rounded-xl flex items-center gap-1.5 text-xs font-medium z-50"
      >
        {lang === "en" ? "EN" : "ខ្មែរ"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#32D7FF] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25"
          >
            <Compass className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">ArcLearn</h1>
          <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
            {t("brand.subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="glass-elevated rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#007AFF]/10 to-[#BF5AF2]/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-tr from-[#32D7FF]/8 to-transparent blur-2xl" />

          <div className="relative z-10">
            {/* Tabs */}
            <div className="flex gap-1 p-1 glass-subtle rounded-xl mb-6">
              <button
                onClick={() => { setIsRegister(false); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !isRegister ? "glass-btn-primary" : "text-white/50 hover:text-white/70"
                }`}
              >
                {t("auth.login")}
              </button>
              <button
                onClick={() => { setIsRegister(true); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isRegister ? "glass-btn-primary" : "text-white/50 hover:text-white/70"
                }`}
              >
                {t("auth.register")}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (register only) */}
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="text-xs font-medium text-white/60 mb-1.5 block">{t("auth.name")}</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("auth.namePlaceholder")}
                      className="w-full glass-subtle rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[var(--accent-blue)] transition-colors placeholder:text-white/20"
                    />
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-white/60 mb-1.5 block">{t("auth.email")}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("auth.emailPlaceholder")}
                    className="w-full glass-subtle rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[var(--accent-blue)] transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-medium text-white/60 mb-1.5 block">{t("auth.password")}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    className="w-full glass-subtle rounded-xl pl-11 pr-11 py-3 text-sm outline-none focus:border-[var(--accent-blue)] transition-colors placeholder:text-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                    ) : (
                      <Eye className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#FF453A] bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-xl px-4 py-2.5"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="glass-btn-primary w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                {isRegister ? (
                  <>
                    <Sparkles className="w-4 h-4" /> {t("auth.createAccount")}
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" /> {t("auth.signIn")}
                  </>
                )}
              </button>
            </form>

            {/* Switch prompt */}
            <p className="text-center text-xs mt-5" style={{ color: "var(--text-tertiary)" }}>
              {isRegister ? t("auth.haveAccount") : t("auth.noAccount")}{" "}
              <button
                onClick={() => { setIsRegister(!isRegister); setError(""); }}
                className="text-[#007AFF] font-medium hover:underline"
              >
                {isRegister ? t("auth.login") : t("auth.register")}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
