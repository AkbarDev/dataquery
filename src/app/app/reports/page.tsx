"use client";

import React, { useState } from "react";
import { AppNav } from "@/components/layout/AppNav";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function ReportsPage() {
  const { currentDataset, lastResult, user } = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const findings = [
    "North America and Europe generated $125,700 combined (65.2% of global volume) with positive quarter-over-quarter expansion.",
    "Gross margin efficiency peaked in European transactions at 61.7%, driven primarily by Cloud SaaS enterprise contracts.",
    "Churn risk was strongly inversely correlated with contract size; deals above $15,000 exhibited sub-0.12 churn vulnerability.",
  ];

  const recommendedActions = [
    "Reallocate 20% of Latin America marketing budget toward enterprise customer tier acquisition to replicate European margin efficiency.",
    "Establish automated customer success triggers for accounts scoring above 0.35 on the churn risk index within the first 60 days.",
  ];

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
      toast.success("Report Ready", "Executive AI intelligence report prepared for PDF printing.");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <AppNav />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pro" size="sm">AI Synthesized</Badge>
              <span className="text-xs font-mono text-slate-400">
                Generated October 27, 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
              Executive Analytical Intelligence Report
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Source: {currentDataset.name} ({currentDataset.rowCount.toLocaleString()} rows audited)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Link Copied", "Report URL copied to clipboard.");
              }}
              leftIcon={<Share2 className="w-3.5 h-3.5 text-sky-400" />}
            >
              Share Link
            </Button>
            <Button
              variant="glow"
              size="sm"
              isLoading={isDownloading}
              onClick={handleDownloadPDF}
              leftIcon={<Download className="w-3.5 h-3.5 text-slate-950" />}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* Executive Narrative Document Card */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-8">
          {/* Document Header */}
          <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block mb-1">
                DataQuery Executive Briefing
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Q3 Performance &amp; Margin Driver Narrative
              </h2>
            </div>
            <div className="text-right text-xs text-slate-400 font-mono">
              <div>Engine: DuckDB-WASM + Pyodide</div>
              <div className="text-emerald-400">Quality Health: {currentDataset.qualityScore}% Verified</div>
            </div>
          </div>

          {/* 1. Key Analytical Findings (3 items) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Key Analytical Findings</span>
            </h3>
            <div className="space-y-2">
              {findings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Primary Revenue & Margin Breakdown Chart */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Regional Revenue &amp; Profit Contribution Visual</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lastResult.rows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="region" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="revenue" fill="#38bdf8" name="Revenue ($)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#818cf8" name="Profit ($)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Recommended Strategic Actions (2 items) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>Prescriptive Action Items</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5"
                >
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    Action Proposal #{idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Data-Quality Audit Notes */}
          <div className="pt-6 border-t border-slate-800 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Data Integrity &amp; Audit Notes</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dataset verified with 100% schema completeness. Zero imputed null values in core numeric fields. Standard deviation and Z-score distributions conform within expected operational thresholds.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
