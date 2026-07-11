"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Music,
  FileText,
  Calendar,
  HardDrive,
  MessageSquare,
  Mail,
  Table,
  FileType,
  Check,
  Link2,
} from "lucide-react";
import { GlassCard } from "@/components/GlassComponents";
import { useStudy } from "@/context/StudyContext";
import { PRODUCTIVITY_APPS } from "@/data/integrations";

const iconMap: Record<string, React.ReactNode> = {
  spotify: <Music className="w-5 h-5" />,
  notion: <FileText className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  drive: <HardDrive className="w-5 h-5" />,
  dropbox: <HardDrive className="w-5 h-5" />,
  slack: <MessageSquare className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  excel: <Table className="w-5 h-5" />,
  word: <FileType className="w-5 h-5" />,
};

export default function IntegrationsBar() {
  const { connectedApps, toggleAppConnection, isAppConnected } = useStudy();
  const connectedCount = connectedApps.length;

  return (
    <GlassCard className="p-5 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#1DB954]/10 to-[#4285F4]/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
              Productivity Apps
            </p>
            <p className="text-sm text-white font-medium mt-0.5">
              {connectedCount} of {PRODUCTIVITY_APPS.length} connected
            </p>
          </div>
          <div className="flex items-center gap-1.5 glass-subtle rounded-lg px-3 py-1.5">
            <Link2 className="w-3.5 h-3.5" style={{ color: "var(--accent-green)" }} />
            <span className="text-[11px] font-medium" style={{ color: "var(--accent-green)" }}>
              All-in-one hub
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-3">
          {PRODUCTIVITY_APPS.map((app, i) => {
            const connected = isAppConnected(app.id);
            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => toggleAppConnection(app.id)}
                className="flex flex-col items-center gap-2 group"
                title={app.description}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center relative transition-all group-hover:scale-110 ${
                    connected ? "" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    background: `${app.color}${connected ? "30" : "15"}`,
                    color: app.color === "#FFFFFF" ? "#E0E0E0" : app.color,
                    boxShadow: connected ? `0 0 0 2px ${app.color}, 0 4px 20px ${app.color}30` : undefined,
                  }}
                >
                  {iconMap[app.icon]}
                  {connected && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "#30D158" }}
                    >
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <span
                  className="text-[9px] font-medium text-center leading-tight max-w-[60px]"
                  style={{ color: connected ? "var(--text-primary)" : "var(--text-tertiary)" }}
                >
                  {app.name.split(" ")[0]}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="text-[10px] mt-4 text-center" style={{ color: "var(--text-tertiary)" }}>
          Tap an app to connect or disconnect · Inspired by all-in-one productivity dashboards
        </p>
      </div>
    </GlassCard>
  );
}
