"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SEEDED_FUNCTIONS } from "@/lib/sampleData";
import { FunctionItem, Language, PipelineStep } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "@/components/ui/Toast";
import { checkPlanPermission } from "@/lib/plans";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LockBadge } from "@/components/ui/LockBadge";
import { Modal } from "@/components/ui/Modal";
import { StatisticsStudio } from "./StatisticsStudio";
import { PySparkStudio } from "./PySparkStudio";
import { HadoopStudio } from "./HadoopStudio";
import { MachineLearningStudio } from "./MachineLearningStudio";
import {
  Play,
  Sparkles,
  RotateCcw,
  BookmarkPlus,
  Terminal,
  Database,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  Bot,
  SlidersHorizontal,
  ChevronDown,
  Plus,
} from "lucide-react";

export function CenterWorkArea() {
  const {
    activeLanguage,
    setActiveLanguage,
    playgroundMode,
    setPlaygroundMode,
    pythonCode,
    setPythonCode,
    sqlCode,
    setSqlCode,
    daxCode,
    setDaxCode,
    statisticsCode,
    setStatisticsCode,
    pysparkCode,
    setPysparkCode,
    hadoopCode,
    setHadoopCode,
    mlCode,
    setMlCode,
    currentDataset,
    isExecuting,
    setIsExecuting,
    setLastResult,
    selectedAutomatePreset,
    setSelectedAutomatePreset,
    automateSteps,
    setAutomateSteps,
    updateAutomateStep,
    addStepHistory,
    setSaveStatus,
    setAIDrawerOpen,
    usage,
    setUpgradeModalOpen,
  } = useAppStore();

  const [isFunctionPickerOpen, setIsFunctionPickerOpen] = useState(false);
  const [functionSearch, setFunctionSearch] = useState("");
  const [functionLevelFilter, setFunctionLevelFilter] = useState<"all" | "basic" | "intermediate" | "advanced">("all");

  // Power BI visual builder state
  const [powerBiMeasure, setPowerBiMeasure] = useState("Total Revenue = SUM(Sales[revenue])");
  const [powerBiCategoryCol, setPowerBiCategoryCol] = useState("region");
  const [powerBiMetricCol, setPowerBiMetricCol] = useState("revenue");

  // Automate preset list
  const automatePresets = [
    { id: "clean_data", name: "Clean & Impute Data", desc: "Strip whitespace, cast datatypes, fill nulls with column median." },
    { id: "profile_data", name: "Deep Schema Profile", desc: "Calculate standard deviations, cardinalities, and Z-score distributions." },
    { id: "sales_summary", name: "Executive Sales Summary", desc: "Aggregate revenues, profit margins, and peak growth regions." },
    { id: "ad_roas", name: "Ad Spend & ROAS Matrix", desc: "Evaluate return on ad spend and conversion cost per acquisition." },
    { id: "cohort_retention", name: "Monthly Cohort Retention", desc: "Synthesize customer retention curves from order timestamps." },
    { id: "rfm_segments", name: "RFM Customer Segmentation", desc: "Score Recency, Frequency, and Monetary quintiles." },
    { id: "simple_forecast", name: "Simple 30-Day Forecast", desc: "Fit rolling moving average trend line to revenue curve." },
    { id: "full_report", name: "Full AI Intelligence Report", desc: "Execute end-to-end pipeline and synthesize executive takeaway narrative." },
  ];

  // 1. Run Execution Handler (Ctrl+Enter)
  const handleRun = async () => {
    const check = checkPlanPermission("run", usage);
    if (!check.allowed) {
      toast.warning("Daily Run Limit Reached", check.reason);
      setUpgradeModalOpen(true);
      return;
    }

    setIsExecuting(true);
    setSaveStatus("Saving...");

    try {
      const activeCode =
        activeLanguage === "python"
          ? pythonCode
          : activeLanguage === "sql"
          ? sqlCode
          : activeLanguage === "dax"
          ? daxCode
          : activeLanguage === "statistics"
          ? statisticsCode
          : activeLanguage === "pyspark"
          ? pysparkCode
          : activeLanguage === "hadoop"
          ? hadoopCode
          : mlCode;

      const result = await api.runCode({
        language: activeLanguage,
        code: activeCode,
        dataset: currentDataset,
      });

      setLastResult(result);
      addStepHistory(
        `${activeLanguage.toUpperCase()} Query`,
        activeCode.slice(0, 45) + "...",
        activeLanguage
      );
      setSaveStatus("Saved");
      toast.success(
        "Execution Completed",
        `Ran query in ${result.executionTimeMs}ms with ${result.rows.length} output rows.`
      );
    } catch (err) {
      toast.error("Execution Error", "Failed to compile query expression.");
    } finally {
      setIsExecuting(false);
    }
  };

  // 2. Automate Pipeline Handler (Ctrl+Shift+Enter)
  const handleRunAutomate = async () => {
    setIsExecuting(true);
    setSaveStatus("Saving...");

    try {
      const steps = await api.runAutomate(
        { preset: selectedAutomatePreset, dataset: currentDataset },
        (step) => {
          updateAutomateStep(step.id, step);
        }
      );

      setAutomateSteps(steps);
      // Run execution to update output panel
      const result = await api.runCode({
        language: activeLanguage,
        code: `# Automate Recipe: ${selectedAutomatePreset}\n# Executed 4 pipeline stages`,
        dataset: currentDataset,
      });
      setLastResult(result);
      addStepHistory(`Automate: ${selectedAutomatePreset}`, "Automated 4-step pipeline", activeLanguage);
      setSaveStatus("Saved");
      toast.success("Automate Pipeline Succeeded", `Completed 4 steps in recipe "${selectedAutomatePreset}".`);
    } catch (err) {
      toast.error("Automate Pipeline Failed", "Error executing automated stages.");
    } finally {
      setIsExecuting(false);
    }
  };

  // 3. Sync tab from URL query param if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") as Language | null;
      if (
        tab &&
        ["python", "sql", "dax", "statistics", "pyspark", "hadoop", "ml"].includes(tab)
      ) {
        setActiveLanguage(tab);
      }
    }
  }, [setActiveLanguage]);

  // 4. Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        handleRunAutomate();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        // Undo mock
        toast.info("Undo Triggered", "Restored previous editor snapshot.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pythonCode, sqlCode, daxCode, activeLanguage, selectedAutomatePreset, usage]);

  // Insert snippet from Function Picker
  const handleInsertFunction = (func: FunctionItem) => {
    // Check if function is advanced and plan allows it
    const check = checkPlanPermission("use_function", usage, {
      functionLevel: func.level,
    });
    if (!check.allowed) {
      toast.warning("Pro Function", check.reason);
      setUpgradeModalOpen(true);
      return;
    }

    if (func.language === "python") {
      setPythonCode(pythonCode + "\n\n# Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("python");
    } else if (func.language === "sql") {
      setSqlCode(sqlCode + "\n\n-- Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("sql");
    } else if (func.language === "dax") {
      setDaxCode(daxCode + "\n\n// Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("dax");
    } else if (func.language === "statistics") {
      setStatisticsCode(statisticsCode + "\n\n# Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("statistics");
    } else if (func.language === "pyspark") {
      setPysparkCode(pysparkCode + "\n\n# Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("pyspark");
    } else if (func.language === "hadoop") {
      setHadoopCode(hadoopCode + "\n\n# Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("hadoop");
    } else if (func.language === "ml") {
      setMlCode(mlCode + "\n\n# Added: " + func.name + "\n" + func.snippet);
      setActiveLanguage("ml");
    }
    setIsFunctionPickerOpen(false);
    toast.success("Snippet Inserted", `Appended ${func.name} to your ${func.language.toUpperCase()} workspace.`);
  };

  const filteredFunctions = SEEDED_FUNCTIONS.filter((f) => {
    const matchesLang = f.language === activeLanguage;
    const matchesSearch =
      f.name.toLowerCase().includes(functionSearch.toLowerCase()) ||
      f.description.toLowerCase().includes(functionSearch.toLowerCase());
    const matchesLevel =
      functionLevelFilter === "all" || f.level === functionLevelFilter;
    return matchesLang && matchesSearch && matchesLevel;
  });

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-800 text-slate-100 overflow-hidden">
      {/* Top Header Bar: Engine Tabs + Mode Toggle + Function Picker Button */}
      <div className="px-3 py-2 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar max-w-full">
          {/* Tab Bar: Python | SQL | Power BI | Statistics | PySpark | Hadoop | ML */}
          <Tabs
            variant="editor"
            className="border-b-0 bg-transparent px-0 pt-0 shrink-0"
            tabs={[
              {
                id: "python",
                label: "Python (Pandas)",
                icon: <span className="w-2 h-2 rounded-full bg-blue-400" />,
              },
              {
                id: "sql",
                label: "DuckDB SQL",
                icon: <span className="w-2 h-2 rounded-full bg-sky-400" />,
              },
              {
                id: "dax",
                label: "Power BI (DAX)",
                icon: <span className="w-2 h-2 rounded-full bg-purple-400" />,
              },
              {
                id: "statistics",
                label: "Statistics",
                icon: <span className="w-2 h-2 rounded-full bg-emerald-400" />,
              },
              {
                id: "pyspark",
                label: "PySpark",
                icon: <span className="w-2 h-2 rounded-full bg-amber-400" />,
              },
              {
                id: "hadoop",
                label: "Hadoop",
                icon: <span className="w-2 h-2 rounded-full bg-cyan-400" />,
              },
              {
                id: "ml",
                label: "Machine Learning",
                icon: <span className="w-2 h-2 rounded-full bg-fuchsia-400" />,
              },
            ]}
            activeTab={activeLanguage}
            onChange={(tab) => setActiveLanguage(tab as Language)}
          />
        </div>

        {/* Right Header: Manual / Automate Toggle + Function Picker */}
        <div className="flex items-center space-x-2">
          {/* Manual vs Automate Mode Toggle */}
          <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setPlaygroundMode("manual")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                playgroundMode === "manual"
                  ? "bg-slate-800 text-slate-100 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setPlaygroundMode("automate")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                playgroundMode === "automate"
                  ? "bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Automate</span>
            </button>
          </div>

          {/* Function Library Trigger */}
          <Button
            variant="outline"
            size="xs"
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />}
            onClick={() => setIsFunctionPickerOpen(true)}
          >
            Functions
          </Button>

          {/* AI Copilot Drawer Trigger */}
          <Button
            variant="ghost"
            size="xs"
            leftIcon={<Bot className="w-3.5 h-3.5 text-purple-400" />}
            onClick={() => setAIDrawerOpen(true)}
          >
            Ask AI
          </Button>
        </div>
      </div>

      {/* Main Work Area: Manual Code Editor OR Automate Preset Pipeline */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {playgroundMode === "manual" ? (
          // MANUAL MODE: Code Editor Area
          <div className="flex-1 flex flex-col h-full bg-[#0d1117] overflow-hidden">
            {activeLanguage === "dax" ? (
              // Power BI Visual Field Builder + DAX Formulas
              <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider font-mono">
                      DAX Formula Bar
                    </span>
                    <Badge variant="dax" size="sm">CALCULATE Evaluator</Badge>
                  </div>
                  <input
                    type="text"
                    value={powerBiMeasure}
                    onChange={(e) => setPowerBiMeasure(e.target.value)}
                    className="w-full bg-slate-950 font-mono text-xs text-purple-200 border border-slate-700/80 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400"
                    placeholder="Enter DAX measure e.g. Total Sales = SUM(Sales[Revenue])"
                  />
                </div>

                {/* Drag-Field Visual Builder */}
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
                  <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>Power BI Visual Axis Builder</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                        X-Axis (Category / Dimension)
                      </label>
                      <select
                        value={powerBiCategoryCol}
                        onChange={(e) => setPowerBiCategoryCol(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      >
                        {currentDataset.columns.map((c) => (
                          <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                        Y-Axis (Measure / Values)
                      </label>
                      <select
                        value={powerBiMetricCol}
                        onChange={(e) => setPowerBiMetricCol(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      >
                        {currentDataset.columns
                          .filter((c) => c.type === "number")
                          .map((c) => (
                            <option key={c.name} value={c.name}>{c.name} (Numeric)</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional DAX measures textarea */}
                <div className="flex-1 flex flex-col min-h-[160px]">
                  <span className="text-[11px] text-slate-400 font-mono mb-1">
                    Multi-Measure Script:
                  </span>
                  <textarea
                    value={daxCode}
                    onChange={(e) => setDaxCode(e.target.value)}
                    className="w-full flex-1 p-3 bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 rounded-xl resize-none focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>
              </div>
            ) : activeLanguage === "statistics" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <StatisticsStudio
                  dataset={currentDataset}
                  code={statisticsCode}
                  onChangeCode={setStatisticsCode}
                  onExecute={handleRun}
                  isExecuting={isExecuting}
                />
              </div>
            ) : activeLanguage === "pyspark" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <PySparkStudio
                  dataset={currentDataset}
                  code={pysparkCode}
                  onChangeCode={setPysparkCode}
                  onExecute={handleRun}
                  isExecuting={isExecuting}
                />
              </div>
            ) : activeLanguage === "hadoop" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <HadoopStudio
                  dataset={currentDataset}
                  code={hadoopCode}
                  onChangeCode={setHadoopCode}
                  onExecute={handleRun}
                  isExecuting={isExecuting}
                />
              </div>
            ) : activeLanguage === "ml" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <MachineLearningStudio
                  dataset={currentDataset}
                  code={mlCode}
                  onChangeCode={setMlCode}
                  onExecute={handleRun}
                  isExecuting={isExecuting}
                />
              </div>
            ) : (
              // Monaco / Raw Code Textarea for Python or SQL
              <div className="flex-1 flex flex-col p-2">
                <textarea
                  value={activeLanguage === "python" ? pythonCode : sqlCode}
                  onChange={(e) =>
                    activeLanguage === "python"
                      ? setPythonCode(e.target.value)
                      : setSqlCode(e.target.value)
                  }
                  className="w-full h-full p-4 bg-slate-950 text-slate-100 font-mono text-xs border border-slate-800/80 rounded-xl resize-none focus:outline-none focus:border-sky-400 leading-relaxed selection:bg-sky-500/30"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        ) : (
          // AUTOMATE MODE: Preset Pipeline Selector & Stage Tracker
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-950/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Automated Intelligence Recipes</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a workflow preset. One click compiles schema audits, aggregations, and charts.
                </p>
              </div>

              {/* AI Suggest Preset button */}
              <Button
                variant="outline"
                size="xs"
                leftIcon={<Bot className="w-3.5 h-3.5 text-purple-400" />}
                onClick={() => {
                  setSelectedAutomatePreset("sales_summary");
                  toast.info("AI Suggestion Applied", "Recommended 'Executive Sales Summary' based on detected revenue columns.");
                }}
              >
                AI Suggest
              </Button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {automatePresets.map((preset) => {
                const isSelected = preset.id === selectedAutomatePreset;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedAutomatePreset(preset.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sky-500/10 border-sky-400 text-slate-100 shadow-md shadow-sky-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-200">
                        {preset.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Pipeline Stage Tracker */}
            {automateSteps.length > 0 && (
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
                  Execution Stages Progress
                </span>
                <div className="space-y-2">
                  {automateSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            step.status === "completed"
                              ? "bg-emerald-500 text-slate-950"
                              : step.status === "running"
                              ? "bg-sky-500 text-slate-950 animate-pulse"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-200">
                            {step.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {step.status === "completed" && `${step.durationMs || 24}ms`}
                        {step.status === "running" && "Running..."}
                        {step.status === "pending" && "Queued"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Command Bar: Run, Automate, Undo, Save as recipe */}
      <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          {playgroundMode === "manual" ? (
            <Button
              variant="glow"
              size="sm"
              isLoading={isExecuting}
              onClick={handleRun}
              leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
            >
              Run <span className="text-[10px] opacity-75 ml-1 font-mono">(Ctrl+Enter)</span>
            </Button>
          ) : (
            <Button
              variant="glow"
              size="sm"
              isLoading={isExecuting}
              onClick={handleRunAutomate}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Automate Recipe <span className="text-[10px] opacity-75 ml-1 font-mono">(Ctrl+Shift+Enter)</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="xs"
            onClick={() => toast.info("Undo", "Restored previous state.")}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            title="Ctrl+Z"
          >
            Undo
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="xs"
            leftIcon={<BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />}
            onClick={() => {
              toast.success("Saved as Recipe", "Added pipeline template to your Workspace library.");
            }}
          >
            Save as recipe
          </Button>
        </div>
      </div>

      {/* Function Picker Modal */}
      <Modal
        isOpen={isFunctionPickerOpen}
        onClose={() => setIsFunctionPickerOpen(false)}
        maxWidth="xl"
        title={`Insert ${activeLanguage.toUpperCase()} Function Snippet`}
        description="Search built-in data transformations, aggregations, and DAX measures."
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={functionSearch}
                onChange={(e) => setFunctionSearch(e.target.value)}
                placeholder="Search functions (e.g. groupby, Z-score, CALCULATE)..."
                className="w-full bg-slate-950 pl-9 pr-3 py-2 rounded-lg border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Level Filter Buttons */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              {(["all", "basic", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFunctionLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded capitalize transition-colors cursor-pointer ${
                    functionLevelFilter === lvl
                      ? "bg-slate-800 text-sky-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* List of Filtered Functions */}
          <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1">
            {filteredFunctions.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                No matching functions found for query &quot;{functionSearch}&quot;.
              </p>
            ) : (
              filteredFunctions.map((fn) => (
                <div
                  key={fn.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 flex items-start justify-between gap-4 transition-colors group"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-xs text-slate-100">
                        {fn.name}
                      </span>
                      <Badge
                        variant={
                          fn.level === "advanced"
                            ? "pro"
                            : fn.level === "intermediate"
                            ? "info"
                            : "outline"
                        }
                        size="sm"
                      >
                        {fn.level}
                      </Badge>
                      {fn.level === "advanced" && usage.currentTier === "free" && (
                        <LockBadge />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{fn.description}</p>
                    <code className="text-[11px] font-mono text-sky-400 block bg-slate-900 px-2 py-1 rounded mt-1 overflow-x-auto">
                      {fn.example}
                    </code>
                  </div>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleInsertFunction(fn)}
                    className="shrink-0 mt-1"
                  >
                    Insert
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
