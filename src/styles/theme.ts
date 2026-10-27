/**
 * DataQuery AI - Design System Tokens
 * Defines standardized tokens for colors, typography, spacing, radius, and shadows.
 */

export const themeTokens = {
  colors: {
    // Canvas & Surface
    canvas: {
      light: "#F8FAFC", // Slate 50
      dark: "#0B0F17",   // Deep obsidian space
    },
    surface: {
      light: "#FFFFFF",
      dark: "#111827",   // Slate 900
    },
    surfaceElevated: {
      light: "#F1F5F9", // Slate 100
      dark: "#1E293B",   // Slate 800
    },
    border: {
      light: "#E2E8F0", // Slate 200
      dark: "#1F2937",   // Gray 800
    },
    borderSubtle: {
      light: "#F1F5F9",
      dark: "#161F2E",
    },
    // Accents & Signals
    primary: {
      light: "#2563EB", // Blue 600
      dark: "#38BDF8",  // Neon Sky Blue 400
      hoverLight: "#1D4ED8",
      hoverDark: "#0284C7",
    },
    accentPython: {
      light: "#3B82F6",
      dark: "#60A5FA",
    },
    accentSQL: {
      light: "#0EA5E9",
      dark: "#38BDF8",
    },
    accentDAX: {
      light: "#7C3AED",
      dark: "#A855F7",
    },
    success: {
      light: "#059669",
      dark: "#10B981",
    },
    warning: {
      light: "#D97706",
      dark: "#F59E0B",
    },
    error: {
      light: "#DC2626",
      dark: "#EF4444",
    },
    // Typography
    textPrimary: {
      light: "#0F172A", // Slate 900
      dark: "#F8FAFC",   // Slate 50
    },
    textSecondary: {
      light: "#475569", // Slate 600
      dark: "#94A3B8",   // Slate 400
    },
    textMuted: {
      light: "#94A3B8",
      dark: "#64748B",
    },
  },
  typography: {
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    },
    scale: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem",// 30px
      "4xl": "2.25rem", // 36px
    },
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    full: "9999px",
  },
  shadows: {
    subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    panel: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    glowSky: "0 0 25px -4px rgba(56, 189, 248, 0.25)",
    glowPurple: "0 0 25px -4px rgba(168, 85, 247, 0.25)",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
