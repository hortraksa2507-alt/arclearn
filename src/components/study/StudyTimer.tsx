"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain } from "lucide-react";
import { GlassCard, ProgressRing } from "@/components/GlassComponents";
import { useStudy, type TimerPhase } from "@/context/StudyContext";
import { formatDuration } from "@/lib/taskDurationEstimator";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const phaseConfig: Record<TimerPhase, { label: string; color: string; icon: React.ReactNode }> = {
  focus: { label: "Focus Session", color: "#007AFF", icon: <Brain className="w-4 h-4" /> },
  break: { label: "Break Time", color: "#30D158", icon: <Coffee className="w-4 h-4" /> },
  idle: { label: "Ready to Study", color: "#BF5AF2", icon: <Brain className="w-4 h-4" /> },
};

export default function StudyTimer() {
  const {
    timerPhase,
    timerSecondsLeft,
    timerRunning,
    focusMinutes,
    breakMinutes,
    completedPomodoros,
    activeTodoId,
    todos,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    setFocusMinutes,
    setBreakMinutes,
  } = useStudy();

  const config = phaseConfig[timerPhase];
  const totalSeconds =
    timerPhase === "break" ? breakMinutes * 60 : focusMinutes * 60;
  const progress =
    totalSeconds > 0 ? ((totalSeconds - timerSecondsLeft) / totalSeconds) * 100 : 0;

  const activeTodo = todos.find((t) => t.id === activeTodoId);

  return (
    <GlassCard className="p-6" glow="blue">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: config.color }}>
            Study Timer
          </p>
          <div className="flex items-center gap-2 mt-1">
            {config.icon}
            <span className="text-sm font-medium text-white">{config.label}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: "#FF9F0A" }}>
            {completedPomodoros}
          </p>
          <p className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
            pomodoros today
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <ProgressRing progress={progress} size={160} strokeWidth={8} color={config.color} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={timerSecondsLeft}
              initial={{ scale: 1.05, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold font-mono text-white"
            >
              {formatTime(timerSecondsLeft)}
            </motion.span>
            <span className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
              {timerPhase === "break" ? "take a breather" : "stay focused"}
            </span>
          </div>
        </div>

        {activeTodo && (
          <div className="glass-subtle rounded-xl px-4 py-2 mb-4 w-full text-center">
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              Working on
            </p>
            <p className="text-sm font-medium text-white truncate">{activeTodo.title}</p>
            <p className="text-[11px]" style={{ color: config.color }}>
              Est. {formatDuration(activeTodo.estimatedMinutes)}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={timerRunning ? pauseTimer : startTimer}
            className="glass-btn-primary w-14 h-14 rounded-2xl flex items-center justify-center"
          >
            {timerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button onClick={resetTimer} className="glass-btn w-11 h-11 rounded-xl flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={skipPhase} className="glass-btn w-11 h-11 rounded-xl flex items-center justify-center">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
        <div>
          <label className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Focus (min)
          </label>
          <select
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
            disabled={timerRunning}
            className="w-full mt-1 glass-subtle rounded-lg px-3 py-2 text-sm outline-none"
          >
            {[15, 20, 25, 30, 45, 50, 60].map((m) => (
              <option key={m} value={m} className="bg-[#0a0a1a]">
                {m} min
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Break (min)
          </label>
          <select
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            disabled={timerRunning}
            className="w-full mt-1 glass-subtle rounded-lg px-3 py-2 text-sm outline-none"
          >
            {[3, 5, 10, 15].map((m) => (
              <option key={m} value={m} className="bg-[#0a0a1a]">
                {m} min
              </option>
            ))}
          </select>
        </div>
      </div>
    </GlassCard>
  );
}
