"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  PenTool,
  Box,
  Cpu,
  FileOutput,
  Map,
  Clock,
  BookOpen,
  ChevronRight,
  Star,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, LevelBadge, ProgressRing, SearchBar } from "@/components/GlassComponents";
import { courses as coursesEn } from "@/data/courses";
import { getTranslatedCourse } from "@/data/courseTranslations";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-7 h-7" />,
  PenTool: <PenTool className="w-7 h-7" />,
  Box: <Box className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  FileOutput: <FileOutput className="w-7 h-7" />,
  Map: <Map className="w-7 h-7" />,
};

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const progress = useProgress();
  const { t, lang } = useLanguage();
  const courses = coursesEn.map((c) => getTranslatedCourse(c.id, lang, c));

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = activeFilter === "All" || c.level === activeFilter;
    return matchSearch && matchFilter;
  });

  const getCourseProgress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const allLessons = course.modules.flatMap((m) => m.lessons);
    if (allLessons.length === 0) return 0;
    const done = allLessons.filter((l) => progress.isLessonCompleted(l.id)).length;
    return Math.round((done / allLessons.length) * 100);
  };

  const getLessonCount = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { total: 0, done: 0 };
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const done = allLessons.filter((l) => progress.isLessonCompleted(l.id)).length;
    return { total: allLessons.length, done };
  };

  return (
    <AppShell title={t("courses.title")} subtitle={t("courses.subtitle")}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="w-full md:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder={t("courses.searchPlaceholder")} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f ? "glass-btn-primary border border-blue-500/30" : "glass-btn"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((course, i) => {
          const prog = getCourseProgress(course.id);
          const { total, done } = getLessonCount(course.id);

          return (
            <Link key={course.id} href={`/lesson?course=${course.id}`}>
              <GlassCard hover delay={0.05 * i} className="p-0 overflow-hidden">
                <div
                  className="h-32 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${course.color}25, ${course.color}08)` }}
                >
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl" style={{ background: `${course.color}20` }} />
                  <div className="absolute top-5 left-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}30` }}
                    >
                      {iconMap[course.icon] || <BookOpen className="w-7 h-7" />}
                    </div>
                  </div>
                  {prog > 0 ? (
                    <div className="absolute top-5 right-5">
                      <ProgressRing progress={prog} size={40} strokeWidth={3} color={course.color} />
                    </div>
                  ) : (
                    <div className="absolute top-5 right-5">
                      <Star className="w-5 h-5" style={{ color: `${course.color}60` }} />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <LevelBadge level={course.level} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{course.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {course.description.slice(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {done}/{total} {t("dashboard.done")}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  </div>

                  {prog > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${prog}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}80)` }} />
                      </div>
                    </div>
                  )}

                  {prog === 0 && (
                    <div className="flex gap-1.5 mt-3 pt-3 border-t border-white/5">
                      {course.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
