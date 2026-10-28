"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Check, ExternalLink, Terminal, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import Link from "next/link";

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title="100% Free & Open Source"
      description="DataQuery is completely community-driven with zero paywalls. Every capability is fully unlocked for everyone forever."
    >
      <div className="space-y-6">
        {/* Open Source Banner */}
        <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-center gap-3 text-xs text-sky-300">
          <Sparkles className="w-5 h-5 shrink-0 text-sky-400" />
          <span>
            <strong>No Paid Subscription Required:</strong> DuckDB SQL, Python/Pandas in Pyodide, Power BI DAX measures, automated pipelines, and PDF exports are entirely free to use.
          </span>
        </div>

        {/* Feature Unlocked Highlights */}
        <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Included in Community Edition:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited Daily Query Runs</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DuckDB Columnar Analytical Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>In-Browser Python via WebAssembly</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full DAX Formula & Field Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automate Recipes & Pipeline Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-Telemetry & 100% Data Privacy</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <a
            href="https://github.com/AkbarDev/dataquery"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 sm:flex-initial">
              Close
            </Button>
            <Button
              variant="glow"
              size="sm"
              onClick={onClose}
              leftIcon={<Terminal className="w-3.5 h-3.5" />}
              className="flex-1 sm:flex-initial"
            >
              Continue Analytics
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

