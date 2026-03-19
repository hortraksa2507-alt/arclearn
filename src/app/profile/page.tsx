"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Palette,
  Check,
  LogOut,
  BookOpen,
  Clock,
  Trophy,
  Flame,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, StatCard } from "@/components/GlassComponents";
import { useAuth, avatarColors } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";
import { courses as coursesEn, achievements } from "@/data/courses";
import { getTranslatedCourse } from "@/data/courseTranslations";

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const progress = useProgress();
  const { t, lang } = useLanguage();
  const [editName, setEditName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const courses = coursesEn.map((c) => getTranslatedCourse(c.id, lang, c));
  const totalLessons = courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0), 0);
  const completedCount = progress.completedLessons.length;
  const totalHours = (progress.totalMinutes / 60).toFixed(1);
  const quizCount = Object.keys(progress.quizScores).length;

  const handleSaveName = () => {
    if (editName.trim() && editName.trim() !== user.name) {
      updateProfile({ name: editName.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleColorChange = (color: string) => {
    updateProfile({ avatarColor: color });
  };

  return (
    <AppShell title={t("profile.title")} subtitle={t("profile.subtitle")}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-elevated rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#007AFF]/15 to-[#BF5AF2]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0"
              style={{
                background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}90)`,
                boxShadow: `0 8px 32px ${user.avatarColor}30`,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-sm flex items-center gap-1.5 justify-center sm:justify-start mt-1" style={{ color: "var(--text-secondary)" }}>
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <p className="text-xs flex items-center gap-1.5 justify-center sm:justify-start mt-1" style={{ color: "var(--text-tertiary)" }}>
                <Calendar className="w-3 h-3" /> {t("profile.joined")} {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={t("progress.studyTime")} value={`${totalHours}h`} icon={<Clock className="w-5 h-5" />} color="#007AFF" delay={0.05} />
          <StatCard label={t("progress.dayStreak")} value={String(progress.streakDays)} icon={<Flame className="w-5 h-5" />} color="#FF9F0A" delay={0.1} />
          <StatCard label={t("progress.lessonsDone")} value={`${completedCount}/${totalLessons}`} icon={<BookOpen className="w-5 h-5" />} color="#30D158" delay={0.15} />
          <StatCard label={t("progress.quizzesTaken")} value={String(quizCount)} icon={<Trophy className="w-5 h-5" />} color="#BF5AF2" delay={0.2} />
        </div>

        {/* Edit Profile */}
        <GlassCard className="p-6">
          <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-[#007AFF]" />
            {t("profile.editProfile")}
          </h3>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-xs font-medium text-white/60 mb-1.5 block">{t("auth.name")}</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 glass-subtle rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-blue)] transition-colors"
                />
                <button
                  onClick={handleSaveName}
                  className="glass-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  {saved ? <><Check className="w-3.5 h-3.5" /> {t("profile.saved")}</> : t("common.save")}
                </button>
              </div>
            </div>

            {/* Avatar Color */}
            <div>
              <label className="text-xs font-medium text-white/60 mb-2 block flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> {t("profile.avatarColor")}
              </label>
              <div className="flex gap-2.5 flex-wrap">
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className="w-10 h-10 rounded-xl transition-all hover:scale-110 relative"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}90)`,
                      boxShadow: user.avatarColor === color ? `0 0 0 2px ${color}, 0 0 16px ${color}40` : "none",
                    }}
                  >
                    {user.avatarColor === color && (
                      <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Logout */}
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="glass-btn px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 text-[#FF453A]/70 hover:text-[#FF453A] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> {t("profile.logout")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
