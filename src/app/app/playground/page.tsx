"use client";

import React from "react";
import { AppNav } from "@/components/layout/AppNav";
import { LeftDataPanel } from "@/components/playground/LeftDataPanel";
import { CenterWorkArea } from "@/components/playground/CenterWorkArea";
import { RightOutputPanel } from "@/components/playground/RightOutputPanel";
import { StepTimeline } from "@/components/playground/StepTimeline";
import { AIAssistantDrawer } from "@/components/playground/AIAssistantDrawer";
import { useAppStore } from "@/lib/store/useAppStore";

export default function PlaygroundPage() {
  const { playgroundLayout } = useAppStore();
  const showRightPanel = playgroundLayout === "split-right";

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0B0F17] text-slate-100 overflow-hidden font-sans">
      {/* 1. App Navigation Top Bar */}
      <AppNav />

      {/* 2. Split Workspace Layout (Top Query Workspace & Bottom Output Results) */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Data Panel (Dropzone, Loaded Tables, Columns, Profiler) */}
        <div className="w-72 lg:w-80 shrink-0 h-full hidden md:block">
          <LeftDataPanel />
        </div>

        {/* Center Work Area (Top Half: Queries | Bottom Half: Output Results Canvas) */}
        <div className="flex-1 h-full min-w-0">
          <CenterWorkArea />
        </div>

        {/* Right Output Panel (Rendered only when user toggles side-by-side mode) */}
        {showRightPanel && (
          <div className="w-80 xl:w-96 shrink-0 h-full hidden lg:block">
            <RightOutputPanel />
          </div>
        )}
      </div>

      {/* 3. Bottom Step History Timeline */}
      <StepTimeline />

      {/* 4. AI Assistant Drawer Overlay */}
      <AIAssistantDrawer />
    </div>
  );
}
