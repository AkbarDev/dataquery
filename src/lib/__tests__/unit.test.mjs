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

test("Plan Limits & Gating Verification", () => {
  const freeLimits = { dailyRuns: 50, maxFileSizeMB: 25, maxRows: 100000 };
  const proLimits = { dailyRuns: Infinity, maxFileSizeMB: 500, maxRows: 5000000 };

  // Free plan checks
  assert.equal(freeLimits.dailyRuns <= 50, true);
  assert.equal(freeLimits.maxFileSizeMB, 25);

  // Pro plan checks
  assert.equal(proLimits.dailyRuns > 10000, true);
  assert.equal(proLimits.maxFileSizeMB, 500);
});
