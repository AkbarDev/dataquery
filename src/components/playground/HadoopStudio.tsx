"use client";

import React, { useState } from "react";
import { Dataset } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import {
  Boxes,
  Database,
  Terminal,
  Activity,
  Folder,
  FileText,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
} from "lucide-react";

export interface HadoopStudioProps {
  dataset: Dataset;
  code: string;
  onChangeCode: (code: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export function HadoopStudio({
  dataset,
  code,
  onChangeCode,
  onExecute,
  isExecuting,
}: HadoopStudioProps) {
  const [activeTab, setActiveTab] = useState<"mapreduce" | "hive" | "hdfs" | "yarn">("mapreduce");
  const [hdfsPath, setHdfsPath] = useState("/user/dataquery/warehouse/sales");
  const [hdfsOutput, setHdfsOutput] = useState<string>(
    "Found 3 items in /user/dataquery/warehouse/sales:\n-rw-r--r--   3 dataquery supergroup      18420 2026-10-28 12:00 /user/dataquery/warehouse/sales/part-r-00000.parquet\n-rw-r--r--   3 dataquery supergroup      17110 2026-10-28 12:00 /user/dataquery/warehouse/sales/part-r-00001.parquet\n-rw-r--r--   3 dataquery supergroup          0 2026-10-28 12:00 /user/dataquery/warehouse/sales/_SUCCESS"
  );
  const [customHdfsCmd, setCustomHdfsCmd] = useState("hdfs dfs -ls /user/dataquery/warehouse/sales");

  const handleRunHdfsCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (customHdfsCmd.includes("-ls")) {
      setHdfsOutput(
        "drwxr-xr-x   - dataquery supergroup          0 2026-10-28 12:00 /user/dataquery/warehouse/sales/region=North_America\ndrwxr-xr-x   - dataquery supergroup          0 2026-10-28 12:00 /user/dataquery/warehouse/sales/region=Europe\n-rw-r--r--   3 dataquery supergroup      18420 2026-10-28 12:00 /user/dataquery/warehouse/sales/data.parquet"
      );
    } else if (customHdfsCmd.includes("-du")) {
      setHdfsOutput("18.4 KB  55.2 KB (with 3x replication) /user/dataquery/warehouse/sales");
    } else if (customHdfsCmd.includes("-cat")) {
      setHdfsOutput("1001,North America,66200,37400\n1002,Europe,59500,36700\n1003,Asia Pacific,59400,36700");
    } else {
      setHdfsOutput(`Executed: ${customHdfsCmd}\nCommand succeeded with return code 0.`);
    }
    toast.success("HDFS CLI Command Executed", customHdfsCmd);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hadoop Engine Header */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Boxes className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-slate-200">Apache Hadoop Ecosystem</span>
          <Badge variant="info" size="sm">Hadoop 3.3.6 · Hive 3.1 · YARN</Badge>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab("mapreduce")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "mapreduce" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            MapReduce Driver
          </button>
          <button
            onClick={() => setActiveTab("hive")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "hive" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            HiveQL Columnar
          </button>
          <button
            onClick={() => setActiveTab("hdfs")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "hdfs" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            Virtual HDFS CLI
          </button>
          <button
            onClick={() => setActiveTab("yarn")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "yarn" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            YARN Cluster
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "mapreduce" && (
          <div className="space-y-4">
            {/* MapReduce Telemetry Phases */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-sky-400 uppercase font-bold">1. Map Phase</span>
                <div className="text-sm font-bold text-slate-100">100% Complete</div>
                <p className="text-[11px] text-slate-400">15 input splits · 0 errors</p>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-bold">2. Shuffle &amp; Sort</span>
                <div className="text-sm font-bold text-slate-100">100% In-Memory</div>
                <p className="text-[11px] text-slate-400">0 spilled records to disk</p>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">3. Reduce Phase</span>
                <div className="text-sm font-bold text-slate-100">4 Keys Aggregated</div>
                <p className="text-[11px] text-slate-400">Output: part-r-00000</p>
              </div>
            </div>

            {/* Java MapReduce Editor */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">Hadoop MapReduce Java Driver:</span>
              <textarea
                value={code}
                onChange={(e) => onChangeCode(e.target.value)}
                rows={12}
                className="w-full p-4 bg-slate-950 text-sky-200 font-mono text-xs border border-slate-800 rounded-xl resize-none focus:outline-none focus:border-sky-400 leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {activeTab === "hive" && (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-200 font-sans">Apache HiveQL Columnar Schema &amp; Partitioning</h4>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <pre className="text-sky-300 text-[11px] leading-relaxed overflow-x-auto">
{`CREATE EXTERNAL TABLE IF NOT EXISTS warehouse.sales_parquet (
    order_id STRING,
    customer_id STRING,
    revenue DOUBLE,
    profit DOUBLE
)
PARTITIONED BY (region STRING, fiscal_year INT)
STORED AS PARQUET
LOCATION '/user/dataquery/warehouse/sales/'
TBLPROPERTIES ('parquet.compression'='SNAPPY');`}
              </pre>
            </div>
            <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs">
              <strong>Vectorized Execution Engine:</strong> Enabled (SIMD vectorized row batches of 1,024 rows).
            </div>
          </div>
        )}

        {activeTab === "hdfs" && (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-200 font-sans">Virtual Distributed File System (HDFS CLI)</h4>
            
            <form onSubmit={handleRunHdfsCommand} className="flex gap-2">
              <input
                type="text"
                value={customHdfsCmd}
                onChange={(e) => setCustomHdfsCmd(e.target.value)}
                placeholder="hdfs dfs -ls /path or -du -h /path"
                className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-sky-400"
              />
              <Button variant="outline" size="sm" type="submit">
                Run HDFS Command
              </Button>
            </form>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Console Output</span>
              </div>
              <pre className="text-emerald-300 text-[11px] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {hdfsOutput}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "yarn" && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200">YARN Cluster ResourceManager Telemetry</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase">Allocated Memory (RAM)</span>
                <div className="text-xl font-bold text-sky-400">8,192 MB / 16,384 MB</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 w-1/2" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase">Allocated vCores</span>
                <div className="text-xl font-bold text-emerald-400">4 vCores / 8 Total</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-1/2" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">App ID: application_1793198000000_0001</span>
                <Badge variant="success" size="sm">SUCCEEDED</Badge>
              </div>
              <p className="text-[11px] text-slate-400">Name: DataQuery_ETL_Job · User: dataquery · Queue: default · Final Status: SUCCEEDED</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
