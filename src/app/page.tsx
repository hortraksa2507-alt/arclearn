"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Flame,
  BookOpen,
  Target,
  ChevronRight,
  Play,
  Compass,
  PenTool,
  Box,
  Cpu,
  FileOutput,
  Map,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, ProgressRing, StatCard } from "@/components/GlassComponents";
import { courses as coursesEn } from "@/data/courses";
import { getTranslatedCourse } from "@/data/courseTranslations";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Box: <Box className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  FileOutput: <FileOutput className="w-6 h-6" />,
  Map: <Map className="w-6 h-6" />,
};

function getCourseProgress(courseId: string, completedLessons: string[], courseList: typeof coursesEn) {
  const course = courseList.find((c) => c.id === courseId);
  if (!course) return 0;
  const allLessons = course.modules.flatMap((m) => m.lessons);
  if (allLessons.length === 0) return 0;
  const done = allLessons.filter((l) => completedLessons.includes(l.id)).length;
  return Math.round((done / allLessons.length) * 100);
}

function getNextLesson(completedLessons: string[], courseList: typeof coursesEn) {
  for (const course of courseList) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { course, lesson };
        }
      }
    }
  }
  return { course: courseList[0], lesson: courseList[0].modules[0].lessons[0] };
}

export default function Dashboard() {
  const progress = useProgress();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const courses = coursesEn.map((c) => getTranslatedCourse(c.id, lang, c));
  const greeting = t("dashboard.subtitle").replace("{name}", user?.name || "Architect");
  const totalLessons = courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0), 0);
  const completedCount = progress.completedLessons.length;
  const totalHours = (progress.totalMinutes / 60).toFixed(1);

  const { course: nextCourse, lesson: nextLesson } = getNextLesson(progress.completedLessons, courses);
  const nextCourseProgress = getCourseProgress(nextCourse.id, progress.completedLessons, courses);

  const coursesWithProgress = courses.map((c) => ({
    ...c,
    progress: getCourseProgress(c.id, progress.completedLessons, courses),
    totalLessons: c.modules.reduce((a, m) => a + m.lessons.length, 0),
    completedLessons: c.modules
      .flatMap((m) => m.lessons)
      .filter((l) => progress.completedLessons.includes(l.id)).length,
  }));

  const activeCourses = coursesWithProgress.filter((c) => c.progress > 0 && c.progress < 100);
  const notStarted = coursesWithProgress.filter((c) => c.progress === 0);

  return (
    <AppShell title={t("dashboard.title")} subtitle={greeting}>
      {/* Hero - Continue Learning */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-elevated rounded-3xl p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-[#007AFF]/15 to-[#32D7FF]/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-[#BF5AF2]/10 to-transparent blur-2xl" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--accent-cyan)" }}>
              {completedCount === 0 ? t("dashboard.startLearning") : t("dashboard.continueLearning")}
            </p>
            <h2 className="text-2xl font-bold text-white mb-1">{nextCourse.title}</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              {t("dashboard.nextUp")}: <span className="text-white font-medium">{nextLesson.title}</span>
            </p>

            <div className="flex items-center gap-4">
              <Link href={`/lesson?course=${nextCourse.id}&lesson=${nextLesson.id}`}>
                <button className="glass-btn-primary px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {completedCount === 0 ? t("dashboard.startFirstLesson") : t("dashboard.resumeLesson")}
                </button>
              </Link>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {nextLesson.duration}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <ProgressRing progress={nextCourseProgress} size={100} strokeWidth={6} />
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label={t("dashboard.studyTime")} value={`${totalHours}h`} icon={<Clock className="w-5 h-5" />} color="#007AFF" delay={0.1} />
        <StatCard label={t("dashboard.dayStreak")} value={String(progress.streakDays)} icon={<Flame className="w-5 h-5" />} color="#FF9F0A" delay={0.15} />
        <StatCard label={t("dashboard.lessonsDone")} value={`${completedCount}/${totalLessons}`} icon={<BookOpen className="w-5 h-5" />} color="#30D158" delay={0.2} />
        <StatCard
          label={t("dashboard.quizBest")}
          value={
            Object.values(progress.quizScores).length > 0
              ? `${Math.max(...Object.values(progress.quizScores))}%`
              : "—"
          }
          icon={<Target className="w-5 h-5" />}
          color="#BF5AF2"
          delay={0.25}
        />
      </div>

      {/* Active Courses + Recommended */}
      <div className="space-y-6">
        {/* In Progress */}
        {activeCourses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">{t("dashboard.inProgress")}</h3>
              <Link href="/courses" className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent-blue)" }}>
                {t("dashboard.allCourses")} <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCourses.map((course, i) => (
                <Link key={course.id} href={`/lesson?course=${course.id}`}>
                  <GlassCard hover delay={0.1 * i} className="p-5 flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${course.color}18`, color: course.color }}
                    >
                      {iconMap[course.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{course.title}</h4>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {course.completedLessons}/{course.totalLessons} {t("dashboard.lessons")} {t("dashboard.done")}
                      </p>
                      <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}80)` }}
                        />
                      </div>
                    </div>
                    <ProgressRing progress={course.progress} size={44} strokeWidth={3} color={course.color} />
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Not Started / Recommended */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">
            {completedCount === 0 ? t("dashboard.yourLearningPath") : t("dashboard.upNext")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notStarted.map((course, i) => (
              <Link key={course.id} href={`/lesson?course=${course.id}`}>
                <GlassCard hover delay={0.05 * i} className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${course.color}15`, color: course.color }}
                    >
                      {iconMap[course.icon] || <BookOpen className="w-5 h-5" />}
                    </div>
                    <span
                      className="tag-pill border text-[9px]"
                      style={{
                        background: `${course.color}12`,
                        color: course.color,
                        borderColor: `${course.color}25`,
                      }}
                    >
                      {course.level}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{course.title}</h4>
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                    {course.description.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.totalLessons} {t("dashboard.lessons")}</span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
