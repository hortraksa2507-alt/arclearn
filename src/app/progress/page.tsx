"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Lock,
  CheckCircle2,
  Flame,
  Clock,
  BookOpen,
  Target,
  RotateCcw,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, StatCard, ProgressRing } from "@/components/GlassComponents";
import { courses as coursesEn, achievements as achievementsEn } from "@/data/courses";
import { getTranslatedCourse, getTranslatedAchievement } from "@/data/courseTranslations";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ProgressPage() {
  const progress = useProgress();
  const { t, lang } = useLanguage();
  const courses = coursesEn.map((c) => getTranslatedCourse(c.id, lang, c));
  const achievements = achievementsEn.map((a) => ({ ...a, ...getTranslatedAchievement(a.id, lang, a) }));

  const totalLessons = courses.reduce(
    (a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0),
    0
  );
  const completedCount = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const totalHours = (progress.totalMinutes / 60).toFixed(1);
  const quizCount = Object.keys(progress.quizScores).length;
  const avgQuiz =
    quizCount > 0
      ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / quizCount)
      : 0;

  const coursesWithProgress = courses.map((c) => {
    const allLessons = c.modules.flatMap((m) => m.lessons);
    const done = allLessons.filter((l) => progress.isLessonCompleted(l.id)).length;
    return {
      ...c,
      totalLessons: allLessons.length,
      completedLessons: done,
      progress: allLessons.length > 0 ? Math.round((done / allLessons.length) * 100) : 0,
    };
  });

  // Check achievements
  const isAchievementUnlocked = (achId: string): boolean => {
    switch (achId) {
      case "first-line":
        return completedCount >= 1;
      case "getting-started":
        return courses[0].modules[0].lessons.every((l) => progress.isLessonCompleted(l.id));
      case "quiz-ace":
        return Object.values(progress.quizScores).some((s) => s === 100);
      case "five-lessons":
        return completedCount >= 5;
      case "ten-lessons":
        return completedCount >= 10;
      case "command-explorer":
        return false; // tracked in practice page
      case "all-fundamentals":
        return courses[0].modules.flatMap((m) => m.lessons).every((l) => progress.isLessonCompleted(l.id));
      case "note-taker":
        return Object.values(progress.notes).filter((n) => n.trim().length > 0).length >= 3;
      default:
        return false;
    }
  };

  const unlockedCount = achievements.filter((a) => isAchievementUnlocked(a.id)).length;

  return (
    <AppShell title={t("progress.title")} subtitle={t("progress.subtitle")}>
      {/* Overall Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-elevated rounded-3xl p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#007AFF]/15 to-[#BF5AF2]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <ProgressRing progress={overallProgress} size={140} strokeWidth={8} color="#007AFF" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{t("progress.overallProgress")}</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              {completedCount === 0 ? (
                t("progress.startFirst")
              ) : (
                <>
                  {t("progress.completed")} <span className="text-white font-semibold">{completedCount}</span> {t("progress.ofLessons")}{" "}
                  <span className="text-white font-semibold">{totalLessons}</span> {t("progress.lessons")}
                </>
              )}
            </p>
            <div className="flex gap-6">
              <div>
                <p className="text-lg font-bold text-[#007AFF]">{totalHours}h</p>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{t("progress.studyTime")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#FF9F0A]">{progress.streakDays}</p>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{t("progress.dayStreak")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#30D158]">{unlockedCount}/{achievements.length}</p>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{t("progress.achievements")}</p>
              </div>
              {quizCount > 0 && (
                <div>
                  <p className="text-lg font-bold text-[#BF5AF2]">{avgQuiz}%</p>
                  <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{t("progress.avgQuiz")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label={t("progress.studyTime")} value={`${totalHours}h`} icon={<Clock className="w-5 h-5" />} color="#007AFF" delay={0.05} />
        <StatCard label={t("progress.dayStreak")} value={String(progress.streakDays)} icon={<Flame className="w-5 h-5" />} color="#FF9F0A" delay={0.1} />
        <StatCard label={t("progress.lessonsDone")} value={`${completedCount}`} icon={<BookOpen className="w-5 h-5" />} color="#30D158" delay={0.15} />
        <StatCard label={t("progress.quizzesTaken")} value={String(quizCount)} icon={<Target className="w-5 h-5" />} color="#BF5AF2" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Course Progress */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">{t("progress.courseProgress")}</h3>
          <div className="space-y-3">
            {coursesWithProgress.map((course, i) => (
              <GlassCard key={course.id} delay={0.05 * i} className="p-4">
                <div className="flex items-center gap-4">
                  <ProgressRing progress={course.progress} size={44} strokeWidth={3} color={course.color} />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{course.title}</h4>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                      {course.completedLessons}/{course.totalLessons} lessons &middot; {course.level}
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}80)` }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Quiz Scores */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">{t("progress.quizScores")}</h3>
          {quizCount === 0 ? (
            <GlassCard className="p-8 text-center">
              <Target className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-tertiary)" }} />
              <p className="text-sm text-white mb-1">{t("progress.noQuizzes")}</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {t("progress.completeToUnlock")}
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-2">
              {Object.entries(progress.quizScores).map(([lessonId, score], i) => {
                // Find lesson name
                let lessonName = lessonId;
                for (const course of courses) {
                  for (const mod of course.modules) {
                    const found = mod.lessons.find((l) => l.id === lessonId);
                    if (found) lessonName = found.title;
                  }
                }
                return (
                  <GlassCard key={lessonId} delay={0.05 * i} className="p-4 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        score >= 70 ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {score}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{lessonName}</p>
                      <p className="text-[10px]" style={{ color: score >= 70 ? "#30D158" : "#FF453A" }}>
                        {score >= 70 ? t("progress.passed") : t("progress.needsReview")}
                      </p>
                    </div>
                    {score >= 70 ? (
                      <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                    ) : (
                      <RotateCcw className="w-4 h-4 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                    )}
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-[#FF9F0A]" />
          <h3 className="text-base font-semibold text-white">{t("progress.achievements")}</h3>
          <span className="text-xs ml-auto" style={{ color: "var(--text-tertiary)" }}>
            {unlockedCount}/{achievements.length} {t("progress.unlocked")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, i) => {
            const unlocked = isAchievementUnlocked(ach.id);
            return (
              <GlassCard
                key={ach.id}
                delay={0.05 * i}
                className={`p-5 text-center relative overflow-hidden ${!unlocked ? "opacity-40" : ""}`}
                glow={unlocked ? "blue" : undefined}
              >
                {!unlocked && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-3.5 h-3.5" style={{ color: "var(--text-tertiary)" }} />
                  </div>
                )}
                {unlocked && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" />
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl ${
                    unlocked
                      ? "bg-gradient-to-br from-[#FF9F0A]/20 to-[#FF2D55]/10"
                      : "bg-white/5"
                  }`}
                >
                  {unlocked ? "🏆" : "🔒"}
                </div>
                <h4 className="text-sm font-semibold text-white mb-0.5">{ach.title}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ach.description}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Reset progress */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
          <button
            onClick={() => {
              if (confirm("Reset all progress? This cannot be undone.")) {
                progress.resetProgress();
              }
            }}
            className="glass-btn px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 text-[#FF453A]/70 hover:text-[#FF453A]"
          >
            <RotateCcw className="w-3 h-3" /> {t("progress.resetAll")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
