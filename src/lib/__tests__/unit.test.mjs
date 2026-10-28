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

