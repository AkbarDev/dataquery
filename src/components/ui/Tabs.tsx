import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: "pill" | "underline" | "editor";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  if (variant === "editor") {
    return (
      <div className={cn("flex items-center space-x-1 border-b border-slate-800 bg-slate-950 px-2 pt-1", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-t-md transition-all cursor-pointer",
                isActive
                  ? "bg-slate-900 text-sky-400 border-t-2 border-sky-400 border-x border-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40",
                tab.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div className={cn("flex items-center space-x-6 border-b border-slate-800", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative cursor-pointer",
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-slate-400 hover:text-slate-200",
                tab.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // default pill
  return (
    <div className={cn("inline-flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800/80", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
              isActive
                ? "bg-slate-800 text-slate-100 shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60",
              tab.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge}
          </button>
        );
      })}
    </div>
  );
}
