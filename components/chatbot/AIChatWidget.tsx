"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockSkills, mockProfile } from "@/lib/mockData";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! 👋 I am Shanmugapriyan's AI Assistant, trained on his professional dataset. Ask me anything about his credentials, programming skills, or services, or click a quick suggestion below!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestionPills = [
    { label: "About Him", text: "Tell me about Shanmugapriyan's background." },
    { label: "His Skills", text: "What programming languages and tools does he know?" },
    { label: "Projects", text: "Show me some of his machine learning projects." },
    { label: "Services", text: "What consulting services does he offer?" },
    { label: "Contact", text: "How can I contact him or hire him?" },
  ];

  // Client-side NLP response generator for speed and reliability
  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("about") || text.includes("who is") || text.includes("profile") || text.includes("him")) {
      return `Shanmugapriyan is an AI Engineer and Full Stack Developer based in Tamil Nadu, India. He holds a B.E. in Computer Science with a 8.9 CGPA and specializes in Machine Learning models, Power BI Dashboards, and Next.js full-stack systems. He bridges the gap between complex algorithms and premium visuals.`;
    }

    if (text.includes("skill") || text.includes("language") || text.includes("stack") || text.includes("technology") || text.includes("tool")) {
      const list = mockSkills.map((s) => s.name).slice(0, 8).join(", ");
      return `Shanmugapriyan is highly proficient in ${list}, and specializes in AI, Machine Learning, Power BI dashboards, and Frontend engineering. His core stack also includes PostgreSQL, Supabase, AWS, and Docker.`;
    }

    if (text.includes("project") || text.includes("portfolio") || text.includes("work")) {
      return `He has completed over 10 systems, including:
1. **AI Disease Analyzer** (Chest X-ray diagnostic model)
2. **Fake News Detection** (NLP text credibility voting classifier)
3. **Power BI Dashboards** (Star-schema interactive analytics boards)
4. **Smart Attendance System** (FaceNet + YOLOv8 camera matching)
5. **Career Guidance AI** (Mentor chatbot recommendations)
6. **Cloud Kitchen Platform** (Real-time Next.js order logs)

Which one would you like to know more about?`;
    }

    if (text.includes("experience") || text.includes("work history") || text.includes("job") || text.includes("career")) {
      return `Shanmugapriyan's career timeline:
- **AI Engineer Intern** at *AI Research Lab* (2024): Focused on deep learning model tuning, increasing diagnostic classifier accuracies by 6.2%.
- **Full Stack & Data Consultant** (Freelance, 2023 - Present): Formulating Power BI layouts and deploying serverless Next.js landing nodes for corporate clients.`;
    }

    if (text.includes("services") || text.includes("hire") || text.includes("pricing") || text.includes("cost")) {
      return `He offers three professional consulting packages:
1. **AI & ML Development**: Training custom predictive CNN/NLP models and Docker deployment pipelines (starting from $1,500).
2. **Power BI Analytics**: Developing star-schema corporate dashboard reports (starting from $800).
3. **Premium Web Dev**: Structuring animated, responsive Next.js/Supabase products (starting from $2,000).`;
    }

    if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("reach") || text.includes("whatsapp")) {
      return `You can contact Shanmugapriyan directly through:
- **Email**: ${mockProfile.email}
- **WhatsApp/Phone**: ${mockProfile.phone}
- **Calendly**: ${mockProfile.calendar_url}
- Or submit an inquiry form in the **Contact** section at the bottom of the page!`;
    }

    if (text.includes("education") || text.includes("college") || text.includes("university") || text.includes("degree") || text.includes("cgpa")) {
      return `He graduated with a Bachelor of Engineering in Computer Science and Engineering from an Anna University affiliated institution, securing a high cumulative grade of **8.9 CGPA** with Distinction honors.`;
    }

    if (text.includes("achievement") || text.includes("hackathon") || text.includes("competition") || text.includes("award")) {
      return `Some of his top credentials:
- **1st Place Hackathon Winner** in Google Developer Student Clubs.
- **Outstanding Contributor** by IBM Academic Initiative.
- **Elite Gold Certification** from NPTEL (IIT Madras) ranking in the top 1% candidates nationally in Python & DBMS.`;
    }

    if (text.includes("resume") || text.includes("cv")) {
      return `You can preview and download his full resume on the dedicated **Resume Page** (/resume). It features a built-in PDF viewer, QR scanner, and download logs.`;
    }

    return `I apologize, I didn't quite capture that. I am trained on Shanmugapriyan's skills, projects, experience, education, services, and credentials. Try asking something like: "What are his projects?", "What is his stack?", or "How can I contact him?"`;
  };

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = generateAIResponse(messageText);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Chat Trigger button */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <button suppressHydrationWarning
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-premium shadow-primary/25 cursor-pointer relative flex items-center justify-center hover:scale-105 transition-transform"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -45 }} animate={{ rotate: 0 }} exit={{ rotate: 45 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="chat" className="relative">
                {/* Glowing pulse rings */}
                <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping z-[-1]" />
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Expandable Chat Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[92%] sm:w-[380px] h-[500px] glass-panel rounded-3xl overflow-hidden shadow-2xl border-white/10 z-[999] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 text-primary rounded-xl relative">
                  <Brain className="w-4 h-4 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Priyan AI Agent
                    <Sparkles className="w-3 h-3 text-accent" />
                  </h3>
                  <span className="text-[10px] text-gray-500 font-bold">Intelligent Core Online</span>
                </div>
              </div>
              <button suppressHydrationWarning
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scroll-smooth">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap text-left ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none shadow-premium shadow-primary/5"
                        : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Bot typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purpleAccent animate-bounce" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* suggestion pills */}
            <div className="px-5 py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5 bg-black/20">
              {suggestionPills.map((pill) => (
                <button suppressHydrationWarning
                  key={pill.label}
                  onClick={() => handleSendMessage(pill.text)}
                  className="px-3 py-1.5 bg-white/5 border border-white/5 hover:border-primary/20 rounded-full text-[10px] font-bold text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Form Input area */}
            <div className="p-4.5 bg-black/40 border-t border-white/5 flex items-center gap-2">
              <input suppressHydrationWarning
                type="text"
                placeholder="Ask about details, skills, pricing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                className="flex-1 bg-white/5 border border-white/5 focus:border-primary/40 outline-none text-white text-xs px-3.5 py-2.5 rounded-xl transition-all placeholder-gray-500"
              />
              <button suppressHydrationWarning
                onClick={() => handleSendMessage(input)}
                className="p-2.5 rounded-xl bg-primary hover:opacity-95 text-white transition-opacity cursor-pointer shadow-premium"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
