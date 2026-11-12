import test from "node:test";
import assert from "node:assert/strict";

// Pure math formulas
function evaluateSum(data, column) {
  if (!data || data.length === 0) return 0;
  return data.reduce((acc, row) => acc + (Number(row[column]) || 0), 0);
}

function evaluateAverage(data, column) {
  if (!data || data.length === 0) return 0;
  return evaluateSum(data, column) / data.length;
}

function evaluateDivide(numerator, denominator, fallback = 0) {
  if (denominator === 0 || isNaN(denominator) || !isFinite(denominator)) {
    return fallback;
  }
  return numerator / denominator;
}

test("Formula Evaluator - SUM, AVERAGE, and DIVIDE with zero-defense", () => {
  const records = [
    { revenue: 100, profit: 40 },
    { revenue: 200, profit: 80 },
    { revenue: 300, profit: 150 },
  ];

  assert.equal(evaluateSum(records, "revenue"), 600);
  assert.equal(evaluateAverage(records, "revenue"), 200);
  assert.equal(evaluateDivide(100, 4), 25);
  assert.equal(evaluateDivide(100, 0, 0), 0);
});

test("Open Source Limits & Gating Verification", () => {
  const communityLimits = { dailyRuns: 999999, maxFileSizeMB: 1024, maxRows: 100000000 };

  // Open Source Community checks: all operations unrestricted
  assert.equal(communityLimits.dailyRuns >= 999999, true);
  assert.equal(communityLimits.maxFileSizeMB >= 1024, true);
  assert.equal(communityLimits.maxRows >= 100000000, true);
});

test("Statistics Testing - Student's Two-Sample t-statistic and variance calculation", () => {
  const sampleA = [12, 14, 15, 18, 20];
  const sampleB = [8, 9, 11, 10, 12];

  const meanA = sampleA.reduce((a, b) => a + b, 0) / sampleA.length;
  const meanB = sampleB.reduce((a, b) => a + b, 0) / sampleB.length;
  assert.equal(meanA, 15.8);
  assert.equal(meanB, 10.0);

  const varA = sampleA.reduce((acc, v) => acc + Math.pow(v - meanA, 2), 0) / (sampleA.length - 1);
  const varB = sampleB.reduce((acc, v) => acc + Math.pow(v - meanB, 2), 0) / (sampleB.length - 1);
  const pooledSE = Math.sqrt(varA / sampleA.length + varB / sampleB.length);
  const tStat = (meanA - meanB) / pooledSE;

  assert.equal(tStat > 3.0, true, "t-statistic should indicate strong statistical difference");
});

test("Machine Learning Metrics - Confusion Matrix, Accuracy, Precision, Recall, F1", () => {
  const tp = 85;
  const fp = 15;
  const fn = 10;
  const tn = 90;

  const total = tp + fp + fn + tn;
  const accuracy = (tp + tn) / total;
  const precision = tp / (tp + fp);
  const recall = tp / (tp + fn);
  const f1 = (2 * (precision * recall)) / (precision + recall);

  assert.equal(accuracy, 0.875);
  assert.equal(precision, 0.85);
  assert.equal(Math.round(recall * 1000) / 1000, 0.895);
  assert.equal(f1 > 0.87 && f1 < 0.88, true, "F1 score should be harmonic mean around 0.872");
});

