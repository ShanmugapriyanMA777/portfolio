"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Globe, Eye, Heart, Download, Calendar, Briefcase, Award, CheckCircle, Lightbulb } from "lucide-react";
import { db } from "@/lib/db";
import { Project } from "@/lib/mockData";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const res = await db.getProjectById(id);
      if (res) {
        setProject(res);
        setLikesCount(res.likes);
        // Log view visit
        db.logVisitor(`/projects/${id}`);
      } else {
        router.push("/#projects");
      }
      setLoading(false);
    };
    if (id) fetchProject();
  }, [id, router]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  // Mock performance/testing data for charts
  const perfData = [
    { name: "Test 1", latency: 120, accuracy: 88 },
    { name: "Test 2", latency: 95, accuracy: 91 },
    { name: "Test 3", latency: 70, accuracy: 93 },
    { name: "Test 4", latency: 62, accuracy: 94 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Loading Case Study...</span>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[#050505] py-24 relative overflow-hidden text-left">
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary mb-10 transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>

        {/* Case Study Header block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-8">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white mt-3">
              {project.title}
            </h1>
            <p className="text-sm text-gray-400 mt-4.5 leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Quick Info Box (Right 4 columns) */}
          <div className="md:col-span-4 w-full glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <Briefcase className="w-4.5 h-4.5 text-primary shrink-0" />
              <span className="text-gray-500 font-bold uppercase">Role:</span>
              <span className="text-white font-semibold ml-auto">{project.role}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Calendar className="w-4.5 h-4.5 text-accent shrink-0" />
              <span className="text-gray-500 font-bold uppercase">Duration:</span>
              <span className="text-white font-semibold ml-auto">{project.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Award className="w-4.5 h-4.5 text-purpleAccent shrink-0" />
              <span className="text-gray-500 font-bold uppercase">Status:</span>
              <span className="text-emerald-400 font-semibold ml-auto">{project.status}</span>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2.5">
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/20 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Repository
              </a>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition-all shadow-premium cursor-pointer"
                >
                  <Globe className="w-4.5 h-4.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Visual Showcase placeholder */}
        <div className="h-[300px] w-full rounded-3xl overflow-hidden glass-panel relative flex items-center justify-center bg-gradient-to-tr from-black/90 to-[#12121c] mb-12">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:20px_20px] opacity-15" />
          <div className="absolute w-[200px] h-[200px] bg-primary/10 rounded-full blur-[70px] pointer-events-none" />
          
          <div className="relative text-center p-8 space-y-4">
            <Award className="w-16 h-16 text-primary/60 mx-auto" />
            <h3 className="text-lg font-extrabold text-white">Interactive Model Architecture Diagram</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Visual details regarding pipeline layers, activation nodes, and loss operations.
            </p>
          </div>

          {/* Overlay counts */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4 bg-black/60 border border-white/5 px-4 py-2 rounded-xl text-xs text-gray-400 font-bold z-20">
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-accent" /> {project.views}</span>
            <button suppressHydrationWarning onClick={handleLike} className={`flex items-center gap-1.5 ${isLiked ? "text-primary" : ""}`}>
              <Heart className={`w-4 h-4 ${isLiked ? "fill-primary" : ""}`} /> {likesCount}
            </button>
          </div>
        </div>

        {/* Case Study Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Main Case Text (8 columns) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Problem & Solution block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-3">
                  <AlertCircleIcon /> Problem Statement
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{project.problem_statement}</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4" /> Proposed Solution
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">System Deliverables & Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="p-1 bg-primary/10 text-primary rounded-md mt-0.5 shrink-0">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Optimization */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">Technical Challenges & Workarounds</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* Future Roadmaps */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">Future Research & Extensions</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.future_scope}
              </p>
            </div>
          </div>

          {/* Performance Charts (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Chart Card */}
            <div className="glass-panel rounded-2xl p-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Pipeline Optimization</h3>
              
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={perfData}>
                    <defs>
                      <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="latency" stroke="#00e5ff" fillOpacity={1} fill="url(#perfGrad)" strokeWidth={1.5} />
                    <XAxis dataKey="name" fontSize={9} stroke="rgba(255,255,255,0.2)" />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0f0f14", borderColor: "#222", fontSize: 9 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[10px] text-gray-500 font-bold uppercase mt-4 text-center">
                Latency Reduction (Milliseconds)
              </div>
            </div>

            {/* Comment Section Placeholder */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Discussion</h3>
              
              <div className="space-y-3">
                <input suppressHydrationWarning
                  type="text"
                  placeholder="Share a question regarding implementation..."
                  className="w-full bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs px-3 py-2 rounded-xl transition-all"
                />
                <button suppressHydrationWarning
                  onClick={() => alert("Discussion submission recorded in guest log.")}
                  className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-[10px] transition-all cursor-pointer"
                >
                  Submit Query
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

// Inline custom alert icon
function AlertCircleIcon() {
  return (
    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}
