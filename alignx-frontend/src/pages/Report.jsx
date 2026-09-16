"use client";

import { TrendingDown, AlertTriangle, CheckCircle, Download, Share2, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import ScoreRing from "../components/ui/ScoreRing";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Report() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              AI DIAGNOSTIC REPORT COMPLETE
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Anatomical Posture Report</h1>
            <p className="text-slate-400 font-mono text-xs mt-1">Scan ID: #AX-2026-892 • Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white rounded-2xl transition-all cursor-pointer">
              <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold text-xs rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer">
              <Download size={18} />
              <span>EXPORT CLINICAL PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Main Score Card */}
          <div className="lg:col-span-1 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <ScoreRing score={72} size={170} strokeWidth={14} />
            <p className="text-center text-slate-300 text-xs font-medium mt-6 leading-relaxed">
              Overall stable alignment, with minor forward head posture detected in cervical spine.
            </p>
          </div>

          {/* Detailed Metrics */}
          <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
            <h3 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2 pb-4 border-b border-white/10">
              <Activity className="text-cyan-400" size={20} /> Biomechanical Segment Breakdown
            </h3>
            <div className="space-y-5">
              <ProgressBar label="Cervical Spine (Neck Angle)" value={85} max={100} color="emerald" />
              <ProgressBar label="Thoracic Spine (Upper Back)" value={45} max={100} color="amber" />
              <ProgressBar label="Lumbar Spine (Lower Back)" value={68} max={100} color="cyan" />
              <ProgressBar label="Pelvic Symmetry" value={92} max={100} color="emerald" />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
            <StatCard 
                icon={<CheckCircle className="text-emerald-400" size={20} />}
                title="Neck Position"
                value="Optimal"
                subtext="< 5° Forward Head Inclination"
                borderColor="border-emerald-500/30"
            />
            <StatCard 
                icon={<AlertTriangle className="text-amber-400" size={20} />}
                title="Kyphosis Risk"
                value="Moderate"
                subtext="Shoulder protraction 15° detected"
                borderColor="border-amber-500/30"
            />
            <StatCard 
                icon={<TrendingDown className="text-rose-400" size={20} />}
                title="Knee Stress"
                value="High Load"
                subtext="Mild valgus stress observed"
                borderColor="border-rose-500/30"
            />
        </div>

        {/* Recommendations CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                 <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase mb-2">
                   <ShieldCheck size={16} /> RECOMMENDED CLINICAL PROTOCOL
                 </div>
                 <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Corrective Therapy Plan Ready</h2>
                 <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                    AI engine has compiled a personalized corrective routine to address Cervical Retraction and Thoracic Alignment.
                 </p>
              </div>
              <button 
                onClick={() => navigate("/exercises")}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold rounded-2xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] flex items-center gap-2 group text-sm shrink-0 cursor-pointer"
              >
                <span>Launch Corrective Routine</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtext, borderColor }) {
    return (
        <div className={`p-6 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border ${borderColor} shadow-2xl flex flex-col justify-between`}>
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-950 rounded-2xl border border-white/10">
                    {icon}
                </div>
            </div>
            <div>
              <h4 className="text-slate-400 text-xs font-mono uppercase font-bold tracking-wider">{title}</h4>
              <p className="text-2xl font-extrabold text-white mt-1 hud-text">{value}</p>
              <p className="text-xs text-slate-500 mt-2">{subtext}</p>
            </div>
        </div>
    );
}