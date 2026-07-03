import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/effects/CustomCursor";
import AIChatWidget from "@/components/chatbot/AIChatWidget";
import CommandPalette from "@/components/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Shanmugapriyan | Premium AI & Full Stack Portfolio",
  description: "Official portfolio of Shanmugapriyan - AI Engineer, Machine Learning Specialist, and Full Stack Developer. Showcasing computer vision products, data visualizations, and modern Next.js systems.",
  keywords: ["Shanmugapriyan", "AI Engineer", "Machine Learning", "Power BI", "Next.js", "Portfolio", "React 19"],
  authors: [{ name: "Shanmugapriyan" }],
  openGraph: {
    title: "Shanmugapriyan | Premium AI & Full Stack Portfolio",
    description: "Discover next-generation AI pipelines, Power BI business dashboards, and full-stack platforms engineered by Shanmugapriyan.",
    url: "https://shanmugapriyan.dev",
    siteName: "Shanmugapriyan Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-[#050505] text-[#f3f4f6] relative selection:bg-primary/30 selection:text-white`}
      >
        {/* Background static noise and overlay */}
        <div className="noise-overlay" />
        
        {/* Interactive spotlights & helper cursor */}
        <CustomCursor />
        
        {/* Command palette global search */}
        <CommandPalette />

        {/* Dynamic Navigation bar */}
        <Navbar />

        {/* Page children */}
        {children}

        {/* Global floating AI chatbot */}
        <AIChatWidget />

        {/* Premium footer layout */}
        <footer className="w-full py-12 border-t border-white/5 bg-[#030303] text-center relative z-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <span className="font-heading font-bold text-lg text-white">S<span className="text-primary">.</span>PRIYAN</span>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Elite AI & Full Stack Architect</p>
            </div>
            <div className="text-xs text-gray-500 font-semibold">
              © {new Date().getFullYear()} Shanmugapriyan. Engineered with Next.js 15, React 19 & Supabase.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
