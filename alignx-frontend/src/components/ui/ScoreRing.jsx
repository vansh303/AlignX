import React from "react";
import { motion } from "framer-motion";

export default function ScoreRing({ score = 0, size = 160, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const numericScore = Math.min(100, Math.max(0, Number(score) || 0));
  const offset = circumference - (numericScore / 100) * circumference;

  // Determine color theme based on score
  let strokeColor = "#10b981"; // emerald-500
  let glowColor = "rgba(16, 185, 129, 0.4)";
  let badgeText = "OPTIMAL POSTURE";
  let badgeBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

  if (numericScore < 60) {
    strokeColor = "#ef4444"; // red-500
    glowColor = "rgba(239, 68, 68, 0.4)";
    badgeText = "CRITICAL CORRECTION";
    badgeBg = "bg-red-500/10 text-red-400 border-red-500/30";
  } else if (numericScore < 80) {
    strokeColor = "#f59e0b"; // amber-500
    glowColor = "rgba(245, 158, 11, 0.4)";
    badgeText = "MODERATE DEVIATION";
    badgeBg = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800/80"
            fill="transparent"
          />
          {/* Animated score circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0px 0px 8px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white hud-text"
          >
            {numericScore}
          </motion.span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            / 100 SCORE
          </span>
        </div>
      </div>

      {/* Quality Badge */}
      <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeBg}`}>
        {badgeText}
      </div>
    </div>
  );
}