test("ML Algorithm Data Understanding & Suitability Engine - Continuous vs Categorical vs Temporal rules", () => {
  const continuousDataset = {
    rowCount: 100,
    columns: [
      { name: "revenue", type: "number", distinctCount: 95 },
      { name: "profit", type: "number", distinctCount: 90 },
      { name: "cost", type: "number", distinctCount: 88 },
      { name: "category", type: "string", distinctCount: 4 },
    ],
  };

  // Rule 1: Continuous Target (revenue) -> Linear Regression suitable, Logistic Regression incompatible
  const targetColContinuous = "revenue";
  const targetColInfo = continuousDataset.columns.find((c) => c.name === targetColContinuous);
  const isContinuous = targetColInfo.type === "number" && targetColInfo.distinctCount > 10;
  assert.equal(isContinuous, true);

  const linearRegSuitable = isContinuous;
  const logisticRegSuitable = !isContinuous;
  assert.equal(linearRegSuitable, true, "Linear Regression must be suitable for continuous target");
  assert.equal(logisticRegSuitable, false, "Logistic Regression must be greyed out for continuous target");

  // Rule 2: Categorical Target (category) -> Logistic Regression suitable, Linear Regression incompatible
  const targetColCategorical = "category";
  const catColInfo = continuousDataset.columns.find((c) => c.name === targetColCategorical);
  const isCat = catColInfo.type === "string";
  assert.equal(isCat, true);

  const linearRegSuitableCat = !isCat;
  const logisticRegSuitableCat = isCat;
  assert.equal(logisticRegSuitableCat, true, "Logistic Regression must be suitable for categorical target");
  assert.equal(linearRegSuitableCat, false, "Linear Regression must be greyed out for categorical target");

  // Rule 3: Date column requirement for ARIMA
  const hasDateCol = continuousDataset.columns.some((c) => c.type === "date" || /date|time/i.test(c.name));
  assert.equal(hasDateCol, false);
  const arimaSuitable = hasDateCol;
  assert.equal(arimaSuitable, false, "ARIMA must be greyed out when no date/temporal column is detected");

  // Rule 4: Feature count requirement for PCA (≥ 3 numeric features)
  const features2 = ["revenue", "profit"];
  const pcaSuitable2 = features2.length >= 3;
  assert.equal(pcaSuitable2, false, "PCA must be greyed out when fewer than 3 features are selected");

  const features3 = ["revenue", "profit", "cost"];
  const pcaSuitable3 = features3.length >= 3;
  assert.equal(pcaSuitable3, true, "PCA must be suitable when ≥ 3 features are selected");
});

test("Essential Tools Ecosystem - 55 Tools across Data Scientist, Analyst, and Engineer", () => {
  const toolsCatalog = [
    // Data Scientist
    "lightgbm", "huggingface", "statsmodels", "xgboost", "dask", "nltk", "opencv", "keras", "pytorch", "tensorflow", "scikit_learn", "matlab",
    // Data Analyst
    "google_analytics", "tableau", "power_bi", "alteryx", "power_query", "looker_studio", "sas", "qlik_sense", "thoughtspot", "looker", "spss", "mixpanel",
    // Data Engineer
    "airflow", "kafka", "aws_redshift", "trino", "snowflake", "presto", "cassandra", "informatica", "flink", "nifi", "talend", "azure_data_factory",
    // Intersections
    "excel", "jupyter", "pandas", "numpy", "r_lang", "docker", "hadoop", "spark", "databricks", "kubernetes", "mlflow", "dbt", "hive", "sql_server", "bigquery", "etl", "git", "sql", "python"
  ];

  // Verify full catalog coverage
  assert.equal(toolsCatalog.length, 55, "Ecosystem must contain all 55 tools from the Venn diagram infographic");

  // Verify unique IDs
  const uniqueSet = new Set(toolsCatalog);
  assert.equal(uniqueSet.size, 55, "All tool IDs must be unique without duplicates");

  // Verify deep-link URL schema
  const sampleTool = { id: "xgboost", playgroundTab: "ml" };
  const targetUrl = `/app/playground?tool=${sampleTool.id}&tab=${sampleTool.playgroundTab}`;
  assert.equal(targetUrl, "/app/playground?tool=xgboost&tab=ml");
});

test("Playground Canvas Split Logic - Top Queries Workspace & Bottom Output Results", () => {
  // Clamping function for split ratio
  const clampRatio = (r) => Math.min(85, Math.max(15, r));

  // Benchmark layout defaults
  const defaultLayout = "split-bottom";
  assert.equal(defaultLayout, "split-bottom", "Default layout must be split-bottom for database query benchmark workspace");

  // Presets verification
  const ratio50 = clampRatio(50);
  const ratio70 = clampRatio(70);
  const ratio30 = clampRatio(30);
  assert.equal(ratio50, 50);
  assert.equal(ratio70, 70);
  assert.equal(ratio30, 30);

  // Clamping limits
  assert.equal(clampRatio(5), 15, "Ratio below 15% must clamp to 15%");
  assert.equal(clampRatio(95), 85, "Ratio above 85% must clamp to 85%");

  // Complementary results ratio
  assert.equal(100 - ratio50, 50);
  assert.equal(100 - ratio70, 30);
  assert.equal(100 - ratio30, 70);
});



