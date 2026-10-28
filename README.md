# ⚡ DataQuery Web (`dataquery.in`)

> **100% Free & Open-Source All-in-One Data Build Tool & Analytics Playground**  
> **Production Live URL**: **[https://dataquery-eight.vercel.app](https://dataquery-eight.vercel.app)**  
> **Custom Domain**: **`https://dataquery.in`** (or `https://www.dataquery.in`)  
> **GitHub Repository**: **[AkbarDev/dataquery](https://github.com/AkbarDev/dataquery)**  
> Ingest raw files (CSV, Excel) or connected feeds, explore in a multi-engine Visual Playground (Python pandas via Pyodide, DuckDB SQL, DAX-style Power BI), trigger Automate recipes, pin findings to live dashboards, and download AI-written executive reports — completely free with zero subscription paywalls.

---

## 🌐 Live Deployments & Routes

| Screen / Feature | Route | Live URL | Description |
| :--- | :--- | :--- | :--- |
| **Home Page** | `/` | [View Live](https://dataquery-eight.vercel.app/) | 10-section landing page with interactive hero preview, demo strip, open-source highlights, and FAQ. |
| **Visual Playground** | `/app/playground` | [View Live](https://dataquery-eight.vercel.app/app/playground) | 3-pane analytical workspace with Python, DuckDB SQL, Power BI DAX builder, and 8 Automate presets. All features unlocked. |
| **Function Library** | `/library` | [View Live](https://dataquery-eight.vercel.app/library) | 90+ searchable functions (30 Python, 30 SQL, 30 DAX) with *"Try on my data"* and *"+ Chain"* buttons. |
| **Data Connectors** | `/connectors` | [View Live](https://dataquery-eight.vercel.app/connectors) | Tile grid of 9 data sources with a 3-step connection wizard (Choose, Authorize, Select Tables). |
| **Dashboards** | `/app/dashboards` | [View Live](https://dataquery-eight.vercel.app/app/dashboards) | KPI cards, pinned Recharts visuals, date filters, automated pipeline scheduling, and Apache Superset iframe slot. |
| **Executive AI Reports** | `/app/reports` | [View Live](https://dataquery-eight.vercel.app/app/reports) | AI narrative report with 3 findings, 2 prescriptive actions, charts, and vector PDF printing. |
| **Open Source Manifesto** | `/pricing` | [View Live](https://dataquery-eight.vercel.app/pricing) | Zero-cost transparency page comparing traditional SaaS data tools with community-owned local WASM analytics. |
| **Workspace Settings** | `/app/settings` | [View Live](https://dataquery-eight.vercel.app/app/settings) | Account profile, local resource meters, API token generator, and permanent *"Delete My Data"* privacy action. |
| **Open Source Notice** | `/checkout` | [View Live](https://dataquery-eight.vercel.app/checkout) | Open source notice confirming all capabilities are permanently unlocked with zero checkout or credit card needed. |
| **Security Whitepaper** | `/security` | [View Live](https://dataquery-eight.vercel.app/security) | Client-side WASM isolation guarantees and zero-telemetry privacy policy. |

---

## 🛠️ Workarounds & Technical Decisions Log

This section documents all technical challenges, architectural workarounds, and optimizations applied to date. **This log is maintained and updated alongside every subsequent release.**

### 1. Vercel CI Peer Dependency Conflict Resolution (`.npmrc`)
- **Problem**: When deploying to Vercel, the automated `npm install` step failed with exit code 1 (`npm error Conflicting peer dependency: @types/node@26.6.5` requested by `vitest@5.0.5` vs `@types/papaparse` requiring `@types/node@*`).
- **Workaround Applied**:
  - Added a root [`.npmrc`](.npmrc) containing `legacy-peer-deps=true`. Vercel automatically respects `.npmrc` files and instructs npm to gracefully resolve peer dependencies.
  - Removed `vitest` from devDependencies, eliminating the conflicting `@types/node` dependency chain entirely.

### 2. Zero-Dependency Native Test Runner (`node:test`)
- **Problem**: Third-party test runners (Vitest, Jest) introduced heavy dependency trees, version incompatibilities with React 19, and cloud CI timeouts.
- **Workaround Applied**:
  - Switched the unit test suite to Node.js 20+ built-in test runner: [`node --test src/lib/__tests__/unit.test.mjs`](src/lib/__tests__/unit.test.mjs).
  - Verified pure mathematical formula evaluators (`SUM`, `AVERAGE`, `DIVIDE` with zero-denominator safeguards, `CALCULATE`) and plan gating logic in **under 50 milliseconds** with **zero external dependencies**.

### 3. Next.js 16 Partial Prerendering Date & Hook Suspense Boundaries
- **Problem**: Next.js 16 Partial Prerendering and Turbopack statically analyze client components. Using `new Date()` or dynamic hooks like `usePathname()` during SSR prerender triggered build warnings and halted static page generation.
- **Workaround Applied**:
  - Wrapped dynamic navigation components in `<Suspense fallback={...}>` boundaries ([`src/components/layout/AppNav.tsx`](src/components/layout/AppNav.tsx)).
  - Replaced non-deterministic `new Date().getFullYear()` and `new Date().toLocaleDateString()` with stable timestamps and deterministic ISO date slices during static site prerendering.
  - Result: Production build compiled **21 static routes with 0 errors** in 561ms.

### 4. Free-Tier Serverless Fit via Client-Side WebAssembly (DuckDB & Pyodide)
- **Problem**: Running persistent python containers, dedicated database servers, Airflow, and LLM instances incurs recurring infrastructure costs incompatible with free-tier hosting.
- **Workaround Applied**:
  - Shifted analytical query execution into client-side WebAssembly using DuckDB-WASM and Pyodide pandas in-browser.
  - Built an API abstraction layer ([`src/lib/api.ts`](src/lib/api.ts)) with realistic client-side mocking. The app is 100% functional on free serverless platforms (Vercel/Netlify), while seamlessly allowing transition to a dedicated self-hosted backend by simply toggling `NEXT_PUBLIC_ENABLE_MOCKS=false` and setting `NEXT_PUBLIC_API_BASE_URL`.

### 5. Production TypeScript Build Optimization
- **Problem**: Next.js production builds were attempting to typecheck non-compiled testing scripts and end-to-end specs.
- **Workaround Applied**:
  - Configured [`tsconfig.json`](tsconfig.json) to exclude `"tests"` and `"src/**/__tests__"` from production compilation, allowing `next build` to complete in under 1 second.

### 6. Transition to 100% Free & Open-Source (Removal of Plan Paywalls)
- **Problem**: Earlier iterations included artificial Free vs. Pro feature tiers (file size limits, daily query caps, and locked DAX/SQL functions) intended for a commercial SaaS model.
- **Decision & Solution**:
  - Transitioned DataQuery to an entirely free, open-source community platform.
  - Removed all artificial plan restrictions from [`src/lib/plans.ts`](src/lib/plans.ts): `checkPlanPermission()` unconditionally grants full access to all features.
  - Unlocked unlimited daily query runs, 100M+ row processing through DuckDB-WASM, all 90 analytical formulas, unbranded PDF exports, and automated pipeline scheduling for everyone.
  - Replaced checkout prompts and upgrade lock badges with Community Open Source badges and links to GitHub.
  - Created a custom vector [`src/components/ui/GithubIcon.tsx`](src/components/ui/GithubIcon.tsx) for zero-dependency brand rendering across Next.js Turbopack SSR builds.

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- Node.js 18+ (tested on Node 20, 22, and 26)
- npm 9+

### 2. Setup & Installation
```bash
# Clone the repository
git clone https://github.com/AkbarDev/dataquery.git
cd dataquery

# Install dependencies (automatically uses .npmrc legacy-peer-deps)
npm install

# Configure environment variables
cp .env.example .env.local

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js development server with hot-reloading |
| **Production Build** | `npm run build` | Compiles and statically optimizes all 21 routes with Turbopack |
| **Production Start** | `npm start` | Starts the production Next.js server locally |
| **Unit Tests** | `npm test` | Runs the fast native unit test suite (`node --test`) |
| **Linting** | `npm run lint` | Runs ESLint across all TypeScript and React files |

---

## 📁 Repository Structure

```
dataquery/
├── .github/
│   ├── workflows/ci.yml           # Automated CI: lint, unit tests & build
│   └── pull_request_template.md   # PR guidelines and quality checklist
├── docs/
│   ├── architecture.md            # Client-first architecture and engine flows
│   ├── api.md                     # REST API contract specification
│   ├── design-tokens.md           # Color, typography, spacing and theme tokens
│   ├── deployment.md              # Netlify and Vercel deployment walkthroughs
│   └── functions-catalog.md       # 90+ seeded Python, SQL & DAX functions
├── public/
│   └── samples/                   # Pre-seeded sales.csv and SaaS datasets
├── src/
│   ├── app/                       # Next.js App Router (Public & /app routes)
│   │   ├── app/                   # Logged-in workspace (playground, dashboards, reports)
│   │   ├── library/               # 90+ function searchable catalog
│   │   ├── connectors/            # Data connectors grid & 3-step modal
│   │   ├── pricing/               # Plans & feature comparison
│   │   ├── checkout/              # Test-mode subscription checkout
│   │   ├── security/              # Data isolation whitepaper
│   │   ├── templates/             # Starter blueprints
│   │   └── page.tsx               # 10-section Home landing page
│   ├── components/                # Reusable UI component library
│   │   ├── ui/                    # 17 core components (Button, Modal, Table, etc.)
│   │   ├── layout/                # PublicNav, PublicFooter, AppNav
│   │   └── playground/            # LeftDataPanel, CenterWorkArea, RightOutputPanel, etc.
│   ├── lib/                       # API layer, plans gating, formula evaluators
│   │   ├── api.ts                 # Unified API contract & mock engine
│   │   ├── plans.ts               # Free vs Pro feature flags and limits
│   │   ├── formulas.ts            # DAX and aggregation helper evaluators
│   │   └── store/                 # Zustand global application state
│   └── styles/                    # Global CSS and Tailwind design tokens
├── netlify.toml                   # Netlify build configuration & CSP headers
├── vercel.json                    # Vercel deployment config & security headers
├── .npmrc                         # Legacy peer dependencies configuration
├── .env.example                   # Environment variable template
├── CONTRIBUTING.md                # Branching & Conventional Commit rules
└── CHANGELOG.md                   # Semantic version history
```

---

## 🚢 Production Deployment to Vercel & Netlify

This frontend is designed to deploy to **Vercel** or **Netlify** with zero code changes:

- **Vercel**: Pre-configured with [`vercel.json`](vercel.json) security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy). Pushes to `main` automatically deploy to [https://dataquery-eight.vercel.app](https://dataquery-eight.vercel.app).
- **Netlify**: Pre-configured with [`netlify.toml`](netlify.toml) and `@netlify/plugin-nextjs`.
- **Custom Domain (`dataquery.in`)**:
  - Configure DNS A Record: `@` → `76.76.21.21` (Vercel) or `75.2.60.5` (Netlify).
  - Configure CNAME Record: `www` → `cname.vercel-dns.com`.
  - Detailed steps available in [docs/deployment.md](docs/deployment.md).

---

## 🔄 Maintenance & Documentation Update Protocol

> [!IMPORTANT]
> **Mandatory Documentation Integrity Rule**:
> As new enhancements, bug fixes, or architectural changes are introduced to the DataQuery platform:
> 1. **Update `README.md`**: Update the *Workarounds & Technical Decisions Log* and the *Live Deployments & Routes* table if new routes or configurations are added.
> 2. **Update `CHANGELOG.md`**: Log all notable changes under the appropriate semantic version section (`Added`, `Changed`, `Fixed`).
> 3. **Update `/docs`**: Keep [docs/api.md](docs/api.md), [docs/functions-catalog.md](docs/functions-catalog.md), and [docs/deployment.md](docs/deployment.md) in sync with any API or function schema modifications.
> 4. **Git Commits**: Use [Conventional Commits](CONTRIBUTING.md) (`feat:`, `fix:`, `docs:`, `chore:`) and verify that `npm test` and `npm run build` pass before merging to `main`.
