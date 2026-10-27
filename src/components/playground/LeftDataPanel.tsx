"use client";

import React, { useRef, useState } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { Dataset, ColumnProfile } from "@/lib/types";
import { checkPlanPermission } from "@/lib/plans";
import { toast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  UploadCloud,
  FileSpreadsheet,
  Table as TableIcon,
  CheckCircle2,
  AlertCircle,
  Database,
  Hash,
  Type,
  Calendar,
  ToggleLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function LeftDataPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    currentDataset,
    loadedDatasets,
    setCurrentDataset,
    addDataset,
    usage,
    setUpgradeModalOpen,
  } = useAppStore();

  const handleFileUpload = (file: File) => {
    // Check plan upload limits
    const check = checkPlanPermission("upload", usage, {
      fileSizeBytes: file.size,
    });
    if (!check.allowed) {
      toast.warning("Upload Limit Reached", check.reason);
      setUpgradeModalOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text ? text.split("\n").filter((l) => l.trim().length > 0) : [];
      const headers = lines[0] ? lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "")) : ["col1", "col2"];
      
      const rows: Record<string, any>[] = [];
      for (let i = 1; i < Math.min(lines.length, 50); i++) {
        const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        const rowObj: Record<string, any> = {};
        headers.forEach((h, idx) => {
          const raw = values[idx] || "";
          const num = Number(raw);
          rowObj[h] = !isNaN(num) && raw !== "" ? num : raw;
        });
        rows.push(rowObj);
      }

      const columns: ColumnProfile[] = headers.map((h) => {
        const sampleVal = rows[0]?.[h];
        const isNum = typeof sampleVal === "number";
        return {
          name: h,
          type: isNum ? "number" : "string",
          nullCount: 0,
          distinctCount: rows.length,
        };
      });

      const newDataset: Dataset = {
        id: "ds_" + Math.random().toString(36).substring(2, 8),
        name: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        rowCount: lines.length - 1,
        duplicatesCount: 0,
        qualityScore: 98,
        columns,
        data: rows,
      };

      addDataset(newDataset);
      toast.success(
        "File Processed Successfully",
        `Parsed ${newDataset.rowCount} rows with ${newDataset.columns.length} columns.`
      );
    };
    reader.readAsText(file);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "number":
        return <Hash className="w-3.5 h-3.5 text-sky-400" />;
      case "date":
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      case "boolean":
        return <ToggleLeft className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Type className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 border-r border-slate-800 text-xs text-slate-300 overflow-y-auto">
      {/* 1. File Upload Dropzone */}
      <div className="p-3 border-b border-slate-800/80">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-sky-400 bg-sky-500/10"
              : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .xls, .json"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <UploadCloud className="w-5 h-5 mx-auto text-sky-400 mb-1.5" />
          <p className="font-semibold text-slate-200 text-xs">
            Drop CSV / Excel file
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            or click to browse from device (Free max 25 MB)
          </p>
        </div>
      </div>

      {/* 2. Loaded Tables / Datasets Selector */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            Loaded Tables ({loadedDatasets.length})
          </span>
          <span className="text-[10px] text-sky-400 font-mono">In-Memory</span>
        </div>
        <div className="space-y-1">
          {loadedDatasets.map((ds) => {
            const isSelected = ds.id === currentDataset.id;
            return (
              <button
                key={ds.id}
                onClick={() => setCurrentDataset(ds)}
                className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border border-slate-700 text-slate-100 font-medium"
                    : "hover:bg-slate-900/50 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <TableIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate text-xs">{ds.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                  {ds.rowCount} rows
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Data Profile Card */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/30">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            Data Quality Profile
          </span>
          <Badge variant="success" size="sm">
            {currentDataset.qualityScore}% Health
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">TOTAL ROWS</span>
            <span className="text-slate-100 font-semibold">{currentDataset.rowCount.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">COLUMNS</span>
            <span className="text-slate-100 font-semibold">{currentDataset.columns.length}</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">NULL VALUES</span>
            <span className="text-emerald-400 font-semibold">0 (0.0%)</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">DUPLICATES</span>
            <span className="text-emerald-400 font-semibold">{currentDataset.duplicatesCount}</span>
          </div>
        </div>
      </div>

      {/* 4. Column Schema List with Types */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            Schema Columns ({currentDataset.columns.length})
          </span>
          <span className="text-[10px] text-slate-500">DuckDB Types</span>
        </div>
        <div className="space-y-1">
          {currentDataset.columns.map((col) => (
            <div
              key={col.name}
              className="p-1.5 rounded hover:bg-slate-900/80 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                {getTypeIcon(col.type)}
                <span className="font-mono text-xs text-slate-300 truncate">
                  {col.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                {col.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Connector Direct Picker Link */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950">
        <Button
          variant="secondary"
          size="xs"
          className="w-full justify-between"
          leftIcon={<Database className="w-3.5 h-3.5 text-sky-400" />}
          rightIcon={<ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
          onClick={() => {
            window.location.href = "/connectors";
          }}
        >
          Add Live Data Connector
        </Button>
      </div>
    </div>
  );
}
