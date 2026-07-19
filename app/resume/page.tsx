"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Download, QrCode, FileText, ChevronLeft, Eye, TrendingUp } from "lucide-react";
import QRCode from "qrcode";
import { mockProfile } from "@/lib/mockData";
import { db } from "@/lib/db";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function ResumePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [downloadCount, setDownloadCount] = useState(142);
  const [viewCount] = useState(384);

  // Generate QR Code dynamically
  useEffect(() => {
    const generateQr = async () => {
      try {
        const url = await QRCode.toDataURL(window.location.href);
        setQrCodeUrl(url);
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    };
    generateQr();
    
    // Log page visit
    db.logVisitor("/resume");
  }, []);

  const handleDownload = () => {
    setDownloadCount((prev) => prev + 1);
    db.trackDownload("Resume", "Shanmugapriyan_CV.pdf");
  };

  const versionHistory = [
    { version: "v2.4 (Current)", date: "June 2026", note: "Optimized NLP skills details and added latest Computer Vision models." },
    { version: "v2.2", date: "Jan 2026", note: "Added AI Disease prediction diagnostics work details." },
    { version: "v2.0", date: "Aug 2025", note: "Formatted structure using satellite typography and consolidated Power BI reports." },
  ];

  // Faux analytics chart data representing monthly downloads
  const downloadsChartData = [
    { name: "Jan", downloads: 12 },
    { name: "Feb", downloads: 18 },
    { name: "Mar", downloads: 26 },
    { name: "Apr", downloads: 34 },
    { name: "May", downloads: 42 },
    { name: "Jun", downloads: 52 },
  ];

  return (
    <main className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary mb-10 transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Title */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Resume Platform
          </h1>
          <p className="text-xs text-gray-500 font-bold mt-2">
            Version 2.4 • Last Updated June 2026
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: CV Preview (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Built-in Mock PDF Viewer Panel */}
            <div className="glass-panel rounded-3xl overflow-hidden border-white/5 shadow-2xl relative bg-[#0d0d12]">
              <div className="px-6 py-4.5 bg-black/40 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-primary" />
                  <span className="text-xs font-bold text-white">Shanmugapriyan_CV.pdf</span>
                </div>
                <button suppressHydrationWarning
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:opacity-95 transition-all shadow-premium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </button>
              </div>

              {/* Rendered mock Resume preview sheet */}
              <div className="p-8 sm:p-12 text-left space-y-8 max-h-[750px] overflow-y-auto scrollbar-thin text-xs text-gray-300 font-medium">
                
                {/* Header */}
                <div className="border-b border-white/5 pb-6 flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-heading font-extrabold text-white">{mockProfile.name}</h2>
                    <p className="text-xs text-accent font-semibold mt-1">{mockProfile.role}</p>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 font-bold space-y-1">
                    <div>{mockProfile.email}</div>
                    <div>{mockProfile.phone}</div>
                    <div>{mockProfile.location}</div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-2">
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Professional Objective</h3>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Innovative AI Engineer and Full Stack Developer. Specialized in building machine learning architectures (YOLO, ResNet, transformers) and converting metrics into corporate Power BI reporting dashboards. Experienced in building Next.js apps with premium visuals.
                  </p>
                </div>

                {/* Core Expertise */}
                <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Skills / Tooling</h3>
                  <div className="grid grid-cols-3 gap-4 text-[10px] text-gray-400">
                    <div>
                      <div className="text-white font-bold mb-1">AI / ML Modeling</div>
                      <div>Python, PyTorch, TensorFlow, Computer Vision, YOLOv8, NLP</div>
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Data / Business Intelligence</div>
                      <div>Power BI Reporting, DAX Equations, Power Query ETL, SQL</div>
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Full Stack Web</div>
                      <div>Next.js 15, React 19, TypeScript, PostgreSQL, Supabase, AWS</div>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between font-bold text-white text-[11px]">
                        <span>AI Engineer Intern — AI Research Lab</span>
                        <span>2024</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Tuned diagnostic model classifiers, increasing prediction accuracy metrics by 6.2%. Automated dataset augmentations reducing pipeline prep lags by 40%.</p>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-white text-[11px]">
                        <span>Full Stack Consultant — Freelance</span>
                        <span>2023 - Present</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Consolidated multi-million row sales databases in star-schema Power BI dashboards. Deployed React apps on serverless node infrastructures.</p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Education</h3>
                  <div className="flex justify-between font-bold text-white text-[11px]">
                    <span>B.E. Computer Science — Anna University Affiliated College</span>
                    <span>8.9 CGPA</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Graduated with Distinction honors. Placed first in annual developer GDSC hackathons.</p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Qr code & versioning (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Analytics Dashboard mini */}
            <div className="glass-panel rounded-3xl p-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">CV Analytics</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                    <Eye className="w-3.5 h-3.5 text-accent" />
                    Views
                  </div>
                  <div className="text-lg font-bold text-white mt-1">{viewCount}</div>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                    <Download className="w-3.5 h-3.5 text-primary" />
                    Downloads
                  </div>
                  <div className="text-lg font-bold text-white mt-1">{downloadCount}</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[120px] w-full mt-4">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Download Trend
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={downloadsChartData}>
                    <defs>
                      <linearGradient id="downloadsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF2E63" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#FF2E63" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="downloads" stroke="#FF2E63" fillOpacity={1} fill="url(#downloadsGrad)" strokeWidth={1.5} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0f0f14", borderColor: "#222", fontSize: 10, color: "#fff" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="glass-panel rounded-3xl p-6 text-center space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Scan to Mobile</h3>
              
              <div className="p-3 bg-white rounded-2xl w-[150px] h-[150px] mx-auto flex items-center justify-center border border-white/10 shadow-premium">
                {qrCodeUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={qrCodeUrl} alt="Resume QR Link" className="w-full h-full" />
                ) : (
                  <QrCode className="w-12 h-12 text-black animate-pulse" />
                )}
              </div>
              
              <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto leading-relaxed">
                Scan this QR code with your mobile camera to instantly view and download this CV.
              </p>
            </div>

            {/* Version timeline */}
            <div className="glass-panel rounded-3xl p-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Version History</h3>
              <div className="space-y-4 relative pl-4 border-l border-white/5">
                {versionHistory.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Dot */}
                    <div className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full border border-black ${idx === 0 ? "bg-accent" : "bg-gray-700"}`} />
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white">
                      <span>{item.version}</span>
                      <span className="text-gray-500 font-semibold">•</span>
                      <span className="text-gray-500 font-semibold">{item.date}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
