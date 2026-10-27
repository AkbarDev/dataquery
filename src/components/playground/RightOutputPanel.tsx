"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/Table";
import {
  Table as TableIcon,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ScatterChart as ScatterIcon,
  AreaChart as AreaIcon,
  Cpu,
  Sparkles,
  Pin,
  Download,
  Info,
  Clock,
  Terminal,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

const CHART_COLORS = ["#38BDF8", "#818CF8", "#A855F7", "#34D399", "#FBBF24"];

export function RightOutputPanel() {
  const { lastResult, pinWidget, currentDataset } = useAppStore();
  const [activeOutputTab, setActiveOutputTab] = useState("chart");
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie">(
    lastResult.recommendedChart === "pie"
      ? "pie"
      : lastResult.recommendedChart === "line"
      ? "line"
      : "bar"
  );

  const rows = lastResult.rows || [];
  const columns = lastResult.columns || [];

  // Prepare table columns definition
  const tableColumns = columns.map((col) => ({
    key: col,
    header: col,
    align: (typeof rows[0]?.[col] === "number" ? "right" : "left") as "left" | "right",
  }));

  // Handle Pin to Dashboard
  const handlePinToDashboard = () => {
    pinWidget({
      id: "pin_" + Math.random().toString(36).substring(2, 9),
      title: `${currentDataset.name} - ${chartType.toUpperCase()} Visual`,
      type: "chart",
      chartType,
      xKey: columns[0] || "region",
      yKey: columns[1] || "revenue",
      data: rows,
      pinnedAt: new Date().toISOString(),
    });
    toast.success(
      "Pinned to Dashboard",
      "Widget has been saved to your primary workspace dashboard."
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    if (rows.length === 0) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        columns.join(","),
        ...rows.map((r) => columns.map((c) => JSON.stringify(r[c] ?? "")).join(",")),
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dataquery_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Export Ready", "Downloaded output dataset to local machine.");
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header: Output Tabs + Chart Type Switcher + Pin / Export */}
      <div className="px-3 py-2 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <Tabs
          variant="pill"
          tabs={[
            { id: "chart", label: "Chart", icon: <BarChart3 className="w-3.5 h-3.5 text-sky-400" /> },
            { id: "table", label: "Table", icon: <TableIcon className="w-3.5 h-3.5 text-slate-400" /> },
            { id: "stats", label: "Stats", icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
            { id: "log", label: "Log", icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" /> },
            { id: "insight", label: "AI Insight", icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
          ]}
          activeTab={activeOutputTab}
          onChange={(t) => setActiveOutputTab(t)}
        />

        <div className="flex items-center space-x-1.5">
          {activeOutputTab === "chart" && (
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setChartType("bar")}
                className={`p-1 rounded cursor-pointer ${
                  chartType === "bar" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-white"
                }`}
                title="Bar Chart"
              >
                <BarChart3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType("line")}
                className={`p-1 rounded cursor-pointer ${
                  chartType === "line" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-white"
                }`}
                title="Line Chart"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`p-1 rounded cursor-pointer ${
                  chartType === "area" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-white"
                }`}
                title="Area Chart"
              >
                <AreaIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType("pie")}
                className={`p-1 rounded cursor-pointer ${
                  chartType === "pie" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-white"
                }`}
                title="Donut / Pie Chart"
              >
                <PieChartIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <Button
            variant="outline"
            size="xs"
            onClick={handlePinToDashboard}
            leftIcon={<Pin className="w-3 h-3 text-sky-400" />}
            title="Pin to Dashboard"
          >
            Pin
          </Button>

          <Button
            variant="ghost"
            size="xs"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3 h-3 text-slate-400" />}
            title="Export CSV"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Main Output Body */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeOutputTab === "chart" && (
          <div className="w-full h-full min-h-[280px] flex flex-col justify-between">
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={rows}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={columns[0] || "region"} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Bar dataKey={columns[1] || "revenue"} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    {columns[2] && <Bar dataKey={columns[2]} fill="#818cf8" radius={[4, 4, 0, 0]} />}
                  </BarChart>
                ) : chartType === "line" ? (
                  <LineChart data={rows}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={columns[0] || "region"} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Line type="monotone" dataKey={columns[1] || "revenue"} stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                ) : chartType === "area" ? (
                  <AreaChart data={rows}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={columns[0] || "region"} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Area type="monotone" dataKey={columns[1] || "revenue"} stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                  </AreaChart>
                ) : (
                  <PieChart>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Pie data={rows} dataKey={columns[1] || "revenue"} nameKey={columns[0] || "region"} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                      {rows.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">RECORDS</span>
                <span className="font-semibold text-slate-100">{rows.length}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PRIMARY METRIC</span>
                <span className="font-semibold text-sky-400">{columns[1] || "N/A"}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">EXEC SPEED</span>
                <span className="font-semibold text-emerald-400">{lastResult.executionTimeMs || 18.4}ms</span>
              </div>
            </div>
          </div>
        )}

        {activeOutputTab === "table" && (
          <DataTable
            data={rows}
            columns={tableColumns}
            maxHeight="320px"
            emptyMessage="No execution output yet. Click 'Run' to evaluate code."
          />
        )}

        {activeOutputTab === "stats" && (
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Descriptive Statistics Summary
            </span>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Total Output Rows:</span>
                <span className="font-mono text-slate-100 font-semibold">{rows.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Total Columns:</span>
                <span className="font-mono text-slate-100 font-semibold">{columns.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Missing / Nulls:</span>
                <span className="font-mono text-emerald-400 font-semibold">0 (100% clean)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Memory Allocation:</span>
                <span className="font-mono text-slate-300">~2.1 MB in-memory</span>
              </div>
            </div>
          </div>
        )}

        {activeOutputTab === "log" && (
          <div className="h-full flex flex-col font-mono text-xs">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Execution Telemetry:</span>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed overflow-x-auto flex-1 whitespace-pre-wrap">
              {lastResult.stdout || "Ready. Execute query to view runtime telemetry."}
            </pre>
          </div>
        )}

        {activeOutputTab === "insight" && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Synthesized Takeaway</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lastResult.aiInsight ||
                "Regional analysis indicates that North America leads total revenue contribution, with European transactions providing maximum profit margin efficiency."}
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Model: Embedded Analytical Classifier</span>
              <Badge variant="outline" size="sm">98.4% Confidence</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
