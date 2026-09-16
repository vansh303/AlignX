"use client";

import { Filter, Search, Activity, Dumbbell, Sparkles } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import { useState } from "react";
import { useAlignX } from "../context/AlignXContext";
import { useNavigate } from "react-router-dom";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Exercises() {
  const { exercises } = useAlignX();
  const navigate = useNavigate();

  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedPart, setSelectedPart] = useState("all");

  const bodyParts = ["Neck", "Shoulder", "Back", "Arms", "Legs"];
  const ageCategories = ["Kids", "Teens", "Adults", "Seniors"];

  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const filteredExercises = safeExercises.filter((ex) => {
    if (selectedPart !== "all" && ex.part !== selectedPart) return false;
    if (selectedAge !== "all" && ex.age !== selectedAge) return false;
    return true;
  });

  const handleStartExercise = (id) => {
    navigate(`/perform/${id}`);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Dumbbell size={14} /> CORRECTIVE PHYSIOTHERAPY LIBRARY
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Anatomical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Exercise Protocols</span>
            </h1>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold w-fit">
            {filteredExercises.length} PROTOCOLS AVAILABLE
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Filter size={16} /> FILTER ANATOMICAL TARGETS:
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Target Area Filter */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Target Body Part
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPart("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedPart === "all"
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-white/10"
                  }`}
                >
                  All Parts
                </button>
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedPart === part
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-white/10"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Age Demographic
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAge("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedAge === "all"
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-white/10"
                  }`}
                >
                  All Ages
                </button>
                {ageCategories.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedAge === age
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-white/10"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onStartExercise={handleStartExercise}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="p-12 rounded-3xl text-center bg-slate-900/60 backdrop-blur-xl border border-white/10">
            <p className="text-slate-400 font-mono text-sm">No exercises found for the selected demographic & target filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}