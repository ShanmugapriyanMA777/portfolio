"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  px: number; // projected x
  py: number; // projected y
}

export default function Sphere3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.003, y: 0.004 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const points: Point3D[] = [];
    const numPoints = 180;
    const sphereRadius = 150;
    const depth = 400; // perspective depth

    // Generate points uniformly distributed on a sphere (Fibonacci lattice)
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius of circle at y

      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        px: 0,
        py: 0,
      });
    }

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    const rotateX = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = point.y * cos - point.z * sin;
      const z1 = point.z * cos + point.y * sin;
      point.y = y1;
      point.z = z1;
    };

    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = point.x * cos - point.z * sin;
      const z1 = point.z * cos + point.x * sin;
      point.x = x1;
      point.z = z1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Adjust rotation speed dynamically based on mouse position
      const targetRX = 0.002 + (mouseRef.current.y * 0.0001);
      const targetRY = 0.003 + (mouseRef.current.x * 0.0001);
      rotationRef.current.x += (targetRX - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (targetRY - rotationRef.current.y) * 0.05;

      // Project and draw points
      points.forEach((point) => {
        rotateX(point, rotationRef.current.x);
        rotateY(point, rotationRef.current.y);

        // Perspective projection
        const scale = depth / (depth + point.z);
        point.px = cx + point.x * scale;
        point.py = cy + point.y * scale;

        // Calculate opacity based on depth (front is bright, back is dull)
        const alpha = Math.max(0.12, (sphereRadius - point.z) / (sphereRadius * 2));
        
        ctx.beginPath();
        // Dot size scales with depth
        const radius = Math.max(0.5, scale * 1.8);
        ctx.arc(point.px, point.py, radius, 0, Math.PI * 2);

        // Gradient coloring based on depth
        if (point.z < 0) {
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`; // Primary color for foreground (Gold)
        } else {
          ctx.fillStyle = `rgba(229, 213, 192, ${alpha})`; // Accent color for background (Champagne)
        }
        ctx.fill();
      });

      // Draw faint connections between adjacent points
      ctx.lineWidth = 0.4;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if close together
          if (dist < 40) {
            const scale = depth / (depth + (points[i].z + points[j].z) / 2);
            const alpha = Math.max(0.02, (1 - dist / 40) * 0.12) * scale;
            ctx.beginPath();
            ctx.moveTo(points[i].px, points[i].py);
            ctx.lineTo(points[j].px, points[j].py);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - canvas.width / 2;
      const y = e.clientY - rect.top - canvas.height / 2;
      mouseRef.current = { x, y };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
      {/* Background glow behind sphere */}
      <div className="absolute w-[200px] h-[200px] bg-primary/20 rounded-full blur-[80px] z-[-1] pointer-events-none" />
    </div>
  );
}
