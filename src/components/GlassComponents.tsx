"use client";

import React from "react";
import { motion } from "framer-motion";

export function GlassCard({
  children,
  className = "",
  hover = false,
  glow,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "purple" | "cyan";
  delay?: number;
}) {
  const glowClass = glow ? `glow-${glow}` : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass rounded-2xl ${hover ? "card-hover cursor-pointer" : ""} ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GlassButton({
  children,
  className = "",
  variant = "default",
  size = "md",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-7 py-3.5 text-base rounded-2xl",
  };

  return (
    <button
      onClick={onClick}
      className={`${variant === "primary" ? "glass-btn-primary" : "glass-btn"} ${sizeClasses[size]} font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressRing({
  progress,
  size = 48,
  strokeWidth = 4,
  color = "#007AFF",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring__circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {progress}%
      </span>
    </div>
  );
}

export function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Professional: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <span className={`tag-pill border ${colors[level] || colors.Beginner}`}>
      {level}
    </span>
  );
}

export function StatCard({
  label,
  value,
  icon,
  color = "#007AFF",
  delay = 0,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-2xl p-5 flex items-center gap-4"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</p>
      </div>
    </motion.div>
  );
}

export function ActivityBar({ day, hours, maxHours }: { day: string; hours: number; maxHours: number }) {
  const height = (hours / maxHours) * 100;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-24 rounded-lg bg-white/5 relative overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 w-full rounded-lg"
          style={{ background: "linear-gradient(180deg, #007AFF, #32D7FF)" }}
        />
      </div>
      <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{day}</span>
      <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>{hours}h</span>
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-tertiary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full glass-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--accent-blue)] transition-colors placeholder:text-white/25"
      />
    </div>
  );
}
