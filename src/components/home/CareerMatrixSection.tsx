"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  Database,
  Terminal,
  Layers,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  Cpu,
  Search,
  Filter,
  SlidersHorizontal,
  Compass,
  Wrench,
  Workflow,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";

export interface CareerRole {
  id: string;
  number: string;
  standardTitle: string;
  creativePersona: string;
  shortCallout: string;
  mission: string;
  colorTheme: "sky" | "blue" | "purple" | "rose" | "amber";
  accentBorder: string;
  accentBg: string;
  accentText: string;
  skills: string[];
  tools: { name: string; tag: string }[];
  techCategories: string[];
  playgroundTab: "sql" | "python" | "pyspark" | "ml" | "dax";
  playgroundCtaText: string;
  engineFeature: string;
}

export const DATA_CAREER_ROLES: CareerRole[] = [
  {
    id: "data_analytics",
    number: "01",
    standardTitle: "Data Analytics",
    creativePersona: "The Data Detective",
    shortCallout: "Insights & Discovery Architect",
    mission:
      "The frontline investigative force of modern analytics. Turns chaotic, dirty data dumps into verified executive truths through sharp querying, anomaly hunting, and clear reporting.",
    colorTheme: "sky",
    accentBorder: "border-sky-500/40 hover:border-sky-400",
    accentBg: "bg-sky-500/10 text-sky-400",
    accentText: "text-sky-400",
    skills: [
      "Data Cleaning & Imputation",
      "Excel & SQL Query Basics",
      "Interactive Data Visualization",
      "Descriptive Statistics & Outliers",
      "Reporting & Actionable Insights",
    ],
    tools: [
      { name: "Excel", tag: "Spreadsheets" },
      { name: "SQL (DuckDB)", tag: "Columnar Queries" },
      { name: "Power BI", tag: "Visual Metrics" },
      { name: "Tableau", tag: "Dashboards" },
      { name: "Google Sheets", tag: "Cloud Tables" },
    ],
    techCategories: ["sql", "excel", "spreadsheets", "bi"],
    playgroundTab: "sql",
    playgroundCtaText: "Launch Data Analytics Studio",
    engineFeature: "DuckDB-WASM 0.10 Columnar SQL + Automatic Schema Profiler",
  },
  {
    id: "business_analytics",
    number: "02",
    standardTitle: "Business Analytics",
    creativePersona: "The Strategic Navigator",
    shortCallout: "Boardroom Value Translator",
    mission:
      "The high-level bridge connecting raw data tables to multimillion-dollar boardroom strategy. Translates company KPIs into decisive operational roadmaps and customer growth levers.",
    colorTheme: "blue",
    accentBorder: "border-blue-500/40 hover:border-blue-400",
    accentBg: "bg-blue-500/10 text-blue-400",
    accentText: "text-blue-400",
    skills: [
      "KPI Tracking & Governance",
      "Business Reporting & Board Decks",
      "Requirement Analysis & Metrics",
      "Forecasting Basics & Moving Avgs",
      "Executive Decision Support",
    ],
    tools: [
      { name: "Excel", tag: "Financial Modeling" },
      { name: "Power BI", tag: "Executive Dashboards" },
      { name: "Tableau", tag: "Strategic Views" },
      { name: "SQL", tag: "Aggregations" },
      { name: "Looker Studio", tag: "Web Analytics" },
    ],
    techCategories: ["excel", "bi", "sql", "forecasting"],
    playgroundTab: "python",
    playgroundCtaText: "Run Business Automate Recipe",
    engineFeature: "Automate Pipeline Recipes: Sales Summary, Cohort Retention & RFM",
  },
  {
    id: "data_engineering",
    number: "03",
    standardTitle: "Data Engineering",
    creativePersona: "The Pipeline Blacksmith",
    shortCallout: "Big Data Infrastructure Titan",
    mission:
      "The architect of the data highway. Forges indestructible pipelines, orchestrates petabyte-scale data lakes, and keeps warehouses streaming with sub-second execution speeds.",
    colorTheme: "purple",
    accentBorder: "border-purple-500/40 hover:border-purple-400",
    accentBg: "bg-purple-500/10 text-purple-400",
    accentText: "text-purple-400",
    skills: [
      "ETL / ELT Streaming Pipelines",
      "Modern Data Warehousing",
      "Database Indexing & Partitioning",
      "Big Data & MapReduce Processing",
      "Workflow Automation & DAG Orchestration",
    ],
    tools: [
      { name: "Python", tag: "Pipeline Logic" },
      { name: "SQL", tag: "DDL & DML Warehousing" },
      { name: "Apache Spark", tag: "Distributed Engine" },
      { name: "Apache Airflow", tag: "DAG Scheduling" },
      { name: "Snowflake", tag: "Cloud Warehouse" },
      { name: "Hadoop (HDFS/YARN)", tag: "Cluster Storage" },
    ],
    techCategories: ["python", "sql", "spark", "bigdata", "cloud"],
    playgroundTab: "pyspark",
    playgroundCtaText: "Launch PySpark & Hadoop Studio",
    engineFeature: "PySpark Catalyst Plan Inspector + 3-Phase Hadoop MapReduce Telemetry",
  },
  {
    id: "data_science",
    number: "04",
    standardTitle: "Data Science",
    creativePersona: "The Algorithm Alchemist",
    shortCallout: "Predictive Machine Learning Pioneer",
    mission:
      "The predictive wizard turning historical features into future foresight. Trains intelligent classifiers, tunes hyperparameter loss functions, and unlocks hidden signals from messy distributions.",
    colorTheme: "rose",
    accentBorder: "border-rose-500/40 hover:border-rose-400",
    accentBg: "bg-rose-500/10 text-rose-400",
    accentText: "text-rose-400",
    skills: [
      "Statistical Hypothesis Modeling",
      "Machine Learning (16 Algorithms)",
      "Exploratory Data Analysis (EDA)",
      "Feature Engineering & Scaling",
      "Predictive Inference & Real-Time Scoring",
    ],
    tools: [
      { name: "Python", tag: "Core Language" },
      { name: "R", tag: "Statistical Computing" },
      { name: "Jupyter", tag: "Interactive Notebooks" },
      { name: "Scikit-learn", tag: "ML Classifiers" },
      { name: "Pandas & NumPy", tag: "Array Crunching" },
      { name: "XGBoost", tag: "Gradient Boosting" },
    ],
    techCategories: ["python", "ml", "statistics", "datascience"],
    playgroundTab: "ml",
    playgroundCtaText: "Launch Machine Learning Studio",
    engineFeature: "16 ML Algorithms Explained Simply + Dataset Suitability Greying Engine",
  },
  {
    id: "business_intelligence",
    number: "05",
    standardTitle: "Business Intelligence",
    creativePersona: "The Visual Storyteller",
    shortCallout: "Executive Dashboard Artisan",
    mission:
      "The master visualizer who transforms dense, intimidating tables into captivating, intuitive command centers that executives and managers love exploring.",
    colorTheme: "amber",
    accentBorder: "border-amber-500/40 hover:border-amber-400",
    accentBg: "bg-amber-500/10 text-amber-400",
    accentText: "text-amber-400",
    skills: [
      "Interactive Dashboard Design UX",
      "Data Storytelling & Executive Narratives",
      "Real-Time KPI Monitoring & Alerts",
      "Trend & Variance Analysis (YoY / MoM)",
      "Performance Tracking & Target Gauges",
    ],
    tools: [
      { name: "Power BI (DAX)", tag: "Semantic Models" },
      { name: "Tableau", tag: "Visual Analytics" },
      { name: "Looker", tag: "LookML Modeling" },
      { name: "Excel", tag: "Pivot Reporting" },
      { name: "SQL", tag: "Data Mart Aggregation" },
    ],
    techCategories: ["bi", "dax", "powerbi", "excel", "sql"],
    playgroundTab: "dax",
    playgroundCtaText: "Launch Power BI (DAX) Studio",
    engineFeature: "CALCULATE Multi-Measure Evaluator + Power BI Axis Field Builder",
  },
];

