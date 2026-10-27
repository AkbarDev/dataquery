"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SEEDED_FUNCTIONS } from "@/lib/sampleData";
import { useAppStore } from "@/lib/store/useAppStore";
import { Language, FunctionLevel, FunctionItem } from "@/lib/types";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  SlidersHorizontal,
  Play,
  Sparkles,
  BookOpen,
  Terminal,
  Database,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function FunctionLibraryPage() {
  const router = useRouter();
  const { setPythonCode, setSqlCode, setDaxCode, setActiveLanguage, setPlaygroundMode } = useAppStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<FunctionLevel | "all">("all");

  const filteredFunctions = SEEDED_FUNCTIONS.filter((fn) => {
    const matchesSearch =
      fn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fn.example.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === "all" || fn.language === selectedLanguage;
    const matchesLevel = selectedLevel === "all" || fn.level === selectedLevel;
    return matchesSearch && matchesLang && matchesLevel;
  });

  const handleTryOnMyData = (fn: FunctionItem) => {
    setActiveLanguage(fn.language);
    setPlaygroundMode("manual");
    if (fn.language === "python") {
      setPythonCode(`# Loaded function snippet: ${fn.name}\n${fn.snippet}`);
    } else if (fn.language === "sql") {
      setSqlCode(`-- Loaded function snippet: ${fn.name}\n${fn.snippet}`);
    } else {
      setDaxCode(`// Loaded function snippet: ${fn.name}\n${fn.snippet}`);
    }
    toast.success("Snippet Loaded", `Opening Playground with "${fn.name}" snippet ready.`);
    router.push("/app/playground");
  };

  const handleAddToAutomateChain = (fn: FunctionItem) => {
    toast.success(
      "Added to Automate Chain",
      `Appended "${fn.name}" to your active automated pipeline recipe.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <Badge variant="info" size="md">90+ Pre-Configured Functions</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            The DataQuery Function Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Search curated transformations across Python (pandas), DuckDB SQL, and Power BI DAX. Click to test on your own data instantly.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search functions by name, operation, or formula (e.g. groupby, rolling, CALCULATE)..."
                className="w-full bg-slate-950 pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Language Filter */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedLanguage("all")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLanguage === "all" ? "bg-slate-800 text-slate-100 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                All Languages ({SEEDED_FUNCTIONS.length})
              </button>
              <button
                onClick={() => setSelectedLanguage("python")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLanguage === "python" ? "bg-blue-500/20 text-blue-300 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Python (30)
              </button>
              <button
                onClick={() => setSelectedLanguage("sql")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLanguage === "sql" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                DuckDB SQL (30)
              </button>
              <button
                onClick={() => setSelectedLanguage("dax")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLanguage === "dax" ? "bg-purple-500/20 text-purple-300 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Power BI DAX (30)
              </button>
            </div>

            {/* Level Filter */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              {(["all", "basic", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                    selectedLevel === lvl ? "bg-slate-800 text-sky-400 font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Function Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFunctions.map((fn) => {
            const langBadge =
              fn.language === "python"
                ? "python"
                : fn.language === "sql"
                ? "sql"
                : "dax";

            return (
              <div
                key={fn.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={langBadge} size="sm">
                      {fn.language.toUpperCase()}
                    </Badge>
                    <Badge
                      variant={
                        fn.level === "advanced"
                          ? "pro"
                          : fn.level === "intermediate"
                          ? "info"
                          : "outline"
                      }
                      size="sm"
                    >
                      {fn.level}
                    </Badge>
                  </div>

                  <h3 className="font-mono font-bold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
                    {fn.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed min-h-[38px]">
                    {fn.description}
                  </p>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-[11px] text-sky-300 overflow-x-auto">
                    <code>{fn.example}</code>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <Button
                    variant="glow"
                    size="xs"
                    onClick={() => handleTryOnMyData(fn)}
                    leftIcon={<Play className="w-3 h-3 fill-current" />}
                    className="flex-1"
                  >
                    Try on my data
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleAddToAutomateChain(fn)}
                    title="Add to Automate chain"
                  >
                    + Chain
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
