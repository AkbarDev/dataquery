"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Sparkles,
  ArrowRight,
  Play,
  Terminal,
  Database,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  BarChart3,
  HardDrive,
  Boxes,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [activeUseCase, setActiveUseCase] = useState<"Ecommerce" | "Marketing" | "Students" | "Finance">("Ecommerce");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is DataQuery.in?",
      a: "DataQuery is an all-in-one hosted data build tool and visual playground. Ingest raw spreadsheets or database feeds, transform them in Python, SQL, or DAX, trigger automated recipes, and generate executive AI reports in seconds.",
    },
    {
      q: "Can I try DataQuery without creating an account?",
      a: "Yes! Click 'Try with sample data' anywhere on the page to jump straight into the full interactive Playground preloaded with our global sales and margin dataset.",
    },
    {
      q: "How does in-browser execution work?",
      a: "Queries and transformations run securely in your browser using Pyodide (Python WebAssembly with pandas/NumPy) and DuckDB-WASM for high-speed columnar SQL. Your raw datasets never leave your local session unless you choose to persist them.",
    },
    {
      q: "What is the difference between Manual and Automate modes?",
      a: "Manual mode gives you an unconstrained code editor in Python, DuckDB SQL, or Power BI DAX formulas. Automate mode provides one-click recipes (Cleaning, Sales summary, RFM segmentation, Cohort retention) that run multi-step pipelines automatically.",
    },
    {
      q: "How does the Power BI / DAX tab work?",
      a: "The DAX tab brings familiar Power BI analytical measures (SUM, CALCULATE, DIVIDE, TOTALYTD) and an interactive visual field builder into the browser without needing a Windows machine or heavy desktop client.",
    },
    {
      q: "Is DataQuery really 100% free and open source?",
      a: "Yes! DataQuery is 100% free and open source. All heavy analytical calculations run locally in your browser using DuckDB-WASM and Pyodide, meaning there are no high server compute costs to charge users for. All features, functions, and recipes are completely unlocked.",
    },
    {
      q: "Can I export my dashboards and reports to PDF or BI tools?",
      a: "Yes. Dashboards and AI reports can be downloaded as PDFs. You can also export transformed data to CSV or copy auto-generated Power Query M and Tableau LOD formulas.",
    },
    {
      q: "Is my data private and secure?",
      a: "DataQuery is built with strict privacy-first architecture. Client-side processing ensures zero data telemetry. We never log or store file contents on untrusted third-party trackers.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      {/* 1. Sticky Nav */}
      <PublicNav />

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hosted on dataquery.in · Powered by DuckDB &amp; Pyodide</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            The All-in-One Hosted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Data Build &amp; Analytics Playground
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bring a file or an app feed, transform it in Python, DuckDB SQL, or DAX, press <strong>Automate</strong>, and get live visual dashboards plus an AI-written executive report.
          </p>

          {/* Two Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/app/playground">
              <Button
                variant="glow"
                size="lg"
                leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Try with sample data (No signup)
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Create free account
              </Button>
            </Link>
          </div>

          {/* Animated Playground Preview Mockup */}
          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/80 p-2 sm:p-3 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="rounded-xl border border-slate-800 bg-[#0B0F17] overflow-hidden">
              {/* Window Bar */}
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    dataquery.in/playground — sales_q3.csv (DuckDB-WASM 0.10)
                  </span>
                </div>
                <Badge variant="success" size="sm">DuckDB Online</Badge>
              </div>

              {/* Mockup 3-Pane Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px] text-left text-xs font-mono">
                <div className="md:col-span-3 p-3 border-r border-slate-800 bg-slate-950/60 hidden md:block">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold mb-2">Schema (9 cols)</div>
                  <div className="space-y-1.5 text-slate-300">
                    <div># order_id: string</div>
                    <div># order_date: date</div>
                    <div className="text-sky-400 font-semibold"># revenue: float64</div>
                    <div className="text-emerald-400 font-semibold"># profit: float64</div>
                    <div># region: string</div>
                  </div>
                </div>

                <div className="md:col-span-5 p-3.5 bg-slate-900/40 border-r border-slate-800">
                  <div className="text-[11px] text-sky-400 font-semibold mb-2">// SQL Columnar Query</div>
                  <pre className="text-slate-300 text-[11px] leading-relaxed">
{`SELECT 
  region,
  SUM(revenue) AS total_rev,
  ROUND(SUM(profit)/SUM(revenue)*100, 1) AS margin_pct
FROM sales
GROUP BY 1
ORDER BY total_rev DESC;`}
                  </pre>
                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px]">Ctrl+Enter to Run</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">Ctrl+Shift+Enter Automate</span>
                  </div>
                </div>

                <div className="md:col-span-4 p-3.5 bg-slate-950/60 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold mb-2">Output Matrix (4 rows)</div>
                    <div className="space-y-1 text-slate-300 text-[11px]">
                      <div className="flex justify-between"><span>North America:</span> <span className="text-sky-400 font-bold">$66,200 (56.5%)</span></div>
                      <div className="flex justify-between"><span>Europe:</span> <span className="text-sky-400 font-bold">$59,500 (61.7%)</span></div>
                      <div className="flex justify-between"><span>Asia Pacific:</span> <span className="text-sky-400 font-bold">$59,400 (61.8%)</span></div>
                      <div className="flex justify-between"><span>Latin America:</span> <span className="text-sky-400 font-bold">$7,700 (42.9%)</span></div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Compiled in 18.4ms · Zero Server Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Connector Logo Strip */}
      <section className="py-10 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
            Instant Ingestion from 20+ Data Sources &amp; Formats
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-slate-400 font-medium text-xs">
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><FileSpreadsheet className="w-4 h-4 text-emerald-400" /> CSV &amp; Excel</span>
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><HardDrive className="w-4 h-4 text-blue-400" /> Google Drive</span>
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><Database className="w-4 h-4 text-sky-400" /> MySQL &amp; PostgreSQL</span>
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><Boxes className="w-4 h-4 text-green-400" /> MongoDB Atlas</span>
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><ShoppingBag className="w-4 h-4 text-purple-400" /> Shopify Store</span>
            <span className="flex items-center gap-2 hover:text-slate-200 transition-colors"><Zap className="w-4 h-4 text-amber-400" /> Webhook REST API</span>
          </div>
        </div>
      </section>

      {/* 4. Three Playground Cards: Python, SQL, Power BI-style */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-100">
            Three Analytical Engines. One Playground.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Switch effortlessly between code and formula semantics. Each environment supports both full Manual control and one-click Automate pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Python */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Python (Pandas &amp; NumPy)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-featured in-browser Pyodide runtime. Execute dataframe aggregations, clean null values, compute rolling averages, and calculate Z-score anomaly outliers.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Manual: Monaco editor with auto-complete</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Automate: Auto RFM, cohorts &amp; forecast</div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800">
              <Link href="/app/playground?tab=python">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Launch Python Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: DuckDB SQL */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group shadow-lg shadow-sky-500/5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">DuckDB Columnar SQL</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fast analytical SQL engine running compiled WebAssembly. Filter millions of rows in milliseconds using window functions, CTEs, and QUALIFY deduplication.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Manual: High-speed relational queries</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Automate: Auto-profile &amp; metric synthesis</div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800">
              <Link href="/app/playground?tab=sql">
                <Button variant="outline" size="sm" className="w-full justify-between border-sky-500/40 text-sky-300">
                  <span>Launch SQL Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Power BI DAX */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Power BI-Style (DAX)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visual axis builder with DAX-style measures (CALCULATE, SUM, FILTER, DIVIDE, TOTALYTD) right inside your web browser.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Manual: Interactive field axis builder</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Automate: Instant DAX measures generation</div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800">
              <Link href="/app/playground?tab=dax">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Launch DAX Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Step How it Works (Connect, Clean, Analyse, Report) */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">Workflow</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-100">
              How DataQuery Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              From raw unorganized spreadsheets to an executive presentation in four steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center font-mono">1</div>
              <h4 className="text-sm font-bold text-slate-100">Connect</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag-and-drop CSV, XLSX, or connect a live feed (Google Sheets, MySQL, REST API) with automatic type inference.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center font-mono">2</div>
              <h4 className="text-sm font-bold text-slate-100">Clean</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audit missing values, eliminate duplicate keys, and inspect automated quality health scores up to 100%.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center font-mono">3</div>
              <h4 className="text-sm font-bold text-slate-100">Analyse</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Write queries or click Automate. Slice and dice with 90+ built-in functions, moving averages, and DAX measures.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">4</div>
              <h4 className="text-sm font-bold text-slate-100">Report</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pin charts to customizable dashboards and download AI-written executive reports with action recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Demo Strip Using Sample sales.csv */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/30 border border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-left">
            <Badge variant="info" size="sm">Live Sandbox Ready</Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Want to see it in action right now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We pre-seeded a 15-transaction global sales and margin dataset (<code>sales_q3.csv</code>) with regional margins, order dates, and churn risk scores.
            </p>
          </div>
          <Link href="/app/playground" className="shrink-0">
            <Button variant="glow" size="lg" leftIcon={<Play className="w-4 h-4 fill-current" />}>
              Open Live Playground
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. Use-Case Tabs (Ecommerce, Marketing, Students, Finance) */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-100">
              Tailored for Every Modern Analyst
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select your domain to see tailored workflows and pre-built templates.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-8">
            {(["Ecommerce", "Marketing", "Students", "Finance"] as const).map((uc) => (
              <button
                key={uc}
                onClick={() => setActiveUseCase(uc)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeUseCase === uc
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {uc}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
            {activeUseCase === "Ecommerce" && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-100">E-Commerce &amp; Retail Brand Analytics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Analyze Average Order Value (AOV), SKU-level gross profit margin percentages, and repeat buyer cycle frequencies directly from Shopify or Amazon order exports.
                </p>
                <div className="flex gap-2 text-[11px] font-mono text-sky-400">
                  <span>Preset: Sales Summary</span> · <span>Function: Margin % = DIVIDE(Profit, Revenue)</span>
                </div>
              </div>
            )}
            {activeUseCase === "Marketing" && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-100">Growth &amp; Acquisition Performance</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluate blended Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and multi-channel attribution across Meta, Google, and email campaigns.
                </p>
                <div className="flex gap-2 text-[11px] font-mono text-purple-400">
                  <span>Preset: Ad ROAS</span> · <span>Function: ROAS = AdRevenue / AdSpend</span>
                </div>
              </div>
            )}
            {activeUseCase === "Students" && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-100">Students &amp; Learning Analytics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn real-world Python (pandas), DuckDB SQL, and Power BI DAX formulas hands-on in the browser without installing complex local Python environments or database drivers.
                </p>
                <div className="flex gap-2 text-[11px] font-mono text-blue-400">
                  <span>Preset: Deep Schema Profile</span> · <span>90+ Curated Catalog Functions</span>
                </div>
              </div>
            )}
            {activeUseCase === "Finance" && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-100">Corporate Finance &amp; FP&amp;A Modeling</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculate Year-to-Date (YTD) actuals vs budget, Year-over-Year variance percentages, and rolling 30-day cash flow moving averages.
                </p>
                <div className="flex gap-2 text-[11px] font-mono text-emerald-400">
                  <span>Preset: Simple Forecast</span> · <span>Function: TOTALYTD() Time Intelligence</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. Open Source Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">Open Source</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-100">
            100% Free &amp; Community Driven
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Zero subscription fees. Zero artificial dataset paywalls. Zero proprietary vendor lock-in. Powered by local DuckDB-WASM and Pyodide.
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/40 shadow-2xl space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider font-mono">
                Community Edition
              </span>
              <div className="text-3xl font-extrabold text-slate-100 mt-1">
                $0 <span className="text-xs font-normal text-slate-400">/ forever free</span>
              </div>
            </div>
            <Badge variant="pro" size="md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Capabilities Unlocked</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited DuckDB SQL queries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>In-browser Python (pandas &amp; numpy)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Power BI DAX analytical measures</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>8 one-click Automate recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited interactive visual dashboards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-telemetry client-side privacy</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link href="/app/playground" className="w-full sm:w-auto flex-1">
              <Button variant="glow" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Visual Playground
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full">
                View Open Source Manifesto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. 8-Question FAQ Accordion */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400">
              Everything you need to know about our technology, pricing, and execution runtime.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <PublicFooter />
    </div>
  );
}
