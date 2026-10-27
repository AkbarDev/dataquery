"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Sparkles, X, ArrowRight, ShieldCheck } from "lucide-react";
import { UpgradeModal } from "@/components/playground/UpgradeModal";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    { name: "Max Single File Upload Size", free: "25 MB", pro: "500 MB" },
    { name: "Total Dataset Row Capacity", free: "100,000 rows", pro: "5,000,000 rows" },
    { name: "Daily Query & Automate Runs", free: "50 runs / day", pro: "Unlimited" },
    { name: "Active Data Connectors", free: "1 connector", pro: "20 connectors" },
    { name: "Execution Engines (Python, DuckDB, DAX)", free: "Basic & Intermediate", pro: "All + Advanced Window Functions" },
    { name: "Interactive Visual Dashboards", free: "2 dashboards (watermarked)", pro: "Unlimited (unbranded)" },
    { name: "Copilot AI Prompts", free: "10 prompts / mo", pro: "500 prompts / mo" },
    { name: "Automate Pipeline Scheduling", free: false, pro: true },
    { name: "Executive AI Written Reports", free: "Basic summary", pro: "Full narrative & action items" },
    { name: "White-Label & PDF Export", free: false, pro: true },
    { name: "Priority Community & SLA Support", free: "Community forum", pro: "24/7 Priority Email SLA" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <Badge variant="pro" size="md">Transparent Value</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Plans Built for Solopreneurs &amp; Modern Data Teams
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Start completely free. Upgrade to Pro whenever your datasets and automation demands grow.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs ${!isAnnual ? "text-slate-100 font-semibold" : "text-slate-400"}`}>
              Monthly billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-slate-800 rounded-full p-1 transition-colors border border-slate-700 relative cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-sky-400 transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs flex items-center gap-1.5 ${isAnnual ? "text-slate-100 font-semibold" : "text-slate-400"}`}>
              <span>Annual billing</span>
              <Badge variant="success" size="sm">20% Off</Badge>
            </span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Card */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Free Starter
              </span>
              <div className="text-4xl font-extrabold text-slate-100">$0</div>
              <p className="text-xs text-slate-400">
                Perfect for students, individual analysts, and ad-hoc CSV exploration.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 25 MB max file upload</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100,000 row capacity</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 50 runs / day</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1 active connector</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 10 Copilot AI prompts / month</li>
              </ul>
            </div>

            <Link href="/app/playground" className="mt-8">
              <Button variant="outline" size="md" className="w-full">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border-2 border-sky-500/60 flex flex-col justify-between relative shadow-2xl shadow-sky-500/10">
            <div className="absolute top-4 right-4">
              <Badge variant="pro" size="sm">Recommended</Badge>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider font-mono">
                DataQuery Pro
              </span>
              <div className="text-4xl font-extrabold text-slate-100">
                ${isAnnual ? "24" : "29"}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-300">
                For power analysts, growing startups, and agencies requiring scheduled automation.
              </p>
              <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> <strong>500 MB</strong> file capacity</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> <strong>5,000,000</strong> rows analysis</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> <strong>Unlimited</strong> daily runs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> Advanced DAX &amp; DuckDB window functions</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> Scheduled Automate pipelines</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400" /> 500 AI Copilot prompts / month</li>
              </ul>
            </div>

            <div className="mt-8 space-y-2">
              <Button
                variant="glow"
                size="md"
                onClick={() => setModalOpen(true)}
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Upgrade to Pro (Test Mode)
              </Button>
              <Link href="/checkout" className="block text-center text-[11px] text-slate-400 hover:text-slate-200">
                or go to test checkout page →
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-slate-950/80">
            <h3 className="text-sm font-bold text-slate-100">Detailed Feature Comparison</h3>
          </div>
          <div className="divide-y divide-slate-800 text-xs">
            {features.map((feat, i) => (
              <div key={i} className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/30 transition-colors">
                <span className="text-slate-300 font-medium">{feat.name}</span>
                <span className="text-center text-slate-400 font-mono">
                  {typeof feat.free === "boolean" ? (
                    feat.free ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                  ) : (
                    feat.free
                  )}
                </span>
                <span className="text-center text-sky-300 font-mono font-semibold">
                  {typeof feat.pro === "boolean" ? (
                    feat.pro ? <Check className="w-4 h-4 text-sky-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                  ) : (
                    feat.pro
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <PublicFooter />
    </div>
  );
}
