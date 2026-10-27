# API Contract Specification

DataQuery Web communicates with its backend solely through the abstraction defined in [`src/lib/api.ts`](file:///Users/akbar/.gemini/antigravity-ide/scratch/dataquery-web/src/lib/api.ts). All endpoints return JSON and use standard HTTP status codes.

---

## 1. Authentication

### `POST /api/auth/login`
Authenticates a user session or returns a demo session.

**Request:**
```json
{
  "email": "analyst@dataquery.in",
  "password": "optionalPassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "usr_94821",
    "name": "Jane Doe",
    "email": "analyst@dataquery.in",
    "plan": "free",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
  },
  "token": "dqw_jwt_mock_token_77a91"
}
```

---

## 2. Projects & Datasets

### `GET /api/projects`
Retrieves recent projects for the logged-in workspace.

**Response (200 OK):**
```json
[
  {
    "id": "proj_demo_saas",
    "title": "SaaS Churn & ARR Analysis",
    "updatedAt": "2026-10-27T14:00:00Z",
    "rowCount": 5000,
    "qualityScore": 98,
    "activeEngine": "python"
  }
]
```

### `POST /api/files/upload`
Uploads raw file metadata and processes schema profiling.

**Request (Multipart Form or JSON):**
```json
{
  "fileName": "sales_q3.csv",
  "fileSize": 1420500,
  "fileType": "text/csv"
}
```

**Response (200 OK):**
```json
{
  "datasetId": "ds_sales_891",
  "columns": [
    { "name": "order_id", "type": "string", "nullCount": 0 },
    { "name": "revenue", "type": "number", "nullCount": 2 },
    { "name": "order_date", "type": "date", "nullCount": 0 }
  ],
  "rowCount": 14200,
  "qualityScore": 96
}
```

---

## 3. Execution & Automate

### `POST /api/run`
Executes user code against the active dataset.

**Request:**
```json
{
  "datasetId": "ds_sales_891",
  "language": "python",
  "code": "df_grouped = df.groupby('region')['revenue'].sum().reset_index()"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "executionTimeMs": 34.2,
  "columns": ["region", "revenue"],
  "rows": [
    { "region": "North America", "revenue": 1450200 },
    { "region": "Europe", "revenue": 982000 }
  ],
  "stdout": "Aggregated 2 regions.\n",
  "recommendedChart": "bar"
}
```

### `POST /api/automate`
Runs a multi-step recipe pipeline on a dataset.

**Request:**
```json
{
  "datasetId": "ds_sales_891",
  "preset": "sales_summary"
}
```

**Response (200 OK):**
```json
{
  "stepsCompleted": [
    { "step": "Profile & Null Check", "status": "completed", "durationMs": 12 },
    { "step": "Revenue Trend Synthesis", "status": "completed", "durationMs": 28 },
    { "step": "Top Category Analysis", "status": "completed", "durationMs": 15 },
    { "step": "Anomaly Outlier Flagging", "status": "completed", "durationMs": 19 }
  ],
  "finalMetricSummary": {
    "totalRevenue": 2432200,
    "topCategory": "Cloud Subscriptions",
    "growthRatePct": 18.4
  }
}
```

---

## 4. Dashboards & Reports

### `GET /api/dashboards`
Retrieves user dashboards and pinned widgets.

### `POST /api/reports/generate`
Synthesizes an executive AI report with narrative and action items.

**Request:**
```json
{
  "datasetId": "ds_sales_891",
  "dashboardId": "dash_primary"
}
```

**Response (200 OK):**
```json
{
  "reportId": "rep_90214",
  "title": "Executive Performance & Growth Summary",
  "narrative": {
    "findings": [
      "Revenue expanded 18.4% month-over-month led by enterprise tiers.",
      "Customer acquisition cost decreased by 12% in the EMEA region.",
      "Churn risk is elevated in accounts with sub-30 day contract tenures."
    ],
    "recommendedActions": [
      "Deploy targeted onboarding drip campaigns to accounts under 30 days.",
      "Double down on enterprise lead allocation for Q4."
    ]
  },
  "dataQualityNotes": "Clean dataset, 0.02% imputed null values in legacy discount column."
}
```

---

## 5. AI & Usage

### `POST /api/ai/ask`
Converts natural language questions into executable code.

**Request:**
```json
{
  "question": "Show top 5 sales reps by gross margin",
  "schema": { "columns": ["rep_name", "gross_margin", "deals_closed"] },
  "language": "python"
}
```

**Response (200 OK):**
```json
{
  "generatedCode": "df.sort_values(by='gross_margin', ascending=False).head(5)",
  "explanation": "Sorted dataframe descending by gross_margin and sliced the top 5 records.",
  "recommendedChart": "bar",
  "isAIGenerated": true
}
```

### `GET /api/usage`
Returns current plan usage against tier quotas.

**Response (200 OK):**
```json
{
  "plan": "free",
  "maxFileSizeMB": 25,
  "maxRows": 100000,
  "runsToday": 14,
  "runsLimitDaily": 50,
  "aiPromptsUsed": 3,
  "aiPromptsLimitMonthly": 10,
  "dashboardsCount": 1,
  "dashboardsLimit": 2
}
```
