"use client";

import React, { useEffect, useRef } from "react";

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let columns = 0;
    let drops: number[] = [];

    const chars = "01011001011001010101010101110010101001010101010001".split("");
    const fontSize = 14;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };

    const draw = () => {
      // Extremely low opacity fade to create trailing tail effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Skip some columns randomly to keep it sparse and clean
        if (i % 3 !== 0) continue;

        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Randomly select between primary (#FF2E63) and accent (#00E5FF) with low opacity
        const colorSeed = Math.random();
        if (colorSeed < 0.1) {
          ctx.fillStyle = "rgba(212, 175, 55, 0.12)"; // Primary (Gold)
        } else if (colorSeed < 0.2) {
          ctx.fillStyle = "rgba(229, 213, 192, 0.12)"; // Accent (Champagne)
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.035)"; // Dull White
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drops when they go out of bounds
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
