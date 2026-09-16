"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Filter, Dumbbell, Zap, Activity } from "lucide-react";
import { useAlignX } from "../context/AlignXContext";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Features() {
  const navigate = useNavigate();
  const { exerciseDatabase } = useAlignX();

  // State for filters
  const [selectedAge, setSelectedAge] = useState("Adults");
  const [selectedPart, setSelectedPart] = useState("Neck");

  const ageGroups = ["Kids", "Teens", "Adults", "Seniors"];
  const bodyParts = ["Neck", "Shoulder", "Back", "Arms", "Legs"];

  // Filter Logic
  const filteredExercises = (exerciseDatabase || []).filter(
    (ex) => ex.age === selectedAge && ex.part === selectedPart
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Zap size={14} /> CLINICAL EXERCISE REPOSITORY
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Interactive <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Therapy Catalog</span>
            </h1>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold w-fit">
            TARGETED BIOMECHANICS
          </span>
        </div>

        {/* --- CONTROLS --- */}
        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Age Selector */}
            <div>
              <label className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter size={14} className="text-cyan-400" /> Demographic Target
              </label>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedAge === age
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/10"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Part Selector */}
            <div>
              <label className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Dumbbell size={14} className="text-emerald-400" /> Anatomical Region
              </label>
              <div className="flex flex-wrap gap-2">
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedPart === part
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/10"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- RESULTS GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((ex) => (
              <div key={ex.id} className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between shadow-2xl">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                        <span className="inline-block px-3 py-1 bg-cyan-500/10 rounded-full text-xs text-cyan-400 font-mono font-bold border border-cyan-500/30">
                            {ex.difficulty}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{ex.age}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">{ex.name}</h3>
                    <p className="text-slate-400 text-xs mt-1 font-mono">Target Area: <span className="text-emerald-400 font-bold">{ex.part}</span></p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={() => navigate(`/perform/${ex.id}`)}
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>START EXERCISE SESSION</span>
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-slate-400 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl">
              <p className="text-base font-bold mb-1">No exercises found for these specific filters.</p>
              <p className="text-xs text-slate-500">Try switching demographics or body regions above.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}