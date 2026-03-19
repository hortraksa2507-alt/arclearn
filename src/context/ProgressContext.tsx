"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ProgressState {
  completedLessons: string[];
  currentCourseId: string;
  currentLessonId: string;
  streakDays: number;
  lastActiveDate: string;
  totalMinutes: number;
  quizScores: Record<string, number>;
  bookmarkedLessons: string[];
  notes: Record<string, string>;
}

interface ProgressContextType extends ProgressState {
  completeLesson: (lessonId: string) => void;
  uncompleteLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
  addMinutes: (mins: number) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  getQuizScore: (quizId: string) => number | undefined;
  toggleBookmark: (lessonId: string) => void;
  isBookmarked: (lessonId: string) => boolean;
  saveNote: (lessonId: string, note: string) => void;
  getNote: (lessonId: string) => string;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  completedLessons: [],
  currentCourseId: "fundamentals",
  currentLessonId: "fund-1-1",
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  totalMinutes: 0,
  quizScores: {},
  bookmarkedLessons: [],
  notes: {},
};

const STORAGE_PREFIX = "arclearn-progress";

function getStorageKey(userId?: string): string {
  return userId ? `${STORAGE_PREFIX}-${userId}` : STORAGE_PREFIX;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children, userId }: { children: React.ReactNode; userId?: string }) {
  const [state, setState] = useState<ProgressState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [activeUserId, setActiveUserId] = useState(userId);

  // Re-load when userId changes
  useEffect(() => {
    setActiveUserId(userId);
    setLoaded(false);
  }, [userId]);

  // Load from localStorage
  useEffect(() => {
    if (loaded) return;
    try {
      const key = getStorageKey(activeUserId);
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as ProgressState;
        // Update streak
        const today = new Date().toISOString().split("T")[0];
        const lastDate = parsed.lastActiveDate;
        if (lastDate) {
          const diff = Math.floor(
            (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diff === 1) {
            parsed.streakDays = (parsed.streakDays || 0) + 1;
          } else if (diff > 1) {
            parsed.streakDays = 1;
          }
        }
        parsed.lastActiveDate = today;
        setState(parsed);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (loaded) {
      const key = getStorageKey(activeUserId);
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, loaded, activeUserId]);

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }));
  }, []);

  const uncompleteLesson = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
    }));
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  );

  const setCurrentLesson = useCallback((courseId: string, lessonId: string) => {
    setState((prev) => ({ ...prev, currentCourseId: courseId, currentLessonId: lessonId }));
  }, []);

  const addMinutes = useCallback((mins: number) => {
    setState((prev) => ({ ...prev, totalMinutes: prev.totalMinutes + mins }));
  }, []);

  const saveQuizScore = useCallback((quizId: string, score: number) => {
    setState((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score },
    }));
  }, []);

  const getQuizScore = useCallback((quizId: string) => state.quizScores[quizId], [state.quizScores]);

  const toggleBookmark = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      bookmarkedLessons: prev.bookmarkedLessons.includes(lessonId)
        ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId],
    }));
  }, []);

  const isBookmarked = useCallback(
    (lessonId: string) => state.bookmarkedLessons.includes(lessonId),
    [state.bookmarkedLessons]
  );

  const saveNote = useCallback((lessonId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: note },
    }));
  }, []);

  const getNote = useCallback((lessonId: string) => state.notes[lessonId] || "", [state.notes]);

  const resetProgress = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(getStorageKey(activeUserId));
  }, [activeUserId]);

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        completeLesson,
        uncompleteLesson,
        isLessonCompleted,
        setCurrentLesson,
        addMinutes,
        saveQuizScore,
        getQuizScore,
        toggleBookmark,
        isBookmarked,
        saveNote,
        getNote,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be inside ProgressProvider");
  return ctx;
}
