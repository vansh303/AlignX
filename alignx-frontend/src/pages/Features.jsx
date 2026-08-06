// FILE: src/pages/Features.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Filter, Dumbbell } from "lucide-react";
import { useAlignX } from "../context/AlignXContext";

export default function Features() {
  const navigate = useNavigate();
  const { exerciseDatabase } = useAlignX();

  // State for filters
  const [selectedAge, setSelectedAge] = useState("Adults");
  const [selectedPart, setSelectedPart] = useState("Neck");

  const ageGroups = ["Kids", "Teens", "Adults", "Seniors"];
  const bodyParts = ["Neck", "Shoulder", "Back", "Arms", "Legs"];

  // Filter Logic
  const filteredExercises = exerciseDatabase.filter(
    (ex) => ex.age === selectedAge && ex.part === selectedPart
  );

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">
            Exercise <span className="text-cyan-400">Library</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select your age group and target area to find the perfect routine.
          </p>
        </div>

        {/* --- CONTROLS --- */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 mb-12 backdrop-blur-md">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Age Selector */}
            <div>
              <label className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter size={14} /> Select Age Group
              </label>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedAge === age
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Part Selector */}
            <div>
              <label className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Dumbbell size={14} /> Select Body Part
              </label>
              <div className="flex flex-wrap gap-2">
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedPart === part
                        ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
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
              <div key={ex.id} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group flex flex-col h-full">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-3 py-1 bg-slate-800 rounded text-xs text-cyan-400 font-mono border border-white/5">
                            {ex.difficulty}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{ex.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{ex.age} • {ex.part}</p>
                </div>
                
                <div className="mt-auto">
                    <button
                    onClick={() => navigate(`/perform/${ex.id}`)}
                    className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-800 hover:from-cyan-600 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                    <Play size={18} fill="currentColor" />
                    Start Exercise
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500 bg-slate-900/30 rounded-3xl border border-white/5">
              <p className="text-lg mb-2">No exercises found.</p>
              <p className="text-sm opacity-60">Try selecting "Adults" and "Neck" or "Kids" and "Shoulder".</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}