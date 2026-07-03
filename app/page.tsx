"use client";

import React, { useEffect } from "react";
import Particles from "@/components/effects/Particles";
import AuroraBackground from "@/components/effects/AuroraBackground";
import CodeRain from "@/components/effects/CodeRain";
import NeuralNetwork from "@/components/effects/NeuralNetwork";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { db } from "@/lib/db";

export default function Home() {
  useEffect(() => {
    // Track sitemaps logging for landing visitor view
    db.logVisitor("/");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Visual Effects Layers */}
      <AuroraBackground />
      <Particles />
      <CodeRain />
      <NeuralNetwork />

      {/* Main Page Layout Sections */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <Hero />
        
        {/* ABOUT ME TIMELINE SECTION */}
        <About />

        {/* SKILLS CARDS GRID SECTION */}
        <Skills />

        {/* PROJECTS CASE STUDIES GRID SECTION */}
        <Projects />

        {/* EXPERIENCE WORK HISTORY SECTION */}
        <Experience />

        {/* CERTIFICATES LIGHTBOX SECTION */}
        <Certificates />

        {/* SERVICES PRICING CARDS SECTION */}
        <Services />

        {/* VALIDATED CONTACT FORM SECTION */}
        <Contact />
      </main>

    </div>
  );
}
