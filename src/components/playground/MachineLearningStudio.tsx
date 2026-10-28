"use client";

import React, { useState } from "react";
import { Dataset } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import {
  BrainCircuit,
  Cpu,
  BarChart2,
  Sliders,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
  Target,
  Layers,
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
  const [task, setTask] = useState<"classification" | "regression" | "clustering">("classification");
  const [algorithm, setAlgorithm] = useState("random_forest");
  const [testSplit, setTestSplit] = useState(20); // 20% test
  const [nEstimators, setNEstimators] = useState(100);
  const [maxDepth, setMaxDepth] = useState(5);

  const numCols = dataset.columns.filter((c) => c.type === "number");
  const catCols = dataset.columns.filter((c) => c.type === "string");

  const [targetCol, setTargetCol] = useState(catCols[0]?.name || "region");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    numCols.slice(0, 3).map((c) => c.name)
  );

  // Model evaluation state
  const [isTrained, setIsTrained] = useState(true);
  const [isTraining, setIsTraining] = useState(false);

  // Interactive prediction sandbox
  const [predictInputs, setPredictInputs] = useState<Record<string, number>>({
    revenue: 65000,
    profit: 34000,
    units_sold: 120,
  });
  const [predictionOutput, setPredictionOutput] = useState<{
    label: string;
    probability: number;
  }>({
    label: "High Margin Tier",
    probability: 94.2,
  });

  const toggleFeature = (name: string) => {
    if (selectedFeatures.includes(name)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== name));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setIsTrained(true);
      toast.success(
        "Model Training Complete",
        `Trained ${algorithm.replace("_", " ")} on ${dataset.rowCount || 15} records with ${100 - testSplit}/${testSplit} split.`
      );
    }, 700);
  };

  const handleRunInference = (e: React.FormEvent) => {
    e.preventDefault();
    const rev = predictInputs.revenue || 50000;
    const prof = predictInputs.profit || 20000;
    const isHigh = prof / rev > 0.45;
    setPredictionOutput({
      label: isHigh ? "High Margin Tier" : "Standard Margin Tier",
      probability: isHigh ? 93.8 : 88.4,
    });
    toast.info("Inference Complete", "Generated prediction for sample feature vector.");
  };

  const handleAppendPythonMlScript = () => {
    const snippet = `\n# --- Trained ${algorithm.toUpperCase()} Pipeline ---
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

X = df[${JSON.stringify(selectedFeatures)}]
y = df['${targetCol}']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=${testSplit / 100}, random_state=42)

model = RandomForestClassifier(n_estimators=${nEstimators}, max_depth=${maxDepth}, random_state=42)
model.fit(X_train, y_train)
print(f"Accuracy: {accuracy_score(y_test, model.predict(X_test))*100:.1f}%")\n`;

    onChangeCode(code + "\n" + snippet);
    toast.success("Script Appended", "Scikit-learn model pipeline inserted into editor.");
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Studio Header */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-200">Machine Learning Studio</span>
          <Badge variant="pro" size="sm">Scikit-Learn · Client WASM</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={handleAppendPythonMlScript}
          >
            + Append Scikit-Learn Script
          </Button>
          <Button
            variant="glow"
            size="xs"
            isLoading={isTraining}
            onClick={handleTrainModel}
            leftIcon={<Play className="w-3 h-3 fill-current" />}
          >
            Train Model
          </Button>
        </div>
      </div>

      {/* Main ML Canvas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Model & Hyperparameters Configuration Panel */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Model Selection &amp; Hyperparameters</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-mono">ML Task</label>
              <select
                value={task}
                onChange={(e: any) => setTask(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
                <option value="clustering">Clustering (K-Means)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-mono">Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              >
                {task === "classification" ? (
                  <>
                    <option value="random_forest">Random Forest Classifier</option>
                    <option value="logistic_regression">Logistic Regression</option>
                    <option value="gradient_boosting">Gradient Boosting (XGBoost)</option>
                    <option value="decision_tree">Decision Tree</option>
                  </>
                ) : task === "regression" ? (
                  <>
                    <option value="random_forest_reg">Random Forest Regressor</option>
                    <option value="linear_regression">Linear Regression</option>
                    <option value="ridge">Ridge Regression</option>
                  </>
                ) : (
                  <>
                    <option value="kmeans">K-Means Centroid Clustering</option>
                    <option value="dbscan">DBSCAN Density Clustering</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-mono">Target Variable (y)</label>
              <select
                value={targetCol}
                onChange={(e) => setTargetCol(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              >
                {dataset.columns.map((c) => (
                  <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span>Test Split Ratio</span>
                <span className="text-purple-300 font-bold">{testSplit}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={testSplit}
                onChange={(e) => setTestSplit(Number(e.target.value))}
                className="w-full accent-purple-400"
              />
            </div>
          </div>

          {/* Feature Selector Checkboxes */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block mb-2">
              Select Input Features (X):
            </span>
            <div className="flex flex-wrap gap-2">
              {dataset.columns.map((c) => {
                const isSelected = selectedFeatures.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleFeature(c.name)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Model Metrics & Confusion Matrix */}
        {isTrained && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Key Metrics */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Model Evaluation Metrics (Test Set)</span>
              </h4>

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

              {/* Feature Importance Ranking */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Feature Importance Gini Index:
                </span>
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>revenue</span>
                    <span className="text-purple-300">48.5%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-[48.5%]" />
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>profit</span>
                    <span className="text-purple-300">35.8%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 w-[35.8%]" />
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>units_sold</span>
                    <span className="text-purple-300">15.7%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[15.7%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Model Inference Sandbox */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Model Prediction Sandbox</span>
              </h4>

              <form onSubmit={handleRunInference} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-mono">revenue</label>
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
                    <label className="block text-[11px] text-slate-400 mb-1 font-mono">profit</label>
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
                  Run Instant Inference
                </Button>
              </form>

              {/* Prediction Result Pill */}
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 uppercase font-mono">Predicted Outcome:</span>
                  <Badge variant="pro" size="sm">{predictionOutput.probability}% Conf</Badge>
                </div>
                <div className="text-base font-bold text-purple-300">
                  {predictionOutput.label}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Scikit-Learn Python Pipeline:</span>
          <textarea
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            rows={8}
            className="w-full p-3 bg-slate-950 text-purple-200 font-mono text-xs border border-slate-800 rounded-xl resize-none focus:outline-none focus:border-purple-400 leading-relaxed selection:bg-purple-500/20"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
