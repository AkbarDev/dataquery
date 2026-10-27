import React from "react";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  maxHeight?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No records found.",
  maxHeight = "400px",
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full space-y-2 p-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-9 w-full bg-slate-800/40 animate-pulse rounded"
          />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-auto border border-slate-800 rounded-lg",
        className
      )}
      style={{ maxHeight }}
    >
      <table className="w-full text-left text-xs text-slate-300 border-collapse">
        <thead className="bg-slate-950/90 sticky top-0 z-10 border-b border-slate-800 font-mono text-[11px] uppercase tracking-wider text-slate-400">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-3.5 py-2.5 font-semibold select-none",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.width
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-slate-800/40 transition-colors group"
            >
              {columns.map((col) => {
                const cellValue = row[col.key];
                return (
                  <td
                    key={col.key}
                    className={cn(
                      "px-3.5 py-2 truncate max-w-[240px]",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      cellValue === null || cellValue === undefined
                        ? "text-slate-600 italic"
                        : "text-slate-200"
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : cellValue === null || cellValue === undefined
                      ? "null"
                      : String(cellValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
