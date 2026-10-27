# ⚡ DataQuery Web (`dataquery.in`)

> **Hosted, All-in-One Data Build Tool & Analytics Playground**  
> Custom Domain: **`https://dataquery.in`**  
> Ingest files (CSV, Excel) or feeds, explore in a multi-engine Visual Playground (Python, DuckDB SQL, DAX-style Power BI), trigger Automate pipelines, pin findings to live dashboards, and download AI-written executive reports.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node 20 & 22)
- npm 9+

### 2. Setup & Installation
```bash
# Clone the repository
git clone https://github.com/AkbarDev/dataquery-web.git
cd dataquery-web

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js development server with hot-reloading |
| **Production Build** | `npm run build` | Compiles and statically optimizes the production bundle |
| **Production Server** | `npm start` | Starts the production Next.js server locally |
| **Linting** | `npm run lint` | Runs ESLint across all TypeScript and React files |
| **Unit Tests** | `npm test` | Runs Vitest unit test suite (formula evaluators, plan quotas) |

---

## 📁 Repository Structure

```
dataquery-web/
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
│   ├── components/                # Reusable UI component library (shadcn/ui style)
│   ├── lib/                       # API layer, plans gating, execution engines
│   └── styles/                    # Global CSS and Tailwind design tokens
├── netlify.toml                   # Netlify build configuration & CSP headers
├── vercel.json                    # Vercel deployment config & security headers
├── .env.example                   # Environment variable template
├── CONTRIBUTING.md                # Branching & Conventional Commit rules
└── CHANGELOG.md                   # Semantic version history
```

---

## 🚢 Deploying to Production (`dataquery.in`)

This frontend is designed to deploy seamlessly to **Vercel** or **Netlify** with zero code changes:

- **Vercel**: Import the GitHub repo at [vercel.com/new](https://vercel.com/new) -> Framework preset: Next.js -> Add environment variables -> Deploy.
- **Netlify**: Import at [app.netlify.com](https://app.netlify.com) -> Uses `netlify.toml` automatically -> Deploy.

For custom domain configuration (`dataquery.in`), DNS records, SSL, and free-tier terms, consult [docs/deployment.md](docs/deployment.md).

---

## 📜 Branching & Commit Guidelines

- **`main`**: Production branch (`https://dataquery.in`). Protected.
- **`dev`**: Staging integration branch.
- **Feature Branches**: Branch off `dev` as `feat/<name>`, `fix/<name>`, or `docs/<name>`.
- Use [Conventional Commits](CONTRIBUTING.md) for all pull requests.
