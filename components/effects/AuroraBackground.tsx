"use client";

import React from "react";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {/* Blurred decorative glowing auroras */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-aurora-glow" />
      <div className="absolute top-[20%] -right-[10%] w-[55%] h-[55%] rounded-full bg-accent/15 blur-[130px] mix-blend-screen animate-aurora-glow-slow" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purpleAccent/20 blur-[110px] mix-blend-screen animate-aurora-glow" />

      {/* Futuristic Grid backdrop */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-25" />
      
      {/* Radial overlay to dim the center grid edges */}
      <div className="absolute inset-0 bg-radial-gradient-to-b from-transparent via-[#050505]/70 to-[#050505]" />

      <style jsx global>{`
        @keyframes aurora-glow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95) rotate(240deg);
          }
        }
        @keyframes aurora-glow-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(360deg);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.15) rotate(180deg);
          }
        }
        .animate-aurora-glow {
          animation: aurora-glow 25s ease-in-out infinite;
        }
        .animate-aurora-glow-slow {
          animation: aurora-glow-slow 35s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
