"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store/useAppStore";
import { PLAN_CONFIGS } from "@/lib/plans";
import {
  Terminal,
  Play,
  LayoutDashboard,
  FileText,
  Boxes,
  Settings,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tooltip } from "@/components/ui/Tooltip";
import { UpgradeModal } from "@/components/playground/UpgradeModal";

export function AppNav() {
  return (
    <React.Suspense fallback={<header className="sticky top-0 z-40 w-full h-12 border-b border-slate-800 bg-slate-950/90" />}>
      <AppNavContent />
    </React.Suspense>
  );
}

function AppNavContent() {
  const pathname = usePathname();
  const { user, usage, currentDataset, saveStatus, isUpgradeModalOpen, setUpgradeModalOpen } =
    useAppStore();

  const isPro = user.plan === "pro";
  const planConfig = PLAN_CONFIGS[user.plan];

  const navLinks = [
    { href: "/app/playground", label: "Playground", icon: <Play className="w-3.5 h-3.5 text-sky-400" /> },
    { href: "/app/dashboards", label: "Dashboards", icon: <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" /> },
    { href: "/app/reports", label: "AI Reports", icon: <FileText className="w-3.5 h-3.5 text-purple-400" /> },
    { href: "/app/connectors", label: "Connectors", icon: <Boxes className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between">
        {/* Left: Brand + Active Project breadcrumb */}
        <div className="flex items-center space-x-4">
          <Link href="/app" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-sm">
              <Terminal className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-100 hidden sm:inline">
              DataQuery<span className="text-sky-400">.in</span>
            </span>
          </Link>

          <span className="text-slate-700 hidden sm:inline">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">
              {currentDataset.name}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              <span>{saveStatus}</span>
            </div>
          </div>
        </div>

        {/* Center: App Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/app" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-slate-100 shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Usage Meter + Open Source Badge + Settings */}
        <div className="flex items-center space-x-3">
          {/* Usage Meter */}
          <Tooltip content={`${usage.runsToday} local analytical operations executed in browser sandbox`}>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[11px]">
                {usage.runsToday} queries · Local WASM
              </span>
            </div>
          </Tooltip>

          {/* Open Source Community Badge */}
          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="cursor-pointer"
            title="Open Source Community Edition - All features unlocked"
          >
            <Badge variant="pro" size="md">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Open Source</span>
            </Badge>
          </button>

          <Link href="/app/settings" title="Settings">
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer">
              <Settings className="w-4 h-4" />
            </button>
          </Link>

          {/* User Avatar */}
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </>
  );
}
