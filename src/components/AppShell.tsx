"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen relative">
      <Sidebar />
      <TopNav title={title} subtitle={subtitle} />
      {/* Desktop: offset by sidebar. Mobile: full width with bottom padding for nav */}
      <main className="md:ml-[var(--sidebar-width)] pt-[var(--nav-height)] min-h-screen pb-20 md:pb-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
