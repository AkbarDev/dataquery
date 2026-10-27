"use client";

import React from "react";
import Link from "next/link";
import { AppNav } from "@/components/layout/AppNav";
import { useAppStore } from "@/lib/store/useAppStore";
import { PLAN_CONFIGS } from "@/lib/plans";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UpgradeBanner } from "@/components/ui/UpgradeBanner";
import {
  Play,
  FileSpreadsheet,
  Plus,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  BarChart3,
  FileText,
  Boxes,
} from "lucide-react";

export default function WorkspaceHomePage() {
  const { user, usage, currentDataset, loadedDatasets, setUpgradeModalOpen } =
    useAppStore();
  const plan = PLAN_CONFIGS[user.plan];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <AppNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Here is your data engineering and analytical workspace overview.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/app/playground">
              <Button
                variant="glow"
                size="sm"
                leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              >
                Launch Playground
              </Button>
            </Link>
          </div>
        </div>

        {/* Upgrade Banner for Free Users */}
        {user.plan === "free" && (
          <UpgradeBanner onUpgrade={() => setUpgradeModalOpen(true)} />
        )}

        {/* Quick Start Options */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Quick Start Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/app/playground" className="group">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                  <Play className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    Visual Playground
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Analyze data in Python, SQL, or DAX with instant chart rendering.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/app/playground" className="group">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    Upload Dataset
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Drag and drop CSV or Excel files with auto-schema profiling.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/app/connectors" className="group">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                    Live Connectors
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Stream data from Google Sheets, MySQL, Shopify, or REST APIs.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Datasets & Projects */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Recent Datasets ({loadedDatasets.length})
            </h2>
            <Link
              href="/app/playground"
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
            >
              <span>Open active in playground</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800 overflow-hidden">
            {loadedDatasets.map((ds) => (
              <div
                key={ds.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-sky-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{ds.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      {ds.fileName} · {ds.rowCount.toLocaleString()} rows · {ds.columns.length} columns
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="success" size="sm">
                    {ds.qualityScore}% Health
                  </Badge>
                  <Link href={`/app/playground`}>
                    <Button variant="outline" size="xs">
                      Analyze
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
