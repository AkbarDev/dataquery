import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, idx) => {
        const isDone = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 border",
                  isDone
                    ? "bg-emerald-500 border-emerald-500 text-slate-950"
                    : isCurrent
                    ? "bg-sky-500 border-sky-400 text-slate-950 shadow-md shadow-sky-500/20"
                    : "bg-slate-900 border-slate-700 text-slate-400"
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
              </div>
              <div className="hidden sm:block">
                <span
                  className={cn(
                    "text-xs font-medium block",
                    isCurrent ? "text-slate-100" : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-slate-500 block">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3 transition-colors",
                  idx < currentStep ? "bg-emerald-500/50" : "bg-slate-800"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
