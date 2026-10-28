"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Terminal, Play, ArrowRight, Menu, X, Shield, Layers, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
              DataQuery<span className="text-sky-400">.in</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
              AI
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-slate-300">
          <Link
            href="/app/playground"
            className="hover:text-sky-400 transition-colors flex items-center gap-1 text-slate-200"
          >
            <Play className="w-3.5 h-3.5 text-sky-400" />
            <span>Playground</span>
          </Link>
          <Link
            href="/connectors"
            className="hover:text-sky-400 transition-colors"
          >
            Connectors
          </Link>
          <Link
            href="/library"
            className="hover:text-sky-400 transition-colors"
          >
            Function Library
          </Link>
          <Link
            href="/pricing"
            className="hover:text-sky-400 transition-colors"
          >
            Open Source
          </Link>
          <Link
            href="/security"
            className="hover:text-sky-400 transition-colors"
          >
            Security
          </Link>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/app/playground">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            >
              Try with sample data
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="glow"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start free
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3">
          <Link
            href="/app/playground"
            className="block text-sm py-2 text-sky-400 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Launch Playground
          </Link>
          <Link
            href="/connectors"
            className="block text-sm py-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Connectors
          </Link>
          <Link
            href="/library"
            className="block text-sm py-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Function Library
          </Link>
          <Link
            href="/pricing"
            className="block text-sm py-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Open Source
          </Link>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/app/playground" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Try with sample data
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" size="sm" className="w-full">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
