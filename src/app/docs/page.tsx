"use client";

import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, FileText, Code2, Server, Terminal, ExternalLink } from "lucide-react";

export default function DocsStubPage() {
  const docSections = [
    {
      title: "Architecture & WASM Engines",
      path: "/docs/architecture.md",
      desc: "Client-side WebAssembly execution model using DuckDB-WASM and Pyodide pandas.",
    },
    {
      title: "API Contract Specification",
      path: "/docs/api.md",
      desc: "Full REST request and response schema across authentication, execution, and reports.",
    },
    {
      title: "Design Tokens & System",
      path: "/docs/design-tokens.md",
      desc: "Color palettes, typography scales, spacing, radius, and elevation tokens.",
    },
    {
      title: "Deployment & Custom Domain",
      path: "/docs/deployment.md",
      desc: "Netlify and Vercel side-by-side setup, DNS records for dataquery.in, and Docker notes.",
    },
    {
      title: "Function Catalog (90+ Seeded)",
      path: "/docs/functions-catalog.md",
      desc: "Reference manual for 30 Python, 30 SQL, and 30 DAX functions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="outline" size="md">Developer Reference</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            DataQuery Documentation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Comprehensive technical guides, API specs, and function catalogs maintained in the repository.
          </p>
        </div>

        <div className="space-y-4">
          {docSections.map((doc, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-100">{doc.title}</h3>
                <p className="text-xs text-slate-400">{doc.desc}</p>
                <code className="text-[10px] font-mono text-sky-400">{doc.path}</code>
              </div>
              <a
                href={`https://github.com/AkbarDev/dataquery/tree/main${doc.path}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-200 p-2"
                title="View Markdown Source"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