export function CareerMatrixSection() {
  const [activeRoleId, setActiveRoleId] = useState<string>("data_analytics");
  const [selectedTechFilter, setSelectedTechFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"detail" | "grid">("detail");

  const techFilters = [
    { id: "all", label: "All Tech Stacks" },
    { id: "sql", label: "SQL & Columnar" },
    { id: "python", label: "Python & Pandas" },
    { id: "bi", label: "Power BI & Tableau" },
    { id: "spark", label: "Apache Spark & Big Data" },
    { id: "ml", label: "Machine Learning (16 Algos)" },
    { id: "excel", label: "Excel & Sheets" },
  ];

  const activeRole = useMemo(
    () => DATA_CAREER_ROLES.find((r) => r.id === activeRoleId) || DATA_CAREER_ROLES[0],
    [activeRoleId]
  );

  const filteredRoles = useMemo(() => {
    if (selectedTechFilter === "all") return DATA_CAREER_ROLES;
    return DATA_CAREER_ROLES.filter((r) => r.techCategories.includes(selectedTechFilter));
  }, [selectedTechFilter]);

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full relative">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-rose-500/10 border border-slate-700 text-xs text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Data Domain Skill Set &amp; Career Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Find Your Analytical Superpower
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From <strong>The Data Detective</strong> to <strong>The Algorithm Alchemist</strong> — explore the 5 core data career paths, their essential skills and technology stacks, and test drive each workflow live in DataQuery.
          </p>
        </div>

        {/* Filter Controls Bar: Tech Filter + View Mode */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tech Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto text-xs">
            <span className="text-slate-400 font-mono text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-sky-400" /> Filter Tech:
            </span>
            {techFilters.map((tf) => {
              const isSelected = selectedTechFilter === tf.id;
              return (
                <button
                  key={tf.id}
                  onClick={() => setSelectedTechFilter(tf.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-slate-800 text-sky-400 font-semibold border border-sky-500/30 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {tf.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Role Deep-Dive vs 5-Role Matrix */}
          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setViewMode("detail")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === "detail"
                  ? "bg-slate-800 text-slate-100 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Role Deep-Dive
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-slate-800 text-slate-100 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All 5 Roles Matrix
            </button>
          </div>
        </div>

        {/* VIEW 1: ROLE DEEP-DIVE WITH CATEGORY TABS */}
        {viewMode === "detail" ? (
          <div className="space-y-6">
            {/* Horizontal Role Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {DATA_CAREER_ROLES.map((role) => {
                const isActive = role.id === activeRoleId;
                const matchesFilter =
                  selectedTechFilter === "all" || role.techCategories.includes(selectedTechFilter);

                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRoleId(role.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer group ${
                      isActive
                        ? "bg-slate-900 border-sky-400/90 shadow-lg shadow-sky-500/10 ring-1 ring-sky-400/60"
                        : matchesFilter
                        ? "bg-slate-900/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900"
                        : "opacity-45 bg-slate-950 border-slate-900 grayscale"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-200">
                        {role.number}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      )}
                    </div>
                    <div className="font-bold text-xs text-slate-200 leading-snug">
                      {role.creativePersona}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {role.standardTitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Role Showcase Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-[#0c121e] border border-slate-800 shadow-2xl relative overflow-hidden">
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-slate-800 text-slate-300 border border-slate-700">
                      POSITION {activeRole.number}
                    </span>
                    <Badge variant="pro" size="sm">
                      {activeRole.standardTitle.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
                    <span>{activeRole.creativePersona}</span>
                    <span className="text-slate-500 font-normal text-base sm:text-lg">
                      · {activeRole.shortCallout}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {activeRole.mission}
                  </p>
                </div>

                <Link href={`/app/playground?tab=${activeRole.playgroundTab}`} className="shrink-0">
                  <Button
                    variant="glow"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {activeRole.playgroundCtaText}
                  </Button>
                </Link>
              </div>

              {/* 3 Pillars Grid: Skills | Tools | In DataQuery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
                {/* Pillar 1: Skills */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Core Skills &amp; Competencies
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {activeRole.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar 2: Tools & Tech Arsenal */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Tools &amp; Tech Arsenal
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeRole.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between gap-2"
                      >
                        <span className="font-bold text-slate-200">{tool.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {tool.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 3: How DataQuery Powers This Role */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/30 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                        Powered in DataQuery
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeRole.engineFeature}
                    </p>
                  </div>

                  <Link href={`/app/playground?tab=${activeRole.playgroundTab}`}>
                    <span className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1">
                      <span>Launch live playground environment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: ALL 5 ROLES MATRIX (DIRECT INFOGRAPHIC COMPARISON) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm text-left"
              >
                <div className="space-y-4">
                  {/* Top Role Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-slate-300 border border-slate-700">
                        {role.number}
                      </span>
                      <span className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                        {role.standardTitle}
                      </span>
                    </div>
                    <Badge variant="pro" size="sm">
                      {role.creativePersona}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-100 group-hover:text-sky-300 transition-colors">
                      {role.creativePersona}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {role.shortCallout}
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Core Skills:
                    </span>
                    <ul className="space-y-1 text-xs">
                      {role.skills.slice(0, 4).map((skill) => (
                        <li key={skill} className="flex items-center gap-1.5 text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Badges */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Tech Arsenal:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.tools.map((t) => (
                        <span
                          key={t.name}
                          className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-mono"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link href={`/app/playground?tab=${role.playgroundTab}`}>
                    <Button variant="outline" size="xs" className="w-full justify-between">
                      <span>{role.playgroundCtaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
