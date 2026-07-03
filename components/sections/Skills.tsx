"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Brain, BarChart, Code, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/lib/mockData";
import { db } from "@/lib/db";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

// Mapping icons dynamically based on name/category
const getSkillCategoryIcon = (category: string) => {
  switch (category) {
    case "AI & Machine Learning":
      return <Brain className="w-4 h-4 text-primary" />;
    case "Power BI":
      return <BarChart className="w-4 h-4 text-accent" />;
    case "Frontend":
      return <Code className="w-4 h-4 text-purpleAccent" />;
    default:
      return <Cpu className="w-4 h-4 text-gray-400" />;
  }
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await db.getSkills();
        setSkills(data);
      } catch (err) {
        console.error("Error loading skills:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  const categories = ["All", "AI & Machine Learning", "Power BI", "Frontend", "Databases & Cloud"];

  // Filter skills based on search query and category tab
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" ||
        skill.category === selectedCategory ||
        (selectedCategory === "Databases & Cloud" &&
          (skill.category === "Databases" || skill.category === "Backend" || skill.category === "Cloud" || skill.category === "DevOps"));
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, searchQuery, selectedCategory]);

  // Aggregate stats for the Recharts Radar visualizer
  const chartData = [
    { subject: "AI & ML", A: 90, fullMark: 100 },
    { subject: "Power BI", A: 95, fullMark: 100 },
    { subject: "Frontend", A: 92, fullMark: 100 },
    { subject: "Databases", A: 86, fullMark: 100 },
    { subject: "DevOps / Git", A: 85, fullMark: 100 },
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Skills</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Technical Expertise & Proficiencies
          </p>
          <div className="w-16 h-[3px] bg-accent mt-4 rounded-full" />
        </div>

        {/* Skill Graph and Search Controls Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Radar Chart (Left 5 Columns) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 h-[320px] flex flex-col justify-center items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Competency Map</h3>
            <div className="w-full h-full max-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" radius="70%" data={chartData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="rgba(255,255,255,0.1)" />
                  <Radar
                    name="Shanmugapriyan"
                    dataKey="A"
                    stroke="#00e5ff"
                    fill="#00e5ff"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters & Search input (Right 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <input suppressHydrationWarning
                type="text"
                placeholder="Search a language, library, database, or tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 focus:border-accent/40 outline-none text-white text-sm pl-12 pr-4 py-3.5 rounded-2xl transition-all placeholder-gray-500 font-medium"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button suppressHydrationWarning
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-accent/15 border-accent text-accent shadow-glow-accent/5"
                      : "bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat === "All" ? "All Skills" : cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={skill.id}
                className="glass-panel rounded-2xl p-6 spotlight-card group hover:border-accent/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-accent/25 transition-colors">
                      {getSkillCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <span className="text-[10px] text-gray-500 font-medium">{skill.category}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-accent">{skill.proficiency}%</div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-5.5 min-h-[36px]">
                  {skill.description}
                </p>

                {/* Progress Indicators */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500 font-bold">PROFICIENCY</span>
                    <span className="text-gray-400 font-semibold">{skill.experience_years} Yrs Exp</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-purpleAccent rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm glass-panel rounded-3xl border-dashed">
            No technical skills match the current search filters.
          </div>
        )}

      </div>
    </section>
  );
}
