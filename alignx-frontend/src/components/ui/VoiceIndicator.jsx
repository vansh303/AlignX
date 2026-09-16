import React from "react";
import { Volume2 } from "lucide-react";

export default function VoiceIndicator({ active = false, text = "AI Voice Assistant Active" }) {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all ${
      active 
        ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
        : "bg-slate-900/60 border-white/10 text-slate-400"
    }`}>
      <div className="relative flex items-center justify-center">
        <Volume2 size={14} className={active ? "text-cyan-400 animate-pulse" : "text-slate-500"} />
        {active && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
        )}
      </div>

      <span className="text-xs font-mono font-medium tracking-tight">
        {text}
      </span>

      {/* Audio Waveform Animation */}
      {active && (
        <div className="flex items-center gap-0.5 ml-1">
          <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
          <span className="w-0.5 h-4 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
          <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
          <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
        </div>
      )}
    </div>
  );
}
