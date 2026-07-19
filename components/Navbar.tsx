"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background glass color when scrolled past 20px
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Auto-hide/show navbar on scroll direction changes
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/#hero" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certificates", path: "/#certificates" },
    { name: "Blog", path: "/blog" },
    { name: "Resume", path: "/resume" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsOpen(false);
    if (path.startsWith("/#")) {
      const elementId = path.substring(2);
      const el = document.getElementById(elementId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCommandPaletteClick = () => {
    // Dispatch Cmd+K keyboard event to toggle search
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-[9999] transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
      }`}
    >
      <div
        className={`w-full rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-black/60 shadow-premium"
            : "bg-transparent border-transparent"
        } py-3.5 px-6 flex items-center justify-between`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading font-bold text-xl tracking-tight text-white relative">
            S<span className="text-primary">.</span>PRIYAN
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`text-sm font-medium transition-colors hover:text-primary relative py-1 ${
                (pathname === "/" && link.path.startsWith("/#")) || pathname === link.path
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              {link.name}
              {(pathname === "/" && link.path.startsWith("/#") && link.name === "Home") && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette trigger */}
          <button suppressHydrationWarning
            onClick={handleCommandPaletteClick}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors border border-white/5 bg-white/5 flex items-center gap-2 group text-gray-400 hover:text-white"
            title="Search Portfolio (Ctrl + K)"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-black/40 px-1.5 font-mono text-[9px] font-medium text-gray-500">
              <span className="text-[10px]">Ctrl</span>K
            </kbd>
          </button>

          {/* Contact Button */}
          <Link
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl shadow-premium shadow-primary/10 cursor-pointer"
          >
            Hire Me
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button suppressHydrationWarning
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 lg:hidden text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full glass-panel rounded-2xl overflow-hidden p-6 border-white/10 shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
                  pathname === link.path ? "bg-primary/10 text-primary" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/#contact"
              onClick={(e) => {
                setIsOpen(false);
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 w-full text-center bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold py-3 rounded-xl shadow-premium block cursor-pointer"
            >
              Let&apos;s Connect
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
