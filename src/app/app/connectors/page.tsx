"use client";

import React from "react";
import { AppNav } from "@/components/layout/AppNav";
import ConnectorsPage from "@/app/connectors/page";

export default function WorkspaceConnectorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <AppNav />
      <div className="flex-1">
        <ConnectorsPage />
      </div>
    </div>
  );
}
