"use client";

import React from "react";
import { Music, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";
import { LOFI_PLAYLIST } from "@/data/integrations";

export default function SpotifyPlayer() {
  return (
    <GlassCard className="p-5 overflow-hidden" glow="purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "#1DB95425", color: "#1DB954" }}
          >
            <Music className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#1DB954" }}>
              Spotify
            </p>
            <p className="text-sm text-white font-medium truncate max-w-[200px]">
              {LOFI_PLAYLIST.name}
            </p>
          </div>
        </div>
        <a
          href={`https://open.spotify.com/playlist/${LOFI_PLAYLIST.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1"
        >
          Open <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="rounded-xl overflow-hidden bg-black/30">
        <iframe
          src={LOFI_PLAYLIST.embedUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Lofi Hip Hop Study Playlist"
          className="border-0"
        />
      </div>

      <p className="text-[10px] mt-3 text-center" style={{ color: "var(--text-tertiary)" }}>
        Your favorite lofi beats — play while you focus
      </p>
    </GlassCard>
  );
}
