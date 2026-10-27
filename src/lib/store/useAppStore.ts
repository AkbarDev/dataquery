import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dataset, Language, PipelineStep, ExecutionResult, PinnedWidget } from "../types";
import { SAMPLE_DATASET } from "../sampleData";
import { PlanTier, UsageState, DEFAULT_USAGE } from "../plans";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: PlanTier;
  avatar: string;
}

export interface AppState {
  // User & Plan
  user: UserProfile;
  usage: UsageState;
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  upgradeToPro: () => void;
  resetToFree: () => void;

  // Dataset State
  currentDataset: Dataset;
  loadedDatasets: Dataset[];
  setCurrentDataset: (dataset: Dataset) => void;
  addDataset: (dataset: Dataset) => void;

  // Playground Workspace
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
  playgroundMode: "manual" | "automate";
  setPlaygroundMode: (mode: "manual" | "automate") => void;

  // Editors Code
  pythonCode: string;
  sqlCode: string;
  daxCode: string;
  setPythonCode: (code: string) => void;
  setSqlCode: (code: string) => void;
  setDaxCode: (code: string) => void;

  // Execution Telemetry
  isExecuting: boolean;
  setIsExecuting: (executing: boolean) => void;
  lastResult: ExecutionResult;
  setLastResult: (res: ExecutionResult) => void;

  // Automate Mode Presets
  selectedAutomatePreset: string;
  setSelectedAutomatePreset: (preset: string) => void;
  automateSteps: PipelineStep[];
  setAutomateSteps: (steps: PipelineStep[]) => void;
  updateAutomateStep: (id: string, partial: Partial<PipelineStep>) => void;

  // Step History Timeline
  stepHistory: { id: string; name: string; timestamp: string; code: string; language: Language }[];
  addStepHistory: (name: string, code: string, language: Language) => void;
  removeStepHistory: (id: string) => void;
  clearStepHistory: () => void;

  // Dashboards & Widgets
  pinnedWidgets: PinnedWidget[];
  pinWidget: (widget: PinnedWidget) => void;
  unpinWidget: (id: string) => void;

  // Auto-save State
  saveStatus: "Saved" | "Saving..." | "Unsaved";
  setSaveStatus: (status: "Saved" | "Saving..." | "Unsaved") => void;

  // AI Assistant Drawer
  isAIDrawerOpen: boolean;
  setAIDrawerOpen: (open: boolean) => void;
  aiMessages: { role: "user" | "assistant"; text: string; codeSnippet?: string; chartType?: string }[];
  addAIMessage: (msg: { role: "user" | "assistant"; text: string; codeSnippet?: string; chartType?: string }) => void;
}

const DEFAULT_PYTHON_CODE = `# DataQuery AI - Python Analysis Workspace
# The active dataset is loaded as pandas DataFrame 'df'
import pandas as pd
import numpy as np

# Group revenue and profit by region
summary = df.groupby('region').agg({
    'revenue': 'sum',
    'profit': 'sum'
}).reset_index()

summary['margin_pct'] = (summary['profit'] / summary['revenue']) * 100
summary = summary.sort_values(by='revenue', ascending=False)

print("Aggregated regional margin performance:")
print(summary)
`;

const DEFAULT_SQL_CODE = `-- DataQuery AI - DuckDB Columnar SQL Workspace
-- The table 'sales' is available for high-speed analytical queries

SELECT 
    region,
    category,
    SUM(revenue) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(revenue) * 100, 2) AS margin_pct
FROM sales
GROUP BY 1, 2
ORDER BY total_revenue DESC
LIMIT 15;
`;

