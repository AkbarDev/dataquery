import { describe, it, expect } from "vitest";
import { checkPlanPermission, UsageState, DEFAULT_USAGE } from "../plans";

describe("Plan Gating & Usage Limit Logic", () => {
  it("permits standard runs within daily quota on free plan", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "free",
      runsToday: 20,
    };
    const check = checkPlanPermission("run", usage);
    expect(check.allowed).toBe(true);
  });

  it("blocks runs when daily quota of 50 is reached on free tier", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "free",
      runsToday: 50,
    };
    const check = checkPlanPermission("run", usage);
    expect(check.allowed).toBe(false);
    expect(check.reason).toContain("Daily run limit reached");
  });

  it("permits unlimited runs on Pro tier", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "pro",
      runsToday: 500,
    };
    const check = checkPlanPermission("run", usage);
    expect(check.allowed).toBe(true);
  });

  it("blocks file uploads exceeding 25 MB on Free plan", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "free",
    };
    const check = checkPlanPermission("upload", usage, {
      fileSizeBytes: 30 * 1024 * 1024,
    });
    expect(check.allowed).toBe(false);
    expect(check.reason).toContain("File size exceeds 25 MB limit");
  });

  it("blocks advanced functions on Free plan", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "free",
    };
    const check = checkPlanPermission("use_function", usage, {
      functionLevel: "advanced",
    });
    expect(check.allowed).toBe(false);
    expect(check.reason).toContain("Advanced functions require DataQuery Pro");
  });

  it("allows advanced functions on Pro plan", () => {
    const usage: UsageState = {
      ...DEFAULT_USAGE,
      currentTier: "pro",
    };
    const check = checkPlanPermission("use_function", usage, {
      functionLevel: "advanced",
    });
    expect(check.allowed).toBe(true);
  });
});
