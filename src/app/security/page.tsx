"use client";

import React from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="success" size="md">Privacy First Architecture</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Security &amp; Data Isolation Whitepaper
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            DataQuery is architected with client-side isolation to guarantee your private business data is never exposed or indexed by external AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Client-Side WASM Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pandas and DuckDB run inside your browser tab through WebAssembly. Data rows are analyzed in local memory without leaving your computer unless you explicitly choose to persist them.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Zero Raw Data Telemetry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our frontend never logs file contents, column names, or cell values to external analytics trackers or third-party monitoring vendors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">AI Privacy &amp; No Model Training</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When using the AI Copilot assistant, only sanitized column schemas (never raw data rows) are sent to generate code snippets. Your datasets are never used to train public models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Permanent Right to Deletion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You maintain full sovereign ownership. Clear browser caches at any time or trigger our one-click &quot;Delete My Data &amp; Account&quot; action in Settings to purge all local records.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
