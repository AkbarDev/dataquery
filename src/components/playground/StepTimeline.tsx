"use client";

import React from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { History, Play, Trash2, CheckCircle2, ChevronRight, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StepTimeline() {
  const { stepHistory, removeStepHistory, clearStepHistory, saveStatus, currentDataset } =
    useAppStore();

  const handleRerunAll = () => {
    toast.success(
      "Re-running All Steps",
      `Executing ${stepHistory.length} pipeline transformation steps sequentially.`
    );
  };

  return (
    <div className="h-11 px-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 shrink-0">
      {/* Left: Step History List */}
      <div className="flex items-center space-x-2 overflow-x-auto py-1 max-w-[70%]">
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px] shrink-0 font-mono">
          <History className="w-3.5 h-3.5 text-sky-400" />
          <span>Timeline:</span>
        </div>

        {stepHistory.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0 group">
              <span className="text-[10px] font-mono text-sky-400 font-bold">
                {idx + 1}
              </span>
              <span className="text-[11px] text-slate-200 truncate max-w-[140px]">
                {step.name}
              </span>
              <button
                onClick={() => removeStepHistory(step.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity ml-0.5 cursor-pointer"
                title="Delete Step"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </div>
            {idx < stepHistory.length - 1 && (
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right: Controls & Auto-save Indicator */}
      <div className="flex items-center space-x-3 shrink-0">
        <Button
          variant="ghost"
          size="xs"
          onClick={handleRerunAll}
          leftIcon={<Play className="w-3 h-3 text-sky-400" />}
        >
          Re-run all
        </Button>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
          <CheckCircle2 className="w-3 h-3" />
          <span>{saveStatus}</span>
        </div>
      </div>
    </div>
  );
}
