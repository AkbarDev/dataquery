"use client";

import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Play, ShoppingBag, TrendingUp, Users, DollarSign } from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    {
      title: "SaaS ARR & Churn Cohorts",
      desc: "Track monthly recurring revenue, net expansion rate, and cohort logo churn.",
      engine: "Python (Pandas)",
      category: "SaaS & Subscription",
      icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
    },
    {
      title: "E-Commerce ROAS & Unit Margins",
      desc: "Analyze product-level gross margin contribution and return on ad spend.",
      engine: "DuckDB SQL",
      category: "Retail & Commerce",
      icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "RFM Customer Segmentation",
      desc: "Quantile binning for Recency, Frequency, and Monetary lifetime customer value.",
      engine: "Python (Pandas)",
      category: "Marketing",
      icon: <Users className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "Corporate Cash Flow & YTD Budget",
      desc: "Time intelligence actual vs budget variance models with TOTALYTD DAX measures.",
      engine: "Power BI (DAX)",
      category: "Corporate Finance",
      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="info" size="md">Ready-to-Run Blueprints</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Curated Analytics Templates
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Jumpstart your analysis with industry-standard analytical workflows. Pre-configured with sample schemas and formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-800 text-slate-200">
                    {tpl.icon}
                  </div>
                  <Badge variant="outline" size="sm">
                    {tpl.engine}
                  </Badge>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    {tpl.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link href="/app/playground">
                  <Button variant="glow" size="xs" className="w-full justify-between">
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
