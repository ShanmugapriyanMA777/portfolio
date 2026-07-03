"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6 text-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-15" />
      <div className="absolute w-[250px] h-[250px] bg-primary/20 rounded-full blur-[90px] z-[-1] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 space-y-6 text-center"
      >
        <div className="p-4 bg-primary/10 text-primary border border-primary/20 rounded-full w-fit mx-auto animate-pulse">
          <AlertCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-heading font-extrabold text-white tracking-tight">404</h1>
          <h2 className="text-base font-bold text-accent uppercase tracking-widest flex items-center justify-center gap-1.5 mt-2">
            AI Core Offline
            <Sparkles className="w-4 h-4 text-accent" />
          </h2>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed mt-3">
            The requested routing path does not match any index coordinates in Shanmugapriyan's portfolio core.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-xl shadow-premium shadow-primary/25 hover:scale-[1.02] transition-transform text-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Core Hub
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
