"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Pin, Download, Maximize2, MoreHorizontal } from "lucide-react";
import { Button } from "./Button";

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onPin?: () => void;
  onExport?: () => void;
  isPinned?: boolean;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  onPin,
  onExport,
  isPinned,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col",
        className
      )}
    >
      <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold text-slate-200">{title}</h4>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onPin && (
            <button
              onClick={onPin}
              title={isPinned ? "Pinned to Dashboard" : "Pin to Dashboard"}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors cursor-pointer",
                isPinned
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              title="Export Chart"
              className="p-1.5 rounded-md text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 min-h-[220px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
