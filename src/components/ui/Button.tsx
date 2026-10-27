import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "glow"
    | "accent-sql"
    | "accent-python"
    | "accent-dax";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const sizeStyles = {
      xs: "text-xs px-2 py-1 rounded gap-1",
      sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
      md: "text-sm px-3.5 py-2 rounded-lg gap-2",
      lg: "text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-sm hover:shadow-sky-500/20 active:translate-y-px",
      glow: "bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 active:translate-y-px border border-sky-300/40",
      secondary:
        "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 active:translate-y-px",
      outline:
        "bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 active:translate-y-px",
      ghost:
        "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white",
      danger:
        "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 active:translate-y-px",
      "accent-sql":
        "bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30",
      "accent-python":
        "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30",
      "accent-dax":
        "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
