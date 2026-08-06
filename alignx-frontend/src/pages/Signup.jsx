"use client";

import { ArrowRight, Mail, Lock, User, Activity } from "lucide-react";
import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-white/10 mb-4">
            <Activity className="text-sky-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Start Your Journey</h1>
          <p className="text-slate-400">Join AlignX to track and improve your health</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            Create Account
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Already a member?{" "}
          <a href="/login" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}