# Function Catalog & Library Specification

The DataQuery Function Library provides built-in transformations and snippets across **Python (pandas/NumPy)**, **SQL (DuckDB)**, and **Power BI (DAX-style)**.

---

## 🐍 Python Functions (30 Seeded)

### Basic
1. `df.head(n)` - Return the first `n` rows of the dataset.
2. `df.tail(n)` - Return the last `n` rows of the dataset.
3. `df.info()` - Print concise summary of columns, types, and non-null values.
4. `df.describe()` - Generate descriptive statistics (mean, std, min, max, quartiles).
5. `df.shape` - Inspect tuple of (row_count, column_count).
6. `df.columns.tolist()` - Return column names as a Python list.
7. `df.rename(columns={'old': 'new'})` - Rename one or more columns.
8. `df.drop(columns=['col'])` - Remove specific columns.
9. `df.dropna(subset=['col'])` - Drop rows with missing values in target columns.
10. `df.fillna(value=0)` - Replace missing values with scalar or column mean.

### Intermediate
11. `df.groupby('col').agg({'val': 'sum'})` - Multi-column aggregation.
12. `df.sort_values(by='col', ascending=False)` - Sort rows by metric or date.
13. `df['new_col'] = df['a'] / df['b']` - Compute calculated column ratio.
14. `pd.to_datetime(df['date_col'])` - Parse string column to datetime.
15. `df.query('revenue > 1000 & status == "active"')` - Fast string filter evaluation.
16. `df['col'].value_counts(normalize=True)` - Calculate frequency distributions.
17. `df.drop_duplicates(subset=['id'])` - Deduplicate rows by key identifier.
18. `pd.merge(df1, df2, on='key', how='left')` - Relational left join.
19. `df.pivot_table(index='cat', columns='year', values='rev')` - Cross-tabulation pivot.
20. `df.assign(margin_pct=lambda x: x.profit / x.revenue)` - Fluent column assignment.

### Advanced
21. `df.rolling(window=7, on='date')['rev'].mean()` - 7-day rolling moving average.
22. `df.groupby('customer')['order_date'].diff().dt.days` - Inter-purchase cycle days.
23. `pd.qcut(df['recency'], q=5, labels=False)` - Quantile binning for RFM scoring.
24. `df.corr(numeric_only=True)` - Pearson correlation matrix.
25. `np.where(df['z_score'].abs() > 3, 'Anomaly', 'Normal')` - Z-score outlier detection.
26. `df.pct_change()` - Period-over-period percentage expansion.
27. `df.melt(id_vars=['id'], value_vars=['q1', 'q2'])` - Unpivot wide to long format.
28. `df.explode('tags')` - Transform list-like elements into separate rows.
29. `pd.crosstab(df['segment'], df['churn'])` - Contingency matrix calculation.
30. `np.select(conditions, choices, default='Other')` - Vectorized multi-branch case logic.

---

## 🦆 SQL Functions (DuckDB) (30 Seeded)

### Basic
1. `SELECT * FROM data LIMIT 10;` - Sample preview.
2. `SELECT COUNT(*) AS total_rows FROM data;` - Count records.
3. `SELECT DISTINCT category FROM data;` - Unique category values.
4. `SELECT * FROM data WHERE revenue > 500;` - Conditional filter.
5. `SELECT * FROM data ORDER BY order_date DESC;` - Order by timestamp.
6. `SELECT category, SUM(revenue) FROM data GROUP BY 1;` - Basic summation grouping.
7. `SELECT AVG(price) AS mean_price FROM data;` - Compute average.
8. `SELECT MIN(cost), MAX(cost) FROM data;` - Range extremes.
9. `SELECT UPPER(region_name) FROM data;` - String capitalization.
10. `SELECT COALESCE(phone, 'N/A') FROM data;` - Replace null values.

### Intermediate
11. `SELECT DATE_TRUNC('month', order_date), SUM(revenue) FROM data GROUP BY 1;` - Monthly cadence.
12. `SELECT category, SUM(revenue) FROM data GROUP BY 1 HAVING SUM(revenue) > 10000;` - Aggregated filter.
13. `SELECT a.*, b.name FROM sales a LEFT JOIN reps b ON a.rep_id = b.id;` - Relational left join.
14. `SELECT CASE WHEN age < 25 THEN 'GenZ' ELSE 'Other' END FROM data;` - Categorical branching.
15. `SELECT ROUND(revenue, 2) FROM data;` - Float rounding.
16. `SELECT DATEDIFF('day', start_date, end_date) FROM data;` - Date interval duration.
17. `SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM data;` - String concatenation.
18. `SELECT CAST(user_id AS VARCHAR) FROM data;` - Explicit type conversion.
19. `SELECT REGEXP_EXTRACT(email, '@(.*)', 1) AS domain FROM data;` - Regex pattern extraction.
20. `SELECT COUNT(DISTINCT customer_id) FROM data;` - Cardinality estimation.

