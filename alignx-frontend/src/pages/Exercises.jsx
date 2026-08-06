"use client";

import { Filter } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import { useState } from "react";
import { useAlignX } from "../context/AlignXContext";
import { useNavigate } from "react-router-dom";

export default function Exercises() {
  const { exercises } = useAlignX(); 
  const navigate = useNavigate();
  
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");

  const areas = ["Neck", "Shoulders", "Back", "Legs", "Knees", "Lower Back"];
  const ageGroups = ["18-30", "30-50", "50-65", "65+"];

  // SAFEGUARD: Ensure exercises is an array
  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const filteredExercises = safeExercises.filter((ex) => {
    if (selectedArea !== "all" && ex.area !== selectedArea) return false;
    // Handle cases where ageGroup might be missing in data
    if (selectedAge !== "all" && ex.ageGroup && ex.ageGroup !== selectedAge) return false;
    return true;
  });

  const handleStartExercise = (id) => {
    navigate(`/exercise/${id}`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Exercise Library</h1>
          <p className="text-white/60">Professionally designed exercises for posture improvement</p>
        </div>

        {/* Filters */}
        <div className="p-6 rounded-2xl mb-8 bg-slate-900/50 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <Filter size={20} className="text-sky-500" />
            <h3 className="font-semibold">Filter by:</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pain Area Filter */}
            <div>
              <label className="block text-white/80 mb-3 font-semibold">Pain Area</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedArea("all")}
                  className={`px-4 py-2 rounded-lg transition-all text-white ${selectedArea === "all" ? "bg-gradient-to-r from-sky-500 to-cyan-500" : "bg-slate-800/50 hover:bg-slate-700"}`}
                >
                  All
                </button>
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-4 py-2 rounded-lg transition-all text-white ${selectedArea === area ? "bg-gradient-to-r from-sky-500 to-cyan-500" : "bg-slate-800/50 hover:bg-slate-700"}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div>
              <label className="block text-white/80 mb-3 font-semibold">Age Group</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAge("all")}
                  className={`px-4 py-2 rounded-lg transition-all text-white ${selectedAge === "all" ? "bg-gradient-to-r from-sky-500 to-cyan-500" : "bg-slate-800/50 hover:bg-slate-700"}`}
                >
                  All Ages
                </button>
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-4 py-2 rounded-lg transition-all text-white ${selectedAge === age ? "bg-gradient-to-r from-sky-500 to-cyan-500" : "bg-slate-800/50 hover:bg-slate-700"}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard 
                key={exercise.id} 
                exercise={exercise} 
                onStartExercise={handleStartExercise} 
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="p-12 rounded-2xl text-center bg-slate-900/50 backdrop-blur-xl border border-white/10">
            <p className="text-white/60">No exercises found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}