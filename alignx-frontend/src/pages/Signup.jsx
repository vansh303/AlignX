"use client";

import { ArrowRight, Mail, Lock, User, Activity, Brain } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Signup({ onNavigate, onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Simulate Signup
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-white selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-20 z-0" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/30 p-8 md:p-10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] relative z-10 space-y-6">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-2">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Activity className="text-emerald-400" size={26} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Clinical Account</h1>
          <p className="text-xs text-slate-400 font-mono">Join AlignX to start real-time posture analysis</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Alex Morgan"
                required
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Patient Profile</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-slate-400 text-xs pt-2">
          Already registered?{" "}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}