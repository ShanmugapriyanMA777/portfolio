"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: emailOrUsername,
          password: password,
        });

        if (authError) {
          setError(authError.message);
        } else {
          router.push("/admin/dashboard");
        }
      } catch (err) {
        setError((err as Error).message || "An authentication error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      // Mock Authentication Bypasser
      setTimeout(() => {
        if (
          (emailOrUsername === "admin" || emailOrUsername === "admin@gmail.com") &&
          password === "password123"
        ) {
          // Set a session marker in localStorage
          localStorage.setItem("portfolio_admin_session", "active");
          router.push("/admin/dashboard");
        } else {
          setError("Invalid admin username/email or password in offline mode. Use admin / password123");
        }
        setLoading(false);
      }, 800);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background visual layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-15" />
      <div className="absolute w-[250px] h-[250px] bg-primary/20 rounded-full blur-[90px] z-[-1] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 relative border-white/5 shadow-2xl"
      >
        <div className="text-center space-y-3 mb-8">
          <div className="p-3.5 bg-primary/10 text-primary rounded-2xl w-fit mx-auto border border-primary/20">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-xl font-heading font-extrabold text-white flex items-center justify-center gap-1.5">
            Admin CMS Panel
            <Sparkles className="w-4 h-4 text-accent" />
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {!isSupabaseConfigured ? "Demo/Offline Mode Active" : "Supabase Cloud Secure Core"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* User Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email or Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input suppressHydrationWarning
                type="text"
                placeholder="admin"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs pl-10 pr-4 py-3 rounded-xl transition-all"
              />
            </div>
          </div>

          {/* Pass Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input suppressHydrationWarning
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs pl-10 pr-4 py-3 rounded-xl transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button suppressHydrationWarning
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-premium mt-4"
          >
            {loading ? "Authenticating..." : "Establish Secure Session"}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-gray-600 font-bold border-t border-white/5 pt-4 uppercase">
          {!isSupabaseConfigured && (
            <span>Use credentials: <code className="text-accent">admin</code> / <code className="text-accent">password123</code></span>
          )}
        </div>
      </motion.div>
    </main>
  );
}
