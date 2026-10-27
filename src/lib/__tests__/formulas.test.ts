import { describe, it, expect } from "vitest";
import {
  evaluateSum,
  evaluateAverage,
  evaluateDistinctCount,
  evaluateDivide,
  evaluateFilter,
  evaluateCalculate,
} from "../formulas";

describe("Formula Helpers", () => {
  const sampleSales = [
    { id: 1, region: "US", revenue: 100, rep: "Alice" },
    { id: 2, region: "EU", revenue: 200, rep: "Bob" },
    { id: 3, region: "US", revenue: 300, rep: "Alice" },
    { id: 4, region: "APAC", revenue: 400, rep: "Charlie" },
  ];

  it("calculates SUM accurately", () => {
    expect(evaluateSum(sampleSales, "revenue")).toBe(1000);
    expect(evaluateSum([], "revenue")).toBe(0);
  });

  it("calculates AVERAGE correctly", () => {
    expect(evaluateAverage(sampleSales, "revenue")).toBe(250);
  });

  it("calculates DISTINCTCOUNT correctly", () => {
    expect(evaluateDistinctCount(sampleSales, "region")).toBe(3);
    expect(evaluateDistinctCount(sampleSales, "rep")).toBe(3);
  });

  it("handles DIVIDE with zero-denominator safeguard", () => {
    expect(evaluateDivide(100, 4)).toBe(25);
    expect(evaluateDivide(100, 0, 0)).toBe(0);
    expect(evaluateDivide(100, 0, -1)).toBe(-1);
  });

  it("filters datasets by condition", () => {
    const usRows = evaluateFilter(sampleSales, "region", "==", "US");
    expect(usRows.length).toBe(2);

    const highRev = evaluateFilter(sampleSales, "revenue", ">", 200);
    expect(highRev.length).toBe(2);
  });

  it("evaluates DAX CALCULATE with filter context", () => {
    const usRevenue = evaluateCalculate(
      sampleSales,
      "SUM",
      "revenue",
      "region",
      "==",
      "US"
    );
    expect(usRevenue).toBe(400); // 100 + 300
  });
});
