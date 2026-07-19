"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Briefcase, User, GraduationCap, MapPin, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { mockExperience, mockEducation, mockProfile, Profile, Experience, Education } from "@/lib/mockData";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function About() {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperience);
  const [educations, setEducations] = useState<Education[]>(mockEducation);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const [profileData, expData, eduData] = await Promise.all([
          db.getProfile(),
          db.getExperience(),
          db.getEducation()
        ]);
        if (profileData) setProfile(profileData);
        if (expData) setExperiences(expData);
        if (eduData) setEducations(eduData);
      } catch (err) {
        console.error("Error loading about data:", err);
      }
    }
    loadAboutData();
  }, []);
  return (
    <section id="about" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">About Me</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Journey & Engineering Philosophy
          </p>
          <div className="w-16 h-[3px] bg-primary mt-4 rounded-full" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Box 1: Story & Objective (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 glass-panel rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">My Story</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                I am a dedicated software researcher and developer based in Tamil Nadu, India. From early in my computing journey, I was drawn to the intersection of data science and user interface designs—bridging the gap between numerical predictions and fluid user screens.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether deploying neural networks on mobile device endpoints, writing DAX equations to report revenue flows, or compiling reactive Next.js full-stack APIs, I emphasize code cleanliness, low operational latency, and visual aesthetics.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Mission</div>
                <div className="text-sm font-semibold text-white mt-1">Squeeze complex math into simple, beautiful products.</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Core Focus</div>
                <div className="text-sm font-semibold text-white mt-1">Computer Vision, BI Data Pipelines & Full-Stack Apps.</div>
              </div>
            </div>
          </motion.div>

          {/* Box 2: Quick Facts (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 glass-panel rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-6">Quick Details</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium ml-auto">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-gray-400">Age/Status:</span>
                  <span className="text-white font-medium ml-auto">Active Developer</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-purpleAccent" />
                  <span className="text-gray-400">Education:</span>
                  <span className="text-white font-medium ml-auto">B.E. CSE</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400">Interests:</span>
                  <span className="text-white font-medium ml-auto">Biometrics, AI Edge</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={profile.calendar_url}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/20 rounded-xl font-bold text-xs text-white block transition-all"
              >
                Schedule Virtual Coffee
              </a>
            </div>
          </motion.div>

          {/* Box 3: Professional Experience Timeline (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 glass-panel rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 text-accent rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Experience</h3>
            </div>

            <div className="relative border-l border-white/5 pl-6 ml-2 flex flex-col gap-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-[#050505] group-hover:scale-125 transition-transform" />
                  
                  <div className="text-xs text-gray-500 font-bold">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date || "")}
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{exp.position}</h4>
                  <div className="text-xs text-accent font-medium mt-0.5">{exp.company}</div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{exp.description}</p>
                  
                  <ul className="mt-2.5 flex flex-col gap-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                        <span className="text-primary mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Box 4: Academic Journey (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-6 glass-panel rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purpleAccent/10 text-purpleAccent rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Education</h3>
            </div>

            <div className="relative border-l border-white/5 pl-6 ml-2 flex flex-col gap-8">
              {educations.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-purpleAccent border-2 border-[#050505] group-hover:scale-125 transition-transform" />
                  
                  <div className="text-xs text-gray-500 font-bold">
                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{edu.degree}</h4>
                  <div className="text-xs text-purpleAccent font-medium mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-gray-300 font-semibold mt-1">Grade: {edu.grade}</div>
                  
                  <ul className="mt-2.5 flex flex-col gap-1">
                    {edu.achievements.map((ach, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                        <span className="text-accent mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
