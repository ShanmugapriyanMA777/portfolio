"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Experience, Education } from "@/lib/mockData";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// Helper to return tags for experience roles
const getExperienceTags = (company: string) => {
  if (company.includes("Research")) {
    return ["Python", "PyTorch", "TensorFlow", "Computer Vision", "NLP", "YOLOv8", "ResNet"];
  }
  return ["Power BI", "DAX", "Next.js", "TypeScript", "PostgreSQL", "Supabase", "AWS"];
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    async function loadTimelineData() {
      try {
        const [expData, eduData] = await Promise.all([
          db.getExperience(),
          db.getEducation()
        ]);
        setExperiences(expData);
        setEducations(eduData);
      } catch (err) {
        console.error("Error loading timeline data:", err);
      }
    }
    loadTimelineData();
  }, []);
  return (
    <section id="experience" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Timeline</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Professional & Academic Journey
          </p>
          <div className="w-16 h-[3px] bg-primary mt-4 rounded-full" />
        </div>

        {/* Career Timeline */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-white">Work History</h3>
          </div>

          <div className="relative border-l border-white/5 pl-8 ml-4 flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={exp.id}
                className="relative group"
              >
                {/* Timeline Node Glow */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                </div>

                <div className="glass-panel rounded-2xl p-6.5 hover:border-primary/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-primary transition-colors">
                        {exp.position}
                      </h4>
                      <div className="text-xs text-accent font-semibold mt-1">{exp.company}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date || "")}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{exp.description}</p>
                  
                  {/* Achievements */}
                  <ul className="flex flex-col gap-2 mb-6.5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills/Tools applied */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {getExperienceTags(exp.company).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-gray-400 px-2.5 py-1 bg-white/5 rounded-md border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-white">Education</h3>
          </div>

          <div className="relative border-l border-white/5 pl-8 ml-4 flex flex-col gap-12">
            {educations.map((edu, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={edu.id}
                className="relative group"
              >
                {/* Timeline Node Glow */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
                </div>

                <div className="glass-panel rounded-2xl p-6.5 hover:border-accent/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-accent transition-colors">
                        {edu.degree}
                      </h4>
                      <div className="text-xs text-purpleAccent font-semibold mt-1">{edu.institution}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                    </div>
                  </div>

                  <div className="text-xs text-white font-bold mb-4">Grade Score: {edu.grade}</div>
                  
                  {/* Achievements */}
                  <ul className="flex flex-col gap-2">
                    {edu.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
