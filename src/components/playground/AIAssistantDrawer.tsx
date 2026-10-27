"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { api } from "@/lib/api";
import { checkPlanPermission } from "@/lib/plans";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  Code2,
  FileCode,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export function AIAssistantDrawer() {
  const {
    isAIDrawerOpen,
    setAIDrawerOpen,
    aiMessages,
    addAIMessage,
    currentDataset,
    activeLanguage,
    setPythonCode,
    setSqlCode,
    pythonCode,
    sqlCode,
    usage,
    setUpgradeModalOpen,
  } = useAppStore();

  const [promptInput, setPromptInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAIDrawerOpen) return null;

  const handleSendPrompt = async () => {
    if (!promptInput.trim()) return;

    // Check plan prompt limits
    const check = checkPlanPermission("ai_prompt", usage);
    if (!check.allowed) {
      toast.warning("AI Limit Reached", check.reason);
      setUpgradeModalOpen(true);
      return;
    }

    const userText = promptInput;
    setPromptInput("");
    addAIMessage({ role: "user", text: userText });
    setIsLoading(true);

    try {
      const response = await api.askAI(userText, currentDataset, activeLanguage);
      addAIMessage({
        role: "assistant",
        text: response.answer,
        codeSnippet: response.generatedCode,
        chartType: response.recommendedChart,
      });
    } catch (err) {
      addAIMessage({
        role: "assistant",
        text: "I encountered an error generating your query. Please refine your question.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertIntoEditor = (code: string) => {
    if (activeLanguage === "python") {
      setPythonCode(pythonCode + "\n\n# AI-generated code:\n" + code);
    } else {
      setSqlCode(sqlCode + "\n\n-- AI-generated code:\n" + code);
    }
    toast.success("Code Inserted", "Added AI snippet to your editor. You can review and run it.");
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Ask Your Data</span>
              <Badge variant="outline" size="sm">Copilot</Badge>
            </h3>
            <p className="text-[10px] text-slate-400">
              Natural language to {activeLanguage.toUpperCase()} code
            </p>
          </div>
        </div>

        <button
          onClick={() => setAIDrawerOpen(false)}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close AI Drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {aiMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] p-3.5 rounded-2xl ${
                msg.role === "user"
                  ? "bg-sky-500 text-slate-950 font-medium rounded-tr-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm space-y-2.5 shadow-sm"
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>

              {msg.codeSnippet && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>AI-generated ({activeLanguage.toUpperCase()})</span>
                    </span>
                    <button
                      onClick={() => handleInsertIntoEditor(msg.codeSnippet!)}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>Insert into Editor</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] font-mono text-sky-300 overflow-x-auto whitespace-pre-wrap">
                    {msg.codeSnippet}
                  </pre>
                  <p className="text-[10px] text-slate-500 italic">
                    Code will not run automatically. Review before clicking Run.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Analyzing schema and synthesizing code...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
        <span className="text-[10px] text-slate-500 block mb-1.5 font-mono uppercase">
          Quick Suggestions:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <button
            onClick={() => setPromptInput("Top 5 categories by gross margin")}
            className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
          >
            Top 5 categories by margin
          </button>
          <button
            onClick={() => setPromptInput("Show monthly churn trend")}
            className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
          >
            Monthly churn trend
          </button>
        </div>
      </div>

      {/* Input Prompt Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask anything about your dataset..."
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
          />
          <Button
            type="submit"
            variant="glow"
            size="sm"
            disabled={!promptInput.trim() || isLoading}
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
