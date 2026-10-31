import { EssentialTool, ToolDomain } from "./types";

export const ESSENTIAL_TOOLS: EssentialTool[] = [
  // ==========================================
  // DATA SCIENTIST (Top Circle)
  // ==========================================
  {
    id: "lightgbm",
    name: "LightGBM",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Ultra-fast gradient boosting framework by Microsoft using tree-based learning algorithms.",
    iconName: "Zap",
    playgroundTab: "ml",
    primaryTags: ["Gradient Boosting", "Histogram-Based", "Fast Training", "Tabular"],
    functions: [
      {
        name: "lgb.Dataset()",
        syntax: "train_data = lgb.Dataset(X_train, label=y_train)",
        description: "Constructs memory-optimized bin histogram dataset for LightGBM training.",
        codeSnippet: `# LightGBM: Dataset Construction & Quick Fit
import lightgbm as lgb
from sklearn.model_selection import train_test_split

# Split feature matrix from current dataset
features = [c for c in dataset.columns if c not in ['target', 'churn', 'id']]
X = df[features].select_dtypes(include=['number'])
y = df['target'] if 'target' in df else (df[features[0]] > df[features[0]].median()).astype(int)

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
dtrain = lgb.Dataset(X_train, label=y_train)
dval = lgb.Dataset(X_val, label=y_val, reference=dtrain)

params = {'objective': 'binary', 'metric': 'auc', 'boosting_type': 'gbdt', 'num_leaves': 31, 'learning_rate': 0.05}
gbm = lgb.train(params, dtrain, num_boost_round=100, valid_sets=[dtrain, dval])
print(f"✓ LightGBM Best Iteration: {gbm.best_iteration} | Best Score: {gbm.best_score}")`,
        outputPreview: "LightGBM [100] valid_0's auc: 0.9412 | Training Speed: 48,200 rows/sec",
      },
      {
        name: "lgb.cv()",
        syntax: "cv_results = lgb.cv(params, train_data, num_boost_round=100, nfold=5)",
        description: "Evaluates 5-fold cross-validation performance with early stopping.",
        codeSnippet: `# LightGBM K-Fold Cross Validation
import lightgbm as lgb
cv_results = lgb.cv(
    {'objective': 'binary', 'metric': 'binary_logloss', 'learning_rate': 0.05},
    dtrain,
    num_boost_round=150,
    nfold=5,
    stratified=True,
    callbacks=[lgb.early_stopping(stopping_rounds=15)]
)
print("Logloss Mean:", cv_results['valid binary_logloss-mean'][-1])`,
        outputPreview: "5-Fold CV Mean LogLoss: 0.284 ± 0.012",
      },
      {
        name: "lgb.plot_importance()",
        syntax: "lgb.plot_importance(gbm, max_num_features=10, importance_type='gain')",
        description: "Visualizes top influential features by total split gain.",
        codeSnippet: `# LightGBM Feature Importance Plot
import lightgbm as lgb
import matplotlib.pyplot as plt

importance = gbm.feature_importance(importance_type='gain')
for feat, imp in sorted(zip(X.columns, importance), key=lambda x: x[1], reverse=True)[:5]:
    print(f"Feature: {feat:<20} Gain: {imp:.2f}")`,
        outputPreview: "1. revenue: 4210.4 | 2. age: 2980.1 | 3. visits: 1840.5",
      },
    ],
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "The AI community platform and library for state-of-the-art Transformers, LLMs, and NLP pipelines.",
    iconName: "Smile",
    playgroundTab: "ml",
    primaryTags: ["Transformers", "LLMs", "NLP", "Fine-Tuning", "Embeddings"],
    functions: [
      {
        name: "pipeline('sentiment-analysis')",
        syntax: "classifier = pipeline('sentiment-analysis', model='distilbert-base-uncased')",
        description: "Instant zero-shot inference pipeline for text sentiment classification.",
        codeSnippet: `# Hugging Face Transformers Inference Pipeline
from transformers import pipeline

nlp_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
sample_texts = [
    "This data intelligence engine reduced query latency by 80%!",
    "Encountered unexpected timeout during batch extraction."
]

predictions = nlp_pipeline(sample_texts)
for text, pred in zip(sample_texts, predictions):
    print(f"Text: '{text}' -> Label: {pred['label']}, Confidence: {pred['score']:.4f}")`,
        outputPreview: "Label: POSITIVE (0.9994) | Label: NEGATIVE (0.9871)",
      },
      {
        name: "AutoTokenizer & AutoModel",
        syntax: "tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')",
        description: "Loads pretrained model architectures and tokenizers for fine-tuning.",
        codeSnippet: `# Tokenize input sequences for transformer architecture
from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

inputs = tokenizer(["Data warehouse query optimization", "ETL pipeline orchestration"], padding=True, return_tensors="pt")
with torch.no_grad():
    embeddings = model(**inputs).last_hidden_state.mean(dim=1)
print(f"Generated Vector Embeddings Shape: {embeddings.shape}")`,
        outputPreview: "Vector Embeddings Shape: torch.Size([2, 384])",
      },
    ],
  },
  {
    id: "statsmodels",
    name: "Statsmodels",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Rigorous statistical modeling in Python with OLS regressions, ANOVA, and time series estimation.",
    iconName: "BarChart2",
    playgroundTab: "statistics",
    primaryTags: ["OLS Regression", "p-Values", "ANOVA", "Time Series", "Diagnostics"],
    functions: [
      {
        name: "sm.OLS(y, X).fit()",
        syntax: "model = sm.OLS(y, sm.add_constant(X)).fit()",
        description: "Fits ordinary least squares with full t-statistics, R-squared, and confidence intervals.",
        codeSnippet: `# Statsmodels Ordinary Least Squares (OLS)
import statsmodels.api as sm
import numpy as np

# Prepare target and design matrix with constant
y = df['revenue'] if 'revenue' in df else df[df.select_dtypes(include='number').columns[0]]
X = df.select_dtypes(include='number').drop(columns=[y.name], errors='ignore')
X = sm.add_constant(X)

ols_model = sm.OLS(y, X).fit()
print(ols_model.summary())`,
        outputPreview: "R-squared: 0.884 | F-statistic: 142.3 | Prob (F-statistic): 1.2e-28",
      },
      {
        name: "sm.tsa.seasonal_decompose()",
        syntax: "result = sm.tsa.seasonal_decompose(series, model='additive', period=12)",
        description: "Decomposes time series into observed, trend, seasonal, and residual components.",
        codeSnippet: `# Seasonal Time Series Decomposition
import statsmodels.api as sm
import pandas as pd

ts = df.set_index('date')['revenue'] if 'date' in df and 'revenue' in df else df.iloc[:, 0]
decomposition = sm.tsa.seasonal_decompose(ts.dropna(), period=7, model='additive')
print("Decomposition Trend Head:\n", decomposition.trend.dropna().head(3))`,
        outputPreview: "Decomposition: Trend + Seasonal (7-day periodic) + Residuals isolated",
      },
    ],
  },
  {
    id: "xgboost",
    name: "XGBoost",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Optimized distributed gradient boosting library designed to be highly efficient, flexible and portable.",
    iconName: "Flame",
    playgroundTab: "ml",
    primaryTags: ["Extreme Gradient Boosting", "Regularization", "Kaggle Winner", "Classification"],
    functions: [
      {
        name: "xgb.XGBClassifier()",
        syntax: "clf = xgb.XGBClassifier(n_estimators=100, max_depth=6, learning_rate=0.1)",
        description: "Trains extreme gradient boosting classifier with L1/L2 regularizers to prevent overfitting.",
        codeSnippet: `# XGBoost Extreme Gradient Boosting Classifier
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, accuracy_score

X = df.select_dtypes(include=['number']).iloc[:, :-1]
y = (df.iloc[:, -1] > df.iloc[:, -1].median()).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

model = xgb.XGBClassifier(
    n_estimators=120,
    max_depth=5,
    learning_rate=0.08,
    reg_lambda=1.5,
    eval_metric='logloss'
)
model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)
preds = model.predict(X_test)
print(f"XGBoost Test Accuracy: {accuracy_score(y_test, preds):.4f}")
print(f"XGBoost ROC-AUC: {roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]):.4f}")`,
        outputPreview: "Accuracy: 0.9320 | ROC-AUC: 0.9680 | Early Stopping Round: 84",
      },
      {
        name: "xgb.DMatrix()",
        syntax: "dtrain = xgb.DMatrix(X, label=y)",
        description: "Creates native C++ optimized matrix structure for extreme execution speed.",
        codeSnippet: `# High-Performance XGBoost Native C++ Training
import xgboost as xgb
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)
params = {'max_depth': 4, 'eta': 0.1, 'objective': 'binary:logistic'}
bst = xgb.train(params, dtrain, num_boost_round=100)
print("Trained Native XGBoost Trees:", bst.num_boosted_rounds())`,
        outputPreview: "Trained 100 boosted trees in 42ms on local CPU",
      },
    ],
  },
  {
    id: "dask",
    name: "Dask",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Flexible library for parallel computing in Python that scales Pandas and NumPy to out-of-core clusters.",
    iconName: "Share2",
    playgroundTab: "python",
    primaryTags: ["Parallel Computing", "Out-of-Core", "Pandas API", "Distributed"],
    functions: [
      {
        name: "dd.read_csv()",
        syntax: "df = dd.read_csv('s3://bigdata/*.csv', blocksize='64MB')",
        description: "Lazy parallel dataframe reader across partitioned block files.",
        codeSnippet: `# Dask Scaled Dataframe Operations
import dask.dataframe as dd
import pandas as pd

# Wrap Pandas dataset into Dask parallel partitions
ddf = dd.from_pandas(df, npartitions=4)

# Lazy aggregation DAG graph
result = ddf.groupby('category')['revenue'].agg(['mean', 'count']).compute()
print("Dask Compute Result:\n", result)`,
        outputPreview: "Lazy computation graph resolved across 4 parallel partitions",
      },
      {
        name: "dask.delayed()",
        syntax: "@dask.delayed def process_partition(chunk): ...",
        description: "Decorator for parallelizing custom imperative functions across CPU cores.",
        codeSnippet: `# Parallel Task Graphs with dask.delayed
from dask import delayed, compute

@delayed
def stage1(chunk): return chunk * 2

@delayed
def stage2(chunk): return chunk.sum()

tasks = [stage2(stage1(chunk)) for chunk in np.array_split(df.iloc[:, 0].values, 4)]
total = compute(*tasks)
print("Parallel Dask Output:", total)`,
        outputPreview: "Tasks evaluated concurrently across worker pool",
      },
    ],
  },
  {
    id: "nltk",
    name: "NLTK",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Natural Language Toolkit for symbolic and statistical text processing, tokenization, and tagging.",
    iconName: "FileText",
    playgroundTab: "python",
    primaryTags: ["NLP", "Tokenization", "Stemming", "VADER", "POS Tagging"],
    functions: [
      {
        name: "nltk.word_tokenize()",
        syntax: "tokens = nltk.word_tokenize(raw_text)",
        description: "Splits raw document text into syntactic tokens and punctuation units.",
        codeSnippet: `# NLTK Linguistic Tokenization & Stopword Removal
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

text = "DataQuery empowers analysts and data scientists with seamless high-velocity execution engines."
tokens = word_tokenize(text)
stop_words = set(stopwords.words('english')) if 'stopwords' in nltk.corpus.__dict__ else {'and', 'with', 'the'}
filtered = [w for w in tokens if w.lower() not in stop_words]
print("Tokens:", filtered)`,
        outputPreview: "['DataQuery', 'empowers', 'analysts', 'scientists', 'seamless', 'execution', 'engines']",
      },
      {
        name: "SentimentIntensityAnalyzer()",
        syntax: "sia = SentimentIntensityAnalyzer(); scores = sia.polarity_scores(text)",
        description: "Rule-based sentiment scoring (compound, positive, negative, neutral).",
        codeSnippet: `# NLTK VADER Sentiment Analysis
from nltk.sentiment.vader import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
res = sia.polarity_scores("Exceptional performance, blazing fast query speeds!")
print(f"Compound Sentiment Score: {res['compound']} (Pos: {res['pos']})")`,
        outputPreview: "Compound: 0.8271 | Positive: 0.654 | Neutral: 0.346",
      },
    ],
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Open source computer vision library for image filtering, object detection, and feature extraction.",
    iconName: "Camera",
    playgroundTab: "python",
    primaryTags: ["Computer Vision", "Image Processing", "Feature Extraction", "Edge Detection"],
    functions: [
      {
        name: "cv2.Canny()",
        syntax: "edges = cv2.Canny(image, threshold1=100, threshold2=200)",
        description: "Multi-stage edge detection algorithm to identify structural boundaries.",
        codeSnippet: `# OpenCV Edge Detection and Matrix Transformation
import numpy as np

# Simulate 2D visual matrix from numeric distribution
matrix = (df.iloc[:28, :28].select_dtypes(include='number').to_numpy() * 255).astype(np.uint8)
# Canny edge gradient computation
gx = np.diff(matrix, axis=1)
gy = np.diff(matrix, axis=0)
magnitude = np.sqrt(gx[:-1, :]**2 + gy[:, :-1]**2)
print("Computed Gradient Edge Magnitude Mean:", magnitude.mean())`,
        outputPreview: "Processed 28x28 matrix | Mean Edge Magnitude: 42.18",
      },
    ],
  },
  {
    id: "keras",
    name: "Keras",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "High-level neural networks API running on top of TensorFlow for fast prototyping and deep learning.",
    iconName: "Boxes",
    playgroundTab: "ml",
    primaryTags: ["Deep Learning", "Sequential API", "Dense Layers", "Neural Networks"],
    functions: [
      {
        name: "keras.Sequential()",
        syntax: "model = keras.Sequential([layers.Dense(64, activation='relu'), layers.Dense(1, activation='sigmoid')])",
        description: "Builds stack of neural network layers with automated backpropagation.",
        codeSnippet: `# Deep Learning MLP Classifier with Keras API
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
print("Keras Model Architecture Summary:")
model.summary()`,
        outputPreview: "Total params: 2,849 | Trainable params: 2,849 | Optimizer: Adam",
      },
    ],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Tensors and dynamic computational graphs for deep learning research and production AI deployment.",
    iconName: "Cpu",
    playgroundTab: "ml",
    primaryTags: ["Tensors", "Autograd", "Deep Learning", "Dynamic Graph", "GPU Acceleration"],
    functions: [
      {
        name: "torch.nn.Module",
        syntax: "class Net(nn.Module): def forward(self, x): return self.layers(x)",
        description: "Defines deep learning network topology with backward gradient tracking.",
        codeSnippet: `# PyTorch Neural Network Class & Autograd Loop
import torch
import torch.nn as nn
import torch.optim as optim

class TabularClassifier(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 32),
            nn.ReLU(),
            nn.Linear(32, 2)
        )
    def forward(self, x):
        return self.net(x)

model = TabularClassifier(in_features=8)
optimizer = optim.Adam(model.parameters(), lr=0.01)
criterion = nn.CrossEntropyLoss()
print("PyTorch Model Initialized with Parameters:", sum(p.numel() for p in model.parameters()))`,
        outputPreview: "Parameters: 322 | Device: Metal / CPU | Autograd: Enabled",
      },
    ],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "End-to-end open source platform for machine learning, distributed model training, and serving.",
    iconName: "Layers",
    playgroundTab: "ml",
    primaryTags: ["Machine Learning", "Tensors", "TensorBoard", "Distributed Training"],
    functions: [
      {
        name: "tf.data.Dataset",
        syntax: "ds = tf.data.Dataset.from_tensor_slices((X, y)).batch(32).prefetch(tf.data.AUTOTUNE)",
        description: "High-throughput streaming pipeline for feeding batches to accelerators.",
        codeSnippet: `# TensorFlow Data Pipeline & Model Training
import tensorflow as tf

dataset = tf.data.Dataset.from_tensor_slices((X_train.values, y_train.values))
dataset = dataset.shuffle(buffer_size=1024).batch(32).prefetch(tf.data.AUTOTUNE)

linear_model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, activation='linear')
])
linear_model.compile(optimizer='sgd', loss='mse')
print("TensorFlow Pipeline Configured with Batch Size: 32")`,
        outputPreview: "TensorFlow Graph Ready | Batches: 32 items | Autotune Prefetch: ON",
      },
    ],
  },
  {
    id: "scikit_learn",
    name: "Scikit-Learn",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "Gold standard Python library for predictive data analysis, pipelines, estimators, and metrics.",
    iconName: "Boxes",
    playgroundTab: "ml",
    primaryTags: ["Pipelines", "RandomForest", "GridSearchCV", "Model Evaluation"],
    functions: [
      {
        name: "Pipeline & ColumnTransformer",
        syntax: "pipe = Pipeline([('scaler', StandardScaler()), ('rf', RandomForestClassifier())])",
        description: "Encapsulates feature preprocessing and model training to eliminate data leakage.",
        codeSnippet: `# Scikit-Learn Leak-Proof Pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42))
])

pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
print(classification_report(y_test, y_pred))`,
        outputPreview: "Precision: 0.92 | Recall: 0.90 | F1-Score: 0.91 | Support: 150",
      },
    ],
  },
  {
    id: "matlab",
    name: "MATLAB",
    category: "Data Scientist",
    domain: "data_scientist",
    description: "High-level matrix manipulation, numeric computation, and algorithm simulation environment.",
    iconName: "Calculator",
    playgroundTab: "statistics",
    primaryTags: ["Matrix Algebra", "Signal Processing", "Numerical Analysis", "Simulation"],
    functions: [
      {
        name: "fitlm() & PCA Matrix",
        syntax: "mdl = fitlm(tbl, 'revenue ~ visits + spend'); coeff = pca(X);",
        description: "Fits multivariate linear regression model and computes principal components.",
        codeSnippet: `# Simulated MATLAB Matrix Math & Eigen Decomposition
import numpy as np

# Covariance and Eigenvalue Decomposition (Equivalent to MATLAB eig())
cov_mat = np.cov(X.T)
eigen_vals, eigen_vecs = np.linalg.eig(cov_mat)
print(f"Top Eigenvalue (Variance Explained): {eigen_vals[0]:.4f}")
print("MATLAB Equivalent: [V, D] = eig(cov(X))")`,
        outputPreview: "Top Eigenvalue: 184.2 | MATLAB Matrix Dimension: [8x8]",
      },
    ],
  },

  // ==========================================
  // DATA ANALYST (Bottom-Left Circle)
  // ==========================================
  {
    id: "google_analytics",
    name: "Google Analytics",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Web and app measurement platform providing visitor event tracking, sessions, and funnel funnels.",
    iconName: "TrendingUp",
    playgroundTab: "sql",
    primaryTags: ["GA4 Events", "Funnels", "Conversion Rate", "Attribution"],
    functions: [
      {
        name: "GA4 Event Funnel Query",
        syntax: "SELECT event_name, COUNT(DISTINCT user_pseudo_id) FROM ga4_events GROUP BY 1",
        description: "Calculates stage-by-stage user drop-off across marketing conversion funnels.",
        codeSnippet: `-- Google Analytics 4: Conversion Funnel Analysis
SELECT 
  event_name,
  COUNT(DISTINCT user_pseudo_id) AS unique_visitors,
  ROUND(COUNT(DISTINCT user_pseudo_id) * 100.0 / FIRST_VALUE(COUNT(DISTINCT user_pseudo_id)) OVER (ORDER BY stage_order), 2) AS funnel_conversion_pct
FROM (
  SELECT 'page_view' AS event_name, 1 AS stage_order, user_id AS user_pseudo_id FROM dataset
  UNION ALL
  SELECT 'view_item' AS event_name, 2 AS stage_order, user_id FROM dataset WHERE revenue > 20
  UNION ALL
  SELECT 'purchase' AS event_name, 3 AS stage_order, user_id FROM dataset WHERE revenue > 80
)
GROUP BY event_name, stage_order
ORDER BY stage_order;`,
        outputPreview: "page_view: 100% -> view_item: 64.2% -> purchase: 18.7%",
      },
    ],
  },
  {
    id: "tableau",
    name: "Tableau",
    category: "All Disciplines",
    domain: "all_three",
    description: "Leading enterprise visual analytics platform for Level-of-Detail (LOD) calculations and storytelling.",
    iconName: "BarChart3",
    playgroundTab: "dax",
    primaryTags: ["LOD Expressions", "Dashboards", "Visual Analytics", "Parameters"],
    functions: [
      {
        name: "LOD {FIXED : } Calculation",
        syntax: "{ FIXED [Region] : AVG([Sales]) }",
        description: "Computes aggregates at an independent dimension grain separate from the visualization shelf.",
        codeSnippet: `-- Tableau Level of Detail (LOD) Emulation in SQL / DAX
SELECT 
  region,
  category,
  revenue,
  AVG(revenue) OVER(PARTITION BY region) AS fixed_region_avg_revenue,
  revenue - AVG(revenue) OVER(PARTITION BY region) AS variance_from_regional_benchmark
FROM dataset
ORDER BY region, revenue DESC;`,
        outputPreview: "Calculated {FIXED [Region] : AVG([Revenue])} across 5 regions",
      },
    ],
  },
  {
    id: "power_bi",
    name: "Power BI",
    category: "All Disciplines",
    domain: "all_three",
    description: "Business analytics service by Microsoft with DAX tabular modeling and interactive reporting.",
    iconName: "PieChart",
    playgroundTab: "dax",
    primaryTags: ["DAX Measures", "Time Intelligence", "Relationships", "Star Schema"],
    functions: [
      {
        name: "CALCULATE & Time Intelligence",
        syntax: "Total Sales YTD = CALCULATE(SUM(Sales[Amount]), DATESYTD(Calendar[Date]))",
        description: "Modifies filter context to evaluate year-to-date cumulative KPIs.",
        codeSnippet: `-- Power BI DAX Tabular Measure
Total Revenue = SUM(Sales[revenue])

Revenue YoY Growth % = 
VAR CurrentRevenue = [Total Revenue]
VAR PriorYearRevenue = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
DIVIDE(CurrentRevenue - PriorYearRevenue, PriorYearRevenue, 0)`,
        outputPreview: "Evaluated in DAX tabular engine | Filter Context: Multi-tenant",
      },
    ],
  },
  {
    id: "alteryx",
    name: "Alteryx",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Self-service data preparation, spatial blending, and automated analytics workflow builder.",
    iconName: "Workflow",
    playgroundTab: "python",
    primaryTags: ["Data Prep", "ETL Blend", "Spatial Analysis", "No-Code Workflows"],
    functions: [
      {
        name: "Blend & Formula Transform",
        syntax: "DateTimeFormat([Date], '%Y-%m') & SpatialMatch(Point, Polygon)",
        description: "Standardizes disparate data sources into a cleansed enterprise analytic dataset.",
        codeSnippet: `# Alteryx Data Preparation & Blending Workflow Simulation
import pandas as pd

# 1. Input Data & Type Conversion
cleaned_df = df.copy()
# 2. Formula Tool: Clean String & Derive Margin
if 'revenue' in cleaned_df and 'cost' in cleaned_df:
    cleaned_df['gross_margin'] = cleaned_df['revenue'] - cleaned_df['cost']
    cleaned_df['margin_pct'] = (cleaned_df['gross_margin'] / cleaned_df['revenue']).round(4)

# 3. Summarize Tool: Group by Segment
summary = cleaned_df.groupby('category').agg({'revenue': 'sum', 'margin_pct': 'mean'})
print("Alteryx Cleaned Summary:\n", summary)`,
        outputPreview: "Blended 2 inputs | Handled 0 nulls | Derived 2 calculated fields",
      },
    ],
  },
  {
    id: "power_query",
    name: "Microsoft Power Query",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "M-code data connection and transformation engine powering Excel and Power BI data models.",
    iconName: "SlidersHorizontal",
    playgroundTab: "dax",
    primaryTags: ["M Language", "ETL", "Column Unpivot", "Data Cleansing"],
    functions: [
      {
        name: "Table.TransformColumnTypes()",
        syntax: "Table.TransformColumnTypes(Source, {{'Revenue', Currency.Type}, {'Date', type date}})",
        description: "Explicitly casts columns in Power Query M specification.",
        codeSnippet: `// Power Query M Formula
let
    Source = Csv.Document(File.Contents("C:\\Data\\sales.csv"),[Delimiter=",", Columns=6, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"revenue", Currency.Type}, {"date", type date}}),
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [revenue] > 0)
in
    #"Filtered Rows"`,
        outputPreview: "M-Query executed: Applied 4 transformation steps",
      },
    ],
  },
  {
    id: "looker_studio",
    name: "Google Data Studio",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Web-based dashboard tool (now Looker Studio) for connecting BigQuery, GA4, and Google Sheets.",
    iconName: "Layout",
    playgroundTab: "sql",
    primaryTags: ["Scorecards", "BigQuery Connector", "Blended Data", "Web Reports"],
    functions: [
      {
        name: "Blended Metric Expression",
        syntax: "CASE WHEN Spend > 0 THEN Revenue / Spend ELSE 0 END",
        description: "Calculates blended ROAS across Google Ads and CRM purchase tables.",
        codeSnippet: `-- Google Looker Studio: Calculated Field Expression
SELECT
  channel,
  SUM(spend) AS total_ad_spend,
  SUM(revenue) AS total_attributed_revenue,
  SAFE_DIVIDE(SUM(revenue), SUM(spend)) AS return_on_ad_spend_roas,
  CASE 
    WHEN SAFE_DIVIDE(SUM(revenue), SUM(spend)) >= 4.0 THEN 'High Performer'
    WHEN SAFE_DIVIDE(SUM(revenue), SUM(spend)) >= 2.0 THEN 'Healthy'
    ELSE 'Needs Optimization'
  END AS campaign_efficiency_status
FROM dataset
GROUP BY channel;`,
        outputPreview: "ROAS evaluated: Paid Search 4.8x (High Performer) | Social 2.3x (Healthy)",
      },
    ],
  },
  {
    id: "sas",
    name: "SAS",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Statistical Analysis System for clinical trials, risk modeling, and advanced business analytics.",
    iconName: "ShieldCheck",
    playgroundTab: "statistics",
    primaryTags: ["PROC REG", "PROC MEANS", "Risk Scoring", "Enterprise Analytics"],
    functions: [
      {
        name: "PROC MEANS & PROC REG",
        syntax: "proc means data=work.sales n mean std min max; var revenue; run;",
        description: "Executes parametric summary and regression procedures in SAS syntax.",
        codeSnippet: `/* SAS Analytical Procedure Simulation */
PROC MEANS DATA=WORK.DATASET N MEAN STD MIN MAX;
   VAR revenue profit_margin;
   CLASS region;
RUN;

PROC REG DATA=WORK.DATASET;
   MODEL revenue = marketing_spend customer_age / VIF;
RUN;
QUIT;`,
        outputPreview: "SAS Output: F-value 89.2 | Pr > F < .0001 | No Collinearity (VIF < 2.1)",
      },
    ],
  },
  {
    id: "qlik_sense",
    name: "Qlik Sense",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Associative analytics engine uncovering data relationships across multiple dimensions in memory.",
    iconName: "Network",
    playgroundTab: "dax",
    primaryTags: ["Associative Engine", "Set Analysis", "Aggr()", "Green-White-Gray"],
    functions: [
      {
        name: "Set Analysis: Sum({<Year=...>} Sales)",
        syntax: "Sum({<Year={$(=Max(Year))}, Country={'USA'}>} Sales)",
        description: "Filters aggregate expressions independently of active user selections.",
        codeSnippet: `-- Qlik Associative In-Memory Calculation Simulation
SELECT 
  category,
  SUM(revenue) AS total_sales,
  SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL 30 DAY THEN revenue ELSE 0 END) AS set_sales_last_30_days,
  ROUND(SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL 30 DAY THEN revenue ELSE 0 END) * 100.0 / NULLIF(SUM(revenue), 0), 2) AS momentum_pct
FROM dataset
GROUP BY category;`,
        outputPreview: "Associative indexing active | Evaluated 18,400 data points in 3ms",
      },
    ],
  },
  {
    id: "thoughtspot",
    name: "ThoughtSpot",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Search & AI-driven analytics platform that turns natural language questions into instant live SQL queries.",
    iconName: "Search",
    playgroundTab: "sql",
    primaryTags: ["Search Analytics", "Natural Language Query", "SpotIQ", "Live-Analytics"],
    functions: [
      {
        name: "Search-to-SQL & SpotIQ Insights",
        syntax: "search: 'top 5 regions by monthly sales growth rate'",
        description: "Auto-translates human analytical intent into optimized push-down SQL queries.",
        codeSnippet: `-- ThoughtSpot Search-to-SQL Generated Query
SELECT 
  region,
  DATE_TRUNC('month', order_date) AS order_month,
  SUM(revenue) AS monthly_sales,
  (SUM(revenue) - LAG(SUM(revenue)) OVER (PARTITION BY region ORDER BY DATE_TRUNC('month', order_date)))
    * 100.0 / NULLIF(LAG(SUM(revenue)) OVER (PARTITION BY region ORDER BY DATE_TRUNC('month', order_date)), 0) AS mom_growth_rate
FROM dataset
GROUP BY 1, 2
QUALIFY mom_growth_rate IS NOT NULL
ORDER BY mom_growth_rate DESC
LIMIT 5;`,
        outputPreview: "ThoughtSpot Live Query generated in 8ms -> Rendered Pareto Chart",
      },
    ],
  },
  {
    id: "looker",
    name: "Looker",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Modern BI platform built around LookML for centralized, version-controlled semantic data modeling.",
    iconName: "Eye",
    playgroundTab: "sql",
    primaryTags: ["LookML", "Semantic Layer", "Git Versioning", "Derived Tables"],
    functions: [
      {
        name: "LookML Dimension & Measure Definition",
        syntax: "measure: total_revenue { type: sum sql: ${TABLE}.revenue ;; }",
        description: "Creates centralized definitions that compile to optimized SQL dialects.",
        codeSnippet: `# LookML Semantic Modeling Definition
view: order_items {
  sql_table_name: public.order_items ;;

  dimension: id {
    primary_key: yes
    type: number
    sql: \${TABLE}.id ;;
  }

  dimension_group: created {
    type: time
    timeframes: [raw, time, date, week, month, quarter, year]
    sql: \${TABLE}.created_at ;;
  }

  measure: total_revenue {
    type: sum
    sql: \${TABLE}.sale_price ;;
    value_format_name: usd
  }
}`,
        outputPreview: "LookML Model Compiled -> Generated 100% DRY SQL Query",
      },
    ],
  },
  {
    id: "spss",
    name: "SPSS",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Statistical software suite by IBM for survey data, factor analysis, and parametric hypothesis testing.",
    iconName: "FileSpreadsheet",
    playgroundTab: "statistics",
    primaryTags: ["Survey Analytics", "Crosstabs", "T-Tests", "Factor Analysis"],
    functions: [
      {
        name: "CROSSTABS & T-TEST",
        syntax: "T-TEST GROUPS=treatment(0 1) /VARIABLES=satisfaction_score.",
        description: "Executes contingency table analysis and independent samples Student's t-test.",
        codeSnippet: `# IBM SPSS Analytical Command Simulation
* Compare Means: Independent Samples T-Test.
T-TEST GROUPS=group(1 2)
  /VARIABLES=revenue
  /CRITERIA=CI(.95).

* Crosstabs Chi-Square Test.
CROSSTABS
  /TABLES=category BY churn_status
  /STATISTICS=CHISQ.`,
        outputPreview: "t-value: 3.412 | df: 198 | Sig. (2-tailed): 0.0008 | Result: Significant",
      },
    ],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Data Analyst",
    domain: "data_analyst",
    description: "Product and event analytics platform for cohort retention, funnel conversions, and user journey flows.",
    iconName: "Compass",
    playgroundTab: "sql",
    primaryTags: ["Product Analytics", "Retention Curves", "User Cohorts", "Event Streams"],
    functions: [
      {
        name: "Cohort Retention & Churn Curve",
        syntax: "mixpanel.track('Feature Clicked'); calculate_n_day_retention()",
        description: "Measures percentage of users returning N-days after onboarding.",
        codeSnippet: `-- Mixpanel Cohort Retention SQL Simulation
WITH first_seen AS (
  SELECT user_id, MIN(DATE(signup_date)) AS cohort_date
  FROM dataset
  GROUP BY user_id
)
SELECT 
  DATE_TRUNC('month', f.cohort_date) AS cohort_month,
  COUNT(DISTINCT f.user_id) AS cohort_size,
  COUNT(DISTINCT CASE WHEN d.date BETWEEN f.cohort_date + 1 AND f.cohort_date + 7 THEN d.user_id END) * 100.0 / COUNT(DISTINCT f.user_id) AS d7_retention_pct,
  COUNT(DISTINCT CASE WHEN d.date BETWEEN f.cohort_date + 8 AND f.cohort_date + 30 THEN d.user_id END) * 100.0 / COUNT(DISTINCT f.user_id) AS d30_retention_pct
FROM first_seen f
JOIN dataset d ON f.user_id = d.user_id
GROUP BY 1
ORDER BY 1;`,
        outputPreview: "Cohort 2026-09: 1,420 users | D7: 48.2% | D30: 24.6% retention",
      },
    ],
  },

  // ==========================================
  // DATA ENGINEER (Bottom-Right Circle)
  // ==========================================
  {
    id: "airflow",
    name: "Airflow",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Apache Airflow platform to programmatically author, schedule, and monitor data processing DAGs.",
    iconName: "Wind",
    playgroundTab: "pyspark",
    primaryTags: ["DAG Orchestration", "Python Tasks", "Cron Schedules", "Task Dependencies"],
    functions: [
      {
        name: "@dag Orchestration & Task Dependencies",
        syntax: "extract_task >> transform_task >> load_task",
        description: "Defines directed acyclic graphs with retries, alerts, and execution pools.",
        codeSnippet: `# Apache Airflow 2.0 TaskFlow API DAG
from airflow.decorators import dag, task
from datetime import datetime, timedelta

@dag(
    schedule_interval="@daily",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    default_args={"retries": 3, "retry_delay": timedelta(minutes=5)}
)
def enterprise_lakehouse_pipeline():
    @task
    def extract_raw_events():
        print("Extracted 250,000 events from S3 bucket.")
        return "/tmp/raw_events.parquet"

    @task
    def spark_transform(input_path: str):
        print(f"Executing PySpark Catalyst normalization on {input_path}")
        return "/tmp/curated_events.parquet"

    @task
    def snowflake_load(curated_path: str):
        print(f"Executed COPY INTO Snowflake analytical mart from {curated_path}")

    raw = extract_raw_events()
    curated = spark_transform(raw)
    snowflake_load(curated)

pipeline = enterprise_lakehouse_pipeline()`,
        outputPreview: "DAG compiled successfully: 3 tasks [extract >> transform >> load]",
      },
    ],
  },
  {
    id: "kafka",
    name: "Kafka",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Distributed event streaming platform for high-throughput, fault-tolerant real-time pub/sub pipelines.",
    iconName: "Activity",
    playgroundTab: "pyspark",
    primaryTags: ["Streaming", "Pub/Sub", "Event Broker", "Low Latency"],
    functions: [
      {
        name: "Kafka Producer & Consumer Topic",
        syntax: "producer.send('telemetry_events', key=b'sensor_01', value=payload)",
        description: "Streams partitioned JSON or Avro events with millisecond broker latency.",
        codeSnippet: `# Apache Kafka Producer & Spark Structured Streaming Integration
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Stream 5 telemetry events into topic
for idx, row in df.head(5).iterrows():
    payload = {'id': row.get('id', idx), 'revenue': float(row.get('revenue', 100)), 'timestamp': '2026-10-30T19:00:00Z'}
    producer.send('dataquery_telemetry', key=str(idx).encode('utf-8'), value=payload)

producer.flush()
print("Dispatched 5 records to Kafka topic 'dataquery_telemetry' at partition 0")`,
        outputPreview: "5 messages published | Latency: 2.1ms | Partition Offset: 489,102",
      },
    ],
  },
  {
    id: "aws_redshift",
    name: "AWS Redshift",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Fast, petabyte-scale cloud data warehouse with columnar storage and massively parallel processing (MPP).",
    iconName: "Database",
    playgroundTab: "sql",
    primaryTags: ["Cloud Warehouse", "MPP", "DistKey & SortKey", "Columnar"],
    functions: [
      {
        name: "COPY & DISTKEY Table Definition",
        syntax: "CREATE TABLE sales (...) DISTKEY(account_id) SORTKEY(order_date);",
        description: "Optimizes parallel slice distribution and disk block pruning in Amazon Redshift.",
        codeSnippet: `-- Amazon Redshift Cloud MPP Warehouse DDL & Ingestion
CREATE TABLE IF NOT EXISTS analytics.fct_sales (
  order_id BIGINT NOT NULL,
  customer_id BIGINT NOT NULL,
  order_date DATE NOT NULL,
  revenue NUMERIC(14, 2),
  margin NUMERIC(8, 4)
)
DISTSTYLE KEY
DISTKEY(customer_id)
COMPOUND SORTKEY(order_date, customer_id);

-- High-Speed Parallel S3 Ingestion
COPY analytics.fct_sales
FROM 's3://enterprise-lakehouse-prod/sales/year=2026/'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftS3ReadRole'
FORMAT AS PARQUET;`,
        outputPreview: "Table created with DISTKEY(customer_id) | Parquet COPY: 1.2M rows loaded",
      },
    ],
  },
  {
    id: "trino",
    name: "Trino",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Fast distributed SQL query engine (formerly PrestoSQL) for federated analytics across lakes and databases.",
    iconName: "Zap",
    playgroundTab: "sql",
    primaryTags: ["Federated SQL", "Lakehouse", "Zero-ETL", "Interactive Query"],
    functions: [
      {
        name: "Cross-Catalog Federated Join",
        syntax: "SELECT * FROM hive.lake.orders JOIN postgres.crm.users ON ...",
        description: "Queries disparate storage engines in a single ANSI SQL statement without data duplication.",
        codeSnippet: `-- Trino Federated SQL Cross-Catalog Join
SELECT 
  lake.user_id,
  crm.customer_segment,
  COUNT(lake.order_id) AS total_orders,
  ROUND(SUM(lake.amount), 2) AS lifetime_value
FROM hive_datalake.events.orders lake
JOIN postgresql_prod.public.customers crm 
  ON lake.user_id = crm.id
WHERE lake.event_date >= DATE '2026-01-01'
GROUP BY 1, 2
ORDER BY lifetime_value DESC
LIMIT 10;`,
        outputPreview: "Federated 2 catalogs (Hive Parquet + Postgres) in 280ms",
      },
    ],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Cloud data platform separating storage and compute with zero-copy cloning, time travel, and data shares.",
    iconName: "Cloud",
    playgroundTab: "sql",
    primaryTags: ["Virtual Warehouses", "Time Travel", "Zero-Copy Clone", "Snowpark"],
    functions: [
      {
        name: "Time Travel & Zero-Copy Clone",
        syntax: "CREATE TABLE dev_orders CLONE prod_orders AT(OFFSET => -60*15);",
        description: "Instantly clones multi-terabyte production tables without physical data duplication.",
        codeSnippet: `-- Snowflake Cloud Data Platform Operations
USE WAREHOUSE COMPUTE_WH;
USE DATABASE ANALYTICS;

-- Zero-Copy Clone of Production Table
CREATE OR REPLACE TABLE ANALYTICS.DEV.FCT_ORDERS_CLONE
CLONE ANALYTICS.PROD.FCT_ORDERS;

-- Query Historical Snapshot using Time Travel
SELECT COUNT(*) AS rows_before_accidental_update
FROM ANALYTICS.PROD.FCT_ORDERS
BEFORE(OFFSET => -60*30);`,
        outputPreview: "Zero-copy clone created in 82ms with 0 additional storage cost",
      },
    ],
  },
  {
    id: "presto",
    name: "Presto",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Distributed SQL engine designed to run fast analytic queries against petabytes of data lake storage.",
    iconName: "Terminal",
    playgroundTab: "sql",
    primaryTags: ["Distributed Query", "ANSI SQL", "HDFS Queries", "In-Memory"],
    functions: [
      {
        name: "Distributed Approximate Distincts",
        syntax: "SELECT approx_distinct(user_id, 0.01) FROM lake_logs",
        description: "Executes HyperLogLog algorithms for sub-second distinct counts across billions of rows.",
        codeSnippet: `-- Presto Distributed HyperLogLog Query
SELECT 
  DATE_TRUNC('day', timestamp) AS active_day,
  APPROX_DISTINCT(user_id, 0.01) AS approx_daily_active_users,
  COUNT(1) AS total_events
FROM iceberg.analytics.page_impressions
GROUP BY 1
ORDER BY 1 DESC;`,
        outputPreview: "HyperLogLog evaluated across 48 Presto worker nodes in 140ms",
      },
    ],
  },
  {
    id: "cassandra",
    name: "Apache Cassandra",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Highly scalable, distributed NoSQL database designed for linear scalability and fault-tolerant writes.",
    iconName: "Server",
    playgroundTab: "sql",
    primaryTags: ["NoSQL", "CQL", "Linear Scaling", "Masterless", "Time-Series"],
    functions: [
      {
        name: "CQL Partition & Clustering Keys",
        syntax: "CREATE TABLE sessions (user_id uuid, session_id timeuuid, PRIMARY KEY (user_id, session_id))",
        description: "Defines physical hash token distribution and on-disk sorting keys in Cassandra.",
        codeSnippet: `-- Apache Cassandra CQL Schema Definition
CREATE KEYSPACE enterprise_stream 
WITH replication = {'class': 'NetworkTopologyStrategy', 'us-east-1': 3, 'eu-west-1': 3};

CREATE TABLE enterprise_stream.user_telemetry (
  tenant_id UUID,
  device_id TEXT,
  recorded_at TIMESTAMP,
  cpu_utilization DOUBLE,
  memory_bytes BIGINT,
  PRIMARY KEY ((tenant_id, device_id), recorded_at)
) WITH CLUSTERING ORDER BY (recorded_at DESC);`,
        outputPreview: "Keyspace & Partitioned CQL Table created with write quorum = LOCAL_QUORUM",
      },
    ],
  },
  {
    id: "informatica",
    name: "Informatica",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Enterprise data integration and governance platform for large-scale enterprise ETL and master data management.",
    iconName: "Network",
    playgroundTab: "pyspark",
    primaryTags: ["Enterprise ETL", "Data Governance", "PowerCenter", "MDM"],
    functions: [
      {
        name: "PowerCenter Mapping Pipeline",
        syntax: "SourceQualifier -> ExpressionTransformation -> LookupTransformation -> Target",
        description: "Enterprise graphical and metadata-driven ETL mapping pipeline.",
        codeSnippet: `# Informatica Intelligent Cloud Services (IICS) Pipeline Simulation
# Mapping: Source (Oracle ERP) -> Expression (Standardize) -> Target (Snowflake)
def informatica_mapping_pipeline(source_df):
    # 1. Source Qualifier Extraction
    print("Informatica Source Qualifier: Read from ERP")
    # 2. Expression Transformation: Hash PII & Calculate Delta
    transformed = source_df.copy()
    transformed['status_code'] = 'ACTIVE'
    # 3. Router Transformation: Split Valid vs Exception records
    valid_records = transformed[transformed.notnull().all(axis=1)]
    print(f"Informatica Target Load: Upserted {len(valid_records)} rows into Analytical Warehouse")
    return valid_records

informatica_mapping_pipeline(df.head(10))`,
        outputPreview: "Informatica Session Task: SUCCEEDED | 10 rows loaded with 0 reject count",
      },
    ],
  },
  {
    id: "flink",
    name: "Flink",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Apache Flink stateful stream processing engine for event-driven real-time pipelines and low latency analytics.",
    iconName: "Zap",
    playgroundTab: "pyspark",
    primaryTags: ["Stream Processing", "Event Time", "Tumbling Windows", "Stateful"],
    functions: [
      {
        name: "Tumbling Event-Time Window",
        syntax: "stream.key_by(lambda x: x.user_id).window(TumblingEventTimeWindows.of(Time.seconds(10)))",
        description: "Aggregates streaming events over watermarked, sliding or tumbling intervals.",
        codeSnippet: `# Apache Flink Stateful Stream Windowing Simulation
from datetime import datetime

# Simulate event-time stream windowing over 10-second tumbling intervals
def flink_tumbling_window_processor(events, window_seconds=10):
    print("Flink Streaming Execution Environment: RocksDB StateBackend Active")
    grouped_windows = {}
    for ev in events:
        window_bucket = ev['timestamp'] // window_seconds
        grouped_windows.setdefault(window_bucket, []).append(ev['amount'])
    
    for window_id, values in grouped_windows.items():
        print(f"Window [{window_id * 10}s - {(window_id + 1) * 10}s] -> Sum: {sum(values):.2f}, Count: {len(values)}")

sample_events = [{'timestamp': 1, 'amount': 45.0}, {'timestamp': 6, 'amount': 55.0}, {'timestamp': 12, 'amount': 90.0}]
flink_tumbling_window_processor(sample_events)`,
        outputPreview: "Flink Watermark: Exact once state semantics | Latency: 4ms",
      },
    ],
  },
  {
    id: "nifi",
    name: "Apache NiFi",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Visual dataflow system for automated, real-time ingestion, provenance tracking, and data routing.",
    iconName: "Workflow",
    playgroundTab: "hadoop",
    primaryTags: ["FlowFiles", "Data Ingestion", "Provenance", "Visual Pipelines"],
    functions: [
      {
        name: "FlowFile Routing & Conversion",
        syntax: "GetHTTP -> ConvertRecord(CSV to Parquet) -> PutHDFS",
        description: "Ingests raw edge streams and converts them into optimized columnar lake formats.",
        codeSnippet: `# Apache NiFi Dataflow Processor Simulation
flow_file = {
    'attributes': {'filename': 'sensor_logs.csv', 'mime.type': 'text/csv'},
    'content_size_bytes': 1048576,
    'provenance_id': 'nifi-flow-9481a-uuid'
}

print(f"NiFi Processor: [ConvertRecord] Converted FlowFile {flow_file['provenance_id']} to Parquet")
print("NiFi Processor: [PutHDFS] Written to hdfs://nameservice1/lake/raw/sensor_logs.parquet")`,
        outputPreview: "FlowFile routed to 'success' relationship | Provenance lineage logged",
      },
    ],
  },
  {
    id: "talend",
    name: "Talend",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Open source data integration software providing graphical code generation for big data and ETL pipelines.",
    iconName: "Share2",
    playgroundTab: "pyspark",
    primaryTags: ["Code Generation", "tMap", "Big Data Batch", "Data Quality"],
    functions: [
      {
        name: "tMap Join & Transformation",
        syntax: "tMap: lookup table inner join, schema mapping, and null expression filters",
        description: "Visually maps and transforms heterogeneous database columns.",
        codeSnippet: `# Talend tMap Code Generation Simulation (Java / Python)
def talend_tmap_transform(main_feed, lookup_feed):
    print("Talend Component: [tFileInputDelimited] Read 500 rows")
    print("Talend Component: [tMap] Joined main_feed with lookup_feed on customer_id")
    merged = main_feed.merge(lookup_feed, on='customer_id', how='left') if 'customer_id' in main_feed and 'customer_id' in lookup_feed else main_feed
    print(f"Talend Component: [tFileOutputParquet] Committed {len(merged)} transformed records")
    return merged

talend_tmap_transform(df.head(5), df.head(5))`,
        outputPreview: "Talend Job: 0 errors | Execution Time: 0.12s",
      },
    ],
  },
  {
    id: "azure_data_factory",
    name: "Azure Data Factory",
    category: "Data Engineer",
    domain: "data_engineer",
    description: "Cloud-based data integration service (ADF) for orchestrating automated data movement and transforms.",
    iconName: "CloudRain",
    playgroundTab: "pyspark",
    primaryTags: ["Azure Synapse", "Copy Activity", "Data Flows", "Event Triggers"],
    functions: [
      {
        name: "Copy Activity & Mapping Data Flow",
        syntax: "ADF Pipeline: AzureBlobStorage -> CopyActivity -> AzureSynapseAnalytics",
        description: "Serverless data movement and cloud-scale Apache Spark transformation graphs.",
        codeSnippet: `# Azure Data Factory (ADF) JSON Pipeline Definition
{
  "name": "Pipeline_Ingest_To_Synapse",
  "properties": {
    "activities": [
      {
        "name": "CopyBlobToSynapse",
        "type": "Copy",
        "inputs": [{ "referenceName": "SourceBlobDataset", "type": "DatasetReference" }],
        "outputs": [{ "referenceName": "TargetSynapseTable", "type": "DatasetReference" }],
        "typeProperties": {
          "source": { "type": "DelimitedTextSource" },
          "sink": { "type": "SqlDWSink", "allowPolyBase": true }
        }
      }
    ]
  }
}`,
        outputPreview: "ADF Pipeline Trigger: Triggered by BlobCreated event | Status: InProgress",
      },
    ],
  },

  // ==========================================
  // INTERSECTION: DATA SCIENTIST & DATA ANALYST
  // ==========================================
  {
    id: "excel",
    name: "Excel",
    category: "DS & DA",
    domain: "ds_da",
    description: "Ubiquitous spreadsheet tool for financial modeling, pivot tables, VLOOKUP, and rapid tabular analysis.",
    iconName: "FileSpreadsheet",
    playgroundTab: "sql",
    primaryTags: ["Spreadsheets", "Pivot Tables", "VLOOKUP", "XLOOKUP", "Formulas"],
    functions: [
      {
        name: "XLOOKUP & Pivot Aggregations",
        syntax: "=XLOOKUP(lookup_val, lookup_range, return_range, [if_not_found])",
        description: "Modern, resilient replacement for VLOOKUP and INDEX(MATCH) without column count limitations.",
        codeSnippet: `-- Excel Pivot Table & XLOOKUP Equivalent in SQL
SELECT 
  category,
  region,
  COUNT(*) AS total_transactions,
  ROUND(SUM(revenue), 2) AS sum_revenue,
  ROUND(AVG(revenue), 2) AS average_order_value
FROM dataset
GROUP BY category, region
ORDER BY category, sum_revenue DESC;`,
        outputPreview: "Pivot Table generated with row and column totals",
      },
    ],
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "DS & DA",
    domain: "ds_da",
    description: "Interactive web notebook environment combining live executable code, equations, and rich visualizations.",
    iconName: "BookOpen",
    playgroundTab: "python",
    primaryTags: ["Interactive Python", "Markdown", "Matplotlib", "Exploratory Data Analysis"],
    functions: [
      {
        name: "Interactive Cell EDA & %timeit",
        syntax: "%timeit df['revenue'].apply(lambda x: x * 1.18)",
        description: "Executes micro-benchmarks and interactive visualizations in notebook cells.",
        codeSnippet: `# Jupyter Interactive Cell Exploration
import pandas as pd
import numpy as np

# Fast descriptive profiling
print("--- Dataset Shape & Info ---")
print(f"Rows: {df.shape[0]} | Columns: {df.shape[1]}")
display_cols = df.columns[:5].tolist()
print(f"First Columns: {display_cols}")
print("\n--- Five-Number Summary ---")
print(df.describe().T[['mean', 'std', 'min', '50%', 'max']])`,
        outputPreview: "Evaluated in Jupyter Kernel 3.11 | Executed in 12ms",
      },
    ],
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "DS & DA",
    domain: "ds_da",
    description: "The primary Python library for data manipulation, cleaning, reshaping, and time series handling.",
    iconName: "Table",
    playgroundTab: "python",
    primaryTags: ["DataFrame", "GroupBy", "Pivots", "Merge", "Data Cleaning"],
    functions: [
      {
        name: "df.groupby().agg() & Windowing",
        syntax: "df.groupby('category').agg({'revenue': ['sum', 'mean'], 'id': 'count'})",
        description: "Performs multi-key aggregations and statistical summaries across partitions.",
        codeSnippet: `# Pandas Advanced Aggregation & Transformations
import pandas as pd

# Multi-metric group summary with rank windowing
agg_df = df.groupby('category').agg(
    total_revenue=('revenue', 'sum'),
    avg_ticket=('revenue', 'mean'),
    volume=('revenue', 'count')
).reset_index()

agg_df['revenue_rank'] = agg_df['total_revenue'].rank(ascending=False).astype(int)
print(agg_df.sort_values('revenue_rank'))`,
        outputPreview: "Transformed DataFrame: 5 groups evaluated with ranks and means",
      },
      {
        name: "pd.pivot_table()",
        syntax: "pd.pivot_table(df, values='revenue', index='region', columns='category', aggfunc='sum', fill_value=0)",
        description: "Reshapes tabular data into multi-dimensional matrix grids.",
        codeSnippet: `# Pivot Table Reshaping in Pandas
pivot = pd.pivot_table(
    df,
    values='revenue',
    index='region',
    columns='category',
    aggfunc='sum',
    fill_value=0
)
print("Reshaped Pivot Matrix:\n", pivot)`,
        outputPreview: "Matrix: Regions (rows) x Categories (columns) with filled zeros",
      },
    ],
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "DS & DA",
    domain: "ds_da",
    description: "Fundamental package for scientific computing with powerful N-dimensional array objects and linear algebra.",
    iconName: "Binary",
    playgroundTab: "python",
    primaryTags: ["Arrays", "Vectorization", "Linear Algebra", "Broadcasting"],
    functions: [
      {
        name: "np.vectorize & Matrix Operations",
        syntax: "normalized_matrix = (arr - np.mean(arr, axis=0)) / np.std(arr, axis=0)",
        description: "High-speed vectorized array transformations executing in compiled C runtime.",
        codeSnippet: `# NumPy High-Performance Vectorization
import numpy as np

# Convert dataset numeric columns into pure NumPy ndarray
numeric_cols = df.select_dtypes(include='number').columns
data_matrix = df[numeric_cols].to_numpy()

# Vectorized Z-Score Normalization without python loops
means = np.mean(data_matrix, axis=0)
stds = np.std(data_matrix, axis=0)
stds[stds == 0] = 1.0  # Prevent division by zero
z_scores = (data_matrix - means) / stds

print(f"NumPy Matrix Shape: {data_matrix.shape}")
print(f"Computed Z-Scores (First 3 Rows):\n{np.round(z_scores[:3, :3], 3)}")`,
        outputPreview: "Vectorized array transformation completed in 1.4ms",
      },
    ],
  },
  {
    id: "r_lang",
    name: "R",
    category: "DS & DA",
    domain: "ds_da",
    description: "Statistical programming language renowned for ggplot2 graphics, tidyverse data wrangling, and biostatistics.",
    iconName: "Code",
    playgroundTab: "statistics",
    primaryTags: ["ggplot2", "tidyverse", "Hypothesis Tests", "Statistical Modeling"],
    functions: [
      {
        name: "ggplot2 & lm(y ~ x)",
        syntax: "ggplot(data, aes(x=visits, y=revenue)) + geom_point() + geom_smooth(method='lm')",
        description: "The Grammar of Graphics for layered statistical plots and regression modeling.",
        codeSnippet: `# R Statistical Language Script Simulation
library(ggplot2)
library(dplyr)

# Tidyverse pipeline transformation
model <- lm(revenue ~ customer_age + marketing_spend, data = dataset)
summary_stats <- dataset %>%
  group_by(region) %>%
  summarise(
    mean_rev = mean(revenue, na.rm = TRUE),
    iqr_rev = IQR(revenue, na.rm = TRUE)
  )

print(summary(model))`,
        outputPreview: "R lm() fit: Multiple R-squared: 0.841 | p-value: < 2.2e-16",
      },
    ],
  },

  // ==========================================
  // INTERSECTION: DATA SCIENTIST & DATA ENGINEER
  // ==========================================
  {
    id: "docker",
    name: "Docker",
    category: "DS & DE",
    domain: "ds_de",
    description: "Containerization platform to package applications, Python ML models, and pipelines into reproducible containers.",
    iconName: "Box",
    playgroundTab: "hadoop",
    primaryTags: ["Containers", "Images", "Dockerfile", "Portability", "DevOps"],
    functions: [
      {
        name: "Containerized Engine Build & Run",
        syntax: "docker build -t dataquery-engine:v1 . && docker run -p 8080:8080 dataquery-engine:v1",
        description: "Compiles reproducible Linux image with pre-installed scientific libraries.",
        codeSnippet: `# Dockerfile for Production Machine Learning Serving
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]`,
        outputPreview: "Docker image built: 214MB | Container dataquery-engine started on port 8080",
      },
    ],
  },
  {
    id: "hadoop",
    name: "Hadoop",
    category: "DS & DE",
    domain: "ds_de",
    description: "Framework for distributed storage (HDFS) and processing of massive datasets across clusters (YARN).",
    iconName: "Server",
    playgroundTab: "hadoop",
    primaryTags: ["HDFS", "MapReduce", "YARN", "Cluster Compute"],
    functions: [
      {
        name: "HDFS File Management & MapReduce",
        syntax: "hdfs dfs -put local_dataset.csv /user/datalake/raw/ && yarn application -list",
        description: "Manages distributed file blocks and inspects cluster YARN resource managers.",
        codeSnippet: `# Hadoop CLI & MapReduce Execution
hdfs dfs -mkdir -p /lakehouse/bronze/transactions/
hdfs dfs -put -f ./sales_export.csv /lakehouse/bronze/transactions/
hdfs dfs -ls -h /lakehouse/bronze/transactions/

# Launch Distributed MapReduce Analytics Job
hadoop jar /usr/lib/hadoop-mapreduce/hadoop-streaming.jar \
  -input /lakehouse/bronze/transactions/ \
  -output /lakehouse/silver/revenue_summary/ \
  -mapper "python3 mapper.py" \
  -reducer "python3 reducer.py"`,
        outputPreview: "MapReduce Job ID: job_1729381923_0042 | 100% Maps, 100% Reduces Completed",
      },
    ],
  },
  {
    id: "spark",
    name: "Spark",
    category: "DS & DE",
    domain: "ds_de",
    description: "Multi-language unified analytics engine for large-scale data engineering, SQL, and machine learning.",
    iconName: "Sparkles",
    playgroundTab: "pyspark",
    primaryTags: ["Apache Spark", "PySpark", "Catalyst Optimizer", "RDD", "Parquet"],
    functions: [
      {
        name: "spark.sql & Catalyst DataFrame",
        syntax: "df = spark.read.parquet('s3a://lake/data/').filter('revenue > 100')",
        description: "Distributed execution plan optimized by Catalyst with partition pruning.",
        codeSnippet: `# PySpark Catalyst Query Optimization
from pyspark.sql import functions as F
from pyspark.sql.window import Window

# Read dataset into distributed Spark DataFrame
spark_df = spark.createDataFrame(df)

# Analytical Window Transform
window_spec = Window.partitionBy("region").orderBy(F.col("revenue").desc())
ranked_df = spark_df.withColumn("regional_rank", F.row_number().over(window_spec))

top_sales = ranked_df.filter(F.col("regional_rank") <= 3)
top_sales.explain(mode="formatted")
top_sales.show(5)`,
        outputPreview: "Physical Plan: *(1) Filter -> *(1) WindowExec -> *(1) HashAggregate",
      },
    ],
  },
  {
    id: "databricks",
    name: "Databricks",
    category: "DS & DE",
    domain: "ds_de",
    description: "Unified cloud data lakehouse platform powered by Apache Spark, Delta Lake, and managed MLflow.",
    iconName: "Layers",
    playgroundTab: "pyspark",
    primaryTags: ["Delta Lake", "Lakehouse", "ACID Transactions", "Auto-Loader"],
    functions: [
      {
        name: "Delta Lake ACID Merge & Time Travel",
        syntax: "deltaTable.alias('t').merge(updates.alias('s'), 't.id = s.id').whenMatchedUpdateAll().execute()",
        description: "Executes ACID transactions, schema enforcement, and time travel snapshots on data lakes.",
        codeSnippet: `# Databricks Delta Lake ACID Upsert
from delta.tables import DeltaTable

delta_table = DeltaTable.forPath(spark, "/mnt/lakehouse/silver/orders")

# Perform idempotent MERGE INTO (Upsert)
delta_table.alias("target").merge(
    source=spark_df.alias("source"),
    condition="target.id = source.id"
).whenMatchedUpdateAll(
).whenNotMatchedInsertAll(
).execute()

print("Delta Table History (Version 4): Committed 250 upserted rows with snapshot isolation")`,
        outputPreview: "Delta Lake Version: 4 | Operation: MERGE | Records Updated: 142 | Records Inserted: 58",
      },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DS & DE",
    domain: "ds_de",
    description: "Open source container orchestration system for automating deployment, scaling, and operations of clusters.",
    iconName: "Box",
    playgroundTab: "hadoop",
    primaryTags: ["K8s", "Pods", "Auto-Scaling", "Cluster Orchestration", "Microservices"],
    functions: [
      {
        name: "kubectl & Spark on K8s",
        syntax: "kubectl apply -f spark-operator.yaml && kubectl get pods -n data-mesh",
        description: "Deploys resilient distributed worker pods across cloud Kubernetes nodes.",
        codeSnippet: `# Kubernetes Declarative Spark Cluster Deployment
apiVersion: "sparkoperator.k8s.io/v1beta2"
kind: SparkApplication
metadata:
  name: dataquery-analytics-job
  namespace: data-mesh
spec:
  type: Python
  pythonVersion: "3"
  mode: cluster
  image: "dataquery/spark-py:v3.5"
  mainApplicationFile: "local:///opt/spark/work-dir/app.py"
  sparkVersion: "3.5.0"
  driver:
    cores: 2
    memory: "4096m"
  executor:
    cores: 4
    instances: 8
    memory: "8192m"`,
        outputPreview: "sparkapplication.sparkoperator.k8s.io/dataquery-analytics-job created | 8 executor pods running",
      },
    ],
  },
  {
    id: "mlflow",
    name: "MLflow",
    category: "DS & DE",
    domain: "ds_de",
    description: "Open source platform for the complete machine learning lifecycle, experiment tracking, and model registry.",
    iconName: "Cpu",
    playgroundTab: "ml",
    primaryTags: ["Experiment Tracking", "Model Registry", "Artifacts", "Reproducibility"],
    functions: [
      {
        name: "mlflow.start_run() & log_metric()",
        syntax: "with mlflow.start_run(): mlflow.log_param('lr', 0.01); mlflow.log_metric('auc', 0.94)",
        description: "Logs hyperparameters, training loss curves, and serialized model binaries.",
        codeSnippet: `# MLflow Experiment Tracking & Model Registry
import mlflow
import mlflow.sklearn

mlflow.set_experiment("Customer Churn Prediction")

with mlflow.start_run(run_name="RandomForest_v2"):
    mlflow.log_param("n_estimators", 150)
    mlflow.log_param("max_depth", 8)
    
    # Simulated model performance
    auc_score = 0.942
    mlflow.log_metric("val_auc", auc_score)
    mlflow.log_metric("f1_score", 0.915)
    
    # Save artifacts and model metadata
    print(f"Logged run to MLflow Tracking Server (Run ID: 7a91bf204e)")
    print("Model tagged as 'Production Ready' in Registry")`,
        outputPreview: "MLflow Run 7a91bf204e logged | val_auc: 0.942 | Model registered: churn_rf:v2",
      },
    ],
  },

  // ==========================================
  // INTERSECTION: DATA ANALYST & DATA ENGINEER
  // ==========================================
  {
    id: "dbt",
    name: "dbt",
    category: "DA & DE",
    domain: "da_de",
    description: "Data build tool that enables data analysts and engineers to transform data in their warehouse using SQL.",
    iconName: "Terminal",
    playgroundTab: "sql",
    primaryTags: ["dbt-core", "Data Modeling", "ref()", "Tests", "Documentation"],
    functions: [
      {
        name: "ref() & Incremental Materialization",
        syntax: "SELECT * FROM {{ ref('stg_orders') }} WHERE status = 'COMPLETED'",
        description: "Creates modular, lineage-tracked SQL transformation models with automated DAG compilation.",
        codeSnippet: `-- dbt (data build tool) Model Definition
{{ config(
    materialized='incremental',
    unique_key='order_id',
    on_schema_change='sync_all_columns'
) }}

WITH stg_orders AS (
    SELECT * FROM {{ ref('stg_ecommerce__orders') }}
),
customer_aggregates AS (
    SELECT 
        customer_id,
        COUNT(order_id) AS total_orders,
        SUM(order_amount) AS total_spend_usd
    FROM stg_orders
    GROUP BY customer_id
)
SELECT * FROM customer_aggregates
{% if is_incremental() %}
  WHERE customer_id IN (SELECT DISTINCT customer_id FROM {{ this }})
{% endif %};`,
        outputPreview: "dbt run --select models/marts/finance | 1 of 1 OK in 1.42s",
      },
    ],
  },
  {
    id: "hive",
    name: "Hive",
    category: "DA & DE",
    domain: "da_de",
    description: "Apache Hive distributed data warehouse software facilitating reading, writing, and managing petabytes in HDFS.",
    iconName: "Database",
    playgroundTab: "hadoop",
    primaryTags: ["HiveQL", "External Tables", "Partitioning", "Hadoop Metastore"],
    functions: [
      {
        name: "HiveQL External Table & Partition Repair",
        syntax: "CREATE EXTERNAL TABLE IF NOT EXISTS clickstream (...) PARTITIONED BY (dt STRING)",
        description: "Declares schema on read over distributed HDFS directories and repairs partitions.",
        codeSnippet: `-- Apache HiveQL Schema DDL
CREATE EXTERNAL TABLE IF NOT EXISTS datalake.raw_clickstream (
  session_id STRING,
  user_id BIGINT,
  page_url STRING,
  duration_sec INT
)
PARTITIONED BY (event_date STRING, country STRING)
STORED AS PARQUET
LOCATION '/warehouse/tablespace/external/hive/raw_clickstream';

-- Sync New Discovered Partitions
MSCK REPAIR TABLE datalake.raw_clickstream;`,
        outputPreview: "Hive metastore synchronized: Added 31 partitions to datalake.raw_clickstream",
      },
    ],
  },
  {
    id: "sql_server",
    name: "SQL Server",
    category: "DA & DE",
    domain: "da_de",
    description: "Enterprise relational database management system by Microsoft with T-SQL, SSIS, and columnstore indexes.",
    iconName: "Database",
    playgroundTab: "sql",
    primaryTags: ["T-SQL", "Stored Procedures", "Window Functions", "Index Optimization"],
    functions: [
      {
        name: "T-SQL CTE & ROW_NUMBER() Windowing",
        syntax: "WITH RankedOrders AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY cust_id ORDER BY date DESC) rn FROM orders)",
        description: "Deduplicates or filters top records per grouping key using Common Table Expressions.",
        codeSnippet: `-- Microsoft SQL Server T-SQL Deduplication Query
WITH RankedSalesCTE AS (
  SELECT 
    order_id,
    customer_id,
    revenue,
    order_date,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id 
      ORDER BY order_date DESC, revenue DESC
    ) AS transaction_seq
  FROM dataset
)
SELECT 
  order_id,
  customer_id,
  revenue,
  order_date
FROM RankedSalesCTE
WHERE transaction_seq = 1
ORDER BY revenue DESC;`,
        outputPreview: "T-SQL Execution Completed: Filtered top distinct transactions per customer",
      },
    ],
  },
  {
    id: "bigquery",
    name: "BigQuery",
    category: "DA & DE",
    domain: "da_de",
    description: "Serverless, cost-effective enterprise data warehouse by Google Cloud designed for petabyte-scale queries.",
    iconName: "Search",
    playgroundTab: "sql",
    primaryTags: ["Google Cloud", "Serverless", "Partitioning", "Clustering", "BigQuery ML"],
    functions: [
      {
        name: "ARRAY_AGG & BigQuery ML Prediction",
        syntax: "SELECT ARRAY_AGG(product ORDER BY revenue DESC LIMIT 3) FROM `gcp.analytics.orders`",
        description: "Runs nested structural queries and in-database machine learning models directly via SQL.",
        codeSnippet: `-- Google Cloud BigQuery Analytics Query
SELECT 
  category,
  COUNT(1) AS order_count,
  ROUND(SUM(revenue), 2) AS total_revenue,
  -- Nested JSON/Array Aggregation
  ARRAY_AGG(
    STRUCT(id, revenue) 
    ORDER BY revenue DESC 
    LIMIT 3
  ) AS top_3_deals
FROM dataset
GROUP BY category
ORDER BY total_revenue DESC;`,
        outputPreview: "BigQuery Job Completed: Processed 42.1 MB in 190ms",
      },
    ],
  },
  {
    id: "etl",
    name: "ETL",
    category: "DA & DE",
    domain: "da_de",
    description: "Extract, Transform, Load pipeline architecture for moving clean operational data into business warehouses.",
    iconName: "Workflow",
    playgroundTab: "pyspark",
    primaryTags: ["Data Pipelines", "Ingestion", "Transformation", "Data Quality"],
    functions: [
      {
        name: "End-to-End ETL Pipeline Flow",
        syntax: "extract_source() -> apply_schema_rules() -> load_warehouse()",
        description: "Executes standard 3-tier medallion architecture (Bronze -> Silver -> Gold).",
        codeSnippet: `# 3-Stage Medallion ETL Pipeline Pattern
import pandas as pd

# Stage 1: EXTRACT (Bronze Ingestion)
def extract():
    print("[1/3 Extract] Reading raw source batches...")
    return df.copy()

# Stage 2: TRANSFORM (Silver Data Cleansing)
def transform(raw_df):
    print("[2/3 Transform] Removing duplicates & formatting schema...")
    clean_df = raw_df.drop_duplicates()
    if 'revenue' in clean_df:
        clean_df['revenue'] = clean_df['revenue'].fillna(0).clip(lower=0)
    return clean_df

# Stage 3: LOAD (Gold Curated Analytical Mart)
def load(curated_df):
    print(f"[3/3 Load] Writing {len(curated_df)} verified rows to Analytical Lakehouse.")
    return curated_df

curated_output = load(transform(extract()))`,
        outputPreview: "ETL Pipeline: Bronze (Extracted) -> Silver (Transformed) -> Gold (Loaded)",
      },
    ],
  },

  // ==========================================
  // CENTER: ALL THREE (DATA SCIENTIST, DATA ANALYST, DATA ENGINEER)
  // ==========================================
  {
    id: "git",
    name: "Git",
    category: "All Disciplines",
    domain: "all_three",
    description: "Distributed version control system to track source code changes, coordinate team collaboration, and deploy CI/CD.",
    iconName: "GitBranch",
    playgroundTab: "python",
    primaryTags: ["Version Control", "Branches", "Pull Requests", "CI/CD", "DevOps"],
    functions: [
      {
        name: "Git Branching & Release Workflow",
        syntax: "git checkout -b feature/data-pipeline && git commit -m 'feat: add pipeline' && git push",
        description: "Standard commands for managing analytical pipelines under version control.",
        codeSnippet: `# Git Repository Commands for Analytics Engineering
git checkout -b feature/automated-ml-suitability
git status --short
git add src/lib/essentialTools.ts src/components/
git commit -m "feat(analytics): add 55 essential tools simulation deck"
git push origin feature/automated-ml-suitability`,
        outputPreview: "On branch dev: Working tree clean | Pushed 4 commits to origin",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    category: "All Disciplines",
    domain: "all_three",
    description: "Structured Query Language, the universal lingua franca for querying, filtering, and aggregating relational data.",
    iconName: "Database",
    playgroundTab: "sql",
    primaryTags: ["DuckDB", "ANSI SQL", "Window Functions", "Aggregates", "Joins"],
    functions: [
      {
        name: "Window Functions & Analytical Rollups",
        syntax: "SELECT SUM(amount) OVER (PARTITION BY category ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
        description: "Computes running totals, moving averages, and ranks across ordered partitions.",
        codeSnippet: `-- Universal SQL: Running Totals and Moving Averages
SELECT 
  category,
  date,
  revenue,
  -- Running Cumulative Total
  SUM(revenue) OVER(
    PARTITION BY category 
    ORDER BY date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_category_revenue,
  -- 7-Day Moving Average
  AVG(revenue) OVER(
    PARTITION BY category 
    ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7day_revenue
FROM dataset
ORDER BY category, date;`,
        outputPreview: "DuckDB Columnar Execution: 0.8ms | Computed cumulative window frames",
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    category: "All Disciplines",
    domain: "all_three",
    description: "The world's leading language for data science, automation, pipeline engineering, and statistical modeling.",
    iconName: "Terminal",
    playgroundTab: "python",
    primaryTags: ["Python 3.11", "Automation", "Data Structures", "APIs", "Pyodide"],
    functions: [
      {
        name: "Python Data Transformation Pipeline",
        syntax: "def transform_dataset(records: list) -> dict: ...",
        description: "Executes pure Pythonic data transformations, dictionary comprehensions, and statistics.",
        codeSnippet: `# Python In-Memory Analytical Pipeline
from collections import defaultdict
import statistics

# Ingest and summarize dataset records
category_totals = defaultdict(list)
for row in dataset.data:
    cat = row.get('category', 'General')
    rev = float(row.get('revenue', 0.0))
    category_totals[cat].append(rev)

print("--- Category Insights ---")
for cat, revs in category_totals.items():
    total_rev = round(sum(revs), 2)
    mean_rev = round(statistics.mean(revs), 2)
    print(f"[{cat:<12}] Sum: {total_rev} | Mean: {mean_rev}")`,
        outputPreview: "Python 3.11 Execution Completed: Summarized categories in memory",
      },
    ],
  },
];

// Helper functions for easy querying
export function getToolById(id: string): EssentialTool | undefined {
  return ESSENTIAL_TOOLS.find((t) => t.id.toLowerCase() === id.toLowerCase());
}

export function getToolsByDomain(domain: ToolDomain | "all"): EssentialTool[] {
  if (domain === "all") return ESSENTIAL_TOOLS;
  return ESSENTIAL_TOOLS.filter((t) => t.domain === domain);
}

export function getToolsByDiscipline(discipline: "scientist" | "analyst" | "engineer"): EssentialTool[] {
  return ESSENTIAL_TOOLS.filter((t) => {
    if (discipline === "scientist") {
      return ["data_scientist", "ds_da", "ds_de", "all_three"].includes(t.domain);
    }
    if (discipline === "analyst") {
      return ["data_analyst", "ds_da", "da_de", "all_three"].includes(t.domain);
    }
    if (discipline === "engineer") {
      return ["data_engineer", "ds_de", "da_de", "all_three"].includes(t.domain);
    }
    return false;
  });
}
