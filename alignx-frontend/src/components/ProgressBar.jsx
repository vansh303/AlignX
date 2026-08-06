"use client";

export default function ProgressBar({ label, value, max = 100, color = "cyan" }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Dynamic color mapping based on prop
  const colorMap = {
    cyan: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
    emerald: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
    red: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]",
    amber: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-end">
        <span className="font-mono text-sm text-slate-300 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-sm font-bold text-white">
          {value}<span className="text-slate-500">/{max}</span>
        </span>
      </div>
      
      {/* Track */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 relative">
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${activeColor} relative`}
          style={{ width: `${percentage}%` }}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-shine" />
        </div>
      </div>
    </div>
  );
}