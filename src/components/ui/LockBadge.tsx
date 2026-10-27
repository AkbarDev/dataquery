"use client";

import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "./Tooltip";

export interface LockBadgeProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function LockBadge({
  label = "Pro Feature",
  onClick,
  className,
}: LockBadgeProps) {
  return (
    <Tooltip content="Available on Pro Plan - Click to Upgrade">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors cursor-pointer",
          className
        )}
      >
        <Lock className="w-2.5 h-2.5" />
        <span>{label}</span>
      </button>
    </Tooltip>
  );
}
