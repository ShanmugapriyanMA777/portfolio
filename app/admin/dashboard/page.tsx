"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Plus, Trash2, Edit2, LogOut, Download, FileText, Code, Database, Users, LineChart, MessageSquare, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mockProjects, mockSkills, Project, Skill } from "@/lib/mockData";
import { db } from "@/lib/db";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills" | "messages" | "backups">("overview");
  
  // Local state to simulate database edits during current session
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [messages, setMessages] = useState([
    { id: "1", name: "John Doe", email: "john@google.com", subject: "ML Diagnostic Consulting", message: "We would like to hire you to consult on building symptom classifiers.", created_at: "2026-06-25T10:00:00Z" },
    { id: "2", name: "Sarah Connor", email: "sarah@skynet.net", subject: "Full Stack Automation", message: "Need a real-time next-generation booking queue platform configured.", created_at: "2026-06-26T12:00:00Z" },
  ]);

  // Session guard
  useEffect(() => {
    const session = localStorage.getItem("portfolio_admin_session");
    if (!session) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_session");
    router.push("/admin");
  };

  // CRUD for Projects
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProject = () => {
    const title = prompt("Enter project title:");
    if (!title) return;
    const category = prompt("Enter category (AI & Machine Learning / Power BI / Full Stack Development):") || "AI & Machine Learning";
    const description = prompt("Enter brief description:") || "Custom system built with dynamic models.";
    
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      category,
      description,
      problem_statement: "Operational friction",
      solution: "Configured intelligent pipelines",
      features: ["Real-time visual panels", "Dynamic tracking indices"],
      challenges: "Scale tuning",
      future_scope: "Embed NLP triggers",
      role: "Lead Architect",
      duration: "3 Months",
      timeline: "Jun 2026",
      status: "Active",
      github_url: "https://github.com",
      live_url: "",
      views: 0,
      likes: 0,
      downloads: 0,
      display_order: projects.length + 1,
      created_at: new Date().toISOString(),
      images: [{ image_url: "/images/projects/disease-analyzer-hero.jpg", is_hero: true }]
    };

    setProjects((prev) => [...prev, newProj]);
  };

  // CRUD for Skills
  const handleDeleteSkill = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleAddSkill = () => {
    const name = prompt("Enter skill name:");
    if (!name) return;
    const category = prompt("Enter category (AI & Machine Learning / Power BI / Frontend / Databases):") || "Frontend";
    const proficiencyStr = prompt("Enter proficiency percentage (0-100):") || "80";
    const proficiency = parseInt(proficiencyStr, 10) || 80;

    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name,
      category,
      icon: "cpu",
      description: "Added from administration dashboard.",
      experience_years: 2,
      proficiency,
      display_order: skills.length + 1
    };

    setSkills((prev) => [...prev, newSkill]);
  };

  // Data exporter
  const handleExportData = () => {
    const backupObj = { projects, skills, messages };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Mock visitor traffic metrics
  const visitorChartData = [
    { name: "Mon", visitors: 42, downloads: 4 },
    { name: "Tue", visitors: 65, downloads: 8 },
    { name: "Wed", visitors: 82, downloads: 14 },
    { name: "Thu", visitors: 56, downloads: 11 },
    { name: "Fri", visitors: 94, downloads: 22 },
    { name: "Sat", visitors: 112, downloads: 35 },
    { name: "Sun", visitors: 145, downloads: 42 },
  ];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col justify-start relative text-left">
      
      {/* Top dashboard header bar */}
      <header className="w-full border-b border-white/5 bg-black/40 backdrop-blur px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h1 className="font-heading font-extrabold text-white text-base">Shanmugapriyan Admin Panel</h1>
        </div>
        <button suppressHydrationWarning
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-red-500/30 rounded-xl text-xs font-bold text-gray-400 hover:text-red-400 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </header>

      {/* Main dashboard contents */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Sidebar tabs (3 columns) */}
        <aside className="md:col-span-3 space-y-2">
          {[
            { id: "overview", name: "Overview Analytics", icon: <LineChart className="w-4 h-4" /> },
            { id: "projects", name: "Manage Projects", icon: <Code className="w-4 h-4" /> },
            { id: "skills", name: "Manage Skills", icon: <Database className="w-4 h-4" /> },
            { id: "messages", name: "Customer Messages", icon: <MessageSquare className="w-4 h-4" /> },
            { id: "backups", name: "System Backups", icon: <Download className="w-4 h-4" /> },
          ].map((tab) => (
            <button suppressHydrationWarning
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3.5 border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary/10 border-primary text-primary shadow-glow-primary/5"
                  : "bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </aside>

        {/* Tab pages (9 columns) */}
        <div className="md:col-span-9 w-full">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stat block row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Site Views", val: "3,892", label: "+14% this week", color: "text-accent" },
                  { title: "Likes Received", val: "1,242", label: "+8% this week", color: "text-primary" },
                  { title: "CV Downloads", val: "142", label: "v2.4 downloads", color: "text-purpleAccent" },
                  { title: "Client Leads", val: "2 active", label: "Pending replies", color: "text-white" },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-panel rounded-2xl p-5 border-white/5">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{stat.title}</div>
                    <div className={`text-xl font-bold font-heading mt-2 ${stat.color}`}>{stat.val}</div>
                    <div className="text-[9px] text-gray-500 font-bold mt-1.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Traffic Chart */}
              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">Visitor Traffic Log (Dynamic 7 Days)</h3>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitorChartData}>
                      <defs>
                        <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff2e63" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#ff2e63" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="name" fontSize={10} stroke="rgba(255,255,255,0.2)" />
                      <YAxis hide />
                      <Tooltip contentStyle={{ background: "#0f0f14", borderColor: "#222", fontSize: 10 }} />
                      <Area type="monotone" dataKey="visitors" stroke="#ff2e63" strokeWidth={1.5} fillOpacity={1} fill="url(#dashboardGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-lg text-white">Project Showcase CRUD</h3>
                <button suppressHydrationWarning
                  onClick={handleAddProject}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-premium cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Project
                </button>
              </div>

              {/* List grid */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="glass-panel rounded-2xl p-5 border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <span className="text-[10px] text-accent font-semibold mt-1 inline-block">{proj.category}</span>
                      <p className="text-[10px] text-gray-500 mt-2 line-clamp-1 max-w-lg">{proj.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button suppressHydrationWarning
                        onClick={() => alert("Mock Project Editor: Edits local component states in demo mode.")}
                        className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-colors cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button suppressHydrationWarning
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 bg-white/5 text-gray-400 hover:text-red-400 rounded-xl border border-white/5 hover:border-red-500/20 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-lg text-white">Skills Matrix CRUD</h3>
                <button suppressHydrationWarning
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-gradient-to-r from-accent to-purpleAccent hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-premium cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Tech Skill
                </button>
              </div>

              {/* List grid */}
              <div className="grid grid-cols-1 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="glass-panel rounded-2xl p-5 border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <span className="text-[10px] text-purpleAccent font-semibold mt-1 inline-block">{skill.category}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-xs font-bold text-accent">{skill.proficiency}% level</div>
                      <div className="flex items-center gap-2">
                        <button suppressHydrationWarning
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-2 bg-white/5 text-gray-400 hover:text-red-400 rounded-xl border border-white/5 hover:border-red-500/20 transition-colors cursor-pointer"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h3 className="font-heading font-extrabold text-lg text-white">Incoming Client Leads</h3>
              
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-panel rounded-2xl p-5.5 border-white/5 text-xs text-left relative">
                    <div className="flex items-start justify-between mb-3 border-b border-white/5 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-[10px] text-accent font-semibold hover:underline block mt-0.5">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-[9px] text-gray-500 font-bold">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="font-bold text-white mb-2">Subject: {msg.subject}</div>
                    <p className="text-gray-400 leading-relaxed font-medium">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM BACKUPS */}
          {activeTab === "backups" && (
            <div className="glass-panel rounded-3xl p-8 space-y-6 text-center max-w-md mx-auto">
              <Database className="w-12 h-12 text-primary mx-auto opacity-75" />
              <h3 className="font-heading font-extrabold text-lg text-white">Database Backup & Restores</h3>
              
              <p className="text-xs text-gray-400 leading-relaxed">
                Export all static portfolios, skills, achievements, and messages data tables to a single encrypted JSON config file, allowing easy backups and offsite server restores.
              </p>

              <div className="space-y-3 pt-4">
                <button suppressHydrationWarning
                  onClick={handleExportData}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-premium cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Export Data JSON
                </button>
                
                <button suppressHydrationWarning
                  onClick={() => alert("Restore database: Select file and click upload.")}
                  className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Import Data Backup
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
