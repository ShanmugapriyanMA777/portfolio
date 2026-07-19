"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, MapPin, Award, Code, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { mockProfile, Profile } from "@/lib/mockData";
import { db } from "@/lib/db";

export default function Hero() {
  const [profile, setProfile] = useState<Profile>(mockProfile);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await db.getProfile();
        if (data) setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    loadProfile();
  }, []);
  return (
    <section id="hero" className="relative min-h-screen bg-[#050505] flex items-stretch overflow-hidden border-b border-white/5">
      
      {/* 50/50 Grid container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Resume-style structured details sheet (7 cols on large, 5 cols photo on right) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-16 lg:pr-12 relative z-10 bg-[#050505]"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Online • Active for Hirings
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-primary font-bold tracking-widest uppercase mt-2">
              AI Engineer & Full-Stack Architect
            </p>
          </div>

          {/* CV Details Grid Sheet (Structured like the screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-b border-white/5 py-8 mb-8 text-left">
            
            {/* Sec 1: Professional Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Location & Contact
                </h4>
                <p className="text-xs text-white font-semibold mt-1">{profile.location}</p>
                <a href={`mailto:${profile.email}`} className="text-[11px] text-gray-400 font-semibold hover:text-primary transition-colors block mt-0.5">
                  {profile.email}
                </a>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-primary" /> Academic Core
                </h4>
                <p className="text-xs text-white font-semibold mt-1">B.E. Computer Science</p>
                <span className="text-[10px] text-gray-400 font-semibold">Anna University affiliated • 8.9 CGPA</span>
              </div>
            </div>

            {/* Sec 2: Core Toolset & Hard Skills */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-primary" /> Hard Skills
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Python", "PyTorch", "Power BI", "SQL", "Next.js", "Docker"].map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-bold text-gray-400 px-2 py-0.5 bg-white/5 rounded border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>


            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold px-6 py-3 rounded-xl shadow-premium shadow-primary/25 transition-all hover:scale-[1.02] cursor-pointer text-xs uppercase tracking-wider"
              suppressHydrationWarning
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Link>

            <Link
              href="/#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer text-xs uppercase tracking-wider"
              suppressHydrationWarning
            >
              View Case Studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </motion.div>

        {/* RIGHT COLUMN: Full-height spotlight portrait cover frame (5 cols on large) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-5 relative min-h-[450px] lg:min-h-screen overflow-hidden bg-black flex items-stretch border-l border-white/5"
        >
          {/* Background spotlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          
          {/* User's profile photo - cropped dynamically using CSS object-position to showcase the spotlight suit portrait */}
          <Image
            src="/images/profile.jpg"
            alt="Shanmugapriyan Portrait"
            fill
            className="object-cover object-top select-none pointer-events-none transition-transform duration-700 hover:scale-[1.03]"
            priority
          />

          {/* Corner glow decorative tags */}
          <div className="absolute bottom-6 left-6 z-20 hidden lg:block text-left bg-black/60 backdrop-blur-md border border-white/5 px-4.5 py-3 rounded-2xl">
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest block">AI ENGINEER</span>
            <span className="text-xs font-bold text-white mt-0.5 block">Shanmugapriyan</span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
