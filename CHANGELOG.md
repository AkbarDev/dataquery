# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.2] - 2026-10-30

### Added
- **Home Page Data Domain Career Matrix & Tech Arsenal (`CareerMatrixSection.tsx`)**:
  - Implemented the complete 5-role career taxonomy section on the homepage featuring creative persona identities:
    - **Position 01 · Data Analytics**: *"The Data Detective" · Insights & Discovery Architect* (Skills: Data Cleaning, Excel/SQL Basics, Data Viz, Descriptive Stats, Reporting; Tools: Excel, SQL, Power BI, Tableau, Google Sheets).
    - **Position 02 · Business Analytics**: *"The Strategic Navigator" · Boardroom Value Translator* (Skills: KPI Tracking, Business Reporting, Requirement Analysis, Forecasting, Decision Support; Tools: Excel, Power BI, Tableau, SQL, Looker Studio).
    - **Position 03 · Data Engineering**: *"The Pipeline Blacksmith" · Big Data Infrastructure Titan* (Skills: ETL/ELT Pipelines, Data Warehousing, Database Indexing, Big Data Processing, Workflow Automation; Tools: Python, SQL, Apache Spark, Airflow, Snowflake, Hadoop).
    - **Position 04 · Data Science**: *"The Algorithm Alchemist" · Predictive Machine Learning Pioneer* (Skills: Statistical Hypothesis Modeling, Machine Learning 16 Algos, EDA, Feature Engineering, Predictive Inference; Tools: Python, R, Jupyter, Scikit-learn, Pandas, XGBoost).
    - **Position 05 · Business Intelligence**: *"The Visual Storyteller" · Executive Dashboard Artisan* (Skills: Interactive Dashboard UX, Data Storytelling, KPI Monitoring, Trend Variance Analysis, Performance Gauges; Tools: Power BI DAX, Tableau, Looker, Excel, SQL).
  - Added interactive category selector tabs, skill sets, tool tag arsenals, and live deep-link buttons routing directly into DataQuery's corresponding playground studios (`?tab=sql`, `?tab=python`, `?tab=pyspark`, `?tab=ml`, `?tab=dax`).
  - Added live Technology Filter pills (`SQL & Columnar`, `Python & Pandas`, `Power BI & DAX`, `Apache Spark & Big Data`, `Machine Learning`, `Excel & Sheets`).
  - Added dual view mode switcher: `Role Deep-Dive` vs `All 5 Roles Matrix`.

---

## [0.4.1] - 2026-10-30

### Added
- **Machine Learning Algorithms Explained Simply**:
  - Implemented the complete 16-algorithm architecture from the "Machine Learning Algorithms Explained Simply" infographic:
    - **Logistic Regression**: "Predicts the probability of a class label."
    - **Linear Regression**: "Predicts continuous values using a best-fit line."
    - **Gradient Boosting**: "Builds models step by step to reduce errors."
    - **Principal Component Analysis (PCA)**: "Reduces dimensions while keeping key patterns."
    - **Decision Tree**: "Splits data into branches to make decisions."
    - **Neural Networks**: "Learns complex patterns through connected layers."
    - **Random Forest**: "Combines many trees to improve prediction accuracy."
    - **DBSCAN**: "Finds dense clusters and detects outliers."
    - **Support Vector Machine (SVM)**: "Finds the best boundary between classes."
    - **Hierarchical Clustering**: "Builds clusters in a tree-like hierarchy."
    - **Naive Bayes**: "Uses probabilities to classify data quickly."
    - **ARIMA**: "Forecasts time-series data using past trends."
    - **K-Nearest Neighbors (KNN)**: "Classifies using the labels of nearby points."
    - **K-Means Clustering**: "Groups similar data into K clusters."
    - **Apriori**: "Finds frequent item patterns and association rules."
    - **XGBOOST**: "A fast boosting method for strong predictive performance."
- **Data Understanding & Suitability Greying Engine**:
  - Automatically identifies dataset characteristics: sample counts, feature data types, continuous vs. discrete target attributes, and temporal sequences.
  - Dynamically computes suitability for each algorithm, marking suitable models with green `✓ Suitable` badges while greying out incompatible models with clear diagnostic explanations.
  - Added filter toggle controls: `All (16)`, `Suitable Only`, and `Greyed Out`.
- **Testing & Quality**:
  - Added unit test suite in `src/lib/__tests__/unit.test.mjs` verifying suitability rules for continuous, categorical, dimensional, and temporal constraints.
  - Compiled and verified with 0 errors on Next.js 16 Turbopack across all 21 routes.

