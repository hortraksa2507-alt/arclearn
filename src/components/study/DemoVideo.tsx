"use client";

import React from "react";
import { Play } from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";

export default function DemoVideo() {
  return (
    <GlassCard className="p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "#FF2D5525", color: "#FF2D55" }}
        >
          <Play className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#FF2D55" }}>
            Video Demo
          </p>
          <p className="text-sm text-white font-medium">See how the Study Hub works</p>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden bg-black/40 aspect-video">
        <video
          controls
          playsInline
          className="w-full h-full"
          poster=""
        >
          <source src="/demos/study-hub-demo.mp4" type="video/mp4" />
          <source src="/demos/study-hub-demo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-[10px] mt-3 text-center" style={{ color: "var(--text-tertiary)" }}>
        Walkthrough: integrations, AI task estimates, Pomodoro timer, calendar, lofi playlist & sticky notes
      </p>
    </GlassCard>
  );
}
