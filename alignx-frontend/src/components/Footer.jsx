import React from "react";
import { Link } from "react-router-dom";
import { Brain, Github, Twitter, Linkedin, Mail, ShieldCheck, Activity, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Brain className="text-slate-950 font-bold" size={22} />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight hud-text">
                Align<span className="text-cyan-400">X</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              Clinical-grade AI posture & exercise analysis using real-time 33-landmark computer vision technology.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
              <ShieldCheck size={12} />
              <span>MEDIAPIPE AI CORE v2.4</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/features" className="hover:text-cyan-300 transition-colors">Features & Tech</Link></li>
              <li><Link to="/assessment" className="hover:text-cyan-300 transition-colors">AI Assessment</Link></li>
              <li><Link to="/exercises" className="hover:text-cyan-300 transition-colors">Exercise Library</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-300 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/instructions" className="hover:text-cyan-300 transition-colors">Setup Protocol</Link></li>
              <li><Link to="/consultation" className="hover:text-cyan-300 transition-colors">Telehealth Consultation</Link></li>
              <li><Link to="/progress" className="hover:text-cyan-300 transition-colors">Biomechanical Progress</Link></li>
              <li><Link to="/feedback" className="hover:text-cyan-300 transition-colors">Submit Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/login" className="hover:text-cyan-300 transition-colors">Patient Portal Login</Link></li>
              <li><Link to="/signup" className="hover:text-cyan-300 transition-colors">Create Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-300 transition-colors">Diagnostic Command Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 AlignX AI Systems. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-white/10 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-white/10 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-white/10 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-white/10 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