const DEFAULT_DAX_CODE = `// DataQuery AI - DAX Measure Builder
// Evaluate calculations using CALCULATE, SUM, DIVIDE, and FILTER

Total Revenue = SUM(Sales[revenue])
Total Profit = SUM(Sales[profit])
Gross Margin % = DIVIDE([Total Profit], [Total Revenue], 0)

Enterprise Revenue = CALCULATE([Total Revenue], Sales[customer_tier] == "Enterprise")
`;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: "usr_free_demo",
        name: "Analyst",
        email: "analyst@dataquery.in",
        plan: "free",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
      },
      usage: DEFAULT_USAGE,
      isUpgradeModalOpen: false,
      setUpgradeModalOpen: (open) => set({ isUpgradeModalOpen: open }),
      upgradeToPro: () =>
        set((state) => ({
          user: { ...state.user, plan: "pro" },
          usage: { ...state.usage, currentTier: "pro" },
          isUpgradeModalOpen: false,
        })),
      resetToFree: () =>
        set((state) => ({
          user: { ...state.user, plan: "free" },
          usage: { ...state.usage, currentTier: "free" },
        })),

      currentDataset: SAMPLE_DATASET,
      loadedDatasets: [SAMPLE_DATASET],
      setCurrentDataset: (dataset) => set({ currentDataset: dataset, saveStatus: "Saved" }),
      addDataset: (dataset) =>
        set((state) => ({
          loadedDatasets: [dataset, ...state.loadedDatasets.filter((d) => d.id !== dataset.id)],
          currentDataset: dataset,
        })),

      activeLanguage: "python",
      setActiveLanguage: (lang) => set({ activeLanguage: lang }),
      playgroundMode: "manual",
      setPlaygroundMode: (mode) => set({ playgroundMode: mode }),

      pythonCode: DEFAULT_PYTHON_CODE,
      sqlCode: DEFAULT_SQL_CODE,
      daxCode: DEFAULT_DAX_CODE,
      setPythonCode: (code) => set({ pythonCode: code, saveStatus: "Unsaved" }),
      setSqlCode: (code) => set({ sqlCode: code, saveStatus: "Unsaved" }),
      setDaxCode: (code) => set({ daxCode: code, saveStatus: "Unsaved" }),

      isExecuting: false,
      setIsExecuting: (executing) => set({ isExecuting: executing }),
      lastResult: {
        status: "success",
        language: "python",
        executionTimeMs: 18.4,
        columns: ["region", "revenue", "profit", "margin_pct"],
        rows: [
          { region: "North America", revenue: 66200, profit: 37400, margin_pct: 56.5 },
          { region: "Europe", revenue: 59500, profit: 36700, margin_pct: 61.7 },
          { region: "Asia Pacific", revenue: 59400, profit: 36700, margin_pct: 61.8 },
          { region: "Latin America", revenue: 7700, profit: 3300, margin_pct: 42.9 },
        ],
        stdout: "Evaluated 15 transactions across 4 global regions in 18.4ms.\n",
        recommendedChart: "bar",
        aiInsight: "North America and Asia Pacific generated the highest gross revenues, while European transactions exhibited the peak margin efficiency at 61.7%.",
      },
      setLastResult: (res) => set({ lastResult: res }),

      selectedAutomatePreset: "sales_summary",
      setSelectedAutomatePreset: (preset) => set({ selectedAutomatePreset: preset }),
      automateSteps: [],
      setAutomateSteps: (steps) => set({ automateSteps: steps }),
      updateAutomateStep: (id, partial) =>
        set((state) => ({
          automateSteps: state.automateSteps.map((s) => (s.id === id ? { ...s, ...partial } : s)),
        })),

      stepHistory: [
        { id: "h1", name: "Load sales_q3_global.csv", timestamp: "12:00 PM", code: "# Loaded 15 records", language: "python" },
        { id: "h2", name: "Regional Margin Aggregation", timestamp: "12:02 PM", code: "df.groupby('region').agg(...)", language: "python" },
      ],
      addStepHistory: (name, code, language) =>
        set((state) => ({
          stepHistory: [
            ...state.stepHistory,
            { id: Math.random().toString(36).substring(2, 9), name, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), code, language },
          ],
        })),
      removeStepHistory: (id) =>
        set((state) => ({ stepHistory: state.stepHistory.filter((s) => s.id !== id) })),
      clearStepHistory: () => set({ stepHistory: [] }),

      pinnedWidgets: [
        {
          id: "pin_rev_kpi",
          title: "Total Revenue Q3",
          type: "kpi",
          value: "$192,800",
          change: 18.4,
          data: [],
          pinnedAt: "2026-10-27T12:05:00Z",
        },
        {
          id: "pin_margin_bar",
          title: "Regional Revenue & Profit Breakdown",
          type: "chart",
          chartType: "bar",
          xKey: "region",
          yKey: "revenue",
          data: [
            { region: "North America", revenue: 66200, profit: 37400 },
            { region: "Europe", revenue: 59500, profit: 36700 },
            { region: "Asia Pacific", revenue: 59400, profit: 36700 },
            { region: "Latin America", revenue: 7700, profit: 3300 },
          ],
          pinnedAt: "2026-10-27T12:10:00Z",
        },
      ],
      pinWidget: (widget) =>
        set((state) => ({
          pinnedWidgets: [widget, ...state.pinnedWidgets.filter((w) => w.id !== widget.id)],
        })),
      unpinWidget: (id) =>
        set((state) => ({
          pinnedWidgets: state.pinnedWidgets.filter((w) => w.id !== id),
        })),

      saveStatus: "Saved",
      setSaveStatus: (status) => set({ saveStatus: status }),

      isAIDrawerOpen: false,
      setAIDrawerOpen: (open) => set({ isAIDrawerOpen: open }),
      aiMessages: [
        {
          role: "assistant",
          text: "Hi! I'm your DataQuery Copilot. Ask any question in plain English (e.g., 'Show monthly churn trend' or 'Top 5 categories by gross margin') and I'll generate editable Python or SQL code for you.",
        },
      ],
      addAIMessage: (msg) =>
        set((state) => ({ aiMessages: [...state.aiMessages, msg] })),
    }),
    {
      name: "dataquery_store_v1",
      partialize: (state) => ({
        user: state.user,
        usage: state.usage,
        pinnedWidgets: state.pinnedWidgets,
        stepHistory: state.stepHistory,
      }),
    }
  )
);
