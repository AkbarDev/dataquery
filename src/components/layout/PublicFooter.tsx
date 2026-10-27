import React from "react";
import Link from "next/link";
import { Terminal, Shield, Lock, ExternalLink } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center text-slate-950">
                <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-slate-100 text-sm tracking-tight">
                DataQuery<span className="text-sky-400">.in</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Hosted, all-in-one data build tool. Ingest multi-format datasets, explore in an in-browser playground (Python, DuckDB, DAX), trigger Automate pipelines, and download AI reports.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Domain: https://dataquery.in</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li><Link href="/app/playground" className="hover:text-slate-200">Visual Playground</Link></li>
              <li><Link href="/connectors" className="hover:text-slate-200">Connectors</Link></li>
              <li><Link href="/library" className="hover:text-slate-200">Function Library</Link></li>
              <li><Link href="/templates" className="hover:text-slate-200">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-slate-200">Pricing & Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Languages & BI
            </h4>
            <ul className="space-y-2">
              <li><Link href="/app/playground?tab=python" className="hover:text-slate-200">Python (Pandas)</Link></li>
              <li><Link href="/app/playground?tab=sql" className="hover:text-slate-200">DuckDB SQL</Link></li>
              <li><Link href="/app/playground?tab=dax" className="hover:text-slate-200">Power BI (DAX)</Link></li>
              <li><Link href="/docs/functions-catalog" className="hover:text-slate-200">Functions Catalog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Security & Trust
            </h4>
            <ul className="space-y-2">
              <li><Link href="/security" className="hover:text-slate-200 flex items-center gap-1"><Shield className="w-3 h-3 text-sky-400" /> Security Whitepaper</Link></li>
              <li><span className="text-slate-500">In-Browser Isolation</span></li>
              <li><span className="text-slate-500">Zero Raw Data Telemetry</span></li>
              <li><span className="text-slate-500">SOC2 Type II Ready</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 DataQuery.in. Built for modern analytics engineers and analysts.</p>
          <div className="flex items-center space-x-6">
            <Link href="/security" className="hover:text-slate-200">Privacy Policy</Link>
            <Link href="/security" className="hover:text-slate-200">Terms of Service</Link>
            <a href="https://github.com/AkbarDev/dataquery" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
