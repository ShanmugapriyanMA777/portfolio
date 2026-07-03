"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Eye, Heart, Download, ExternalLink, Github, ArrowRight, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/mockData";
import { db } from "@/lib/db";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  
  // Local interaction states for likes and bookmarks
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Record<string, boolean>>({});
  const [projectStats, setProjectStats] = useState<Record<string, { likes: number; views: number }>>({});

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await db.getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "AI & Machine Learning", "Power BI", "Full Stack Development"];

  // Toggle like
  const handleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = !!likedProjects[id];
    setLikedProjects((prev) => ({ ...prev, [id]: !isLiked }));
    
    const baseLikes = projects.find((p) => p.id === id)?.likes || 0;
    const currentStats = projectStats[id] || { likes: baseLikes, views: projects.find((p) => p.id === id)?.views || 0 };
    
    setProjectStats((prev) => ({
      ...prev,
      [id]: {
        ...currentStats,
        likes: isLiked ? currentStats.likes - 1 : currentStats.likes + 1,
      },
    }));
  };

  // Toggle bookmark
  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Dynamic filter, search, and sort logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = projects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "views") {
      result = [...result].sort((a, b) => {
        const aViews = projectStats[a.id]?.views ?? a.views;
        const bViews = projectStats[b.id]?.views ?? b.views;
        return bViews - aViews;
      });
    } else if (sortBy === "likes") {
      result = [...result].sort((a, b) => {
        const aLikes = projectStats[a.id]?.likes ?? a.likes;
        const bLikes = projectStats[b.id]?.likes ?? b.likes;
        return bLikes - aLikes;
      });
    } else {
      result = [...result].sort((a, b) => a.display_order - b.display_order);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, projectStats]);

  const getLikesCount = (project: Project) => {
    return projectStats[project.id]?.likes ?? project.likes;
  };

  const getViewsCount = (project: Project) => {
    return projectStats[project.id]?.views ?? project.views;
  };

  return (
    <section id="projects" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Portfolio</h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Engineering Showcases & Case Studies
          </p>
          <div className="w-16 h-[3px] bg-primary mt-4 rounded-full" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div className="flex flex-wrap gap-2">
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
                {cat === "All" ? "All Projects" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input suppressHydrationWarning
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs pl-10 pr-3.5 py-2.5 rounded-xl w-[200px] transition-all placeholder-gray-500 font-semibold"
              />
            </div>

            {/* Sort */}
            <select suppressHydrationWarning
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/5 text-gray-400 hover:text-white text-xs px-3.5 py-2.5 rounded-xl font-semibold outline-none cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="views">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass-panel rounded-2xl overflow-hidden group hover:border-primary/25 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Hero Preview Image / Color block */}
                <Link href={`/projects/${project.id}`} className="relative block h-[180px] overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-[#050505]/20 to-accent/5 z-10 transition-opacity group-hover:opacity-0" />
                  
                  {/* Decorative placeholder since we don't have visual files yet */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/80 to-[#121217]">
                    <div className="text-center p-6">
                      <div className="text-xs font-bold text-accent mb-1 tracking-widest">{project.category.toUpperCase()}</div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-primary transition-colors">{project.title}</h4>
                    </div>
                  </div>

                  {/* Bookmark button overlay */}
                  <button suppressHydrationWarning
                    onClick={(e) => handleBookmark(e, project.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-black/60 border border-white/5 text-gray-400 hover:text-white z-20 transition-colors"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedProjects[project.id] ? "fill-accent text-accent" : ""}`} />
                  </button>
                </Link>

                {/* Info Container */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold mb-2">
                      <span>{project.timeline}</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400">{project.status}</span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    {/* Likes & Views */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        {getViewsCount(project)}
                      </span>
                      <button suppressHydrationWarning
                        onClick={(e) => handleLike(e, project.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          likedProjects[project.id] ? "text-primary" : "hover:text-white"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedProjects[project.id] ? "fill-primary" : ""}`} />
                        {getLikesCount(project)}
                      </button>
                    </div>

                    {/* View details */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-primary transition-colors cursor-pointer"
                    >
                      Case Study
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm glass-panel rounded-3xl border-dashed">
            No projects match the selected category or query search.
          </div>
        )}

      </div>
    </section>
  );
}