---

## [0.4.0] - 2026-10-28

### Added
- **Multi-Engine Big Data, Distributed Computing & Machine Learning Studios**:
  - **Statistics Studio (`StatisticsStudio.tsx`)**:
    - Parametric and non-parametric hypothesis testing suite: Student's Two-Sample t-test, One-Way ANOVA, Pearson Chi-Square, and Mann-Whitney U test with p-value calculations and significance evaluation.
    - Parametric 5-number distribution tables (mean, median, std dev, min, max, IQR, skewness) per numeric column.
    - Pearson correlation matrix heatmap and IQR outlier detection.
  - **PySpark Distributed Studio (`PySparkStudio.tsx`)**:
    - Distributed DataFrame transformations: Window `partitionBy`/`orderBy`, `groupBy` aggregations, `withColumn` conditionals, and `repartition`.
    - Visual Spark DAG execution stage monitor with Tungsten physical plan / Catalyst query optimizer inspector.
    - StructType schema explorer with distributed partition counts.
  - **Hadoop Ecosystem Studio (`HadoopStudio.tsx`)**:
    - 3-phase MapReduce telemetry monitor (Map, Shuffle & Sort, Reduce) tracking KV pairs/sec, spills, and task status.
    - HiveQL columnar DDL manager with partition pruning and schema definitions.
    - Virtual interactive HDFS CLI terminal (`hdfs dfs -ls`, `-mkdir`, `-cat`, `-df -h`).
    - YARN cluster node manager resource telemetry (vCores, active nodes, memory pools).
  - **Machine Learning Studio (`MachineLearningStudio.tsx`)**:
    - Model selection across Classification (Random Forest, Logistic Regression, Gradient Boosting), Regression (Ridge Regression, Gradient Boosted Regressor), and Clustering (K-Means).
    - Interactive hyperparameter sliders (`n_estimators`, `max_depth`, `learning_rate`, `n_clusters`, 80/20 train/test split).
    - Comprehensive model evaluation metrics (Accuracy, ROC-AUC, Precision, Recall, F1 score, MSE, R²).
    - Interactive 2x2 Confusion Matrix visualizer with TP, FP, FN, TN cell breakdowns.
    - Feature importance ranking bar chart.
    - Interactive prediction sandbox allowing users to adjust input feature sliders and generate real-time inferences.
    - One-click Scikit-Learn Python script exporter.
- **Function Catalog Expansion (130+ Total Functions)**:
  - Added 40 new pre-configured functions across Statistics (`scipy.stats`), PySpark, Hadoop, and Machine Learning.
  - Updated Function Library (`/library`) with filter tabs and badge variants for all 7 engines.
  - Added engine link directory to PublicFooter.
- **Testing & Verification**:
  - Added unit test suite for Student's two-sample t-statistic and ML confusion matrix evaluation metrics.
  - Verified Next.js 16 Turbopack compiles all 21 routes with 0 errors.

---

## [0.3.0] - 2026-10-28

### Changed
- **100% Free & Open-Source Transition**:
  - Removed artificial Free vs. Pro tier paywalls, file size upload barriers, daily query quotas, and function locks.
  - Set all plan permissions in `src/lib/plans.ts` to unrestricted community open-source access.
  - Replaced `/pricing` with the **Open Source & Zero-Cost Manifesto**, highlighting browser-native DuckDB-WASM and Pyodide compute advantages over expensive closed-source SaaS.
  - Replaced `/checkout` with an open-source notification informing visitors that all enterprise capabilities are 100% free and ready to use without credit cards.
  - Updated application header, dashboard, and settings meters to reflect unrestricted local WASM query capacity.
  - Added custom vector `src/components/ui/GithubIcon.tsx` for fast, zero-dependency brand rendering across SSR builds.
  - Updated all unit tests and verified full static prerendering across all 21 routes.

---

## [0.2.1] - 2026-10-28

### Added
- **Workarounds & Technical Decisions Log**: Documented all 5 core engineering workarounds in `README.md` (Vercel `.npmrc` peer dependency resolution, zero-dependency `node:test` runner, Next.js 16 Partial Prerendering `<Suspense>` boundaries, serverless WebAssembly free-tier architecture, and production TypeScript exclude rules).
- **Live Deployment Directory**: Added direct live links to all 10 production routes hosted on Vercel (`https://dataquery-eight.vercel.app`).
- **Continuous Documentation Protocol**: Established mandatory update rules across `README.md`, `CHANGELOG.md`, and `/docs` for all future enhancements.

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
