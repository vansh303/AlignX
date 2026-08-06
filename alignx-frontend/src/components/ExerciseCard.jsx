"use client"

import { ChevronDown, AlertCircle, Play } from "lucide-react"
import { useState } from "react"

export default function ExerciseCard({ exercise, onStartExercise }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    Hard: "bg-rose-50 text-rose-700 border-rose-100",
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Corrective Therapy
            </span>
            <h3 className="font-bold text-xl text-slate-900">{exercise.name}</h3>
            <p className="text-sm text-slate-500 mt-1">Target Area: <span className="font-medium text-slate-700">{exercise.area}</span></p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyStyles[exercise.difficulty]}`}
          >
            {exercise.difficulty}
          </span>
        </div>

        <button
          onClick={() => onStartExercise(exercise.id)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors mb-4"
        >
          <Play size={16} fill="currentColor" />
          <span>Start Procedure</span>
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-slate-500 hover:text-slate-800 pt-2 border-t border-slate-100 transition-colors"
        >
          <span>Clinical Instructions</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
          />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Execution Steps</h4>
              <ol className="space-y-2">
                {exercise.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex gap-3 items-start p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <p>{exercise.safety}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}