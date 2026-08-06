"use client";

import { TrendingDown, AlertTriangle, CheckCircle, Download, Share2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Report() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              ANALYSIS COMPLETE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">Posture Report</h1>
            <p className="text-slate-400">Scan ID: #AX-2026-892 • {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-800/50 border border-white/10 rounded-xl hover:bg-slate-700 text-white transition-all">
                <Share2 size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-lg shadow-white/10">
                <Download size={20} />
                Export PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Score Card */}
          <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
               {/* Animated Rings */}
               <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
               <div className="absolute inset-4 border-2 border-slate-700 rounded-full border-dashed animate-spin-slow"></div>
               
               <div className="text-center z-10">
                 <span className="text-6xl font-bold text-white font-mono block tracking-tighter">72</span>
                 <span className="text-sm text-cyan-400 font-mono uppercase tracking-widest">Score</span>
               </div>
            </div>
            
            <p className="text-center text-slate-300 font-medium">Good alignment, but notable stress in the upper spine.</p>
          </div>

          {/* Detailed Metrics */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
              <ActivityIcon className="text-cyan-400" /> Biomechanical Analysis
            </h3>
            <div className="space-y-6">
              <ProgressBar label="Cervical Spine (Neck)" value={85} max={100} color="emerald" />
              <ProgressBar label="Thoracic Spine (Upper Back)" value={45} max={100} color="amber" />
              <ProgressBar label="Lumbar Spine (Lower Back)" value={68} max={100} color="cyan" />
              <ProgressBar label="Pelvic Alignment" value={92} max={100} color="emerald" />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatCard 
                icon={<CheckCircle className="text-emerald-400" />}
                title="Neck Position"
                value="Optimal"
                subtext="< 5° Forward Tilt"
                borderColor="border-emerald-500/30"
            />
            <StatCard 
                icon={<AlertTriangle className="text-amber-400" />}
                title="Kyphosis Risk"
                value="Moderate"
                subtext="Shoulders rounded 15°"
                borderColor="border-amber-500/30"
            />
            <StatCard 
                icon={<TrendingDown className="text-red-400" />}
                title="Knee Stress"
                value="High Load"
                subtext="Valgus collapse detected"
                borderColor="border-red-500/30"
            />
        </div>

        {/* Recommendations CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h2 className="text-3xl font-bold text-white mb-4">Corrective Plan Ready</h2>
                 <p className="text-slate-400 max-w-xl">
                    Our AI has generated a personalized 15-minute routine to address your Thoracic Kyphosis and Knee Valgus.
                 </p>
              </div>
              <button 
                onClick={() => navigate("/exercises")}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-2 group"
              >
                Start Routine
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

// Helper Component for the stats cards
function StatCard({ icon, title, value, subtext, borderColor }) {
    return (
        <div className={`p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border ${borderColor} hover:bg-slate-800/40 transition-colors`}>
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-950 rounded-lg border border-white/5">
                    {icon}
                </div>
            </div>
            <h4 className="text-slate-400 text-sm font-mono uppercase">{title}</h4>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <p className="text-xs text-slate-500 mt-2">{subtext}</p>
        </div>
    );
}

function ActivityIcon({ className }) {
    return (
        <svg className={`w-6 h-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
}