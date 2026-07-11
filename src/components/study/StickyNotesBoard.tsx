"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, GripVertical } from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";
import { useStudy } from "@/context/StudyContext";

export default function StickyNotesBoard() {
  const { stickyNotes, addStickyNote, updateStickyNote, removeStickyNote } = useStudy();
  const boardRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent, noteId: string) => {
    if ((e.target as HTMLElement).closest("textarea, button")) return;
    const note = stickyNotes.find((n) => n.id === noteId);
    if (!note || !boardRef.current) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = boardRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - note.x,
      y: e.clientY - rect.top - note.y,
    };
    setDraggingId(noteId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.current.x, rect.width - 160));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.current.y, rect.height - 100));
    updateStickyNote(draggingId, { x, y });
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  return (
    <GlassCard className="p-5 flex flex-col min-h-[420px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-pink)" }}>
            Brainstorm Board
          </p>
          <p className="text-sm text-white font-medium mt-0.5">
            Drag sticky notes to organize ideas
          </p>
        </div>
        <button
          onClick={() => addStickyNote()}
          className="glass-btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Note
        </button>
      </div>

      <div
        ref={boardRef}
        className="relative flex-1 rounded-2xl overflow-hidden"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,255,255,0.03) 23px, rgba(255,255,255,0.03) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,255,255,0.03) 23px, rgba(255,255,255,0.03) 24px)",
          minHeight: 340,
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {stickyNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute rounded-lg shadow-lg cursor-grab active:cursor-grabbing group"
            style={{
              left: note.x,
              top: note.y,
              width: note.width,
              minHeight: note.height,
              background: note.color,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25), inset 0 -2px 4px rgba(0,0,0,0.08)",
              zIndex: draggingId === note.id ? 50 : 1,
            }}
            onPointerDown={(e) => handlePointerDown(e, note.id)}
          >
            <div className="flex items-center justify-between px-2 pt-1.5 opacity-40 group-hover:opacity-70">
              <GripVertical className="w-3 h-3 text-black/50" />
              <button
                onClick={() => removeStickyNote(note.id)}
                className="p-0.5 rounded hover:bg-black/10"
              >
                <X className="w-3 h-3 text-black/50" />
              </button>
            </div>
            <textarea
              value={note.text}
              onChange={(e) => updateStickyNote(note.id, { text: e.target.value })}
              className="w-full bg-transparent resize-none outline-none text-sm text-black/80 px-3 pb-3 font-medium leading-snug"
              style={{ minHeight: note.height - 30 }}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </motion.div>
        ))}

        {stickyNotes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              Click &quot;Add Note&quot; to start brainstorming
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
