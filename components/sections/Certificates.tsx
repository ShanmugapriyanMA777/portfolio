"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Award, ExternalLink, Download, X, ZoomIn, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate } from "@/lib/mockData";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const data = await db.getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  const categories = ["All", "AI & Machine Learning", "Cloud & DevOps", "Power BI", "Data Science"];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory = selectedCategory === "All" || cert.category === selectedCategory;
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [certificates, searchQuery, selectedCategory]);

  return (
    <section id="certificates" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Credentials</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Professional Certifications
          </p>
          <div className="w-16 h-[3px] bg-accent mt-4 rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button suppressHydrationWarning
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent/10 border-accent text-accent shadow-glow-accent/5"
                    : "bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "All" ? "All Credentials" : cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input suppressHydrationWarning
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/5 focus:border-accent/40 outline-none text-white text-xs pl-10 pr-3.5 py-2.5 rounded-xl w-[220px] transition-all placeholder-gray-500 font-semibold"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={cert.id}
                onClick={() => setActiveCertificate(cert)}
                className="glass-panel rounded-2xl overflow-hidden group hover:border-accent/25 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-[150px] bg-gradient-to-br from-black/90 to-[#121217] flex items-center justify-center border-b border-white/5 overflow-hidden">
                  {cert.thumbnail_url ? (
                    <img
                      src={cert.thumbnail_url}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <Award className="absolute w-10 h-10 text-accent/20 group-hover:text-accent group-hover:scale-110 transition-all duration-300 z-0 pointer-events-none" />
                  
                  {/* Hover Eye overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300 z-10">
                    <div className="p-2 bg-accent/25 text-accent rounded-full">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{cert.category}</span>
                    <h4 className="text-xs font-bold text-white mt-1.5 group-hover:text-accent transition-colors line-clamp-1">
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-semibold mt-1">Issuer: {cert.issuer}</p>
                  </div>

                  <div className="pt-3.5 mt-4.5 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-500 font-bold">
                    <span>Issued {formatDate(cert.issue_date)}</span>
                    <span className="text-gray-400">ID: {cert.credential_id.split("-")[0]}...</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm glass-panel rounded-3xl border-dashed">
            No certifications match the selected query criteria.
          </div>
        )}

        {/* Lightbox / Fullscreen Modal */}
        <AnimatePresence>
          {activeCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
              onClick={() => setActiveCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4.5 border-b border-white/5 bg-black/40">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-accent" />
                    <div>
                      <h3 className="text-sm font-bold text-white leading-none">{activeCertificate.title}</h3>
                      <span className="text-[10px] text-gray-500 font-bold mt-1 inline-block">{activeCertificate.category}</span>
                    </div>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => setActiveCertificate(null)}
                    className="p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Visual Block */}
                <div className="relative h-[280px] w-full bg-gradient-to-tr from-[#0b0c10] to-[#1a1c23] flex items-center justify-center border-b border-white/5 overflow-hidden">
                  {activeCertificate.thumbnail_url ? (
                    <img
                      src={activeCertificate.thumbnail_url}
                      alt={activeCertificate.title}
                      className="w-full h-full object-contain p-4 z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0">
                    <Award className="w-16 h-16 text-accent mb-4 opacity-40" />
                    <h4 className="text-sm font-extrabold text-white px-8">{activeCertificate.title}</h4>
                    <p className="text-xs text-gray-500 mt-2">Issued by {activeCertificate.issuer}</p>
                  </div>
                </div>

                {/* Modal Details Info */}
                <div className="p-6 space-y-4 text-xs">
                  <p className="text-gray-400 leading-relaxed">{activeCertificate.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-[11px]">
                    <div>
                      <div className="text-gray-500 font-bold uppercase tracking-wider">Credential ID</div>
                      <div className="text-white font-semibold mt-1 font-mono">{activeCertificate.credential_id}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 font-bold uppercase tracking-wider">Issue Date</div>
                      <div className="text-white font-semibold mt-1">{formatDate(activeCertificate.issue_date)}</div>
                    </div>
                  </div>
                </div>

                {/* Modal Action Footer */}
                <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex gap-3">
                  <a
                    href={activeCertificate.verification_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 bg-accent/15 border border-accent/25 hover:border-accent text-accent font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Verify Credential
                  </a>
                  <button suppressHydrationWarning
                    onClick={() => {
                      alert("Downloading credential certificate file...");
                    }}
                    className="flex-1 text-center py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
