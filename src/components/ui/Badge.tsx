import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "python"
    | "sql"
    | "dax"
    | "pro";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-0.5 gap-1.5",
  };

  const variantStyles = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    secondary: "bg-slate-700/50 text-slate-300",
    outline: "bg-transparent text-slate-300 border border-slate-700",
    success:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning:
      "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    python:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono",
    sql: "bg-sky-500/15 text-sky-400 border border-sky-500/30 font-mono",
    dax: "bg-purple-500/15 text-purple-400 border border-purple-500/30 font-mono",
    pro: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 font-semibold",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
