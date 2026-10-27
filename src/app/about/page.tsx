"use client";

import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Terminal, Cpu, Heart, Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="info" size="md">Our Mission</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Democratizing High-Speed Data Engineering
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Data analysis shouldn&apos;t require spending hours provisioning cloud warehouses, installing gigabytes of desktop drivers, or managing fragile Python virtual environments.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
          <h3 className="text-base font-bold text-slate-100">Why We Built DataQuery</h3>
          <p>
            Modern analysts are stuck between slow, rigid spreadsheet GUIs and high-overhead cloud infrastructure. DataQuery combines the zero-latency responsiveness of in-browser WebAssembly (DuckDB and Pyodide) with the intuitive feel of visual playgrounds and Power BI measures.
          </p>
          <p>
            With one click, non-technical team members can run complex data cleaning, RFM segmentations, and cohort analysis—and pin findings directly to live dashboards without writing a single line of backend boilerplate.
          </p>
        </div>

        <div className="text-center pt-4">
          <Link href="/app/playground">
            <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Try DataQuery Now
            </Button>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
