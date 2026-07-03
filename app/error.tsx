"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception captured:", error);
  }, [error]);

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
          <AlertTriangle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-heading font-extrabold text-white tracking-tight">500</h1>
          <h2 className="text-base font-bold text-accent uppercase tracking-widest mt-2">
            AI Core Exception
          </h2>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed mt-3">
            An internal runtime exception has occurred. The diagnostic details have been logged in the error logs.
          </p>
        </div>

        <div className="pt-4 flex gap-3 justify-center">
          <button suppressHydrationWarning
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Core
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-5 py-2.5 rounded-xl shadow-premium shadow-primary/25 hover:scale-[1.02] transition-transform text-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
