"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import {
  DEFAULT_CALENDAR_EVENTS,
  DEFAULT_STICKY_NOTES,
  DEFAULT_TODOS,
  PRODUCTIVITY_APPS,
} from "@/data/integrations";
import { estimateTaskDuration, type TaskPriority } from "@/lib/taskDurationEstimator";

export type TimerPhase = "focus" | "break" | "idle";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  estimatedMinutes: number;
  source?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  source?: string;
}

export interface StickyNote {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface StudyState {
  todos: TodoItem[];
  events: CalendarEvent[];
  stickyNotes: StickyNote[];
  connectedApps: string[];
  focusMinutes: number;
  breakMinutes: number;
  timerPhase: TimerPhase;
  timerSecondsLeft: number;
  timerRunning: boolean;
  completedPomodoros: number;
  activeTodoId: string | null;
}

interface StudyContextValue extends StudyState {
  addTodo: (title: string, priority?: TaskPriority) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setActiveTodo: (id: string | null) => void;
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  addStickyNote: (text?: string) => void;
  updateStickyNote: (id: string, updates: Partial<StickyNote>) => void;
  removeStickyNote: (id: string) => void;
  toggleAppConnection: (appId: string) => void;
  isAppConnected: (appId: string) => boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipPhase: () => void;
  setFocusMinutes: (m: number) => void;
  setBreakMinutes: (m: number) => void;
}

const STORAGE_KEY = "arclearn-study-system";

const defaultState: StudyState = {
  todos: DEFAULT_TODOS,
  events: DEFAULT_CALENDAR_EVENTS,
  stickyNotes: DEFAULT_STICKY_NOTES,
  connectedApps: ["spotify", "notion", "google-calendar", "google-drive", "gmail"],
  focusMinutes: 25,
  breakMinutes: 5,
  timerPhase: "idle",
  timerSecondsLeft: 25 * 60,
  timerRunning: false,
  completedPomodoros: 0,
  activeTodoId: null,
};

const StudyContext = createContext<StudyContextValue | null>(null);

function loadState(userId: string): Partial<StudyState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(userId: string, state: StudyState) {
  if (typeof window === "undefined") return;
  const { timerRunning, timerSecondsLeft, timerPhase, ...persisted } = state;
  localStorage.setItem(`${STORAGE_KEY}-${userId}`, JSON.stringify(persisted));
}

export function StudyProvider({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<StudyState>(() => ({
    ...defaultState,
    ...loadState(userId),
    timerPhase: "idle",
    timerRunning: false,
    timerSecondsLeft: (loadState(userId).focusMinutes ?? 25) * 60,
  }));

  useEffect(() => {
    saveState(userId, state);
  }, [userId, state]);

  useEffect(() => {
    if (!state.timerRunning) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.timerSecondsLeft <= 1) {
          if (prev.timerPhase === "focus") {
            return {
              ...prev,
              timerPhase: "break",
              timerSecondsLeft: prev.breakMinutes * 60,
              completedPomodoros: prev.completedPomodoros + 1,
            };
          }
          return {
            ...prev,
            timerPhase: "focus",
            timerSecondsLeft: prev.focusMinutes * 60,
          };
        }
        return { ...prev, timerSecondsLeft: prev.timerSecondsLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timerRunning]);

  const addTodo = useCallback((title: string, priority: TaskPriority = "medium") => {
    const estimate = estimateTaskDuration(title, priority);
    setState((prev) => ({
      ...prev,
      todos: [
        {
          id: `todo-${Date.now()}`,
          title,
          completed: false,
          priority,
          estimatedMinutes: estimate.minutes,
        },
        ...prev.todos,
      ],
    }));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.filter((t) => t.id !== id),
      activeTodoId: prev.activeTodoId === id ? null : prev.activeTodoId,
    }));
  }, []);

  const setActiveTodo = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, activeTodoId: id }));
  }, []);

  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    setState((prev) => ({
      ...prev,
      events: [...prev.events, { ...event, id: `evt-${Date.now()}` }],
    }));
  }, []);

  const addStickyNote = useCallback((text = "New idea...") => {
    const colors = ["#FFEB3B", "#FF9800", "#4CAF50", "#2196F3", "#E91E63", "#9C27B0"];
    setState((prev) => ({
      ...prev,
      stickyNotes: [
        ...prev.stickyNotes,
        {
          id: `note-${Date.now()}`,
          text,
          color: colors[Math.floor(Math.random() * colors.length)],
          x: 50 + Math.random() * 100,
          y: 50 + Math.random() * 80,
          width: 170,
          height: 130,
        },
      ],
    }));
  }, []);

  const updateStickyNote = useCallback((id: string, updates: Partial<StickyNote>) => {
    setState((prev) => ({
      ...prev,
      stickyNotes: prev.stickyNotes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    }));
  }, []);

  const removeStickyNote = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      stickyNotes: prev.stickyNotes.filter((n) => n.id !== id),
    }));
  }, []);

  const toggleAppConnection = useCallback((appId: string) => {
    setState((prev) => ({
      ...prev,
      connectedApps: prev.connectedApps.includes(appId)
        ? prev.connectedApps.filter((id) => id !== appId)
        : [...prev.connectedApps, appId],
    }));
  }, []);

  const isAppConnected = useCallback(
    (appId: string) => state.connectedApps.includes(appId),
    [state.connectedApps]
  );

  const startTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timerRunning: true,
      timerPhase: prev.timerPhase === "idle" ? "focus" : prev.timerPhase,
      timerSecondsLeft:
        prev.timerPhase === "idle" ? prev.focusMinutes * 60 : prev.timerSecondsLeft,
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState((prev) => ({ ...prev, timerRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timerRunning: false,
      timerPhase: "idle",
      timerSecondsLeft: prev.focusMinutes * 60,
    }));
  }, []);

  const skipPhase = useCallback(() => {
    setState((prev) => {
      if (prev.timerPhase === "focus" || prev.timerPhase === "idle") {
        return {
          ...prev,
          timerPhase: "break",
          timerSecondsLeft: prev.breakMinutes * 60,
        };
      }
      return {
        ...prev,
        timerPhase: "focus",
        timerSecondsLeft: prev.focusMinutes * 60,
      };
    });
  }, []);

  const setFocusMinutes = useCallback((m: number) => {
    setState((prev) => ({
      ...prev,
      focusMinutes: m,
      timerSecondsLeft: prev.timerPhase === "idle" ? m * 60 : prev.timerSecondsLeft,
    }));
  }, []);

  const setBreakMinutes = useCallback((m: number) => {
    setState((prev) => ({ ...prev, breakMinutes: m }));
  }, []);

  return (
    <StudyContext.Provider
      value={{
        ...state,
        addTodo,
        toggleTodo,
        removeTodo,
        setActiveTodo,
        addEvent,
        addStickyNote,
        updateStickyNote,
        removeStickyNote,
        toggleAppConnection,
        isAppConnected,
        startTimer,
        pauseTimer,
        resetTimer,
        skipPhase,
        setFocusMinutes,
        setBreakMinutes,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
}
