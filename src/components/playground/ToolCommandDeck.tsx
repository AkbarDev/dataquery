"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ESSENTIAL_TOOLS, getToolById } from "@/lib/essentialTools";
import { EssentialTool, ToolCommand, Language } from "@/lib/types";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Terminal,
  Play,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  X,
  Search,
  Zap,
  Code2,
  Copy,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";

interface ToolCommandDeckProps {
  onRunSimulation?: () => void;
  isExecuting?: boolean;
}

export function ToolCommandDeck({ onRunSimulation, isExecuting }: ToolCommandDeckProps) {
  const {
    activeLanguage,
    setActiveLanguage,
    setPythonCode,
    setSqlCode,
    setDaxCode,
    setStatisticsCode,
    setPysparkCode,
    setHadoopCode,
    setMlCode,
    currentDataset,
  } = useAppStore();

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState<boolean>(false);
  const [switcherSearch, setSwitcherSearch] = useState<string>("");
  const [activeCommandIndex, setActiveCommandIndex] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 1. Read 'tool' query param on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get("tool");
      if (toolParam) {
        const found = getToolById(toolParam);
        if (found) {
          setSelectedToolId(found.id);
          setIsOpen(true);
          // Set appropriate tab
          setActiveLanguage(found.playgroundTab);
        }
      }
    }
  }, [setActiveLanguage]);

  // Active Tool Object
  const currentTool: EssentialTool | undefined = useMemo(() => {
    if (!selectedToolId) return undefined;
    return getToolById(selectedToolId);
  }, [selectedToolId]);

  // Handle Loading a Command into the Editor
  const handleSelectCommand = (cmd: ToolCommand, index: number, autoRun = false) => {
    if (!currentTool) return;
    setActiveCommandIndex(index);

    // Switch tab to the tool's required language
    const targetLang = currentTool.playgroundTab;
    setActiveLanguage(targetLang);

    // Load snippet into the right language buffer
    const snippet = cmd.codeSnippet;
    if (targetLang === "python") setPythonCode(snippet);
    else if (targetLang === "sql") setSqlCode(snippet);
    else if (targetLang === "dax") setDaxCode(snippet);
    else if (targetLang === "statistics") setStatisticsCode(snippet);
    else if (targetLang === "pyspark") setPysparkCode(snippet);
    else if (targetLang === "hadoop") setHadoopCode(snippet);
    else if (targetLang === "ml") setMlCode(snippet);

    toast.success(
      `Loaded ${currentTool.name} Command`,
      `Injected '${cmd.name}' into ${targetLang.toUpperCase()} workspace.`
    );

    if (autoRun && onRunSimulation) {
      setTimeout(() => {
        onRunSimulation();
      }, 150);
    }
  };

  // Switch to a new tool from dropdown
  const handleSwitchTool = (tool: EssentialTool) => {
    setSelectedToolId(tool.id);
    setIsSwitcherOpen(false);
    setActiveCommandIndex(0);
    setActiveLanguage(tool.playgroundTab);

    // Update URL param without full page reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tool", tool.id);
      url.searchParams.set("tab", tool.playgroundTab);
      window.history.replaceState({}, "", url.toString());
    }

    // Auto-load first command
    if (tool.functions.length > 0) {
      handleSelectCommand(tool.functions[0], 0, false);
    }
  };

  // Copy snippet
  const handleCopy = (code: string, index: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      toast.info("Copied to Clipboard", "Code snippet ready to paste.");
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  // Filter tools for switcher
  const filteredTools = useMemo(() => {
    if (!switcherSearch.trim()) return ESSENTIAL_TOOLS;
    const q = switcherSearch.toLowerCase();
    return ESSENTIAL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.primaryTags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [switcherSearch]);

  // If no tool selected or user closed deck, show a discrete top trigger pill
  if (!currentTool || !isOpen) {
    return (
      <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono text-[11px]">
            {currentTool
              ? `Tool: ${currentTool.name} (${currentTool.category})`
              : "55 Essential Data Science, Analytics & Engineering Tools"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentTool ? (
            <button
              onClick={() => setIsOpen(true)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 font-medium text-[11px] cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <span>Show {currentTool.name} Command Deck</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="px-2.5 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-medium text-[11px] cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Select Tool Simulation (55 Available)</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Tool Switcher Modal Dropdown */}
              {isSwitcherOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-left space-y-2.5 max-h-[420px] flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-slate-200">
                      Select Tool Simulation
                    </span>
                    <button
                      onClick={() => setIsSwitcherOpen(false)}
                      className="text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search 55 tools (e.g. LightGBM, Snowflake, Kafka)..."
                      value={switcherSearch}
                      onChange={(e) => setSwitcherSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono"
                      autoFocus
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                    {filteredTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSwitchTool(tool)}
                        className="w-full p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-sky-500/40 text-left transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-200 group-hover:text-sky-300">
                            {tool.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                            {tool.category} · {tool.primaryTags.slice(0, 2).join(", ")}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-800">
                          {tool.playgroundTab}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const activeCommand = currentTool.functions[activeCommandIndex] || currentTool.functions[0];

  return (
    <div className="bg-slate-950 border-b border-slate-800 text-slate-100 p-3 shrink-0 shadow-lg relative z-20">
      {/* Top Bar: Tool Info + Quick Switcher + Close */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
                <span>{currentTool.name}</span>
                <span className="text-slate-400 font-normal text-xs">
                  Simulation &amp; Commands
                </span>
              </h3>
              <Badge variant="pro" size="sm">
                {currentTool.category}
              </Badge>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                Engine: {currentTool.playgroundTab.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-xl truncate">
              {currentTool.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch Tool Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Switch Tool ({ESSENTIAL_TOOLS.length})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isSwitcherOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-left space-y-2.5 max-h-[420px] flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-slate-200">
                    Switch Tool Simulation (55 Tools)
                  </span>
                  <button
                    onClick={() => setIsSwitcherOpen(false)}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search 55 tools (e.g. XGBoost, Snowflake, Airflow)..."
                    value={switcherSearch}
                    onChange={(e) => setSwitcherSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono"
                    autoFocus
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSwitchTool(tool)}
                      className={`w-full p-2 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between group ${
                        tool.id === currentTool.id
                          ? "bg-sky-500/10 border border-sky-500/40"
                          : "bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-200 group-hover:text-sky-300">
                          {tool.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                          {tool.category} · {tool.primaryTags.slice(0, 2).join(", ")}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-800">
                        {tool.playgroundTab}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dismiss Banner Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
            title="Minimize Tool Deck"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Commands / Functions Horizontal Selection Bar */}
      <div className="pt-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-sky-400" /> Commands:
          </span>
          {currentTool.functions.map((cmd, idx) => {
            const isSelected = idx === activeCommandIndex;
            return (
              <button
                key={cmd.name}
                onClick={() => handleSelectCommand(cmd, idx, false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm shadow-sky-500/20"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-slate-100 border border-slate-800"
                }`}
                title={cmd.description}
              >
                <Code2 className="w-3 h-3 text-sky-400" />
                <span>{cmd.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Copy + Run Simulation */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="xs"
            leftIcon={
              copiedIndex === activeCommandIndex ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )
            }
            onClick={() => handleCopy(activeCommand.codeSnippet, activeCommandIndex)}
          >
            {copiedIndex === activeCommandIndex ? "Copied" : "Copy"}
          </Button>

          <Button
            variant="glow"
            size="xs"
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
            isLoading={isExecuting}
            onClick={() => handleSelectCommand(activeCommand, activeCommandIndex, true)}
          >
            Run {currentTool.name} Simulation
          </Button>
        </div>
      </div>

      {/* Syntax & Description Tip */}
      <div className="mt-2 pt-2 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-1.5 font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="text-slate-500">Syntax:</span>
          <span className="text-sky-300 truncate">{activeCommand.syntax}</span>
        </div>
        {activeCommand.outputPreview && (
          <div className="text-slate-400 truncate flex items-center gap-1 text-[10px]">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-slate-500">Simulated Output:</span>
            <span className="text-slate-300 truncate">{activeCommand.outputPreview}</span>
          </div>
        )}
      </div>
    </div>
  );
}
