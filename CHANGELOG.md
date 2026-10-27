# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-10-27

### Added
- **Initial Infrastructure**:
  - Next.js (App Router) + TypeScript + Tailwind CSS design system with custom tokens.
  - GitHub Actions CI workflow for test, lint, and build verification.
  - Deployment support for both Netlify (`netlify.toml`) and Vercel (`vercel.json`) with strict security headers (CSP, X-Frame-Options).
  - Environment templates (`.env.example`), branch rules, PR templates, and comprehensive documentation (`/docs`).
- **Core Architecture**:
  - API abstraction layer (`src/lib/api.ts`) supporting realistic client-side mocking and external backend readiness.
  - Feature gating and usage limit system (`src/lib/plans.ts`) for Free and Pro tiers.
  - State management via Zustand (`src/lib/store/useAppStore.ts`).
  - Shared design tokens and UI component library.
