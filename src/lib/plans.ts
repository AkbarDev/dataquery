/**
 * DataQuery AI - Plan Definitions & Feature Gating Map
 * Central configuration for Free vs. Pro tiers and feature limits.
 */

export type PlanTier = "free" | "pro";

export interface PlanLimits {
  tier: PlanTier;
  name: string;
  priceMonthly: number;
  maxFileSizeBytes: number; // 25 MB Free vs 500 MB Pro
  maxRows: number;          // 100k Free vs 5M Pro
  dailyRunsLimit: number;   // 50 Free vs Unlimited (999999) Pro
  connectorsLimit: number;  // 1 Free vs Unlimited Pro
  allowedFunctionLevels: ("basic" | "intermediate" | "advanced")[];
  dashboardsLimit: number;  // 2 Free vs Unlimited Pro
  watermarkOnExport: boolean;
  aiPromptsMonthlyLimit: number; // 10 Free vs 500 Pro
  schedulingEnabled: boolean;
  whiteLabelReports: boolean;
  liveConnectorSync: boolean;
}

export const PLAN_CONFIGS: Record<PlanTier, PlanLimits> = {
  free: {
    tier: "free",
    name: "Free Starter",
    priceMonthly: 0,
    maxFileSizeBytes: 25 * 1024 * 1024, // 25 MB
    maxRows: 100_000,
    dailyRunsLimit: 50,
    connectorsLimit: 1,
    allowedFunctionLevels: ["basic", "intermediate"],
    dashboardsLimit: 2,
    watermarkOnExport: true,
    aiPromptsMonthlyLimit: 10,
    schedulingEnabled: false,
    whiteLabelReports: false,
    liveConnectorSync: false,
  },
  pro: {
    tier: "pro",
    name: "DataQuery Pro",
    priceMonthly: 29,
    maxFileSizeBytes: 500 * 1024 * 1024, // 500 MB
    maxRows: 5_000_000,
    dailyRunsLimit: 999_999,
    connectorsLimit: 20,
    allowedFunctionLevels: ["basic", "intermediate", "advanced"],
    dashboardsLimit: 50,
    watermarkOnExport: false,
    aiPromptsMonthlyLimit: 500,
    schedulingEnabled: true,
    whiteLabelReports: true,
    liveConnectorSync: true,
  },
};

export interface UsageState {
  currentTier: PlanTier;
  runsToday: number;
  aiPromptsThisMonth: number;
  activeConnectorsCount: number;
  dashboardsCount: number;
}

export const DEFAULT_USAGE: UsageState = {
  currentTier: "free",
  runsToday: 14,
  aiPromptsThisMonth: 3,
  activeConnectorsCount: 1,
  dashboardsCount: 1,
};

/**
 * Validates if an action is permitted under the active user's plan.
 */
export function checkPlanPermission(
  action: "run" | "upload" | "ai_prompt" | "use_function" | "create_dashboard" | "schedule",
  usage: UsageState,
  params?: {
    fileSizeBytes?: number;
    rowCount?: number;
    functionLevel?: "basic" | "intermediate" | "advanced";
  }
): { allowed: boolean; reason?: string } {
  const limits = PLAN_CONFIGS[usage.currentTier];

  if (action === "run") {
    if (usage.runsToday >= limits.dailyRunsLimit) {
      return {
        allowed: false,
        reason: `Daily run limit reached (${limits.dailyRunsLimit} runs/day on ${limits.name}). Upgrade to Pro for unlimited runs.`,
      };
    }
  }

  if (action === "upload") {
    if (params?.fileSizeBytes && params.fileSizeBytes > limits.maxFileSizeBytes) {
      const maxMB = limits.maxFileSizeBytes / (1024 * 1024);
      return {
        allowed: false,
        reason: `File size exceeds ${maxMB} MB limit for ${limits.name}. Pro supports files up to 500 MB.`,
      };
    }
    if (params?.rowCount && params.rowCount > limits.maxRows) {
      return {
        allowed: false,
        reason: `Dataset row count (${params.rowCount.toLocaleString()}) exceeds ${limits.name} limit of ${limits.maxRows.toLocaleString()} rows.`,
      };
    }
  }

  if (action === "ai_prompt") {
    if (usage.aiPromptsThisMonth >= limits.aiPromptsMonthlyLimit) {
      return {
        allowed: false,
        reason: `Monthly AI prompt limit reached (${limits.aiPromptsMonthlyLimit}/mo on ${limits.name}). Upgrade to Pro for 500 prompts/mo.`,
      };
    }
  }

  if (action === "use_function") {
    if (params?.functionLevel && !limits.allowedFunctionLevels.includes(params.functionLevel)) {
      return {
        allowed: false,
        reason: `Advanced functions require DataQuery Pro.`,
      };
    }
  }

  if (action === "create_dashboard") {
    if (usage.dashboardsCount >= limits.dashboardsLimit) {
      return {
        allowed: false,
        reason: `Maximum dashboard limit reached (${limits.dashboardsLimit} on ${limits.name}). Upgrade to Pro for unlimited dashboards.`,
      };
    }
  }

  if (action === "schedule") {
    if (!limits.schedulingEnabled) {
      return {
        allowed: false,
        reason: `Automated scheduled refreshes are an exclusive Pro feature.`,
      };
    }
  }

  return { allowed: true };
}
