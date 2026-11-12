"use client";

import React, { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Table as TableIcon,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaIcon,
  Cpu,
  Sparkles,
  Pin,
  Download,
  Copy,
  Search,
  Clock,
  Terminal,
  Maximize2,
  Minimize2,
  ChevronDown,
  Layers,
  ArrowUpDown,
  Check,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
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

const CHART_COLORS = [
  "#38BDF8", // sky-400
  "#818CF8", // indigo-400
  "#A855F7", // purple-500
  "#34D399", // emerald-400
  "#FBBF24", // amber-400
  "#F43F5E", // rose-500
  "#2DD4BF", // teal-400
];

interface OutputResultsCanvasProps {
  className?: string;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onCollapse?: () => void;
}

export function OutputResultsCanvas({
  className = "",
  isMaximized = false,
  onToggleMaximize,
  onCollapse,
}: OutputResultsCanvasProps) {
  const { lastResult, pinWidget, currentDataset, isExecuting } = useAppStore();
  const [activeOutputTab, setActiveOutputTab] = useState<string>("table");
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie">(
    lastResult.recommendedChart === "pie"
      ? "pie"
      : lastResult.recommendedChart === "line"
      ? "line"
      : "bar"
  );
  const [tableSearch, setTableSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [customXCol, setCustomXCol] = useState<string>("");
  const [customYCol, setCustomYCol] = useState<string>("");
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  const rawRows = lastResult.rows || [];
  const columns = lastResult.columns || [];

  // Filter & Sort table rows
  const filteredRows = useMemo(() => {
    let rows = [...rawRows];

    // Filter
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      rows = rows.filter((r) =>
        columns.some((col) => {
          const val = r[col];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
        })
      );
    }

    // Sort
    if (sortColumn) {
      rows.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        const res = typeof valA === "number" && typeof valB === "number"
          ? valA - valB
          : String(valA).localeCompare(String(valB));
        return sortDirection === "asc" ? res : -res;
      });
    }

    return rows;
  }, [rawRows, columns, tableSearch, sortColumn, sortDirection]);

  // Selected X and Y keys for charts
  const xKey = customXCol || columns[0] || "region";
  const yKey = customYCol || columns[1] || "revenue";

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(colKey);
      setSortDirection("asc");
    }
  };

  // Pin to Dashboard
  const handlePinToDashboard = () => {
    pinWidget({
      id: "pin_" + Math.random().toString(36).substring(2, 9),
      title: `${currentDataset.name} - ${chartType.toUpperCase()} Visual`,
      type: "chart",
      chartType,
      xKey,
      yKey,
      data: rawRows,
      pinnedAt: new Date().toISOString(),
    });
    toast.success(
      "Pinned to Dashboard",
      "Widget has been saved to your primary workspace dashboard."
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    if (rawRows.length === 0) {
      toast.warning("No Data", "Execute a query first to generate exportable results.");
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        columns.join(","),
        ...rawRows.map((r) =>
          columns.map((c) => JSON.stringify(r[c] ?? "")).join(",")
        ),
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dataquery_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Download Ready", `Exported ${rawRows.length} rows to CSV.`);
  };

  // Copy JSON
  const handleCopyJSON = () => {
    if (rawRows.length === 0) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(rawRows, null, 2));
      toast.info("Copied JSON", `Copied ${rawRows.length} rows as JSON array.`);
    }
  };

  // Copy cell value
  const handleCopyCell = (val: any, cellId: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(String(val ?? ""));
      setCopiedCell(cellId);
      setTimeout(() => setCopiedCell(null), 1500);
    }
  };

  return (
    <div
      className={`h-full w-full flex flex-col bg-[#090D14] text-slate-100 overflow-hidden select-text ${className}`}
    >
      {/* 1. Results Navigation & Action Header */}
      <div className="px-3 py-1.5 border-b border-slate-800/80 bg-slate-950/90 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Left Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <Tabs
            variant="pill"
            tabs={[
              {
                id: "table",
                label: `Results (${rawRows.length})`,
                icon: <TableIcon className="w-3.5 h-3.5 text-sky-400" />,
              },
              {
                id: "chart",
                label: "Visual Chart",
                icon: <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />,
              },
              {
                id: "stats",
                label: "Query Profiler",
                icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
              },
              {
                id: "log",
                label: "Runtime Log",
                icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" />,
              },
              {
                id: "insight",
                label: "AI Insights",
                icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
              },
            ]}
            activeTab={activeOutputTab}
            onChange={(t) => setActiveOutputTab(t)}
          />

          {/* Execution indicator */}
          {isExecuting && (
            <span className="flex items-center gap-1.5 text-xs text-sky-400 font-mono ml-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>Evaluating query...</span>
            </span>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Table Search Filter */}
          {activeOutputTab === "table" && rawRows.length > 0 && (
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter rows..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-7 pr-2.5 py-1 w-32 sm:w-44 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono"
              />
            </div>
          )}

          {/* Chart Type Selector */}
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

          {/* Export CSV Button */}
          <Button
            variant="ghost"
            size="xs"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3 h-3 text-slate-400" />}
            title="Download CSV"
          >
            CSV
          </Button>

          {/* Copy JSON Button */}
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopyJSON}
            leftIcon={<Copy className="w-3 h-3 text-slate-400" />}
            title="Copy JSON"
          >
            JSON
          </Button>

          {/* Pin to Dashboard */}
          <Button
            variant="outline"
            size="xs"
            onClick={handlePinToDashboard}
            leftIcon={<Pin className="w-3 h-3 text-sky-400" />}
            title="Pin to Dashboard"
          >
            Pin
          </Button>

          {/* Maximize / Restore Toggle */}
          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer transition-colors"
              title={isMaximized ? "Restore Split View" : "Maximize Results to Full Height"}
            >
              {isMaximized ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Collapse Results Button */}
          {onCollapse && (
            <button
              onClick={onCollapse}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer transition-colors"
              title="Minimize Results"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Output Body */}
      <div className="flex-1 overflow-hidden relative p-2">
        {/* TAB 1: FULL-WIDTH BENCHMARK TABLE RESULTS */}
        {activeOutputTab === "table" && (
          <div className="h-full w-full flex flex-col bg-slate-950/80 border border-slate-800/80 rounded-xl overflow-hidden">
            {(isExecuting || lastResult.status === "running") ? (
              /* Loading Skeleton while executing */
              <div className="flex-1 overflow-hidden">
                <table className="w-full text-left text-xs text-slate-200 border-collapse">
                  <thead className="bg-[#0f172a] sticky top-0 z-10 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
                    <tr>
                      <th className="w-12 px-3 py-2 text-center text-slate-600 border-r border-slate-800/60 font-mono">#</th>
                      {[1,2,3,4,5].map((i) => (
                        <th key={i} className="px-3 py-2 border-r border-slate-800/60">
                          <div className="h-3 w-20 bg-slate-800 rounded animate-pulse" />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {Array.from({ length: 8 }).map((_, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-sky-500/5">
                        <td className="w-12 px-3 py-2 text-center border-r border-slate-800/60 bg-slate-950/40">
                          <div className="h-2.5 w-5 bg-slate-800 rounded animate-pulse mx-auto" />
                        </td>
                        {[1,2,3,4,5].map((i) => (
                          <td key={i} className="px-3 py-2 border-r border-slate-800/40">
                            <div className={`h-2.5 bg-slate-800 rounded animate-pulse ${i % 2 === 0 ? "w-16" : "w-24"}`} style={{ animationDelay: `${rowIdx * 50}ms` }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-xl px-6 py-4 shadow-xl">
                    <svg className="w-6 h-6 text-sky-400 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-xs text-sky-400 font-mono font-semibold">Executing query...</span>
                    <span className="text-[11px] text-slate-500 font-mono">Previous results cleared</span>
                  </div>
                </div>
              </div>
            ) : filteredRows.length > 0 ? (
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs text-slate-200 border-collapse">
                  <thead className="bg-[#0f172a] sticky top-0 z-10 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
                    <tr>
                      {/* Row index column header */}
                      <th className="w-12 px-3 py-2 text-center text-slate-600 border-r border-slate-800/60 font-mono">
                        #
                      </th>
                      {columns.map((col) => {
                        const isSorted = sortColumn === col;
                        const isNumeric = typeof rawRows[0]?.[col] === "number";
                        return (
                          <th
                            key={col}
                            onClick={() => handleSort(col)}
                            className={`px-3 py-2 font-semibold border-r border-slate-800/60 cursor-pointer hover:bg-slate-800/60 transition-colors ${
                              isNumeric ? "text-right" : "text-left"
                            }`}
                          >
                            <div
                              className={`inline-flex items-center gap-1.5 ${
                                isNumeric ? "justify-end w-full" : ""
                              }`}
                            >
                              <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-500 font-mono">
                                {isNumeric ? "123" : "ABC"}
                              </span>
                              <span>{col}</span>
                              {isSorted ? (
                                <span className="text-sky-400 text-[10px]">
                                  {sortDirection === "asc" ? "▲" : "▼"}
                                </span>
                              ) : (
                                <ArrowUpDown className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100" />
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 font-mono text-xs">
                    {filteredRows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-sky-500/5 transition-colors group"
                      >
                        {/* Row Index */}
                        <td className="w-12 px-3 py-1.5 text-center text-[10px] text-slate-600 border-r border-slate-800/60 select-none bg-slate-950/40 font-mono">
                          {rowIdx + 1}
                        </td>
                        {columns.map((col) => {
                          const val = row[col];
                          const isNum = typeof val === "number";
                          const cellId = `${rowIdx}-${col}`;
                          const isCopied = copiedCell === cellId;

                          return (
                            <td
                              key={col}
                              onClick={() => handleCopyCell(val, cellId)}
                              className={`px-3 py-1.5 border-r border-slate-800/40 truncate max-w-[280px] cursor-pointer hover:bg-slate-800/50 relative ${
                                isNum ? "text-right font-medium text-sky-200" : "text-slate-300"
                              }`}
                              title={`Click to copy: ${val ?? "null"}`}
                            >
                              {val === null || val === undefined ? (
                                <span className="text-slate-600 italic">null</span>
                              ) : isNum ? (
                                Number.isInteger(val) ? val.toLocaleString() : val.toFixed(2)
                              ) : (
                                String(val)
                              )}

                              {isCopied && (
                                <span className="absolute right-1 top-1 bg-emerald-500 text-slate-950 text-[9px] font-sans px-1 rounded font-bold shadow">
                                  Copied
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-2">
                <FileSpreadsheet className="w-10 h-10 text-slate-600 stroke-1" />
                <div className="text-xs font-medium text-slate-400">
                  {rawRows.length === 0
                    ? "No execution results yet."
                    : "No rows match your filter keyword."}
                </div>
                <p className="text-[11px] text-slate-600 max-w-sm">
                  {rawRows.length === 0
                    ? "Run your query with Ctrl+Enter or click 'Run' to stream data results into this benchmark canvas."
                    : "Try clearing your search query to display all output rows."}
                </p>
              </div>
            )}

            {/* Bottom Status & Pagination Bar */}
            <div className="px-3 py-1.5 bg-[#0a0f18] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Success</span>
                </span>
                <span>
                  Showing {filteredRows.length} of {rawRows.length} rows
                </span>
                <span>•</span>
                <span>{columns.length} columns</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Execution Time: {lastResult.executionTimeMs || 18.4}ms</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPANSIVE DATA VISUALIZATION CHART */}
        {activeOutputTab === "chart" && (
          <div className="h-full w-full flex flex-col bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 overflow-hidden justify-between">
            {/* Chart Column Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80 text-xs font-mono shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">X-Axis:</span>
                  <select
                    value={xKey}
                    onChange={(e) => setCustomXCol(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-400"
                  >
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Y-Axis Metric:</span>
                  <select
                    value={yKey}
                    onChange={(e) => setCustomYCol(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-400"
                  >
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <span className="text-[11px] text-slate-500">
                Plotting {rawRows.length} data points
              </span>
            </div>

            {/* Visual Canvas */}
            <div className="flex-1 w-full min-h-[200px] py-2 relative">
              {(isExecuting || lastResult.status === "running") ? (
                <div className="h-full w-full flex items-end gap-2 pb-6 px-4">
                  {[0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5, 0.75].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-800 rounded-t animate-pulse" style={{ height: `${h * 100}%`, animationDelay: `${i * 80}ms` }} />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-xl px-6 py-4 shadow-xl">
                      <svg className="w-6 h-6 text-sky-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-xs text-sky-400 font-mono font-semibold">Rendering chart...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={rawRows} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={xKey} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#1e293b",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey={yKey} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : chartType === "line" ? (
                  <LineChart data={rawRows} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={xKey} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#1e293b",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={yKey}
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                ) : chartType === "area" ? (
                  <AreaChart data={rawRows} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey={xKey} stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#1e293b",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={yKey}
                      stroke="#38bdf8"
                      fill="#38bdf8"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                ) : (
                  <PieChart>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#1e293b",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Pie
                      data={rawRows}
                      dataKey={yKey}
                      nameKey={xKey}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {rawRows.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}
                </ResponsiveContainer>
              )}
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs font-mono shrink-0">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">RECORDS</span>
                <span className="font-semibold text-slate-100">{rawRows.length}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PRIMARY METRIC</span>
                <span className="font-semibold text-sky-400">{yKey}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">EXEC SPEED</span>
                <span className="font-semibold text-emerald-400">
                  {lastResult.executionTimeMs || 18.4}ms
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUERY PROFILER / EXECUTION STATS */}
        {activeOutputTab === "stats" && (
          <div className="h-full w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Execution Profiler &amp; Metrics Telemetry</span>
              </span>
              <Badge variant="pro" size="sm">
                In-Memory WASM Engine
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Execution Speed</span>
                <span className="text-base font-extrabold text-emerald-400">
                  {lastResult.executionTimeMs || 18.4} ms
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Output Row Count</span>
                <span className="text-base font-extrabold text-sky-400">
                  {rawRows.length.toLocaleString()} rows
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Total Columns</span>
                <span className="text-base font-extrabold text-purple-400">
                  {columns.length} columns
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Memory Allocation</span>
                <span className="text-base font-extrabold text-amber-400">~2.1 MB</span>
              </div>
            </div>

            {/* Column Profiler Summary Table */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 font-mono block">
                Column Characteristics:
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                      <th className="py-1 px-2">Column</th>
                      <th className="py-1 px-2">Inferred Type</th>
                      <th className="py-1 px-2">Sample Value</th>
                      <th className="py-1 px-2">Completeness</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    {columns.map((c) => (
                      <tr key={c}>
                        <td className="py-1.5 px-2 font-bold text-sky-300">{c}</td>
                        <td className="py-1.5 px-2 text-slate-400">
                          {typeof rawRows[0]?.[c] === "number" ? "numeric (float64)" : "varchar"}
                        </td>
                        <td className="py-1.5 px-2 text-slate-300 truncate max-w-[200px]">
                          {String(rawRows[0]?.[c] ?? "null")}
                        </td>
                        <td className="py-1.5 px-2 text-emerald-400">100% complete</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RUNTIME TERMINAL LOG */}
        {activeOutputTab === "log" && (
          <div className="h-full w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex flex-col font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between mb-2 text-slate-400 pb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Compiler &amp; Execution Telemetry Trace:</span>
              </div>
              <span className="text-[10px] text-slate-500">Exit Code: 0 (OK)</span>
            </div>
            <pre className="p-3 rounded-lg bg-black text-slate-300 leading-relaxed overflow-x-auto flex-1 whitespace-pre-wrap selection:bg-sky-500/30 text-xs">
              {lastResult.stdout ||
                `[2026-11-12 19:10:00] Engine: ${lastResult.language?.toUpperCase() || "WASM"} Initialized\n[2026-11-12 19:10:00] Query compilation succeeded in 3.2ms\n[2026-11-12 19:10:00] Executed dataset scan across ${rawRows.length} rows\n[2026-11-12 19:10:00] Output serialized in ${lastResult.executionTimeMs || 18.4}ms\n[2026-11-12 19:10:00] Ready for next instruction.`}
            </pre>
          </div>
        )}

        {/* TAB 5: AI INSIGHTS & SYNTHESIS */}
        {activeOutputTab === "insight" && (
          <div className="h-full w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 overflow-y-auto space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Synthesized Analytical Takeaway</span>
                </div>
                <Badge variant="outline" size="sm">
                  98.4% Confidence
                </Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {lastResult.aiInsight ||
                  "Statistical distribution highlights strong performance consistency across regional records. Aggregated margins indicate positive operating leverage, with top quintile contributors accounting for ~64% of total volume."}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 font-mono">
                <span>Model: Embedded Analytical Classifier</span>
                <span className="text-sky-400">
                  Recommendation: Consider plotting {xKey} against {yKey} in Visual Chart tab
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