### Advanced
21. `SUM(revenue) OVER (PARTITION BY region ORDER BY order_date) AS running_rev` - Window running sum.
22. `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn` - Deduplication rank.
23. `LAG(revenue, 1) OVER (ORDER BY order_date) AS prev_period_rev` - Lag comparison.
24. `(revenue - LAG(revenue, 1) OVER (ORDER BY order_date)) / NULLIF(LAG(revenue, 1) OVER (...), 0)` - MoM growth.
25. `NTILE(4) OVER (ORDER BY lifetime_spend) AS spend_quartile` - Quartile ranking.
26. `WITH monthly_rev AS (...) SELECT * FROM monthly_rev` - Common Table Expression (CTE).
27. `QUALIFY ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC) = 1` - DuckDB deduplication.
28. `APPROX_COUNT_DISTINCT(uuid)` - HyperLogLog cardinality for billion-row scale.
29. `MEDIAN(deal_size)` - Exact median computation.
30. `PIVOT data ON quarter USING SUM(revenue)` - Native SQL pivot table.

---

## 📊 DAX-Style Functions (Power BI) (30 Seeded)

### Basic
1. `Total Sales = SUM(Sales[Revenue])` - Total column sum.
2. `Average Order Value = AVERAGE(Sales[Amount])` - Mean transaction value.
3. `Total Orders = COUNTROWS(Sales)` - Row count volume.
4. `Distinct Customers = DISTINCTCOUNT(Sales[CustomerID])` - Unique customer volume.
5. `Minimum Margin = MIN(Sales[Margin])` - Minimum bound.
6. `Maximum Margin = MAX(Sales[Margin])` - Maximum bound.
7. `Profit = Sales[Revenue] - Sales[Cost]` - Simple row subtraction.
8. `Safe Margin % = DIVIDE([Total Profit], [Total Revenue], 0)` - Division with zero-division safeguard.
9. `Order Year = YEAR(Sales[OrderDate])` - Year extraction.
10. `Order Month = MONTH(Sales[OrderDate])` - Month number extraction.

### Intermediate
11. `US Sales = CALCULATE([Total Sales], Sales[Country] = "United States")` - Filter context modification.
12. `High Value Orders = COUNTROWS(FILTER(Sales, Sales[Revenue] > 1000))` - Table filter iteration.
13. `Global Sales All Regions = CALCULATE([Total Sales], ALL(Sales[Region]))` - Remove regional filters.
14. `Sales Share % = DIVIDE([Total Sales], [Global Sales All Regions])` - Component share of total.
15. `Sales YTD = TOTALYTD([Total Sales], Dates[Date])` - Year-to-date accumulation.
16. `Sales QTD = TOTALQTD([Total Sales], Dates[Date])` - Quarter-to-date accumulation.
17. `Sales MTD = TOTALMTD([Total Sales], Dates[Date])` - Month-to-date accumulation.
18. `Sales Last Year = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))` - YoY time intelligence.
19. `YoY Sales Growth = [Total Sales] - [Sales Last Year]` - Year-over-year variance.
20. `YoY Sales Growth % = DIVIDE([YoY Sales Growth], [Sales Last Year])` - Year-over-year rate.

### Advanced
21. `Customer Lifetime Spend = SUMX(RELATEDTABLE(Sales), Sales[Revenue])` - Row context transition.
22. `Top 10 Customers Sales = CALCULATE([Total Sales], TOPN(10, Customers, [Total Sales]))` - Top-N segment.
23. `Sales 30 Day Rolling = CALCULATE([Total Sales], DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -30, DAY))` - Rolling window.
24. `Customer Status = IF([Total Sales] > 10000, "Enterprise", IF([Total Sales] > 2000, "Mid-Market", "SMB"))` - Nested tiers.
25. `Active Customers 90D = CALCULATE(DISTINCTCOUNT(Sales[CustomerID]), DATESINPERIOD(Dates[Date], LASTDATE(Dates[Date]), -90, DAY))` - Activity window.
26. `Churned Customers = [Total Customers] - [Active Customers 90D]` - Churn delta.
27. `Sales Excluding Selected = CALCULATE([Total Sales], ALLSELECTED(Sales))` - Dynamic visual filter removal.
28. `Rank by Sales = RANKX(ALL(Products[ProductName]), [Total Sales], , DESC, Dense)` - Product ranking.
29. `Median Deal Size = MEDIANX(Customers, [Total Sales])` - Iterative median.
30. `Cumulative % of Revenue = DIVIDE(CALCULATE([Total Sales], FILTER(ALL(Products), [Rank by Sales] <= EARLIER([Rank by Sales]))), [Global Sales All Products])` - Pareto curve calculation.
