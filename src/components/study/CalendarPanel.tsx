"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";
import { useStudy } from "@/context/StudyContext";
import { PRODUCTIVITY_APPS } from "@/data/integrations";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return DAY_NAMES[d.getDay()];
}

function formatDateNum(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").getDate().toString();
}

export default function CalendarPanel() {
  const { events, isAppConnected } = useStudy();
  const [weekOffset, setWeekOffset] = React.useState(0);

  const weekDays = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() + weekOffset * 7);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  }, [weekOffset]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof events> = {};
    for (const evt of events) {
      if (!map[evt.date]) map[evt.date] = [];
      map[evt.date].push(evt);
    }
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [events]);

  const todayStr = new Date().toISOString().split("T")[0];
  const calendarConnected =
    isAppConnected("google-calendar") || isAppConnected("apple-calendar");

  return (
    <GlassCard className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-orange)" }}>
            Calendar
          </p>
          <p className="text-sm text-white font-medium mt-0.5">
            {calendarConnected ? "Synced with your apps" : "Connect calendar to sync"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="glass-btn w-8 h-8 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="glass-btn px-3 h-8 rounded-lg text-[11px] font-medium"
          >
            Today
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="glass-btn w-8 h-8 rounded-lg flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map((dateStr) => {
          const isToday = dateStr === todayStr;
          const dayEvents = eventsByDate[dateStr] || [];
          return (
            <div
              key={dateStr}
              className={`rounded-xl p-2 text-center transition-all ${
                isToday ? "glass-elevated ring-1 ring-[#007AFF]/40" : "glass-subtle"
              }`}
            >
              <p className="text-[9px] uppercase" style={{ color: "var(--text-tertiary)" }}>
                {formatDayLabel(dateStr)}
              </p>
              <p className={`text-lg font-bold ${isToday ? "text-[#007AFF]" : "text-white"}`}>
                {formatDateNum(dateStr)}
              </p>
              {dayEvents.length > 0 && (
                <div className="flex justify-center gap-0.5 mt-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: e.color }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {weekDays.flatMap((dateStr) => {
          const dayEvents = eventsByDate[dateStr] || [];
          if (dayEvents.length === 0) return [];
          return dayEvents.map((evt, i) => {
            const sourceApp = PRODUCTIVITY_APPS.find((a) => a.id === evt.source);
            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-subtle rounded-xl p-3 flex items-start gap-3"
              >
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{ background: evt.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{evt.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {formatDayLabel(dateStr)} · {evt.startTime}
                    {evt.endTime !== evt.startTime && ` – ${evt.endTime}`}
                  </p>
                  {sourceApp && (
                    <span
                      className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${sourceApp.color}18`, color: sourceApp.color }}
                    >
                      via {sourceApp.name}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          });
        })}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="w-8 h-8 mb-2" style={{ color: "var(--text-tertiary)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              No events this week
            </p>
          </div>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-white/5 flex gap-2">
        {["google-calendar", "apple-calendar"].map((id) => {
          const app = PRODUCTIVITY_APPS.find((a) => a.id === id)!;
          const connected = isAppConnected(id);
          return (
            <a
              key={id}
              href={app.connectUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 glass-subtle rounded-lg px-3 py-2 flex items-center justify-between text-[11px] hover:bg-white/5 transition-colors"
            >
              <span style={{ color: connected ? app.color : "var(--text-tertiary)" }}>
                {app.name.split(" ")[0]}
              </span>
              <span className="flex items-center gap-1">
                {connected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                )}
                <ExternalLink className="w-3 h-3" style={{ color: "var(--text-tertiary)" }} />
              </span>
            </a>
          );
        })}
      </div>
    </GlassCard>
  );
}
