import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: number; // e.g. +14.2% or -3.1%
  changePeriod?: string; // e.g. "vs last month"
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  changePeriod = "vs previous period",
  icon,
  subtitle,
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "p-5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-sm hover:border-slate-700 transition-all duration-150 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        {icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-sky-400">
            {icon}
          </div>
        )}
      </div>

      <div className="my-2">
        <div className="text-2xl font-bold tracking-tight text-slate-100">
          {value}
        </div>
        {subtitle && (
          <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/60 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold text-xs px-1.5 py-0.5 rounded",
              isPositive && "bg-emerald-500/10 text-emerald-400",
              isNegative && "bg-red-500/10 text-red-400",
              !isPositive && !isNegative && "bg-slate-800 text-slate-300"
            )}
          >
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {changePeriod}
          </span>
        </div>
      )}
    </div>
  );
}
