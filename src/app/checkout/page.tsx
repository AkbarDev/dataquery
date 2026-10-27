"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { upgradeToPro } = useAppStore();

  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("321");
  const [name, setName] = useState("Jane Doe");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPro();
      setIsProcessing(false);
      toast.success(
        "Subscription Activated (Test Mode)",
        "Welcome to DataQuery Pro! Unlimited runs and full DAX/DuckDB access are now unlocked."
      );
      router.push("/app/playground");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg space-y-6">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Pricing</span>
        </Link>

        {/* Clear Test Mode Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-300 flex items-start gap-3 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold uppercase tracking-wider text-[11px]">
              Simulated Checkout Sandbox (Test Mode)
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              No real financial transaction will occur. This is a sandbox demonstration checkout for evaluation purposes.
            </p>
          </div>
        </div>

        {/* Checkout Card */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">
                Subscription Order
              </span>
              <h2 className="text-lg font-bold text-slate-100">
                DataQuery Pro Plan
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-slate-100">$29</span>
              <span className="text-xs text-slate-400 block font-normal">/ month</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Card Information (Sandbox)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-950 p-2.5 pl-9 rounded-lg border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-400"
                />
                <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Expiration
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  CVC / CVV
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-bit TLS Encrypted Session</span>
              </span>
              <span>Cancel anytime in Settings</span>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={isProcessing}
              className="w-full justify-center"
              leftIcon={<Sparkles className="w-4 h-4 text-slate-950" />}
            >
              Complete Test Order ($29/mo)
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
