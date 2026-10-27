import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number): string {
  if (Math.abs(val) >= 1_000_000) {
    return (val / 1_000_000).toFixed(2) + "M";
  }
  if (Math.abs(val) >= 1_000) {
    return (val / 1_000).toFixed(1) + "k";
  }
  return val.toLocaleString();
}

export function formatCurrency(val: number): string {
  return "$" + formatNumber(val);
}

export function formatPercent(val: number): string {
  return (val * 100).toFixed(1) + "%";
}
