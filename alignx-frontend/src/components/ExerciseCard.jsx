"use client";

import { ChevronDown, AlertCircle, Play, Activity } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExerciseCard({ exercise, onStartExercise }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (onStartExercise) {
      onStartExercise(exercise.id);
    } else {
      navigate(`/perform/${exercise.id}`);
    }
  };

  const stepsList = exercise.instructions || exercise.steps || [];
  const targetArea = exercise.part || exercise.area || "Full Body";
  const ageLabel = exercise.age || exercise.ageGroup || "All Ages";

  const difficultyStyles = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Hard: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    Fun: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  };

  return (
    <div className="bg-slate-900/70 rounded-3xl border border-white/10 shadow-2xl hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group backdrop-blur-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              {ageLabel} • {targetArea}
            </span>
            <h3 className="font-bold text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {exercise.name}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              difficultyStyles[exercise.difficulty] || "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
            }`}
          >
            {exercise.difficulty}
          </span>
        </div>

        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 rounded-2xl font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer mb-4"
        >
          <Play size={16} fill="currentColor" />
          <span>START EXERCISE SESSION</span>
        </button>

        {stepsList.length > 0 && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 pt-3 border-t border-white/10 transition-colors cursor-pointer"
            >
              <span>CLINICAL INSTRUCTIONS</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {isExpanded && (
              <div className="mt-4 space-y-3 pt-1 animate-fadeIn">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                  <h4 className="font-mono text-[10px] uppercase font-bold text-slate-400">Step-by-Step Procedure:</h4>
                  <ol className="space-y-2">
                    {stepsList.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-slate-300 items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}