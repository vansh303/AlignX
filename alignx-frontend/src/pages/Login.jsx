"use client";

import { ArrowRight, Mail, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignX } from "../context/AlignXContext";

export default function Login() {
  // 2. Define all necessary state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 3. Initialize hooks inside the component
  const { login } = useAlignX();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // 4. Call login from context
    const success = await login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError("Login failed. Check email/password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 mb-4 shadow-lg shadow-sky-500/30">
            <Shield className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Access your personalized recovery plan</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@alignx.ai"
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
                placeholder="••••••••"
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
            className="w-full py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Login
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
            Create Profile
          </a>
        </p>
      </div>
    </div>
  );
}