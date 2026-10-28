/**
 * DataQuery AI - Plan Definitions & Feature Gating Map
 * Central configuration for Free vs. Pro tiers and feature limits.
 */

export type PlanTier = "free" | "pro" | "open_source" | "community";

export interface PlanLimits {
  tier: PlanTier;
  name: string;
  priceMonthly: number;
  maxFileSizeBytes: number; // 1 GB+
  maxRows: number;          // 100M+
  dailyRunsLimit: number;   // Unlimited
  connectorsLimit: number;  // Unlimited
  allowedFunctionLevels: ("basic" | "intermediate" | "advanced")[];
  dashboardsLimit: number;  // Unlimited
  watermarkOnExport: boolean;
  aiPromptsMonthlyLimit: number; // Unlimited
  schedulingEnabled: boolean;
  whiteLabelReports: boolean;
  liveConnectorSync: boolean;
}

export const OPEN_SOURCE_LIMITS: PlanLimits = {
  tier: "community",
  name: "Community Edition (Open Source)",
  priceMonthly: 0,
  maxFileSizeBytes: 1024 * 1024 * 1024, // 1 GB
  maxRows: 100_000_000,
  dailyRunsLimit: 999_999,
  connectorsLimit: 999,
  allowedFunctionLevels: ["basic", "intermediate", "advanced"],
  dashboardsLimit: 999,
  watermarkOnExport: false,
  aiPromptsMonthlyLimit: 999_999,
  schedulingEnabled: true,
  whiteLabelReports: true,
  liveConnectorSync: true,
};

export const PLAN_CONFIGS: Record<PlanTier, PlanLimits> = {
  free: OPEN_SOURCE_LIMITS,
  pro: {
    ...OPEN_SOURCE_LIMITS,
    tier: "pro",
    name: "DataQuery Open Source",
  },
  open_source: OPEN_SOURCE_LIMITS,
  community: OPEN_SOURCE_LIMITS,
};

export interface UsageState {
  currentTier: PlanTier;
  runsToday: number;
  aiPromptsThisMonth: number;
  activeConnectorsCount: number;
  dashboardsCount: number;
}

export const DEFAULT_USAGE: UsageState = {
  currentTier: "community",
  runsToday: 14,
  aiPromptsThisMonth: 3,
  activeConnectorsCount: 1,
  dashboardsCount: 1,
};

/**
 * Validates if an action is permitted under the active user's plan.
 * In Open Source DataQuery, ALL actions are 100% permitted without restrictions.
 */
export function checkPlanPermission(
  _action: "run" | "upload" | "ai_prompt" | "use_function" | "create_dashboard" | "schedule",
  _usage: UsageState,
  _params?: {
    fileSizeBytes?: number;
    rowCount?: number;
    functionLevel?: "basic" | "intermediate" | "advanced";
  }
): { allowed: boolean; reason?: string } {
  // 100% Free & Open Source - No paywalls, no artificial limits
  return { allowed: true };
}
