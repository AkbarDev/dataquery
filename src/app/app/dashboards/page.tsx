"use client";

import React, { useState } from "react";
import { AppNav } from "@/components/layout/AppNav";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { checkPlanPermission } from "@/lib/plans";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LockBadge } from "@/components/ui/LockBadge";
import { KPICard } from "@/components/ui/KPICard";
import { ChartCard } from "@/components/ui/ChartCard";
import {
  Calendar,
  RefreshCw,
  Clock,
  Share2,
  Download,
  Plus,
  Layers,
  Sparkles,
  ExternalLink,
  Trash2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function DashboardsPage() {
  const { pinnedWidgets, unpinWidget, usage, user, setUpgradeModalOpen } =
    useAppStore();

  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [supersetIframeVisible, setSupersetIframeVisible] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard Refreshed", "All pinned KPI metrics and visual charts synced with latest dataset.");
    }, 500);
  };

  const handleScheduleClick = () => {
    const check = checkPlanPermission("schedule", usage);
    if (!check.allowed) {
      toast.warning("Pro Feature: Scheduling", check.reason);
      setUpgradeModalOpen(true);
      return;
    }
    toast.success("Schedule Updated", "Configured daily automated refresh pipeline at 06:00 UTC.");
  };

  const handleShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Share Link Copied", "Read-only share link copied to clipboard.");
  };

  const handleExportPDF = () => {
    toast.info("Generating PDF", "Compiling executive dashboard into printable vector PDF.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <AppNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Dashboard Top Header & Control Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                Executive Sales &amp; Margin Dashboard
              </h1>
              {user.plan === "free" && (
                <Badge variant="outline" size="sm">
                  Watermarked (Free)
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pinned visual widgets and real-time analytical KPIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Date Filter Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent border-none text-xs focus:outline-none cursor-pointer"
              >
                <option value="Last 7 Days" className="bg-slate-900">Last 7 Days</option>
                <option value="Last 30 Days" className="bg-slate-900">Last 30 Days</option>
                <option value="Quarter-to-Date" className="bg-slate-900">Quarter-to-Date</option>
                <option value="All Time" className="bg-slate-900">All Time</option>
              </select>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="xs"
              isLoading={isRefreshing}
              onClick={handleRefresh}
              leftIcon={<RefreshCw className="w-3 h-3 text-slate-400" />}
            >
              Refresh
            </Button>

            {/* Schedule Button (Pro Gated) */}
            <Button
              variant="secondary"
              size="xs"
              onClick={handleScheduleClick}
              leftIcon={<Clock className="w-3 h-3 text-amber-400" />}
              rightIcon={user.plan === "free" ? <LockBadge label="Pro" /> : undefined}
            >
              Schedule
            </Button>

            {/* Share & Export */}
            <Button
              variant="outline"
              size="xs"
              onClick={handleShareLink}
              leftIcon={<Share2 className="w-3 h-3 text-sky-400" />}
            >
              Share
            </Button>

            <Button
              variant="glow"
              size="xs"
              onClick={handleExportPDF}
              leftIcon={<Download className="w-3 h-3 text-slate-950" />}
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* Top KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="TOTAL REVENUE Q3"
            value="$192,800"
            change={18.4}
            changePeriod="vs previous quarter"
            subtitle="Gross recognized billing"
          />
          <KPICard
            title="TOTAL PROFIT"
            value="$114,200"
            change={22.1}
            changePeriod="vs previous quarter"
            subtitle="59.2% margin efficiency"
          />
          <KPICard
            title="TRANSACTIONS"
            value="120 Deals"
            change={8.5}
            changePeriod="across 4 global regions"
            subtitle="Avg deal: $1,606"
          />
          <KPICard
            title="CHURN RISK COEFFICIENT"
            value="0.18"
            change={-12.4}
            changePeriod="lower risk is better"
            subtitle="Enterprise accounts stable"
          />
        </div>

        {/* Pinned Charts Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Pinned Visual Widgets ({pinnedWidgets.length})
            </h2>
            <button
              onClick={() => setSupersetIframeVisible(!supersetIframeVisible)}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono cursor-pointer"
            >
              <span>{supersetIframeVisible ? "Hide" : "Show"} Embedded Apache Superset Slot</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pinnedWidgets.map((widget) => (
              <ChartCard
                key={widget.id}
                title={widget.title}
                subtitle={`Pinned: ${widget.pinnedAt ? widget.pinnedAt.slice(0, 10) : "Active"}`}
                onExport={() => toast.success("Exported", "Downloaded chart image.")}
              >
                <div className="w-full h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {widget.chartType === "line" ? (
                      <LineChart data={widget.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey={widget.xKey || "region"} stroke="#64748b" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} />
                        <Line type="monotone" dataKey={widget.yKey || "revenue"} stroke="#38bdf8" strokeWidth={2} />
                      </LineChart>
                    ) : (
                      <BarChart data={widget.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey={widget.xKey || "region"} stroke="#64748b" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} />
                        <Bar dataKey={widget.yKey || "revenue"} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                        {widget.data[0]?.profit && (
                          <Bar dataKey="profit" fill="#818cf8" radius={[4, 4, 0, 0]} />
                        )}
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            ))}
          </div>
        </div>

        {/* Apache Superset Embedded Slot Component */}
        {supersetIframeVisible && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden space-y-2 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Badge variant="outline" size="sm">Apache Superset</Badge>
                <span className="text-xs font-semibold text-slate-200">
                  Embedded Dashboard Iframe Slot (Guest Token Auth)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                NEXT_PUBLIC_SUPERSET_EMBED_URL
              </span>
            </div>

            <div className="w-full h-80 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Layers className="w-10 h-10 text-sky-400 opacity-60" />
              <div className="max-w-md space-y-1">
                <h4 className="text-sm font-bold text-slate-100">
                  Superset Guest Token Iframe Container
                </h4>
                <p className="text-xs text-slate-400">
                  Simulated embedded iframe connection. When deployed in production alongside an internal Apache Superset container, guest token authentication mounts the native BI dashboard here seamlessly.
                </p>
              </div>
              <Badge variant="info" size="sm">Secure Sandboxed Embed</Badge>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
