"use client";

import React, { useState, useEffect } from "react";
import { Brain, BarChart3, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Service } from "@/lib/mockData";
import { db } from "@/lib/db";

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "cpu":
      return <Brain className="w-6 h-6 text-primary" />;
    case "bar-chart-3":
      return <BarChart3 className="w-6 h-6 text-accent" />;
    default:
      return <Globe className="w-6 h-6 text-purpleAccent" />;
  }
};

const getServiceGlow = (iconName: string) => {
  switch (iconName) {
    case "cpu":
      return "group-hover:border-primary/20 hover:shadow-primary/5";
    case "bar-chart-3":
      return "group-hover:border-accent/20 hover:shadow-accent/5";
    default:
      return "group-hover:border-purpleAccent/20 hover:shadow-purpleAccent/5";
  }
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await db.getServices();
        setServices(data);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const handleInquiry = (serviceName: string) => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Pre-fill subject if input is available
      const subjectInput = document.getElementById("contact-subject") as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${serviceName}`;
      }
    }
  };

  return (
    <section id="services" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Services</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Professional Packages & Solutions
          </p>
          <div className="w-16 h-[3px] bg-primary mt-4 rounded-full" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((ser, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={ser.id}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between group border border-white/5 transition-all duration-300 ${getServiceGlow(
                ser.icon
              )}`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl w-fit mb-6.5">
                  {getServiceIcon(ser.icon)}
                </div>

                <h3 className="font-heading font-extrabold text-lg text-white mb-2 group-hover:text-white transition-colors">
                  {ser.name}
                </h3>
                
                {/* Price block */}
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-white font-heading">{ser.price_range.split(" - ")[0]}</span>
                  <span className="text-xs text-gray-500 font-bold">base rate</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {ser.description}
                </p>

                {/* Features checklist */}
                <ul className="space-y-3 mb-8.5">
                  {ser.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button suppressHydrationWarning
                  onClick={() => handleInquiry(ser.name)}
                  className="w-full py-3 bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Book Consultation
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
