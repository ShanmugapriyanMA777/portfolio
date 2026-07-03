"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Code, Award, ExternalLink, Globe, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import { mockProjects, mockCertificates, mockBlogs } from "@/lib/mockData";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  // Handle results filtering
  const filteredProjects = mockProjects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCertificates = mockCertificates.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.issuer.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlogs = mockBlogs.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.summary.toLowerCase().includes(query.toLowerCase())
  );

  // Quick actions list
  const quickActions = [
    {
      title: "Download Resume",
      icon: <FileText className="w-4 h-4 text-primary" />,
      action: () => {
        router.push("/resume");
        setIsOpen(false);
      },
    },
    {
      title: "Hire Me / Connect",
      icon: <MessageSquare className="w-4 h-4 text-accent" />,
      action: () => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#contact");
        }
        setIsOpen(false);
      },
    },
    {
      title: "Go to Admin Dashboard",
      icon: <Globe className="w-4 h-4 text-purpleAccent" />,
      action: () => {
        router.push("/admin");
        setIsOpen(false);
      },
    },
  ];

  // Combined searchable items
  const results = [
    ...filteredProjects.map((p) => ({
      title: p.title,
      subtitle: `Project • ${p.category}`,
      icon: <Code className="w-4 h-4 text-primary" />,
      action: () => {
        router.push(`/projects/${p.id}`);
        setIsOpen(false);
      },
    })),
    ...filteredCertificates.map((c) => ({
      title: c.title,
      subtitle: `Certificate • ${c.issuer}`,
      icon: <Award className="w-4 h-4 text-accent" />,
      action: () => {
        const el = document.getElementById("certificates");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#certificates");
        setIsOpen(false);
      },
    })),
    ...filteredBlogs.map((b) => ({
      title: b.title,
      subtitle: `Blog • ${b.category}`,
      icon: <BookOpen className="w-4 h-4 text-purpleAccent" />,
      action: () => {
        router.push(`/blog/${b.slug}`);
        setIsOpen(false);
      },
    })),
    ...quickActions.map((a) => ({
      title: a.title,
      subtitle: "Quick Action",
      icon: a.icon,
      action: a.action,
    })),
  ];

  // Handle arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-start justify-center pt-[15vh]">
      <div
        className="w-full max-w-xl glass-panel rounded-xl overflow-hidden shadow-2xl border-white/10 animate-fade-in-up"
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input suppressHydrationWarning
            ref={inputRef}
            type="text"
            placeholder="Type a command or search details..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-white placeholder-gray-500 text-sm focus:ring-0"
          />
          <button suppressHydrationWarning
            onClick={() => setIsOpen(false)}
            className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400 hover:bg-white/10"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  idx === selectedIndex ? "bg-primary/20 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/5 rounded-md">{item.icon}</div>
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.subtitle}</div>
                  </div>
                </div>
                {idx === selectedIndex && <ArrowRight className="w-4 h-4 text-primary" />}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              No matching search results found. Try another query.
            </div>
          )}
        </div>

        {/* Help footer */}
        <div className="px-4 py-2 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex gap-4">
            <span>↑↓ Navigation</span>
            <span>↵ Select</span>
          </div>
          <span>Shanmugapriyan AI Brand</span>
        </div>
      </div>
    </div>
  );
}
