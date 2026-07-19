"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Eye, Heart, BookOpen, Calendar, Share2 } from "lucide-react";
import { db } from "@/lib/db";
import { Blog } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

export default function BlogPostReaderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const res = await db.getBlogBySlug(slug);
      if (res) {
        setBlog(res);
        setLikesCount(res.likes);
        db.logVisitor(`/blog/${slug}`);
      } else {
        router.push("/blog");
      }
      setLoading(false);
    };
    if (slug) fetchBlog();
  }, [slug, router]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  // Simple Markdown-like renderer for mock content display
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, idx) => {
      // Handle Code Block delimiters
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const content = codeContent.join("\n");
          codeContent = [];
          return (
            <pre key={idx} className="bg-black/60 border border-white/5 p-4.5 rounded-xl text-xs font-mono text-gray-200 my-4 overflow-x-auto whitespace-pre">
              <code>{content}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Handle Headings
      if (line.startsWith("# ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-heading font-extrabold text-white mt-8 mb-4">
            {line.substring(2)}
          </h2>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-heading font-bold text-white mt-6 mb-3">
            {line.substring(3)}
          </h3>
        );
      }

      // Handle Lists
      if (line.startsWith("- ")) {
        return (
          <ul key={idx} className="list-disc pl-6 text-gray-300 text-xs sm:text-sm space-y-1 my-2">
            <li>{line.substring(2)}</li>
          </ul>
        );
      }

      // Handle Empty Lines
      if (!line.trim()) {
        return <div key={idx} className="h-3" />;
      }

      // Default Paragraphs
      return (
        <p key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <main className="min-h-screen bg-[#050505] py-24 relative overflow-hidden text-left">
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary mb-10 transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Articles
        </Link>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{blog.category}</span>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-500 font-bold pt-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(blog.created_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {blog.views} views
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* Simulated Cover Image Banner */}
        <div className="h-[280px] w-full rounded-3xl overflow-hidden glass-panel relative flex items-center justify-center bg-gradient-to-tr from-[#050508] to-[#171822] mb-12">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:15px_15px] opacity-15" />
          <div className="relative text-center p-8">
            <BookOpen className="w-16 h-16 text-accent/30 mx-auto mb-3" />
            <h4 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">TECHNICAL ARTICLE CONTENT</h4>
          </div>
        </div>

        {/* Content & Markdown Panel */}
        <article className="glass-panel rounded-3xl p-8 sm:p-12 mb-10">
          {renderMarkdown(blog.content)}
        </article>

        {/* Interaction Footer */}
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
          <div className="flex gap-4">
            <button suppressHydrationWarning
              onClick={handleLike}
              className={`flex items-center gap-2 text-xs font-bold text-gray-400 transition-colors ${
                isLiked ? "text-primary" : "hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-primary" : ""}`} />
              {likesCount} Likes
            </button>
            <button suppressHydrationWarning
              onClick={handleShare}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Post
            </button>
          </div>

          <div className="flex gap-1.5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold text-gray-500 px-2 py-0.5 bg-white/5 rounded border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
