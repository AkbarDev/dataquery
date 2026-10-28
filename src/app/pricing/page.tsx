"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Sparkles, X, ArrowRight, ShieldCheck, Terminal, Zap, Heart } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { UpgradeModal } from "@/components/playground/UpgradeModal";

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    { name: "Subscription Fee", saas: "$50 - $500 / mo", dq: "Free Forever ($0)" },
    { name: "Execution Architecture", saas: "Opaque Cloud Servers", dq: "100% In-Browser WASM" },
    { name: "Max Single File Upload", saas: "Limited by Tier", dq: "Unlimited (RAM-bound)" },
    { name: "Dataset Row Capacity", saas: "100k - 1M cap", dq: "100 Million+ via DuckDB" },
    { name: "Daily Query & Transformation Runs", saas: "Metered / Rate-limited", dq: "Unlimited" },
    { name: "Python (Pandas / NumPy)", saas: "Requires Pro tier", dq: "Fully Unlocked (Pyodide)" },
    { name: "DuckDB Columnar SQL Engine", saas: "Add-on fee", dq: "Native Client WASM" },
    { name: "Power BI DAX Field Builder", saas: "Requires Desktop Windows", dq: "Built-in & Web-ready" },
    { name: "Interactive Visual Dashboards", saas: "Watermarked / Limited", dq: "Unlimited & Unbranded" },
    { name: "Automate Pipeline Recipes", saas: "Enterprise only", dq: "All 8 Recipes Included" },
    { name: "Automate Scheduled Refreshes", saas: "Paid upgrade", dq: "Included" },
    { name: "Executive AI Written Reports", saas: "Credits / Upsell", dq: "Included" },
    { name: "Data Privacy & Tracking", saas: "Transmitted to vendor", dq: "Zero-telemetry Sandbox" },
    { name: "Source Code & Auditability", saas: "Proprietary / Closed", dq: "100% Open Source" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <Badge variant="pro" size="md">Community Open Source</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            100% Free &amp; Open Source Forever
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            No credit cards. No artificial tier paywalls. No vendor lock-in. <br />
            DataQuery is powered by local browser WebAssembly (DuckDB &amp; Pyodide) so you get enterprise-grade analytical horsepower without server bills.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link href="/app/playground">
              <Button
                variant="glow"
                size="md"
                leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Playground Now
              </Button>
            </Link>
            <a
              href="https://github.com/AkbarDev/dataquery"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                size="md"
                leftIcon={<GithubIcon className="w-4 h-4" />}
              >
                Star on GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Why Open Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Zero Server Costs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries execute directly on your local CPU and GPU via DuckDB-WASM and Pyodide. Because we don't pay massive cloud computing bills, we never have to charge you.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Total Data Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your raw datasets never leave your machine. No telemetry trackers, no secret uploads, and no compliance headaches. Ideal for sensitive financial, healthcare, and enterprise data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Community Owned</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              DataQuery is built under a permissive open-source license. Inspect the code, contribute custom recipes, or host your own internal team instance freely.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                DataQuery Open Source vs. Traditional SaaS
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                See how community-driven local analytics compares with expensive vendor subscriptions.
              </p>
            </div>
            <Badge variant="success" size="md">All Capabilities Unlocked</Badge>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs">
            <div className="grid grid-cols-3 p-4 bg-slate-950 font-semibold text-slate-300">
              <span>Capability / Metric</span>
              <span className="text-center text-slate-400">Traditional Data Tools</span>
              <span className="text-center text-sky-400">DataQuery.in (Open Source)</span>
            </div>

            {features.map((feat, i) => (
              <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-slate-900/40 transition-colors">
                <span className="text-slate-300 font-medium">{feat.name}</span>
                <span className="text-center text-slate-400 font-mono text-[11px]">
                  {feat.saas}
                </span>
                <span className="text-center text-emerald-400 font-semibold font-mono text-[11px] flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat.dq}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Ready to explore your data without limits? No signup required.
            </div>
            <Link href="/app/playground">
              <Button variant="glow" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Open Visual Playground
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <PublicFooter />
    </div>
  );
}
