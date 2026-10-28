"use client";

import React, { useState } from "react";
import { Dataset } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import {
  Zap,
  Server,
  Layers,
  Cpu,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Activity,
  FileCode,
} from "lucide-react";

export interface PySparkStudioProps {
  dataset: Dataset;
  code: string;
  onChangeCode: (code: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export function PySparkStudio({
  dataset,
  code,
  onChangeCode,
  onExecute,
  isExecuting,
}: PySparkStudioProps) {
  const [activeTab, setActiveTab] = useState<"editor" | "dag" | "schema">("editor");

  const handleAppendSparkSnippet = (snippet: string, title: string) => {
    onChangeCode(code + "\n\n# --- " + title + " ---\n" + snippet);
    toast.success("Snippet Added", `Appended ${title} to your PySpark script.`);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Spark Cluster Status Header */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">Apache PySpark Engine</span>
          <Badge variant="pro" size="sm">Spark 3.5.0 · Client WASM</Badge>
        </div>

        {/* Cluster Telemetry Pill */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Driver: local[*] (4 Cores)</span>
          </div>
          <span className="text-slate-600">|</span>
          <span>Heap: 512 MB / 4 GB</span>
        </div>

        {/* View mode */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "editor" ? "bg-amber-500/20 text-amber-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            PySpark Script
          </button>
          <button
            onClick={() => setActiveTab("dag")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "dag" ? "bg-amber-500/20 text-amber-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            DAG &amp; Plan
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "schema" ? "bg-amber-500/20 text-amber-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            StructType Schema
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Transformation Shortcuts */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            PySpark Quick Actions
          </span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() =>
                handleAppendSparkSnippet(
                  "from pyspark.sql.window import Window\nwin = Window.partitionBy('region').orderBy(F.col('revenue').desc())\nranked_df = sdf.withColumn('rank', F.rank().over(win))\nranked_df.show(5)",
                  "Window Ranking Function"
                )
              }
            >
              + Window Ranking
            </Button>

            <Button
              variant="outline"
              size="xs"
              onClick={() =>
                handleAppendSparkSnippet(
                  "sdf = sdf.withColumn('margin_pct', F.round((F.col('profit') / F.col('revenue')) * 100, 2))\nsdf.select('region', 'revenue', 'profit', 'margin_pct').show(5)",
                  "withColumn Margin Calc"
                )
              }
            >
              + Computed withColumn()
            </Button>

            <Button
              variant="outline"
              size="xs"
              onClick={() =>
                handleAppendSparkSnippet(
                  "sdf.createOrReplaceTempView('sales')\nres = spark.sql('SELECT region, SUM(revenue) AS total FROM sales GROUP BY 1')\nres.show()",
                  "Spark SQL TempView"
                )
              }
            >
              + Spark SQL Query
            </Button>

            <Button
              variant="outline"
              size="xs"
              onClick={() =>
                handleAppendSparkSnippet(
                  "repartitioned = sdf.repartition(4, 'region')\nprint(f'Partitions: {repartitioned.rdd.getNumPartitions()}')",
                  "Repartition Hash"
                )
              }
            >
              + Repartition (4 Cores)
            </Button>
          </div>
        </div>

        {activeTab === "editor" && (
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400">PySpark Pipeline Script:</span>
            <textarea
              value={code}
              onChange={(e) => onChangeCode(e.target.value)}
              rows={12}
              className="w-full p-4 bg-slate-950 text-amber-200 font-mono text-xs border border-slate-800 rounded-xl resize-none focus:outline-none focus:border-amber-400 leading-relaxed selection:bg-amber-500/20"
              spellCheck={false}
            />
          </div>
        )}

        {activeTab === "dag" && (
          <div className="space-y-4">
            {/* Spark DAG Stages */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>Distributed DAG Execution Stages</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">Stage 0: ShuffleMapStage</span>
                    <Badge variant="success" size="sm">Completed</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400">Tasks: 4 / 4 | Shuffle Write: 1.4 KB | Duration: 14ms</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">Stage 1: ResultStage</span>
                    <Badge variant="success" size="sm">Completed</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400">Tasks: 2 / 2 | Result Output: 4 Rows | Duration: 8ms</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spark Physical Plan */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Tungsten Physical Plan</span>
              <pre className="p-3 bg-slate-900/70 rounded-lg text-slate-300 text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
{`== Physical Plan ==
*(2) HashAggregate(keys=[region#2], functions=[sum(revenue#3), avg(profit#4)])
+- Exchange hashpartitioning(region#2, 4), ENSURE_REQUIREMENTS, [id=#28]
   +- *(1) HashAggregate(keys=[region#2], functions=[partial_sum(revenue#3), partial_avg(profit#4)])
      +- *(1) LocalTableScan [region#2, revenue#3, profit#4]`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "schema" && (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-200 font-sans">Inferred StructType Schema</h4>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-sky-400 font-bold">root: StructType</span>
              <div className="pl-4 space-y-1 text-slate-300 border-l border-slate-800">
                {dataset.columns.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="text-slate-500">|--</span>
                    <span className="text-amber-300">{c.name}:</span>
                    <span className="text-slate-400">
                      {c.type === "number" ? "DoubleType" : c.type === "date" ? "TimestampType" : "StringType"} (nullable = true)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
