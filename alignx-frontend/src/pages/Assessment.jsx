import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlignX } from "../context/AlignXContext";
import { ShieldCheck, Scan, ArrowRight, Activity, CheckCircle2, Zap, Sparkles } from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Assessment() {
  const navigate = useNavigate();
  const { assessmentDatabase } = useAlignX();

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap size={14} /> AI DIAGNOSTIC SUITE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Clinical AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Posture Screening</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select a specialized computer vision screening protocol below to launch real-time 33-landmark biomechanical tracking.
          </p>
        </div>

        {/* Assessment Catalog Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
          {(assessmentDatabase || []).map((assessment) => (
            <div
              key={assessment.id}
              className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/30 group-hover:scale-110 transition-transform">
                    <Scan size={28} />
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase rounded-full border border-emerald-500/30">
                    REALTIME SCAN
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {assessment.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {assessment.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Protocol Requirements:</p>
                  {assessment.instructions.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 relative z-10">
                <button
                  onClick={() => navigate(`/perform-assessment/${assessment.id}`)}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
                >
                  <span>Launch Diagnostic Scan</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}