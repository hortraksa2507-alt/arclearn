"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  MousePointerClick,
  HelpCircle,
  FolderKanban,
  Clock,
  Lightbulb,
  Terminal,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  RotateCcw,
  Check,
  X,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, GlassButton } from "@/components/GlassComponents";
import { courses as coursesEn, type Lesson, type QuizQuestion } from "@/data/courses";
import { getTranslatedCourse } from "@/data/courseTranslations";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

const typeIcons: Record<string, React.ReactNode> = {
  theory: <BookOpen className="w-3.5 h-3.5" />,
  interactive: <MousePointerClick className="w-3.5 h-3.5" />,
  quiz: <HelpCircle className="w-3.5 h-3.5" />,
  project: <FolderKanban className="w-3.5 h-3.5" />,
};

const typeColors: Record<string, string> = {
  theory: "#007AFF",
  interactive: "#32D7FF",
  quiz: "#FF9F0A",
  project: "#BF5AF2",
};

const typeLabelKeys: Record<string, string> = {
  theory: "lesson.theory",
  interactive: "lesson.handsOn",
  quiz: "lesson.quiz",
  project: "lesson.project",
};

export default function LessonPage() {
  return (
    <Suspense fallback={
      <AppShell title="Loading..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    }>
      <LessonContentInner />
    </Suspense>
  );
}

function LessonContentInner() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course") || "fundamentals";
  const lessonId = searchParams.get("lesson") || null;

  const courses = coursesEn.map((c) => getTranslatedCourse(c.id, lang, c));
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const allLessons = course.modules.flatMap((m) => m.lessons);

  const initialLesson = lessonId
    ? allLessons.find((l) => l.id === lessonId) || allLessons[0]
    : allLessons[0];

  const [activeLesson, setActiveLesson] = useState<Lesson>(initialLesson);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedModule, setExpandedModule] = useState<string>(course.modules[0].id);
  const [noteText, setNoteText] = useState("");

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const progress = useProgress();

  // Load notes when lesson changes
  const savedNote = progress.getNote(activeLesson.id);

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentStep(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setNoteText(progress.getNote(lesson.id));
    progress.setCurrentLesson(course.id, lesson.id);
  };

  const handleNextStep = () => {
    if (currentStep < activeLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteLesson = () => {
    progress.completeLesson(activeLesson.id);
    progress.addMinutes(parseInt(activeLesson.duration) || 15);
    // Move to next lesson
    const idx = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (idx < allLessons.length - 1) {
      handleSelectLesson(allLessons[idx + 1]);
    }
  };

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qIndex]: optionIndex });
  };

  const handleQuizSubmit = () => {
    if (!activeLesson.quiz) return;
    setQuizSubmitted(true);
    const total = activeLesson.quiz.length;
    const correct = activeLesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
    const score = Math.round((correct / total) * 100);
    progress.saveQuizScore(activeLesson.id, score);
    if (score >= 70) {
      progress.completeLesson(activeLesson.id);
    }
  };

  const handleSaveNote = () => {
    progress.saveNote(activeLesson.id, noteText);
  };

  const quizScore = useMemo(() => {
    if (!activeLesson.quiz || !quizSubmitted) return null;
    const total = activeLesson.quiz.length;
    const correct = activeLesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
    return { correct, total, percent: Math.round((correct / total) * 100) };
  }, [activeLesson.quiz, quizAnswers, quizSubmitted]);

  const isCompleted = progress.isLessonCompleted(activeLesson.id);
  const isBookmarked = progress.isBookmarked(activeLesson.id);
  const step = activeLesson.steps[currentStep];

  return (
    <AppShell title={course.title} subtitle={course.subtitle}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-5">
          {/* Lesson Header */}
          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="tag-pill border flex items-center gap-1"
                    style={{
                      background: `${typeColors[activeLesson.type]}15`,
                      color: typeColors[activeLesson.type],
                      borderColor: `${typeColors[activeLesson.type]}30`,
                    }}
                  >
                    {typeIcons[activeLesson.type]}
                    {t(typeLabelKeys[activeLesson.type])}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                    <Clock className="w-3 h-3" /> {activeLesson.duration}
                  </span>
                  {isCompleted && (
                    <span className="tag-pill bg-green-500/15 text-green-400 border border-green-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {t("lesson.completed")}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{activeLesson.title}</h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {activeLesson.description}
                </p>
              </div>
              <button
                onClick={() => progress.toggleBookmark(activeLesson.id)}
                className="glass-btn w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-3"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#FF9F0A]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Step progress */}
            {activeLesson.steps.length > 1 && (
              <div className="flex items-center gap-1.5">
                {activeLesson.steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className="flex-1 h-1.5 rounded-full transition-all"
                    style={{
                      background:
                        i === currentStep
                          ? typeColors[activeLesson.type]
                          : i < currentStep
                          ? `${typeColors[activeLesson.type]}60`
                          : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>
            )}
          </GlassCard>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeLesson.id}-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `${typeColors[activeLesson.type]}20`,
                      color: typeColors[activeLesson.type],
                    }}
                  >
                    {currentStep + 1}
                  </div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <span className="text-[11px] ml-auto" style={{ color: "var(--text-tertiary)" }}>
                    {t("lesson.step")} {currentStep + 1} {t("lesson.of")} {activeLesson.steps.length}
                  </span>
                </div>

                {/* Lesson content rendered as formatted text */}
                <div className="prose-invert text-sm leading-relaxed space-y-3" style={{ color: "var(--text-secondary)" }}>
                  {step.content.split("\n\n").map((paragraph, pi) => (
                    <div key={pi}>
                      {paragraph.split("\n").map((line, li) => {
                        // Table header
                        if (line.startsWith("|") && line.includes("---")) return null;
                        if (line.startsWith("|")) {
                          return (
                            <div key={li} className="font-mono text-xs py-1 px-2 bg-white/[0.03] rounded border-b border-white/5">
                              {line}
                            </div>
                          );
                        }
                        // Headers
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return (
                            <p key={li} className="text-white font-semibold mt-3 mb-1">
                              {line.replace(/\*\*/g, "")}
                            </p>
                          );
                        }
                        // Bullet points
                        if (line.match(/^[•✓✗\-\d+\.]\s/)) {
                          const isTick = line.startsWith("✓");
                          const isCross = line.startsWith("✗");
                          return (
                            <div key={li} className="flex items-start gap-2 pl-2">
                              {isTick ? (
                                <Check className="w-3.5 h-3.5 text-[#30D158] shrink-0 mt-0.5" />
                              ) : isCross ? (
                                <X className="w-3.5 h-3.5 text-[#FF453A] shrink-0 mt-0.5" />
                              ) : (
                                <span className="w-1 h-1 rounded-full bg-[var(--accent-blue)] shrink-0 mt-2" />
                              )}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: line
                                    .replace(/^[•✓✗\-]\s/, "")
                                    .replace(/^\d+\.\s/, "")
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/5 text-[#32D7FF] font-mono text-xs">$1</code>'),
                                }}
                              />
                            </div>
                          );
                        }
                        // Regular text with bold and code
                        return (
                          <p
                            key={li}
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/5 text-[#32D7FF] font-mono text-xs">$1</code>'),
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Tip box */}
                {step.tip && (
                  <div className="mt-5 p-4 rounded-xl bg-[#FF9F0A]/5 border border-[#FF9F0A]/15">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#FF9F0A] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#FF9F0A]">{t("lesson.proTip")}</span>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="glass-btn px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> {t("lesson.previous")}
                  </button>

                  {currentStep < activeLesson.steps.length - 1 ? (
                    <button
                      onClick={handleNextStep}
                      className="glass-btn-primary px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      {t("lesson.nextStep")} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : !isCompleted ? (
                    <button
                      onClick={handleCompleteLesson}
                      className="glass-btn-primary px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t("lesson.markComplete")}
                    </button>
                  ) : (
                    <span className="text-xs text-[#30D158] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t("lesson.completed")}
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Quiz section (if lesson has quiz) */}
          {activeLesson.quiz && activeLesson.quiz.length > 0 && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <HelpCircle className="w-5 h-5 text-[#FF9F0A]" />
                <h3 className="text-base font-semibold text-white">{t("lesson.knowledgeCheck")}</h3>
                {quizScore && (
                  <span
                    className={`ml-auto tag-pill border ${
                      quizScore.percent >= 70
                        ? "bg-green-500/15 text-green-400 border-green-500/30"
                        : "bg-red-500/15 text-red-400 border-red-500/30"
                    }`}
                  >
                    {quizScore.correct}/{quizScore.total} ({quizScore.percent}%)
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {activeLesson.quiz.map((q, qi) => (
                  <div key={qi} className="space-y-2.5">
                    <p className="text-sm font-medium text-white">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const isSelected = quizAnswers[qi] === oi;
                        const isCorrect = q.correctIndex === oi;
                        let borderColor = "border-white/8";
                        let bg = "bg-transparent";
                        if (quizSubmitted) {
                          if (isCorrect) {
                            borderColor = "border-green-500/40";
                            bg = "bg-green-500/8";
                          } else if (isSelected && !isCorrect) {
                            borderColor = "border-red-500/40";
                            bg = "bg-red-500/8";
                          }
                        } else if (isSelected) {
                          borderColor = "border-[#007AFF]/40";
                          bg = "bg-[#007AFF]/8";
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => handleQuizAnswer(qi, oi)}
                            className={`w-full text-left p-3 rounded-xl border ${borderColor} ${bg} transition-all text-xs flex items-start gap-2.5`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                                isSelected ? "border-[#007AFF] text-[#007AFF]" : "border-white/20 text-white/40"
                              }`}
                            >
                              {String.fromCharCode(65 + oi)}
                            </span>
                            <span style={{ color: "var(--text-secondary)" }}>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-[#30D158] ml-auto shrink-0" />}
                            {quizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-[#FF453A] ml-auto shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          <span className="text-white font-medium">{t("lesson.explanation")}: </span>
                          {q.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < (activeLesson.quiz?.length || 0)}
                  className="glass-btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold mt-5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t("lesson.submitAnswers")}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="glass-btn px-5 py-2 rounded-xl text-xs font-medium mt-5 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" /> {t("lesson.retryQuiz")}
                </button>
              )}
            </GlassCard>
          )}

          {/* Key Commands Reference */}
          {activeLesson.keyCommands && activeLesson.keyCommands.length > 0 && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-[#32D7FF]" />
                <span className="text-xs font-semibold text-white">{t("lesson.commandsUsed")}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {activeLesson.keyCommands.map((cmd) => (
                  <span key={cmd} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 font-mono text-xs text-[#32D7FF] font-medium">
                    {cmd}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Practice Task */}
          {activeLesson.practiceTask && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <FolderKanban className="w-4 h-4 text-[#BF5AF2]" />
                <span className="text-xs font-semibold text-white">{t("lesson.practiceTask")}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {activeLesson.practiceTask}
              </p>
            </GlassCard>
          )}

          {/* Notes */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white">{t("lesson.yourNotes")}</span>
              <button onClick={handleSaveNote} className="glass-btn px-3 py-1 rounded-lg text-[11px] font-medium">
                {t("lesson.save")}
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t("lesson.writeNotes")}
              className="w-full bg-white/[0.03] border border-white/8 rounded-xl p-3 text-xs leading-relaxed resize-y min-h-[80px] outline-none focus:border-[var(--accent-blue)] transition-colors placeholder:text-white/15"
            />
          </GlassCard>
        </div>

        {/* Sidebar — Module/Lesson Navigation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">{t("lesson.courseContent")}</h3>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {allLessons.filter((l) => progress.isLessonCompleted(l.id)).length}/{allLessons.length}
            </span>
          </div>

          {course.modules.map((mod, mi) => {
            const isExpanded = expandedModule === mod.id;
            const completedCount = mod.lessons.filter((l) => progress.isLessonCompleted(l.id)).length;

            return (
              <GlassCard key={mod.id} delay={0.05 * mi} className="overflow-hidden">
                <button
                  onClick={() => setExpandedModule(isExpanded ? "" : mod.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: completedCount === mod.lessons.length ? "#30D15820" : "rgba(255,255,255,0.05)",
                        color: completedCount === mod.lessons.length ? "#30D158" : "var(--text-secondary)",
                      }}
                    >
                      {completedCount === mod.lessons.length ? <Check className="w-4 h-4" /> : mi + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{mod.title}</h4>
                      <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                        {completedCount}/{mod.lessons.length} lessons &middot; {mod.description.slice(0, 40)}...
                      </p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 space-y-1">
                        {mod.lessons.map((lesson) => {
                          const isActive = activeLesson.id === lesson.id;
                          const done = progress.isLessonCompleted(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => handleSelectLesson(lesson)}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                                isActive
                                  ? "bg-[#007AFF]/10 border border-[#007AFF]/20"
                                  : "hover:bg-white/[0.03] border border-transparent"
                              }`}
                            >
                              {done ? (
                                <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                              )}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs font-medium truncate ${isActive ? "text-white" : ""}`}
                                  style={!isActive ? { color: "var(--text-secondary)" } : {}}
                                >
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span style={{ color: typeColors[lesson.type] }}>{typeIcons[lesson.type]}</span>
                                  <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                                    {lesson.duration}
                                  </span>
                                  {progress.getQuizScore(lesson.id) !== undefined && (
                                    <span className="text-[10px] text-[#FF9F0A]">
                                      Quiz: {progress.getQuizScore(lesson.id)}%
                                    </span>
                                  )}
                                </div>
                              </div>
                              {isActive && <ChevronRight className="w-3 h-3 text-[#007AFF] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
