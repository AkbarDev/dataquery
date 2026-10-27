"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/useAppStore";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Terminal, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("analyst@dataquery.in");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome Back", "Signed into your DataQuery analytical workspace.");
      router.push("/app/playground");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md">
              <Terminal className="w-5 h-5 stroke-[2.5]" />
            </div>
          </Link>
          <h1 className="text-xl font-bold text-slate-100">Log In to DataQuery</h1>
          <p className="text-xs text-slate-400">
            Access your visual playground, connected feeds, and dashboards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-center">
            <Link
              href="/app/playground"
              className="text-xs text-sky-400 hover:text-sky-300 font-medium"
            >
              Skip login &amp; test with sample data →
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-semibold">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
