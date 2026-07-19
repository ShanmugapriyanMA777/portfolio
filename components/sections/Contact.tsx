"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { db } from "@/lib/db";
import { mockProfile } from "@/lib/mockData";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await db.sendMessage(data.name, data.email, data.subject, data.message);
      if (res.success) {
        setSubmitStatus("success");
        reset();
        
        // Trigger premium success confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#FF2E63", "#00E5FF", "#7C3AED"],
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Details & Maps */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Get In Touch</h2>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Let&apos;s Co-create Innovation
            </p>
            <p className="text-xs text-gray-400 leading-relaxed mt-4">
              Have a pipeline that needs optimization, a dataset requiring modeling, or a platform seeking premium UI designs? Shoot a message below or check out direct portals.
            </p>
          </div>

          {/* Direct Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl glass-panel">
              <div className="p-3 bg-primary/15 text-primary rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Email Me</div>
                <a href={`mailto:${mockProfile.email}`} className="text-sm font-semibold text-white hover:text-primary transition-colors mt-0.5 block">
                  {mockProfile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl glass-panel">
              <div className="p-3 bg-accent/15 text-accent rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Call Me</div>
                <a href={`tel:${mockProfile.phone}`} className="text-sm font-semibold text-white hover:text-accent transition-colors mt-0.5 block">
                  {mockProfile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl glass-panel">
              <div className="p-3 bg-purpleAccent/15 text-purpleAccent rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Location</div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {mockProfile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic styled geographic grid placeholder representing Google Maps */}
          <div className="h-[180px] w-full rounded-3xl border border-white/5 overflow-hidden glass-panel relative flex items-center justify-center bg-gradient-to-br from-black to-[#13141b] group">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:15px_15px] opacity-25 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute w-[80px] h-[80px] bg-accent/10 rounded-full blur-[30px]" />
            
            <div className="relative text-center p-6">
              <MapPin className="w-6 h-6 text-accent mx-auto mb-2 animate-bounce" />
              <div className="text-xs font-bold text-white">Tamil Nadu Map Hub</div>
              <div className="text-[10px] text-gray-500 mt-1">Available for Remote / Hybrid globally</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel rounded-3xl p-8 relative">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="p-4 bg-accent/15 text-accent rounded-full animate-pulse">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">Message Transmitted Successfully!</h3>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Thank you for reaching out. I have received your details and will get back to you within 24 business hours.
                  </p>
                  <button suppressHydrationWarning
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5.5 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-bold text-sm text-white">Send Inquiry</h3>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                    <input suppressHydrationWarning
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className={`w-full bg-white/5 border outline-none text-white text-xs px-4 py-3 rounded-xl transition-all ${
                        errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary/40"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Email</label>
                    <input suppressHydrationWarning
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={`w-full bg-white/5 border outline-none text-white text-xs px-4 py-3 rounded-xl transition-all ${
                        errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary/40"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                    <input suppressHydrationWarning
                      id="contact-subject"
                      type="text"
                      placeholder="Project details / Professional hiring"
                      {...register("subject")}
                      className={`w-full bg-white/5 border outline-none text-white text-xs px-4 py-3 rounded-xl transition-all ${
                        errors.subject ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary/40"
                      }`}
                    />
                    {errors.subject && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                    <textarea suppressHydrationWarning
                      placeholder="Describe details regarding timeline, technology scope, or hiring queries..."
                      rows={5}
                      {...register("message")}
                      className={`w-full bg-white/5 border outline-none text-white text-xs px-4 py-3 rounded-xl transition-all resize-none ${
                        errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary/40"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button suppressHydrationWarning
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-premium"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Details
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
