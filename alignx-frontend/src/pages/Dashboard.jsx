"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignX } from "../context/AlignXContext";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Activity, 
  TrendingUp,
  ShieldCheck,
  Flame,
  Zap,
  Play,
  FileText,
  Scan
} from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Dashboard() {
  const { userProfile } = useAlignX();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
  }, [userProfile, navigate]);

  if (!userProfile) return null;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Zap size={14} /> DIAGNOSTIC COMMAND CENTER
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">{userProfile.name}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/assessment")}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
            >
              <Scan size={16} />
              <span>Launch AI Assessment</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COL: User Profile Card */}
          <div className="lg:col-span-1 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 p-1 shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-4">
                <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-extrabold text-cyan-400 hud-text">
                    {userProfile.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{userProfile.name}</h2>
              <span className="mt-1 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase">
                Active Tier Member
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="p-2 bg-slate-900 text-cyan-400 rounded-xl border border-white/10">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Email Address</p>
                  <p className="text-xs text-slate-200 font-medium truncate">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="p-2 bg-slate-900 text-emerald-400 rounded-xl border border-white/10">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Member Since</p>
                  <p className="text-xs text-slate-200 font-medium">{userProfile.joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="p-2 bg-slate-900 text-teal-400 rounded-xl border border-white/10">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Last Session</p>
                  <p className="text-xs text-slate-200 font-medium">{userProfile.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COL: Activity & Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <Activity className="text-emerald-400" size={18} />
                  <span className="text-slate-400 text-xs font-mono uppercase font-bold">Total Scans</span>
                </div>
                <p className="text-3xl font-extrabold text-white hud-text">{userProfile.activityStats?.sessionsCompleted || 0}</p>
              </div>

              <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <Flame className="text-amber-400" size={18} />
                  <span className="text-slate-400 text-xs font-mono uppercase font-bold">Current Streak</span>
                </div>
                <p className="text-3xl font-extrabold text-white hud-text">{userProfile.activityStats?.streak || 0} <span className="text-sm text-slate-500 font-sans font-normal">Days</span></p>
              </div>

              <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <Clock className="text-cyan-400" size={18} />
                  <span className="text-slate-400 text-xs font-mono uppercase font-bold">Active Time</span>
                </div>
                <p className="text-3xl font-extrabold text-white hud-text">{userProfile.activityStats?.totalMinutes || 0} <span className="text-sm text-slate-500 font-sans font-normal">Min</span></p>
              </div>
            </div>

            {/* Main Activity Area */}
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 min-h-[280px] flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Biomechanical Activity Overview</h3>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                Your historical posture accuracy index and spinal curvature alignment charts will populate here in real-time as you complete scans.
              </p>
            </div>

            {/* Security Note */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider">HIPAA Compliant On-Device Privacy</p>
                <p className="text-emerald-200/80 text-xs mt-0.5 leading-relaxed">
                  All 33 computer vision posture landmarks are processed locally in your browser to maintain strict medical privacy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}