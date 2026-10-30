export type Language =
  | "python"
  | "sql"
  | "dax"
  | "statistics"
  | "pyspark"
  | "hadoop"
  | "ml";

export type FunctionLevel = "basic" | "intermediate" | "advanced";

export type MLTask =
  | "classification"
  | "regression"
  | "clustering"
  | "dimensionality_reduction"
  | "deep_learning"
  | "time_series"
  | "association_rules";

export type MLAlgorithmId =
  | "logistic_regression"
  | "linear_regression"
  | "gradient_boosting"
  | "pca"
  | "decision_tree"
  | "neural_networks"
  | "random_forest"
  | "dbscan"
  | "svm"
  | "hierarchical_clustering"
  | "naive_bayes"
  | "arima"
  | "knn"
  | "kmeans"
  | "apriori"
  | "xgboost";

export interface MLAlgorithmInfo {
  id: MLAlgorithmId;
  name: string;
  simpleExplanation: string; // The exact text from the infographic
  task: MLTask;
  categoryLabel: string;
  badgeVariant: "python" | "sql" | "dax" | "statistics" | "pyspark" | "hadoop" | "ml" | "pro" | "info" | "warning" | "success" | "danger";
  checkSuitability: (dataset: Dataset, targetCol: string, selectedFeatures: string[]) => {
    isSuitable: boolean;
    reason: string;
  };
  sampleSnippet: string;
}

export interface MLModelEvaluation {
  modelName: string;
  task: MLTask;
  targetColumn: string;
  featureColumns: string[];
  metricPrimary: { name: string; value: number };
  precision?: number;
  recall?: number;
  f1Score?: number;
  confusionMatrix?: { tp: number; fp: number; fn: number; tn: number };
  featureImportance: { feature: string; importance: number }[];
  trainTestSplit: number;
}

export interface StatTestResult {
  testName: string;
  statistic: number;
  pValue: number;
  significant: boolean;
  alpha: number;
  conclusion: string;
}

export interface ColumnProfile {
  name: string;
  type: "string" | "number" | "date" | "boolean";
  nullCount: number;
  distinctCount: number;
  min?: number | string;
  max?: number | string;
}

export interface Dataset {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  rowCount: number;
  columns: ColumnProfile[];
  data: Record<string, any>[];
  qualityScore: number; // 0 - 100
  duplicatesCount: number;
}

export interface PipelineStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  durationMs?: number;
  codeSnippet?: string;
}

export interface ExecutionResult {
  status: "idle" | "running" | "success" | "error";
  language: Language;
  executionTimeMs?: number;
  columns: string[];
  rows: Record<string, any>[];
  stdout?: string;
  errorMessage?: string;
  recommendedChart?: "bar" | "line" | "area" | "pie" | "scatter";
  aiInsight?: string;
}

export interface FunctionItem {
  id: string;
  name: string;
  language: Language;
  level: FunctionLevel;
  description: string;
  example: string;
  snippet: string;
}

export interface PinnedWidget {
  id: string;
  title: string;
  type: "kpi" | "chart";
  chartType?: "bar" | "line" | "area" | "pie" | "scatter";
  value?: string | number;
  change?: number;
  data: any[];
  xKey?: string;
  yKey?: string;
  pinnedAt: string;
}

export interface ConnectorItem {
  id: string;
  name: string;
  category: "Files & Storage" | "Databases" | "Apps & Marketing" | "Custom";
  icon: string;
  status: "Connected" | "Needs auth" | "Error" | "Coming soon";
  description: string;
}
