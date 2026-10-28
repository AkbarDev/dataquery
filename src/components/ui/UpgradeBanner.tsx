"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface UpgradeBannerProps {
  onUpgrade?: () => void;
  compact?: boolean;
  className?: string;
}

export function UpgradeBanner({
  compact = false,
  className,
}: UpgradeBannerProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "p-3 rounded-lg bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/30 flex items-center justify-between text-xs",
          className
        )}
      >
        <div className="flex items-center gap-2 text-slate-200">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span><strong>100% Free & Open Source:</strong> Unlimited runs, full DuckDB, Python & DAX engines unlocked.</span>
        </div>
        <a
          href="https://github.com/AkbarDev/dataquery"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            size="xs"
            variant="outline"
            leftIcon={<GithubIcon className="w-3 h-3" />}
          >
            Star on GitHub
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-sky-500/30 relative overflow-hidden shadow-xl",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free &amp; Open Source</span>
          </div>
          <h3 className="text-base font-bold text-slate-100">
            All Features Unlocked For Everyone
          </h3>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            DataQuery is community-driven. Run unlimited queries with DuckDB, execute client-side Python scripts, use all DAX formulas, and export unbranded executive PDF reports with zero cost.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
}

