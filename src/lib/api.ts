/**
 * DataQuery AI - API Layer Contract & Client
 * All network calls go through this module so the mock engine can be swapped
 * for the live FastAPI / serverless backend without altering UI components.
 */

import { Dataset, ExecutionResult, Language, PipelineStep, ConnectorItem, PinnedWidget } from "./types";
import { SAMPLE_DATASET, CONNECTORS } from "./sampleData";
import { evaluateSum, evaluateAverage, evaluateDistinctCount, evaluateDivide, evaluateFilter } from "./formulas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
const ENABLE_MOCKS = process.env.NEXT_PUBLIC_ENABLE_MOCKS !== "false";

export interface RunCodePayload {
  language: Language;
  code: string;
  dataset: Dataset;
}

export interface AutomatePresetPayload {
  preset: string;
  dataset: Dataset;
}

export interface AIRawResponse {
  answer: string;
  generatedCode: string;
  language: Language;
  explanation: string;
  recommendedChart?: "bar" | "line" | "area" | "pie" | "scatter";
}

export const api = {
  // 1. Authentication
  login: async (email: string, password?: string) => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    }
    // Realistic mock return
    await new Promise((r) => setTimeout(r, 400));
    return {
      user: {
        id: "usr_mock_102",
        name: email.split("@")[0] || "Analyst",
        email,
        plan: "free",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
      },
      token: "dqw_jwt_mock_token_validated",
    };
  },

  // 2. Projects & Datasets
  getProjects: async () => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/projects`);
      return res.json();
    }
    await new Promise((r) => setTimeout(r, 200));
    return [
      {
        id: "proj_sales_q3",
        title: "Global E-Commerce Sales & Margin 2026",
        updatedAt: "2026-10-27T12:00:00Z",
        rowCount: 120,
        qualityScore: 98,
        activeEngine: "python",
      },
      {
        id: "proj_saas_metrics",
        title: "SaaS Churn & Cohort Retention",
        updatedAt: "2026-10-26T18:30:00Z",
        rowCount: 4500,
        qualityScore: 94,
        activeEngine: "sql",
      },
    ];
  },

  uploadFile: async (file: File): Promise<Dataset> => {
    if (!ENABLE_MOCKS) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/files/upload`, {
        method: "POST",
        body: formData,
      });
      return res.json();
    }
    // Mock upload parsing simulation
    await new Promise((r) => setTimeout(r, 600));
    return {
      id: "ds_" + Math.random().toString(36).substring(2, 9),
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      rowCount: 50,
      duplicatesCount: 0,
      qualityScore: 97,
      columns: [
        { name: "id", type: "string", nullCount: 0, distinctCount: 50 },
        { name: "timestamp", type: "date", nullCount: 0, distinctCount: 45 },
        { name: "entity", type: "string", nullCount: 0, distinctCount: 6 },
        { name: "metric_value", type: "number", nullCount: 1, distinctCount: 48, min: 10, max: 8900 },
      ],
      data: Array.from({ length: 15 }).map((_, i) => ({
        id: `REC-${1000 + i}`,
        timestamp: "2026-08-" + (i < 9 ? `0${i + 1}` : `${i + 1}`),
        entity: ["Enterprise", "Mid-Market", "SMB"][i % 3],
        metric_value: (i + 1) * 340,
      })),
    };
  },

  // 3. Connectors
  getConnectors: async (): Promise<ConnectorItem[]> => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/connectors`);
      return res.json();
    }
    await new Promise((r) => setTimeout(r, 150));
    return CONNECTORS;
  },

  connectConnector: async (connectorId: string, authData: Record<string, any>) => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/connectors/${connectorId}/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      });
      return res.json();
    }
    await new Promise((r) => setTimeout(r, 500));
    return { status: "Connected", connectorId, syncedTablesCount: 3 };
  },

  // 4. Execution Engine
  runCode: async ({ language, code, dataset }: RunCodePayload): Promise<ExecutionResult> => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, datasetId: dataset.id }),
      });
      return res.json();
    }

    // Client-side realistic evaluator
    const startTime = performance.now();
    await new Promise((r) => setTimeout(r, 350)); // simulate brief compilation/execution
    const duration = +(performance.now() - startTime).toFixed(1);

    // 1. Statistics Engine
    if (language === "statistics") {
      const numCol =
        dataset.columns.find((c) => c.type === "number")?.name ||
        dataset.columns[0]?.name ||
        "value";
      const statsRows = [
        { metric: "Independent Two-Sample T-Test", variable: numCol, statistic: "t = 2.418", p_value: "0.0184", significance: "Significant (p < 0.05)" },
        { metric: "One-Way ANOVA F-Test", variable: `${numCol} ~ groups`, statistic: "F = 4.892", p_value: "0.0031", significance: "Significant (p < 0.01)" },
        { metric: "Pearson Correlation Coefficient", variable: `${numCol} vs target`, statistic: "r = 0.842", p_value: "0.0001", significance: "Strong Positive Linear" },
        { metric: "Spearman Rank Correlation", variable: `${numCol} rank`, statistic: "rho = 0.791", p_value: "0.0004", significance: "Strong Monotonic" },
        { metric: "Shapiro-Wilk Normality", variable: numCol, statistic: "W = 0.948", p_value: "0.1260", significance: "Normally Distributed" },
        { metric: "Z-Score Outlier Count", variable: `${numCol} (|z| > 3.0)`, statistic: "count = 0", p_value: "N/A", significance: "No extreme anomalies" },
      ];
      return {
        status: "success",
        language: "statistics",
        executionTimeMs: duration,
        columns: ["metric", "variable", "statistic", "p_value", "significance"],
        rows: statsRows,
        stdout: `SciPy & StatsModels Evaluation Engine:\n- Target Table: '${dataset.name}' (${dataset.rowCount || 15} observations on '${numCol}').\n- Computed 6 hypothesis tests.\n- Variance ratio Levene test: p=0.481 (Equal variance assumed).\nExecution finished in ${duration}ms.\n`,
        recommendedChart: "bar",
        aiInsight: `Statistical hypothesis testing on '${dataset.name}' evaluated distribution of '${numCol}' across ${dataset.rowCount} observations. Strong linear correlation indicates significant predictive leverage.`,
      };
    }

    // 2. PySpark Engine
    if (language === "pyspark") {
      const dimCol =
        dataset.columns.find((c) => c.type === "string")?.name ||
        dataset.columns[0]?.name ||
        "partition";
      const numCol =
        dataset.columns.find((c) => c.type === "number")?.name ||
        dataset.columns[1]?.name ||
        "records";
      const sparkRows = (dataset.data || []).slice(0, 4).map((row, idx) => ({
        partition_id: `Part-${idx}`,
        [dimCol]: String(row[dimCol] ?? `Cluster-${idx}`),
        records_count: Math.ceil(dataset.rowCount / 4),
        [`partition_${numCol}`]: Number(row[numCol]) || 1000 * (idx + 1),
        execution_status: "SUCCESS",
      }));
      return {
        status: "success",
        language: "pyspark",
        executionTimeMs: duration,
        columns: ["partition_id", dimCol, "records_count", `partition_${numCol}`, "execution_status"],
        rows: sparkRows,
        stdout: `SparkSession [appName="DataQuery-PySpark", master="local[*]"]\nTarget Table: '${dataset.name}' (${dataset.rowCount} rows, ${dataset.columns.length} columns)\nStage 0: ShuffleMapStage (4 tasks, completed in 14ms)\nStage 1: ResultStage (2 tasks, completed in ${duration}ms)\nDataFrame schema inferred: ${dataset.columns.length} columns, 4 partitions.\nPhysical Plan: *(2) HashAggregate(keys=[${dimCol}], functions=[sum(${numCol})])\n`,
        recommendedChart: "bar",
        aiInsight: `PySpark distributed execution partitioned table '${dataset.name}' across 4 worker threads with zero shuffle spill.`,
      };
    }

    // 3. Hadoop & HiveQL Engine
    if (language === "hadoop") {
      const hadoopRows = [
        { phase: "Map Phase", input_split: `hdfs://node01/data/${dataset.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}.parquet`, map_progress: "100%", records_processed: dataset.rowCount, spill_mb: 0 },
        { phase: "Shuffle & Sort", input_split: "Cluster Network Ring", map_progress: "100%", records_processed: dataset.rowCount, spill_mb: 0 },
        { phase: "Reduce Phase", input_split: `hdfs://node01/output/${dataset.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}_summary`, map_progress: "100%", records_processed: Math.min(dataset.rowCount, 10), spill_mb: 0 },
      ];
      return {
        status: "success",
        language: "hadoop",
        executionTimeMs: duration,
        columns: ["phase", "input_split", "map_progress", "records_processed", "spill_mb"],
        rows: hadoopRows,
        stdout: `Hadoop MapReduce 3.3.6 Execution Telemetry:\nTarget: '${dataset.name}'\nApplication ID: application_${Date.now()}_0001\nJob State: SUCCEEDED in ${duration}ms\nYARN Queue: default (4 containers allocated, 8192 MB RAM)\nHDFS Read: ${(dataset.fileSize / 1024).toFixed(1)} KB | HDFS Write: 4.2 KB\n`,
        recommendedChart: "bar",
        aiInsight: `MapReduce driver processed ${dataset.rowCount} records for table '${dataset.name}' with zero spilled records and optimal HDFS replication.`,
      };
    }

    // 4. Machine Learning Engine
    if (language === "ml") {
      const numCols = dataset.columns.filter((c) => c.type === "number");
      const mlRows = numCols.slice(0, 5).map((c, i) => ({
        feature: c.name,
        importance_score: +(0.5 / (i + 1)).toFixed(3),
        correlation: i === 0 ? "+0.84" : i === 1 ? "+0.62" : "+0.38",
        v_score: i === 0 ? "High Impact" : "Moderate Impact",
      }));
      if (mlRows.length === 0) {
        mlRows.push({
          feature: dataset.columns[0]?.name || "feature",
          importance_score: 1.0,
          correlation: "+1.00",
          v_score: "Primary",
        });
      }
      return {
        status: "success",
        language: "ml",
        executionTimeMs: duration,
        columns: ["feature", "importance_score", "correlation", "v_score"],
        rows: mlRows,
        stdout: `Scikit-Learn ML Model Evaluation on '${dataset.name}':\nAlgorithm: Random Forest Classifier (100 estimators, max_depth=5)\nTrain Set: 80% | Test Set: 20%\nEvaluated ${numCols.length} numerical predictors across ${dataset.rowCount} observations.\nAccuracy: 93.3% | ROC-AUC: 0.962 | F1-Score: 0.931\n`,
        recommendedChart: "bar",
        aiInsight: `Random Forest model evaluated predictive signal across '${dataset.name}'. '${mlRows[0]?.feature}' is the most predictive feature.`,
      };
    }

    // 5. Default: Dynamic aggregations for Python, SQL, and DAX using dataset's real columns
    const dimCol =
      dataset.columns.find((c) => c.type === "string")?.name ||
      dataset.columns[0]?.name ||
      "category";
    const numCols = dataset.columns.filter((c) => c.type === "number");
    const numCol =
      numCols[0]?.name ||
      dataset.columns.find((c) => c.name !== dimCol)?.name ||
      "value";
    const numCol2 = numCols[1]?.name || null;

    const lowerCode = (code || "").toLowerCase();
    const isScanQuery =
      lowerCode.includes("select *") ||
      lowerCode.includes(".head(") ||
      lowerCode.includes(".show(") ||
      (!lowerCode.includes("group") && !lowerCode.includes("sum(") && !lowerCode.includes("avg("));

    if (isScanQuery && dataset.data && dataset.data.length > 0) {
      const scanRows = dataset.data.slice(0, 50);
      const scanCols = dataset.columns.map((c) => c.name);
      return {
        status: "success",
        language,
        executionTimeMs: duration,
        columns: scanCols,
        rows: scanRows,
        stdout: `[DuckDB/Pandas In-Memory Scan]\nScanned table '${dataset.name}' (${dataset.rowCount} rows, ${scanCols.length} columns).\nRetrieved ${scanRows.length} rows in ${duration}ms.\nMemory: 1.8 MB.`,
        recommendedChart: "bar",
        aiInsight: `Scanned ${scanRows.length} rows from table '${dataset.name}'. Analyzed ${scanCols.length} attributes across ${dataset.rowCount} total records.`,
      };
    }

    // Dynamic grouping based on dataset's actual rows and columns
    const grouped: Record<string, { count: number; sum: number; sum2: number }> = {};
    (dataset.data || []).forEach((row) => {
      const key = String(row[dimCol] ?? "General");
      const val = Number(row[numCol] ?? 0) || 0;
      const val2 = numCol2 ? Number(row[numCol2] ?? 0) || 0 : 0;
      if (!grouped[key]) grouped[key] = { count: 0, sum: 0, sum2: 0 };
      grouped[key].count += 1;
      grouped[key].sum += val;
      grouped[key].sum2 += val2;
    });

    const resultRows = Object.keys(grouped)
      .map((k) => {
        const item: Record<string, any> = {
          [dimCol]: k,
          total_records: grouped[k].count,
          [`total_${numCol}`]: Math.round(grouped[k].sum * 100) / 100,
          [`avg_${numCol}`]: Math.round((grouped[k].sum / (grouped[k].count || 1)) * 100) / 100,
        };
        if (numCol2) {
          item[`total_${numCol2}`] = Math.round(grouped[k].sum2 * 100) / 100;
        }
        return item;
      })
      .sort((a, b) => (b[`total_${numCol}`] || 0) - (a[`total_${numCol}`] || 0));

    const outColumns = [
      dimCol,
      "total_records",
      `total_${numCol}`,
      `avg_${numCol}`,
      ...(numCol2 ? [`total_${numCol2}`] : []),
    ];

    return {
      status: "success",
      language,
      executionTimeMs: duration,
      columns: outColumns,
      rows: resultRows,
      stdout: `Execution completed successfully in ${duration}ms.\nReturned ${resultRows.length} aggregated rows grouped by '${dimCol}'.\nMemory: 2.1 MB.`,
      recommendedChart: "bar",
      aiInsight: `Analysis on '${dataset.name}' reveals that '${resultRows[0]?.[dimCol] || "Top Category"}' leads total ${numCol} volume with ${resultRows[0]?.[`total_${numCol}`] || 0}.`,
    };
  },

  // 5. Automate Mode Pipeline Engine
  runAutomate: async (
    { preset, dataset }: AutomatePresetPayload,
    onStepUpdate?: (step: PipelineStep) => void
  ): Promise<PipelineStep[]> => {
    const steps: PipelineStep[] = [
      { id: "s1", title: "Dataset Profiling & Null Audit", description: "Scanning 100% of rows for missing values, types, and schema anomalies", status: "pending" },
      { id: "s2", title: "Metric Normalization & Outliers", description: "Calculating Z-score distributions and filtering boundary spikes", status: "pending" },
      { id: "s3", title: "Dimensional Aggregation", description: "Grouping primary financial indicators by regional and product segments", status: "pending" },
      { id: "s4", title: "Automated Visual & Report Synthesis", description: "Synthesizing executive KPI cards, charts, and AI takeaways", status: "pending" },
    ];

    for (let i = 0; i < steps.length; i++) {
      steps[i].status = "running";
      if (onStepUpdate) onStepUpdate({ ...steps[i] });
      await new Promise((r) => setTimeout(r, 600));
      steps[i].status = "completed";
      steps[i].durationMs = Math.floor(Math.random() * 40) + 15;
      if (onStepUpdate) onStepUpdate({ ...steps[i] });
    }

    return steps;
  },

  // 6. AI Copilot Natural Language Assistant
  askAI: async (question: string, dataset: Dataset, language: Language): Promise<AIRawResponse> => {
    if (!ENABLE_MOCKS) {
      const res = await fetch(`${API_BASE_URL}/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, datasetId: dataset.id, language }),
      });
      return res.json();
    }

    await new Promise((r) => setTimeout(r, 800));
    const lower = question.toLowerCase();

    if (lower.includes("churn") || lower.includes("risk")) {
      return {
        answer: "Here is the code to calculate average churn risk grouped by customer tier and region.",
        generatedCode:
          language === "python"
            ? `df.groupby(['customer_tier', 'region'])['churn_risk'].mean().reset_index().sort_values(by='churn_risk', ascending=False)`
            : `SELECT customer_tier, region, ROUND(AVG(churn_risk) * 100, 2) AS avg_churn_pct\nFROM sales\nGROUP BY 1, 2\nORDER BY avg_churn_pct DESC;`,
        language,
        explanation: "Grouped by customer tier and region, calculated mean churn risk, and sorted descending to surface high-risk cohorts.",
        recommendedChart: "bar",
      };
    }

    if (lower.includes("top") || lower.includes("margin") || lower.includes("profit")) {
      return {
        answer: "I generated code to isolate top revenue contributors and compute their gross profit margins.",
        generatedCode:
          language === "python"
            ? `df.assign(margin_pct=lambda x: (x.profit / x.revenue) * 100).sort_values(by='profit', ascending=False).head(5)`
            : `SELECT category, SUM(revenue) AS total_rev, SUM(profit) AS total_profit, ROUND(SUM(profit) / SUM(revenue) * 100, 2) AS margin_pct\nFROM sales\nGROUP BY 1\nORDER BY total_profit DESC\nLIMIT 5;`,
        language,
        explanation: "Aggregated profit and revenue by category with margin % computation, sliced to the top 5.",
        recommendedChart: "bar",
      };
    }

    return {
      answer: `Here is the ${language.toUpperCase()} transformation tailored for "${question}".`,
      generatedCode:
        language === "python"
          ? `summary = df.groupby('region')['revenue'].sum().reset_index()\nsummary['share_pct'] = (summary['revenue'] / summary['revenue'].sum()) * 100\nprint(summary)`
          : `SELECT region, SUM(revenue) AS total_revenue, ROUND(SUM(revenue) / (SELECT SUM(revenue) FROM sales) * 100, 2) AS share_pct\nFROM sales\nGROUP BY 1\nORDER BY total_revenue DESC;`,
      language,
      explanation: "Grouped by primary dimension and computed percentage share of global total.",
      recommendedChart: "pie",
    };
  },

  // 7. Executive Report Generation
  generateReport: async (dataset: Dataset) => {
    await new Promise((r) => setTimeout(r, 700));
    return {
      id: "rep_" + Math.random().toString(36).substring(2, 8),
      title: "Executive Intelligence Report: " + dataset.name,
      generatedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      findings: [
        "North America drove the largest volume at $66,200 (34.3% of global sales).",
        "European accounts achieved highest margin efficiency (61.7%), outperforming APAC by 1.1%.",
        "High churn risk is concentrated in SMB tiers with order values below $5,000.",
      ],
      recommendedActions: [
        "Introduce enterprise tiered onboarding incentives in Latin America to expand gross margins.",
        "Establish proactive customer success alerts when account usage churn score exceeds 0.35.",
      ],
      dataQualityNotes: "100% complete records. 0 missing values detected. All transaction timestamps validated against ISO standards.",
    };
  },
};
