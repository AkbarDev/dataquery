"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

type ToastListener = (toasts: ToastMessage[]) => void;

let listeners: ToastListener[] = [];
let toasts: ToastMessage[] = [];

export const toast = {
  notify: (type: ToastType, title: string, description?: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, description, duration };
    toasts = [...toasts, newToast];
    listeners.forEach((l) => l(toasts));

    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }
  },
  success: (title: string, description?: string) =>
    toast.notify("success", title, description),
  error: (title: string, description?: string) =>
    toast.notify("error", title, description),
  info: (title: string, description?: string) =>
    toast.notify("info", title, description),
  warning: (title: string, description?: string) =>
    toast.notify("warning", title, description),
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toasts));
  },
};

export function ToastContainer() {
  const [activeToasts, setActiveToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleUpdate = (updated: ToastMessage[]) => setActiveToasts(updated);
    listeners.push(handleUpdate);
    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  if (activeToasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30",
    error: "border-red-500/30",
    warning: "border-amber-500/30",
    info: "border-sky-500/30",
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {activeToasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 p-4 bg-slate-900 border rounded-xl shadow-xl transition-all duration-200 animate-in slide-in-from-bottom-2",
            borders[t.type]
          )}
        >
          {icons[t.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-slate-100">{t.title}</h4>
            {t.description && (
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {t.description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-slate-500 hover:text-slate-300 p-0.5 rounded"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
