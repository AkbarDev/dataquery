"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import { useAppStore } from "@/lib/store/useAppStore";
import { Sparkles, Check, Shield, AlertTriangle, CreditCard } from "lucide-react";
import Link from "next/link";

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { upgradeToPro, user } = useAppStore();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTestUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPro();
      setIsProcessing(false);
      toast.success(
        "Welcome to DataQuery Pro! (Test Mode)",
        "Your account has been upgraded with unlimited runs, 500 MB file limits, and full DAX/DuckDB access."
      );
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title="Upgrade to DataQuery Pro"
      description="Unlock full-scale analytics, unlimited file sizes, scheduled Automate pipelines, and advanced DAX formulas."
    >
      <div className="space-y-6">
        {/* Test Mode Banner */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Simulated Billing (Test Mode):</strong> No actual credit card charge will occur. Clicking upgrade will instantly grant Pro privileges for your session.
          </span>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-xs ${!isAnnual ? "text-slate-100 font-semibold" : "text-slate-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-11 h-6 bg-slate-800 rounded-full p-1 transition-colors border border-slate-700 relative cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full bg-sky-400 transition-transform ${
                isAnnual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs flex items-center gap-1.5 ${isAnnual ? "text-slate-100 font-semibold" : "text-slate-400"}`}>
            <span>Annual Billing</span>
            <Badge variant="success" size="sm">Save 20%</Badge>
          </span>
        </div>

        {/* Pricing Card Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free Tier Summary */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Starter Plan</span>
                <Badge variant="outline" size="sm">Active</Badge>
              </div>
              <div className="text-2xl font-bold text-slate-100 mb-3">$0</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-500" /> 25 MB max file upload</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-500" /> 100,000 row capacity</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-500" /> 50 runs / day</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-500" /> 1 active connector</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-500" /> Basic & Intermediate functions</li>
              </ul>
            </div>
          </div>

          {/* Pro Tier Highlight */}
          <div className="p-4 bg-gradient-to-b from-sky-950/40 to-slate-900 rounded-xl border-2 border-sky-500/50 flex flex-col justify-between relative shadow-lg shadow-sky-500/10">
            <div className="absolute top-3 right-3">
              <Badge variant="pro" size="sm">Recommended</Badge>
            </div>
            <div>
              <div className="text-xs font-semibold text-sky-400 mb-1">DataQuery Pro</div>
              <div className="text-2xl font-bold text-slate-100 mb-3">
                ${isAnnual ? "24" : "29"}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> <strong>500 MB</strong> file capacity</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> <strong>5,000,000</strong> rows analysis</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> <strong>Unlimited</strong> daily runs</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> Advanced DAX & DuckDB window functions</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> Scheduled Automate pipelines</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400" /> White-label unbranded reports</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <Link href="/checkout" onClick={onClose} className="text-xs text-slate-400 hover:text-slate-200 underline">
            View full checkout page
          </Link>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-1 sm:flex-initial">
              Cancel
            </Button>
            <Button
              variant="glow"
              size="sm"
              isLoading={isProcessing}
              onClick={handleTestUpgrade}
              leftIcon={<CreditCard className="w-3.5 h-3.5" />}
              className="flex-1 sm:flex-initial"
            >
              Instant Upgrade (Test Mode)
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
