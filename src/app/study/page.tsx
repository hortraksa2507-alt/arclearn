"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, BookOpen, Timer, ListTodo } from "lucide-react";
import AppShell from "@/components/AppShell";
import { StatCard } from "@/components/GlassComponents";
import StudyTimer from "@/components/study/StudyTimer";
import TodoPanel from "@/components/study/TodoPanel";
import CalendarPanel from "@/components/study/CalendarPanel";
import SpotifyPlayer from "@/components/study/SpotifyPlayer";
import StickyNotesBoard from "@/components/study/StickyNotesBoard";
import IntegrationsBar from "@/components/study/IntegrationsBar";
import DemoVideo from "@/components/study/DemoVideo";
import { StudyProvider, useStudy } from "@/context/StudyContext";
import { useAuth } from "@/context/AuthContext";
import { formatDuration } from "@/lib/taskDurationEstimator";

function StudyHubContent() {
  const { user } = useAuth();
  const { todos, events, completedPomodoros, connectedApps, stickyNotes } = useStudy();

  const pendingTodos = todos.filter((t) => !t.completed);
  const totalEstimated = pendingTodos.reduce((sum, t) => sum + t.estimatedMinutes, 0);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayEvents = events.filter((e) => e.date === todayStr);

  return (
    <AppShell
      title="Study Hub"
      subtitle={`Your personalized workspace, ${user?.name?.split(" ")[0] || "Architect"}`}
    >
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-elevated rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-br from-[#1DB954]/15 to-[#007AFF]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" style={{ color: "var(--accent-orange)" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-orange)" }}>
                All-in-One Study System
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              Focus smarter with everything in one place
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Pomodoro timer, synced calendar, smart to-dos, lofi beats, and a brainstorm board —
              integrated with the productivity apps you use every day.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Spotify", "Notion", "Calendar", "Drive", "Slack"].map((app) => (
              <span
                key={app}
                className="tag-pill border text-[9px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Tasks Remaining"
          value={String(pendingTodos.length)}
          icon={<ListTodo className="w-5 h-5" />}
          color="#30D158"
          delay={0.05}
        />
        <StatCard
          label="Est. Work Left"
          value={formatDuration(totalEstimated)}
          icon={<BookOpen className="w-5 h-5" />}
          color="#007AFF"
          delay={0.1}
        />
        <StatCard
          label="Today's Events"
          value={String(todayEvents.length)}
          icon={<Timer className="w-5 h-5" />}
          color="#FF9F0A"
          delay={0.15}
        />
        <StatCard
          label="Pomodoros Done"
          value={String(completedPomodoros)}
          icon={<Zap className="w-5 h-5" />}
          color="#BF5AF2"
          delay={0.2}
        />
      </div>

      {/* Integrations bar — like the productivity apps ad */}
      <div className="mb-6">
        <IntegrationsBar />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-4 space-y-6">
          <StudyTimer />
          <SpotifyPlayer />
        </div>
        <div className="lg:col-span-4">
          <div className="h-full min-h-[500px]">
            <TodoPanel />
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="h-full min-h-[500px]">
            <CalendarPanel />
          </div>
        </div>
      </div>

      {/* Brainstorm board */}
      <StickyNotesBoard />

      <DemoVideo />

      <p className="text-[10px] text-center mt-6" style={{ color: "var(--text-tertiary)" }}>
        {connectedApps.length} apps connected · {stickyNotes.length} brainstorm notes · Data saved locally
      </p>
    </AppShell>
  );
}

export default function StudyPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <StudyProvider userId={user.id}>
      <StudyHubContent />
    </StudyProvider>
  );
}
