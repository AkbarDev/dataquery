"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Play,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      <div className="w-full max-w-lg space-y-6 text-center">
        {/* Open Source Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/30 shadow-2xl space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
            <Heart className="w-7 h-7 fill-sky-400/20" />
          </div>

          <div className="space-y-2">
            <Badge variant="pro" size="md">Community Open Source</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              No Checkout Needed
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              DataQuery is <strong>100% Free &amp; Open Source</strong>. There are no paid tiers, no credit cards required, and no hidden subscriptions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full DuckDB SQL &amp; Python WASM Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 90 analytical formulas &amp; DAX measures</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited file size uploads &amp; row capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automate recipes &amp; unbranded PDF exports</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/app/playground" className="w-full sm:w-auto">
              <Button
                variant="glow"
                size="md"
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="w-full"
              >
                Launch Playground
              </Button>
            </Link>
            <a
              href="https://github.com/AkbarDev/dataquery"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="md"
                leftIcon={<GithubIcon className="w-4 h-4" />}
                className="w-full"
              >
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Return to DataQuery Home
        </Link>
      </div>
    </div>
  );
}
