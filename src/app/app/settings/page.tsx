"use client";

import React, { useState } from "react";
import { AppNav } from "@/components/layout/AppNav";
import { useAppStore } from "@/lib/store/useAppStore";
import { PLAN_CONFIGS } from "@/lib/plans";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  User,
  Shield,
  Key,
  Database,
  Trash2,
  Lock,
  Copy,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const { user, usage, setUpgradeModalOpen, resetToFree, upgradeToPro } = useAppStore();
  const plan = PLAN_CONFIGS[user.plan];

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("dqw_live_94827103859201948572");
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    toast.success("API Key Copied", "Secret token copied to clipboard.");
  };

  const handleClearLocalData = () => {
    localStorage.clear();
    toast.success("Cache Cleared", "Purged all cached datasets and queries from browser storage.");
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    resetToFree();
    localStorage.clear();
    toast.error("Account & Data Purged", "All workspace records and preferences have been permanently erased.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <AppNav />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Workspace Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your account profile, plan limits, API tokens, and privacy controls.
          </p>
        </div>

        {/* 1. Profile Section */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-slate-100">User Profile</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">{user.name}</h3>
                <p className="text-xs text-slate-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="pro" size="sm">
                    Community Open Source (All Features Unlocked)
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setUpgradeModalOpen(true)}
            >
              Open Source Info
            </Button>
          </div>
        </div>

        {/* 2. Usage Quotas & Limits */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-slate-100">Local Execution &amp; Resource Allocation</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400">100% Client-Side Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase block">Analytical Operations</span>
              <div className="text-xl font-bold text-slate-100">
                {usage.runsToday} / Unlimited
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase block">Copilot AI Insights</span>
              <div className="text-xl font-bold text-slate-100">
                {usage.aiPromptsThisMonth} / Unlimited
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase block">Dataset Processing Limit</span>
              <div className="text-xl font-bold text-slate-100">
                RAM-Bound
              </div>
              <span className="text-[10px] text-emerald-400 block font-sans">
                Up to 100M+ rows via DuckDB-WASM
              </span>
            </div>
          </div>
        </div>

        {/* 3. API Keys */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Key className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-slate-100">API Tokens</h2>
          </div>

          <p className="text-xs text-slate-400">
            Use this bearer token to authenticate programmatic requests against <code>/api</code> endpoints.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 focus:outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyKey}
              leftIcon={copiedKey ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedKey ? "Copied" : "Copy"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setApiKey("dqw_live_" + Math.random().toString(36).substring(2, 12));
                toast.success("Token Regenerated", "Issued a new API token.");
              }}
            >
              Regenerate
            </Button>
          </div>
        </div>

        {/* 4. Security & Data Privacy Controls */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">Data Privacy &amp; Security Controls</h2>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-slate-100 block">Client-Side Memory Sandbox</span>
                <span className="text-[11px] text-slate-400">Datasets are parsed in-browser via WebAssembly.</span>
              </div>
              <Badge variant="success" size="sm">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-slate-100 block">Zero Raw Data Telemetry</span>
                <span className="text-[11px] text-slate-400">File contents are never transmitted to analytics trackers.</span>
              </div>
              <Badge variant="success" size="sm">Enforced</Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              size="xs"
              onClick={handleClearLocalData}
            >
              Clear Local Browser Storage
            </Button>

            <Button
              variant="danger"
              size="xs"
              onClick={() => setDeleteModalOpen(true)}
              leftIcon={<Trash2 className="w-3 h-3" />}
            >
              Delete My Data &amp; Account
            </Button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Account & Data Deletion"
        description="Are you certain you wish to erase your workspace data? This action cannot be reversed."
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>All pinned dashboards, recipes, and cached datasets will be destroyed permanently.</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
              Confirm Permanent Deletion
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
