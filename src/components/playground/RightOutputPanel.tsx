"use client";

import React from "react";
import { OutputResultsCanvas } from "./OutputResultsCanvas";

export function RightOutputPanel() {
  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden border-l border-slate-800">
      <OutputResultsCanvas />
    </div>
  );
}
