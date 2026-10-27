# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-10-27

### Added
- **Visual Playground (Core 3-Pane Layout)**:
  - **Left Data Panel**: Drag-and-drop CSV/Excel uploader, active tables manager, schema viewer with DuckDB data types, and data health profiler.
  - **Center Work Area**: Multi-engine code workspace featuring Python (pandas/NumPy), DuckDB SQL, and Power BI DAX with visual axis builder.
  - **Manual & Automate Modes**: 8 pre-configured automated recipes (Cleaning, Deep Schema Profiling, Sales Summary, Ad ROAS, Cohort Retention, RFM Segments, Forecast, Full Report) plus AI Suggestion.
  - **Function Library Picker**: In-editor modal with 90+ seeded transformations (Basic, Intermediate, Advanced) and plan-aware insertion.
  - **Right Output Panel**: Tabbed outputs for Recharts visuals (Bar, Line, Area, Pie/Donut), TanStack-style DataTable, descriptive statistics, execution telemetry logs, and AI-synthesized takeaways.
  - **Step History Timeline**: Chronological pipeline audit trail with re-run all, step deletion, and browser auto-save indicator.
  - **Copilot AI Assistant Drawer**: "Ask your data" drawer converting natural language into reviewed, editable code without automatic execution.
- **Public Marketing Website**:
  - **Home Page**: Complete 10-section layout (sticky nav, hero with interactive animated preview, connector logo strip, 3 playground engine cards, 4-step workflow, live sales.csv demo strip, 4 use-case tabs, pricing teaser, 8-question FAQ accordion, and footer).
  - **Pricing Page**: Side-by-side Free Starter vs. DataQuery Pro comparison, monthly/annual toggle (20% discount), and feature matrix.
  - **Function Library**: Searchable catalog for 90+ seeded Python, SQL, and DAX functions with "Try on my data" and "Add to Automate chain" triggers.
  - **Connectors**: 9 connector tiles (CSV/Excel, Google Drive, Google Sheets, MySQL, MongoDB, Shopify, Google Analytics 4, REST API, Snowflake) with a 3-step modal (Choose, Authorize, Select Data).
  - **Security, Templates, About, and Docs**: Privacy whitepaper with client-side WASM guarantees, domain setup docs, and starter blueprints.
- **Logged-In Workspace App**:
  - **Workspace Home (`/app`)**: Recent dataset manager, quick start cards, and plan usage counters.
  - **Dashboards (`/app/dashboards`)**: Drag-and-drop KPI cards, pinned charts, scheduling controls, share link, and Apache Superset embedded iframe slot.
  - **Reports (`/app/reports`)**: Executive AI intelligence report featuring 3 analytical findings, 2 strategic recommendations, charts, data-quality notes, and PDF export.
  - **Settings (`/app/settings`)**: Profile info, usage meters, API token generator, client-side sandbox indicator, and irreversible "Delete My Data & Account" modal.
  - **Test Checkout (`/checkout`)**: Clearly marked test-mode checkout page for simulated subscription upgrades.
- **Testing & Quality**:
  - Unit tests for formula evaluators (SUM, AVERAGE, DIVIDE with zero-defense, CALCULATE, and plan limits).
  - Playwright E2E test covering the complete user journey: sign up -> upload sample -> Automate recipe -> pin chart -> export.
  - Next.js production build (`npm run build`) statically compiling all 21 routes with 0 errors.

---

## [0.1.0] - 2026-10-27

### Added
- Initial project scaffolding with Next.js App Router, TypeScript, and Tailwind CSS.
- GitHub Actions CI workflow for test, lint, and build verification.
- Netlify (`netlify.toml`) and Vercel (`vercel.json`) configurations with strict CSP and security headers.
- Design token system (`src/styles/theme.ts`) and 17 core UI components.
- API abstraction contract (`src/lib/api.ts`) and Free vs. Pro plan limits (`src/lib/plans.ts`).
