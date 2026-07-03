"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronLeft, Eye, Heart, BookOpen, Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockBlogs, Blog } from "@/lib/mockData";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Machine Learning", "Power BI"];

  useEffect(() => {
    // Log sitemap/visitor logs
    db.logVisitor("/blog");
  }, []);

  const filteredBlogs = useMemo(() => {
    return mockBlogs.filter((blog) => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#050505] py-24 relative overflow-hidden text-left">
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary mb-10 transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              Engineering Blogs
            </h1>
            <p className="text-sm text-gray-400 mt-3 max-w-xl">
              Writeups regarding machine learning diagnostics tuning, BI databases optimization, and advanced frontend animations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input suppressHydrationWarning
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs pl-10 pr-3.5 py-2.5 rounded-xl w-[220px] transition-all placeholder-gray-500 font-semibold"
            />
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button suppressHydrationWarning
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary/10 border-primary text-primary shadow-glow-primary/5"
                  : "bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {/* Blogs grid list */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={blog.id}
                className="glass-panel rounded-3xl overflow-hidden group hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Simulated Header block */}
                <div className="h-[150px] bg-gradient-to-br from-black to-[#13141c] flex items-center justify-center p-6 text-center border-b border-white/5 relative">
                  <div className="absolute inset-0 bg-grid-pattern bg-[size:15px_15px] opacity-15" />
                  <div className="relative">
                    <BookOpen className="w-8 h-8 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{blog.category}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-7 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(blog.created_at)}</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="block">
                      <h3 className="text-base font-extrabold text-white group-hover:text-primary transition-colors leading-snug">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex flex-col gap-4">
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold text-gray-400 px-2 py-0.5 bg-white/5 rounded border border-white/5 flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5 text-accent" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats metrics */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {blog.likes}</span>
                      </div>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="text-white hover:text-primary font-extrabold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Read Post →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm glass-panel rounded-3xl border-dashed">
            No articles match the current filter or search criteria.
          </div>
        )}

      </div>
    </main>
  );
}
