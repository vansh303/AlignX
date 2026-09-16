"use client";
import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Zap } from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Feedback() {
  const [formData, setFormData] = useState({
    issueType: "Bug",
    description: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ issueType: "Bug", description: "", email: "" });
    }, 3500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap size={14} /> USER EXPERIENCE FEEDBACK
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Share Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Feedback</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Help us continuously optimize AlignX’s AI tracking and user interface.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Feedback Received!</h2>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you for contributing to AlignX. Your observations help improve our clinical computer vision suite.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">Category</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-white font-medium text-xs focus:outline-none focus:border-cyan-500/50 transition-all cursor-pointer"
                >
                  <option value="Bug">Bug Report</option>
                  <option value="Exercise">Exercise Library Request</option>
                  <option value="Camera">Webcam & Landmark Tracking Issue</option>
                  <option value="UI/UX">UI/UX Improvement Suggestion</option>
                  <option value="Other">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">Detailed Observations</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your feedback, error logs, or suggested features in detail..."
                  rows="5"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Submit Clinical Feedback</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
