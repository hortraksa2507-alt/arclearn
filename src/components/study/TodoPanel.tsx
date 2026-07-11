"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Clock, Sparkles, Target } from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";
import { useStudy } from "@/context/StudyContext";
import {
  estimateTaskDuration,
  formatDuration,
  type TaskPriority,
} from "@/lib/taskDurationEstimator";

const priorityColors: Record<TaskPriority, string> = {
  low: "#30D158",
  medium: "#FF9F0A",
  high: "#FF2D55",
};

export default function TodoPanel() {
  const { todos, addTodo, toggleTodo, removeTodo, setActiveTodo, activeTodoId } = useStudy();
  const [newTitle, setNewTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [preview, setPreview] = useState<ReturnType<typeof estimateTaskDuration> | null>(null);

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);
  const totalEstimated = pending.reduce((sum, t) => sum + t.estimatedMinutes, 0);

  const handleInputChange = (value: string) => {
    setNewTitle(value);
    setPreview(value.trim() ? estimateTaskDuration(value, priority) : null);
  };

  const handlePriorityChange = (p: TaskPriority) => {
    setPriority(p);
    if (newTitle.trim()) setPreview(estimateTaskDuration(newTitle, p));
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTodo(newTitle.trim(), priority);
    setNewTitle("");
    setPreview(null);
  };

  return (
    <GlassCard className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-green)" }}>
            To-Do List
          </p>
          <p className="text-sm text-white font-medium mt-0.5">
            {pending.length} tasks · {formatDuration(totalEstimated)} total
          </p>
        </div>
        <div className="flex items-center gap-1 glass-subtle rounded-lg px-2 py-1">
          <Sparkles className="w-3 h-3" style={{ color: "var(--accent-purple)" }} />
          <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
            AI estimates
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add task — e.g. Write 3-page essay..."
          className="flex-1 glass-subtle rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/25"
        />
        <button onClick={handleAdd} className="glass-btn-primary px-4 rounded-xl">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {(["low", "medium", "high"] as TaskPriority[]).map((p) => (
          <button
            key={p}
            onClick={() => handlePriorityChange(p)}
            className="tag-pill border text-[9px] transition-all"
            style={{
              background: priority === p ? `${priorityColors[p]}25` : "transparent",
              color: priorityColors[p],
              borderColor: priority === p ? `${priorityColors[p]}50` : "rgba(255,255,255,0.1)",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-subtle rounded-xl px-4 py-3 mb-4 flex items-center gap-3"
          >
            <Clock className="w-4 h-4 shrink-0" style={{ color: "var(--accent-cyan)" }} />
            <div>
              <p className="text-sm font-semibold text-white">
                Suggested: {formatDuration(preview.minutes)}
              </p>
              <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                {preview.reasoning}
              </p>
            </div>
            <span
              className="tag-pill border text-[8px] ml-auto"
              style={{
                background: "rgba(191,90,242,0.15)",
                color: "#BF5AF2",
                borderColor: "rgba(191,90,242,0.3)",
              }}
            >
              {preview.confidence}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {pending.map((todo, i) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-subtle rounded-xl p-3 flex items-start gap-3 group cursor-pointer transition-all ${
              activeTodoId === todo.id ? "ring-1 ring-[#007AFF]/50" : ""
            }`}
            onClick={() => setActiveTodo(activeTodoId === todo.id ? null : todo.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTodo(todo.id);
              }}
              className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center shrink-0 mt-0.5 hover:border-[#30D158] transition-colors"
            >
              {todo.completed && <Check className="w-3 h-3 text-[#30D158]" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white leading-snug">{todo.title}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="flex items-center gap-1 text-[10px] font-medium"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  <Clock className="w-3 h-3" />
                  {formatDuration(todo.estimatedMinutes)}
                </span>
                <span
                  className="tag-pill text-[8px]"
                  style={{ background: `${priorityColors[todo.priority]}20`, color: priorityColors[todo.priority] }}
                >
                  {todo.priority}
                </span>
                {activeTodoId === todo.id && (
                  <span className="flex items-center gap-0.5 text-[9px]" style={{ color: "#007AFF" }}>
                    <Target className="w-3 h-3" /> active
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(todo.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
            >
              <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--text-tertiary)" }} />
            </button>
          </motion.div>
        ))}

        {completed.length > 0 && (
          <div className="pt-3 mt-3 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
              Completed ({completed.length})
            </p>
            {completed.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 py-2 opacity-50"
              >
                <div className="w-5 h-5 rounded-md bg-[#30D158]/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#30D158]" />
                </div>
                <p className="text-sm line-through" style={{ color: "var(--text-secondary)" }}>
                  {todo.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
