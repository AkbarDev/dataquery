"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface UpgradeBannerProps {
  onUpgrade?: () => void;
  compact?: boolean;
  className?: string;
}

export function UpgradeBanner({
  onUpgrade,
  compact = false,
  className,
}: UpgradeBannerProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "p-3 rounded-lg bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-purple-500/10 border border-amber-500/30 flex items-center justify-between text-xs",
          className
        )}
      >
        <div className="flex items-center gap-2 text-slate-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Unlock 100k+ rows, Automate scheduling & custom exports on <strong>Pro</strong>.</span>
        </div>
        <Button
          size="xs"
          variant="glow"
          onClick={onUpgrade}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          Upgrade
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 relative overflow-hidden shadow-xl",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Power Up Your Analytics</span>
          </div>
          <h3 className="text-base font-bold text-slate-100">
            Scale with DataQuery Pro
          </h3>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Get unlimited runs, 500 MB file sizes, live connector syncing, advanced DAX & DuckDB window functions, and unbranded PDF reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="md"
            onClick={onUpgrade}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
