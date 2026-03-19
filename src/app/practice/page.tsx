"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Keyboard,
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { GlassCard, SearchBar } from "@/components/GlassComponents";
import { commandReference as commandReferenceEn, type CommandRef } from "@/data/courses";
import { getTranslatedCommand } from "@/data/courseTranslations";
import { useLanguage } from "@/context/LanguageContext";

const categories = ["All", "Draw", "Modify", "Annotate", "Format", "View", "3D", "General"];

const categoryColors: Record<string, string> = {
  Draw: "#007AFF",
  Modify: "#BF5AF2",
  Annotate: "#FF9F0A",
  Format: "#30D158",
  View: "#32D7FF",
  "3D": "#FF2D55",
  General: "#FF453A",
};

interface TerminalLine {
  text: string;
  type: "input" | "response" | "success" | "error" | "info";
}

export default function PracticePage() {
  const { t, lang } = useLanguage();
  const commandReference = commandReferenceEn.map((c) => getTranslatedCommand(c.command, lang, c));
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [practiceCommand, setPracticeCommand] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<CommandRef | null>(null);
  const [commandsUsed, setCommandsUsed] = useState<Set<string>>(new Set());
  const terminalRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to ArcLearn Command Lab!", type: "info" },
    { text: "Type any AutoCAD command to learn about it.", type: "info" },
    { text: "Try: LINE, CIRCLE, OFFSET, TRIM, or any command from the reference.", type: "info" },
    { text: "Type HELP for a list of things you can try.", type: "info" },
    { text: "─────────────────────────────────────", type: "info" },
  ]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const filtered = commandReference.filter((cmd) => {
    const matchSearch =
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.shortcut.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || cmd.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const addLines = (lines: TerminalLine[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceCommand.trim()) return;

    const input = practiceCommand.trim();
    const upper = input.toUpperCase();
    setPracticeCommand("");

    addLines([{ text: `> ${input}`, type: "input" }]);

    if (upper === "HELP") {
      addLines([
        { text: "Available commands to try:", type: "info" },
        { text: "  LINE (L)     - Draw straight lines", type: "response" },
        { text: "  CIRCLE (C)   - Draw circles", type: "response" },
        { text: "  ARC (A)      - Draw arcs", type: "response" },
        { text: "  PLINE (PL)   - Draw polylines", type: "response" },
        { text: "  RECTANGLE    - Draw rectangles", type: "response" },
        { text: "  MOVE (M)     - Move objects", type: "response" },
        { text: "  COPY (CO)    - Copy objects", type: "response" },
        { text: "  ROTATE (RO)  - Rotate objects", type: "response" },
        { text: "  OFFSET (O)   - Create parallel copies", type: "response" },
        { text: "  TRIM (TR)    - Trim at intersections", type: "response" },
        { text: "  EXTEND (EX)  - Extend to boundaries", type: "response" },
        { text: "  MIRROR (MI)  - Create mirror copies", type: "response" },
        { text: "  LAYER (LA)   - Manage layers", type: "response" },
        { text: "  EXTRUDE      - 2D to 3D", type: "response" },
        { text: "", type: "info" },
        { text: "Also try: CLEAR, QUIZ, PRACTICE", type: "info" },
      ]);
      return;
    }

    if (upper === "CLEAR") {
      setHistory([{ text: "Terminal cleared. Type a command to learn about it.", type: "info" }]);
      return;
    }

    if (upper === "QUIZ") {
      const randomCmd = commandReference[Math.floor(Math.random() * commandReference.length)];
      addLines([
        { text: "─── Quick Quiz ───", type: "info" },
        { text: `What does the command "${randomCmd.command}" do?`, type: "info" },
        { text: `Shortcut: ${randomCmd.shortcut}`, type: "response" },
        { text: `Answer: ${randomCmd.description}`, type: "success" },
        { text: `Syntax: ${randomCmd.syntax}`, type: "response" },
        { text: `Architecture use: ${randomCmd.architectureUse}`, type: "info" },
      ]);
      return;
    }

    if (upper === "PRACTICE") {
      addLines([
        { text: "─── Practice Exercises ───", type: "info" },
        { text: "Try typing these command sequences:", type: "info" },
        { text: "", type: "info" },
        { text: "Exercise 1 - Draw a room:", type: "success" },
        { text: "  L → @6000,0 → @0,4000 → @-6000,0 → C", type: "response" },
        { text: "", type: "info" },
        { text: "Exercise 2 - Create wall thickness:", type: "success" },
        { text: "  O → 200 → select wall → click inside", type: "response" },
        { text: "", type: "info" },
        { text: "Exercise 3 - Door swing:", type: "success" },
        { text: "  A → CE → click hinge → click edge → A → 90", type: "response" },
        { text: "", type: "info" },
        { text: "Exercise 4 - Copy a window:", type: "success" },
        { text: "  CO → select → Enter → base point → @2000,0", type: "response" },
      ]);
      return;
    }

    // Look up the command
    const found = commandReference.find(
      (c) => c.command === upper || c.shortcut === upper
    );

    if (found) {
      setCommandsUsed((prev) => new Set(prev).add(found.command));
      addLines([
        { text: `Command: ${found.command} (shortcut: ${found.shortcut})`, type: "success" },
        { text: `  ${found.description}`, type: "response" },
        { text: "", type: "info" },
        { text: `  Syntax:`, type: "info" },
        { text: `    ${found.syntax}`, type: "response" },
        { text: "", type: "info" },
        { text: `  Example:`, type: "info" },
        { text: `    ${found.example}`, type: "response" },
        { text: "", type: "info" },
        { text: `  Architecture use:`, type: "info" },
        { text: `    ${found.architectureUse}`, type: "response" },
        { text: "", type: "info" },
      ]);
    } else {
      // Try partial matching
      const partials = commandReference.filter(
        (c) =>
          c.command.includes(upper) ||
          c.shortcut.includes(upper) ||
          c.description.toUpperCase().includes(upper)
      );
      if (partials.length > 0) {
        addLines([
          { text: `"${input}" not found exactly. Did you mean:`, type: "error" },
          ...partials.slice(0, 5).map((p) => ({
            text: `  ${p.command} (${p.shortcut}) - ${p.description}`,
            type: "response" as const,
          })),
        ]);
      } else {
        addLines([
          { text: `Unknown command: "${input}"`, type: "error" },
          { text: "Type HELP to see available commands.", type: "info" },
        ]);
      }
    }
  };

  const lineColors: Record<string, string> = {
    input: "#32D7FF",
    response: "rgba(255,255,255,0.6)",
    success: "#30D158",
    error: "#FF453A",
    info: "rgba(255,255,255,0.35)",
  };

  return (
    <AppShell title={t("practice.title")} subtitle={t("practice.subtitle")}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Terminal + Tips */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#32D7FF]" />
            {t("practice.interactiveTerminal")}
          </h3>

          <GlassCard className="overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-2 text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
                ArcLearn Terminal &middot; {commandsUsed.size} commands explored
              </span>
            </div>

            <div ref={terminalRef} className="h-[360px] overflow-y-auto p-4 font-mono text-[11px] space-y-0.5">
              {history.map((line, i) => (
                <motion.div
                  key={i}
                  initial={i > 4 ? { opacity: 0, x: -5 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: lineColors[line.type] }}
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/5">
              <div className="flex items-center px-4 py-3 gap-2">
                <span className="text-[#32D7FF] text-xs font-mono">{">"}</span>
                <input
                  type="text"
                  value={practiceCommand}
                  onChange={(e) => setPracticeCommand(e.target.value)}
                  placeholder="Type a command (e.g., LINE, OFFSET, TRIM)..."
                  className="flex-1 bg-transparent text-xs font-mono outline-none text-white placeholder:text-white/20"
                  autoFocus
                />
                <button type="submit" className="glass-btn w-7 h-7 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Tips */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Keyboard className="w-4 h-4 text-[#FF9F0A]" />
              <span className="text-xs font-semibold text-white">{t("practice.essentialShortcuts")}</span>
            </div>
            <div className="space-y-2.5">
              {[
                { key: "ESC", desc: "Cancel any active command" },
                { key: "ENTER", desc: "Confirm input or repeat last command" },
                { key: "SPACE", desc: "Same as Enter — confirm/repeat" },
                { key: "F3", desc: "Toggle Object Snap (OSNAP)" },
                { key: "F8", desc: "Toggle Orthogonal mode (ORTHO)" },
                { key: "Ctrl+Z", desc: "Undo last action" },
                { key: "Ctrl+S", desc: "Save your drawing" },
                { key: "Z + E", desc: "Zoom to see everything" },
              ].map((s) => (
                <div key={s.key} className="flex items-start gap-2">
                  <span className="font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#32D7FF] text-[10px] shrink-0">
                    {s.key}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Practice */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#BF5AF2]" />
              <span className="text-xs font-semibold text-white">{t("practice.quickExercises")}</span>
            </div>
            <div className="space-y-2">
              {[
                "Draw a 6m x 4m room with LINE",
                "Create wall thickness with OFFSET",
                "Add a door swing with ARC",
                "Copy a window with COPY",
                "Clean intersections with TRIM",
              ].map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPracticeCommand("PRACTICE");
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/[0.03] transition-all flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-md bg-[#BF5AF2]/15 text-[#BF5AF2] flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    {ex}
                  </span>
                  <ChevronRight className="w-3 h-3 ml-auto" style={{ color: "var(--text-tertiary)" }} />
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Command Reference */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h3 className="text-base font-semibold text-white">{t("practice.commandReference")}</h3>
            <div className="flex-1 max-w-xs">
              <SearchBar value={search} onChange={setSearch} placeholder={t("practice.searchCommands")} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat ? "glass-btn-primary" : "glass-btn"
                }`}
              >
                {cat !== "All" && (
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ background: categoryColors[cat] }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Selected command detail */}
          {selectedCommand && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard glow="blue" className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-mono text-white">{selectedCommand.command}</span>
                    <span className="tag-pill bg-white/5 text-[#32D7FF] font-mono">{selectedCommand.shortcut}</span>
                  </div>
                  <button onClick={() => setSelectedCommand(null)} className="glass-btn w-7 h-7 rounded-lg flex items-center justify-center text-xs">
                    ✕
                  </button>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{selectedCommand.description}</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-semibold text-white/40 mb-1">{t("practice.syntax").toUpperCase()}</p>
                    <p className="text-xs font-mono text-[#32D7FF]">{selectedCommand.syntax}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-semibold text-white/40 mb-1">{t("practice.example").toUpperCase()}</p>
                    <p className="text-xs font-mono text-[#30D158]">{selectedCommand.example}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-semibold text-white/40 mb-1">{t("practice.architectureUse").toUpperCase()}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{selectedCommand.architectureUse}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Command list */}
          <div className="space-y-2">
            {filtered.map((cmd, i) => (
              <motion.div
                key={cmd.command}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.02 * Math.min(i, 10) }}
              >
                <div
                  onClick={() => setSelectedCommand(cmd)}
                  className="glass rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold"
                    style={{
                      background: `${categoryColors[cmd.category]}15`,
                      color: categoryColors[cmd.category],
                      border: `1px solid ${categoryColors[cmd.category]}25`,
                    }}
                  >
                    {cmd.shortcut}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white font-mono">{cmd.command}</span>
                      <span
                        className="tag-pill text-[9px]"
                        style={{
                          background: `${categoryColors[cmd.category]}12`,
                          color: categoryColors[cmd.category],
                        }}
                      >
                        {cmd.category}
                      </span>
                      {commandsUsed.has(cmd.command) && (
                        <Check className="w-3 h-3 text-[#30D158]" />
                      )}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                      {cmd.description}
                    </p>
                    <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--text-tertiary)" }}>
                      {cmd.architectureUse}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(cmd.command);
                    }}
                    className="glass-btn w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  >
                    {copiedId === cmd.command ? (
                      <Check className="w-3.5 h-3.5 text-[#30D158]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
