/**
 * DataQuery AI - Analytical Formula & DAX Helper Engine
 * Pure computational evaluators for table measures, DAX expressions, and statistical metrics.
 */

export type DataRow = Record<string, any>;

export function evaluateSum(data: DataRow[], column: string): number {
  if (!data || data.length === 0) return 0;
  return data.reduce((acc, row) => {
    const val = Number(row[column]);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
}

export function evaluateAverage(data: DataRow[], column: string): number {
  if (!data || data.length === 0) return 0;
  let count = 0;
  const sum = data.reduce((acc, row) => {
    const val = Number(row[column]);
    if (!isNaN(val) && row[column] !== null && row[column] !== "") {
      count++;
      return acc + val;
    }
    return acc;
  }, 0);
  return count > 0 ? sum / count : 0;
}

export function evaluateDistinctCount(data: DataRow[], column: string): number {
  if (!data || data.length === 0) return 0;
  const set = new Set();
  data.forEach((row) => {
    const val = row[column];
    if (val !== null && val !== undefined && val !== "") {
      set.add(val);
    }
  });
  return set.size;
}

export function evaluateMin(data: DataRow[], column: string): number {
  if (!data || data.length === 0) return 0;
  const nums = data
    .map((r) => Number(r[column]))
    .filter((n) => !isNaN(n));
  return nums.length > 0 ? Math.min(...nums) : 0;
}

export function evaluateMax(data: DataRow[], column: string): number {
  if (!data || data.length === 0) return 0;
  const nums = data
    .map((r) => Number(r[column]))
    .filter((n) => !isNaN(n));
  return nums.length > 0 ? Math.max(...nums) : 0;
}

/**
 * DAX DIVIDE helper with alternate result when denominator is zero
 */
export function evaluateDivide(
  numerator: number,
  denominator: number,
  alternateResult: number = 0
): number {
  if (denominator === 0 || isNaN(denominator) || !isFinite(denominator)) {
    return alternateResult;
  }
  return numerator / denominator;
}

/**
 * Evaluates filter condition e.g. "Country == 'USA'" or "Revenue > 1000"
 */
export function evaluateFilter(
  data: DataRow[],
  column: string,
  operator: "==" | "!=" | ">" | ">=" | "<" | "<=",
  targetValue: any
): DataRow[] {
  return data.filter((row) => {
    const val = row[column];
    switch (operator) {
      case "==":
        return String(val).toLowerCase() === String(targetValue).toLowerCase();
      case "!=":
        return String(val).toLowerCase() !== String(targetValue).toLowerCase();
      case ">":
        return Number(val) > Number(targetValue);
      case ">=":
        return Number(val) >= Number(targetValue);
      case "<":
        return Number(val) < Number(targetValue);
      case "<=":
        return Number(val) <= Number(targetValue);
      default:
        return true;
    }
  });
}

/**
 * DAX CALCULATE equivalent: Evaluates an aggregation over a filtered context.
 */
export function evaluateCalculate(
  data: DataRow[],
  aggregator: "SUM" | "AVERAGE" | "COUNT" | "DISTINCTCOUNT",
  metricColumn: string,
  filterColumn?: string,
  operator?: "==" | "!=" | ">" | ">=" | "<" | "<=",
  filterValue?: any
): number {
  const filteredData =
    filterColumn && operator !== undefined && filterValue !== undefined
      ? evaluateFilter(data, filterColumn, operator, filterValue)
      : data;

  switch (aggregator) {
    case "SUM":
      return evaluateSum(filteredData, metricColumn);
    case "AVERAGE":
      return evaluateAverage(filteredData, metricColumn);
    case "COUNT":
      return filteredData.length;
    case "DISTINCTCOUNT":
      return evaluateDistinctCount(filteredData, metricColumn);
    default:
      return 0;
  }
}
