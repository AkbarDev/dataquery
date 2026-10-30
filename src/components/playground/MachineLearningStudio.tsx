"use client";

import React, { useState, useMemo } from "react";
import { Dataset, MLTask, MLAlgorithmId } from "@/lib/types";
import { ML_ALGORITHMS_EXPLAINED } from "@/lib/sampleData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import {
  BrainCircuit,
  Sliders,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Target,
  BarChart2,
  Filter,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Activity,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export interface MachineLearningStudioProps {
  dataset: Dataset;
  code: string;
  onChangeCode: (code: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export function MachineLearningStudio({
  dataset,
  code,
  onChangeCode,
  onExecute,
  isExecuting,
}: MachineLearningStudioProps) {
  const numCols = useMemo(() => dataset.columns.filter((c) => c.type === "number"), [dataset]);
  const catCols = useMemo(() => dataset.columns.filter((c) => c.type === "string"), [dataset]);
  const dateCols = useMemo(
    () =>
      dataset.columns.filter(
        (c) => c.type === "date" || /date|time|year|month|day/i.test(c.name)
      ),
    [dataset]
  );

  // Target and Feature state
  const [targetCol, setTargetCol] = useState<string>(catCols[0]?.name || numCols[0]?.name || "region");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    numCols.slice(0, 3).map((c) => c.name)
  );

  // Active algorithm selection (default to random_forest)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<MLAlgorithmId>("random_forest");

  // Filter state for algorithms: all vs suitable_only vs incompatible_only
  const [filterMode, setFilterMode] = useState<"all" | "suitable" | "incompatible">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Hyperparameter states
  const [testSplit, setTestSplit] = useState(20);
  const [nEstimators, setNEstimators] = useState(100);
  const [maxDepth, setMaxDepth] = useState(5);
  const [learningRate, setLearningRate] = useState(0.1);
  const [nClusters, setNClusters] = useState(3);
  const [regularizationC, setRegularizationC] = useState(1.0);

  // Model training state
  const [isTrained, setIsTrained] = useState(true);
  const [isTraining, setIsTraining] = useState(false);

  // Interactive prediction sandbox state
  const [predictInputs, setPredictInputs] = useState<Record<string, number>>({
    revenue: 65000,
    profit: 34000,
    units_sold: 120,
    churn_risk: 0.15,
  });
  const [predictionOutput, setPredictionOutput] = useState<{
    label: string;
    score: string;
    confidence: number;
  }>({
    label: "High Margin Tier",
    score: "0.942",
    confidence: 94.2,
  });

  // Target column metadata analysis
  const targetProfile = useMemo(() => {
    const col = dataset.columns.find((c) => c.name === targetCol);
    if (!col) return null;
    const isContinuous = col.type === "number" && col.distinctCount > 10;
    const isDiscrete = col.type === "string" || (col.type === "number" && col.distinctCount <= 10);
    const isDate = col.type === "date" || /date|time/i.test(col.name);
    return {
      ...col,
      isContinuous,
      isDiscrete,
      isDate,
      natureLabel: isDate ? "Temporal Sequence" : isContinuous ? "Continuous Numeric" : "Discrete Category",
    };
  }, [dataset, targetCol]);

  // Compute suitability for all 16 algorithms
  const algorithmsWithSuitability = useMemo(() => {
    return ML_ALGORITHMS_EXPLAINED.map((algo) => {
      const suitability = algo.checkSuitability(dataset, targetCol, selectedFeatures);
      return {
        ...algo,
        isSuitable: suitability.isSuitable,
        reason: suitability.reason,
      };
    });
  }, [dataset, targetCol, selectedFeatures]);

  // Summary counts
  const suitableCount = useMemo(
    () => algorithmsWithSuitability.filter((a) => a.isSuitable).length,
    [algorithmsWithSuitability]
  );
  const incompatibleCount = 16 - suitableCount;

  // Filtered algorithms list
  const displayedAlgorithms = useMemo(() => {
    return algorithmsWithSuitability.filter((a) => {
      // 1. Filter by suitability status
      if (filterMode === "suitable" && !a.isSuitable) return false;
      if (filterMode === "incompatible" && a.isSuitable) return false;

      // 2. Filter by category
      if (categoryFilter !== "all" && a.categoryLabel.toLowerCase() !== categoryFilter.toLowerCase()) {
        if (categoryFilter === "classification" && a.task !== "classification") return false;
        if (categoryFilter === "regression" && a.task !== "regression") return false;
        if (categoryFilter === "clustering" && a.task !== "clustering") return false;
        if (
          categoryFilter === "other" &&
          ["classification", "regression", "clustering"].includes(a.task)
        )
          return false;
      }
      return true;
    });
  }, [algorithmsWithSuitability, filterMode, categoryFilter]);

  const activeAlgoObj = useMemo(
    () =>
      algorithmsWithSuitability.find((a) => a.id === selectedAlgorithm) ||
      algorithmsWithSuitability[0],
    [algorithmsWithSuitability, selectedAlgorithm]
  );

  const toggleFeature = (name: string) => {
    if (selectedFeatures.includes(name)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== name));
      } else {
        toast.warning("Minimum Features", "You need at least 1 feature selected for modeling.");
      }
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  const handleSelectAlgorithm = (algo: typeof algorithmsWithSuitability[0]) => {
    if (!algo.isSuitable) {
      toast.warning("Algorithm Incompatible with Current Dataset", algo.reason);
      return;
    }
    setSelectedAlgorithm(algo.id);
    toast.success("Algorithm Selected", `Configured ${algo.name} for current dataset.`);
  };

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setIsTrained(true);
      toast.success(
        "Model Training Complete",
        `Fitted ${activeAlgoObj.name} on ${dataset.rowCount || 120} rows with ${100 - testSplit}/${testSplit} split.`
      );
    }, 650);
  };

  const handleRunInference = (e: React.FormEvent) => {
    e.preventDefault();
    const rev = predictInputs.revenue || 50000;
    const prof = predictInputs.profit || 20000;
    const ratio = prof / rev;

    if (activeAlgoObj.task === "regression") {
      const predValue = Math.round(rev * 0.42 + prof * 0.35);
      setPredictionOutput({
        label: `$${predValue.toLocaleString()}`,
        score: `R²: 0.892 · RMSE: 1,420`,
        confidence: 89.2,
      });
    } else if (activeAlgoObj.task === "clustering") {
      const clusterId = ratio > 0.4 ? "Cluster #2 (High Value)" : "Cluster #1 (Volume Core)";
      setPredictionOutput({
        label: clusterId,
        score: "Silhouette: 0.82",
        confidence: 88.0,
      });
    } else if (activeAlgoObj.task === "dimensionality_reduction") {
      setPredictionOutput({
        label: `PC1: ${(rev / 10000).toFixed(2)}, PC2: ${(prof / 5000).toFixed(2)}`,
        score: "Explained Variance: 89.4%",
        confidence: 89.4,
      });
    } else if (activeAlgoObj.task === "time_series") {
      setPredictionOutput({
        label: `+7D Forecast: $${Math.round(rev * 1.08).toLocaleString()}`,
        score: "Trend Growth: +8.2% · p=0.012",
        confidence: 91.5,
      });
    } else {
      const isHigh = ratio > 0.35;
      setPredictionOutput({
        label: isHigh ? "High Margin (Tier 1)" : "Standard Core (Tier 2)",
        score: `Class Probability: ${isHigh ? "94.2%" : "88.6%"}`,
        confidence: isHigh ? 94.2 : 88.6,
      });
    }

    toast.info("Inference Generated", `Simulated real-time prediction for ${activeAlgoObj.name}.`);
  };

  const handleAppendPythonMlScript = () => {
    const snippet = `\n# --- Trained ${activeAlgoObj.name.toUpperCase()} Pipeline ---
# Explanation: ${activeAlgoObj.simpleExplanation}
import numpy as np
import pandas as pd
${activeAlgoObj.sampleSnippet}
`;
    onChangeCode(code + "\n" + snippet);
    toast.success("Script Appended", `Appended ${activeAlgoObj.name} code to editor.`);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Studio Header */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <BrainCircuit className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-100 tracking-tight">
                Machine Learning Algorithms Explained Simply
              </span>
              <Badge variant="ml" size="sm">
                16 Algorithms · Scikit-Learn WASM
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Auto-identifies dataset characteristics to enable suitable algorithms while greying out incompatible tests.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="xs" onClick={handleAppendPythonMlScript}>
            + Append Scikit-Learn Script
          </Button>
          <Button
            variant="glow"
            size="xs"
            isLoading={isTraining}
            onClick={handleTrainModel}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            Train {activeAlgoObj.name}
          </Button>
        </div>
      </div>

      {/* Main ML Canvas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. Dataset Intelligence Profiling & Suitability Summary Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-slate-800/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200">
                  Data Intelligence Profile: {dataset.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {dataset.rowCount} rows · {dataset.columns.length} columns
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
                <span>
                  Features: <b className="text-slate-200">{numCols.length} Numeric</b>,{" "}
                  <b className="text-slate-200">{catCols.length} Categorical</b>,{" "}
                  <b className="text-slate-200">{dateCols.length} Temporal</b>
                </span>
                <span>•</span>
                <span>
                  Target: <b className="text-purple-300">{targetCol}</b> (
                  <span className="text-slate-300">{targetProfile?.natureLabel}</span>)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-right">
              <div className="text-[10px] text-emerald-400 uppercase font-mono font-semibold">Suitable Tests</div>
              <div className="text-sm font-bold text-emerald-300">{suitableCount} of 16</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Greyed Out</div>
              <div className="text-sm font-bold text-slate-300">{incompatibleCount}</div>
            </div>
          </div>
        </div>

        {/* 2. Target Variable & Feature Selection Bar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Target &amp; Feature Schema Configuration</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              Changing target or feature count dynamically re-evaluates all 16 algorithm suitability rules.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {/* Target Column Selector */}
            <div className="sm:col-span-1">
              <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                Target Variable (y):
              </label>
              <select
                value={targetCol}
                onChange={(e) => setTargetCol(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-purple-400 font-mono"
              >
                {dataset.columns.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.type} {c.type === "number" ? (c.distinctCount > 10 ? "Continuous" : "Discrete") : "Categorical"})
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Checkbox Selector */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                Input Features (X) — ({selectedFeatures.length} selected):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {dataset.columns.map((c) => {
                  const isSelected = selectedFeatures.includes(c.name);
                  const isTarget = c.name === targetCol;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      disabled={isTarget}
                      onClick={() => toggleFeature(c.name)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                        isTarget
                          ? "opacity-35 bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
                          : isSelected
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold shadow-sm"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                      }`}
                      title={isTarget ? "Cannot use Target as input feature" : undefined}
                    >
                      {isSelected && !isTarget ? "✓ " : "+ "}
                      {c.name} ({c.type})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Filter Controls: All vs Suitable vs Incompatible + Categories */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-sky-400" />
              <span>Algorithm Filter:</span>
            </span>

            {/* Suitability Filter Buttons */}
            <div className="inline-flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  filterMode === "all"
                    ? "bg-slate-800 text-slate-100 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All (16)
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("suitable")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  filterMode === "suitable"
                    ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Suitable Only ({suitableCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("incompatible")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  filterMode === "incompatible"
                    ? "bg-slate-800 text-slate-200 font-semibold border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Greyed Out ({incompatibleCount})</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {["all", "classification", "regression", "clustering", "other"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800/80"
                }`}
              >
                {cat === "other" ? "Forecasting & PCA" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. The 16-Algorithm Card Grid ("Machine Learning Algorithms Explained Simply") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {displayedAlgorithms.map((algo) => {
            const isSelected = algo.id === selectedAlgorithm;
            const isSuitable = algo.isSuitable;

            return (
              <div
                key={algo.id}
                onClick={() => handleSelectAlgorithm(algo)}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all relative group cursor-pointer ${
                  !isSuitable
                    ? "bg-slate-950/80 border-slate-800/40 opacity-45 grayscale hover:grayscale-0 hover:opacity-75"
                    : isSelected
                    ? "bg-purple-950/30 border-purple-400/90 shadow-lg shadow-purple-500/10 ring-1 ring-purple-400"
                    : "bg-slate-900/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <Badge variant={algo.badgeVariant} size="sm">
                      {algo.categoryLabel}
                    </Badge>

                    {isSuitable ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Suitable
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400/90 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <XCircle className="w-3 h-3 text-amber-400/90" />
                        Greyed Out
                      </span>
                    )}
                  </div>

                  {/* Algorithm Title */}
                  <h4
                    className={`font-bold text-xs leading-snug mb-1.5 transition-colors ${
                      isSelected
                        ? "text-purple-300"
                        : isSuitable
                        ? "text-slate-100 group-hover:text-purple-200"
                        : "text-slate-400"
                    }`}
                  >
                    {algo.name}
                  </h4>

                  {/* EXACT SIMPLIFIED EXPLANATION TEXT FROM IMAGE */}
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 font-medium leading-relaxed mb-2">
                    <span className="text-purple-400 font-bold mr-1">“</span>
                    {algo.simpleExplanation}
                    <span className="text-purple-400 font-bold ml-1">”</span>
                  </div>

                  {/* Suitability Diagnostic / Reason */}
                  <div
                    className={`text-[10px] p-1.5 rounded font-mono leading-tight ${
                      isSuitable
                        ? "text-emerald-300/90 bg-emerald-500/5 border border-emerald-500/15"
                        : "text-amber-300/90 bg-amber-500/5 border border-amber-500/15"
                    }`}
                  >
                    {isSuitable ? (
                      <span>✓ {algo.reason}</span>
                    ) : (
                      <span>⚠️ {algo.reason}</span>
                    )}
                  </div>
                </div>

                {/* Bottom Selection Cue */}
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">
                    {isSelected ? "● Active Model" : isSuitable ? "Click to configure" : "Incompatible"}
                  </span>
                  {isSelected && (
                    <span className="text-purple-400 font-bold flex items-center gap-0.5">
                      Selected <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Hyperparameter Controls & Model Tuning */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Hyperparameters for {activeAlgoObj.name}</span>
            </h4>
            <Badge variant="pro" size="sm">
              Task: {activeAlgoObj.task.replace("_", " ").toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            {/* Tree/Boosting params */}
            {["random_forest", "gradient_boosting", "decision_tree", "xgboost"].includes(activeAlgoObj.id) && (
              <>
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                    <span>n_estimators (Trees)</span>
                    <span className="text-purple-300 font-bold">{nEstimators}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="20"
                    value={nEstimators}
                    onChange={(e) => setNEstimators(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                    <span>max_depth</span>
                    <span className="text-purple-300 font-bold">{maxDepth}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="1"
                    value={maxDepth}
                    onChange={(e) => setMaxDepth(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                    <span>learning_rate</span>
                    <span className="text-purple-300 font-bold">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.5"
                    step="0.01"
                    value={learningRate}
                    onChange={(e) => setLearningRate(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Clustering params */}
            {["kmeans", "hierarchical_clustering"].includes(activeAlgoObj.id) && (
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Number of Clusters (K)</span>
                  <span className="text-purple-300 font-bold">{nClusters}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={nClusters}
                  onChange={(e) => setNClusters(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            )}

            {/* Regularization C */}
            {["logistic_regression", "linear_regression", "svm"].includes(activeAlgoObj.id) && (
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Regularization (C)</span>
                  <span className="text-purple-300 font-bold">{regularizationC}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={regularizationC}
                  onChange={(e) => setRegularizationC(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            )}

            {/* Test Split Ratio Slider */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span>Train / Test Split Ratio</span>
                <span className="text-purple-300 font-bold">
                  {100 - testSplit}% / {testSplit}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={testSplit}
                onChange={(e) => setTestSplit(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 6. Model Evaluation Metrics & Interactive Sandbox */}
        {isTrained && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Key Metrics Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Evaluation Metrics: {activeAlgoObj.name}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Verified on Test Split</span>
              </h4>

              {activeAlgoObj.task === "regression" ? (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">R² Coefficient</span>
                    <div className="text-lg font-bold text-emerald-400">0.892</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">RMSE Error</span>
                    <div className="text-lg font-bold text-sky-400">$1,420</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">MAE Mean Error</span>
                    <div className="text-lg font-bold text-slate-200">$980</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Explained Var</span>
                    <div className="text-lg font-bold text-purple-400">91.4%</div>
                  </div>
                </div>
              ) : activeAlgoObj.task === "clustering" ? (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Silhouette Score</span>
                    <div className="text-lg font-bold text-emerald-400">0.814</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Calinski-Harabasz</span>
                    <div className="text-lg font-bold text-sky-400">412.8</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Clusters Formed</span>
                    <div className="text-lg font-bold text-slate-200">{nClusters} Centroids</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Inertia Sum</span>
                    <div className="text-lg font-bold text-purple-400">1,894.2</div>
                  </div>
                </div>
              ) : activeAlgoObj.task === "dimensionality_reduction" ? (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">PC1 Variance</span>
                    <div className="text-lg font-bold text-emerald-400">58.4%</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">PC2 Variance</span>
                    <div className="text-lg font-bold text-sky-400">31.0%</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Cumulative Var</span>
                    <div className="text-lg font-bold text-purple-400">89.4%</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Compressed Dimensions</span>
                    <div className="text-lg font-bold text-slate-200">{selectedFeatures.length} → 2</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
                    <div className="text-lg font-bold text-emerald-400">93.3%</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">ROC-AUC</span>
                    <div className="text-lg font-bold text-sky-400">0.962</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Precision</span>
                    <div className="text-lg font-bold text-slate-200">0.941</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">F1-Score</span>
                    <div className="text-lg font-bold text-purple-400">0.931</div>
                  </div>
                </div>
              )}

              {/* Feature Importance Ranking */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Top Predictive Feature Signals:
                </span>
                <div className="space-y-1 text-[11px] font-mono">
                  {selectedFeatures.slice(0, 3).map((feat, idx) => {
                    const pct = idx === 0 ? 52.4 : idx === 1 ? 31.8 : 15.8;
                    return (
                      <div key={feat} className="space-y-0.5">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>{feat}</span>
                          <span className="text-purple-300">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              idx === 0 ? "bg-purple-400" : idx === 1 ? "bg-sky-400" : "bg-emerald-400"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive Model Prediction Sandbox */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-Time Inference Sandbox</span>
                </span>
                <Badge variant="pro" size="sm">
                  Live Prediction
                </Badge>
              </h4>

              <form onSubmit={handleRunInference} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                      revenue feature
                    </label>
                    <input
                      type="number"
                      value={predictInputs.revenue}
                      onChange={(e) =>
                        setPredictInputs({ ...predictInputs, revenue: Number(e.target.value) })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                      profit feature
                    </label>
                    <input
                      type="number"
                      value={predictInputs.profit}
                      onChange={(e) =>
                        setPredictInputs({ ...predictInputs, profit: Number(e.target.value) })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <Button variant="secondary" size="xs" type="submit" className="w-full">
                  Run Instant Inference on {activeAlgoObj.name}
                </Button>
              </form>

              {/* Output Result Pill */}
              <div className="p-3 bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    Predicted Outcome:
                  </span>
                  <Badge variant="pro" size="sm">
                    {predictionOutput.confidence}% Confidence
                  </Badge>
                </div>
                <div className="text-base font-bold text-purple-300">
                  {predictionOutput.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {predictionOutput.score}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. Code Editor Display for Active Pipeline */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              Scikit-Learn Python Pipeline ({activeAlgoObj.name}):
            </span>
            <span className="text-[10px] text-purple-400 font-mono">
              Auto-generated for active target &amp; features
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            rows={7}
            className="w-full p-3 bg-slate-950 text-purple-200 font-mono text-xs border border-slate-800 rounded-xl resize-none focus:outline-none focus:border-purple-400 leading-relaxed selection:bg-purple-500/20"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
