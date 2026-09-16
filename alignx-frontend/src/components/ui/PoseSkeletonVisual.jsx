import React from "react";
import { motion } from "framer-motion";
import { Crosshair, ShieldCheck, Activity, Eye, Zap } from "lucide-react";
import spinePNG from "../../assets/spin-skeleton.png";

export default function PoseSkeletonVisual() {
  // Key computer vision landmark coordinates (normalized percentage points 0-100)
  const landmarks = [
    { id: "head", x: 50, y: 15, label: "CRANIAL NODE", status: "NORMAL" },
    { id: "c7_spine", x: 50, y: 26, label: "C7 CERVICAL SPINE", angle: "9.12°", status: "TRACKING", highlight: true },
    { id: "l_shoulder", x: 34, y: 32, label: "L-ACROMION" },
    { id: "r_shoulder", x: 66, y: 32, label: "R-ACROMION" },
    { id: "l_elbow", x: 26, y: 48 },
    { id: "r_elbow", x: 74, y: 48 },
    { id: "l_wrist", x: 22, y: 64 },
    { id: "r_wrist", x: 78, y: 64 },
    { id: "l_hip", x: 40, y: 58, label: "PELVIC AXIS" },
    { id: "r_hip", x: 60, y: 58 },
    { id: "l_knee", x: 42, y: 76, label: "KNEE ALIGNMENT" },
    { id: "r_knee", x: 58, y: 76 },
    { id: "l_ankle", x: 44, y: 92 },
    { id: "r_ankle", x: 56, y: 92 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-teal-500/30 to-emerald-500/30 rounded-3xl blur-2xl opacity-60 animate-pulse pointer-events-none" />

      {/* Main HUD Frame Container */}
      <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-5 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden group">
        
        {/* Corner HUD Brackets */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            AI_VISION :: LANDMARK_33_ENGINE
          </div>
          <div className="text-slate-400 font-medium">
            CONFIDENCE: <span className="text-emerald-400 font-bold">99.4%</span>
          </div>
        </div>

        {/* Central Anatomical Canvas */}
        <div className="aspect-[4/5] bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          
          {/* Subtle Background Spine Image */}
          <motion.img
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={spinePNG}
            alt="Anatomical Skeleton"
            className="absolute inset-0 w-full h-full object-contain opacity-35 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] pointer-events-none"
          />

          {/* SVG Computer Vision Skeletal Line Overlay */}
          <motion.svg
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Skeletal Connections */}
            {/* Spinal Column */}
            <line x1="50" y1="15" x2="50" y2="58" stroke="rgba(6, 182, 212, 0.7)" strokeWidth="0.8" strokeDasharray="1,1" />
            
            {/* Shoulder Axis */}
            <line x1="34" y1="32" x2="66" y2="32" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="0.8" />
            
            {/* Left Arm */}
            <line x1="34" y1="32" x2="26" y2="48" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />
            <line x1="26" y1="48" x2="22" y2="64" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />

            {/* Right Arm */}
            <line x1="66" y1="32" x2="74" y2="48" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />
            <line x1="74" y1="48" x2="78" y2="64" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />

            {/* Pelvic Belt */}
            <line x1="40" y1="58" x2="60" y2="58" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="0.8" />

            {/* Torso Connector */}
            <line x1="34" y1="32" x2="40" y2="58" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.5" />
            <line x1="66" y1="32" x2="60" y2="58" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.5" />

            {/* Left Leg */}
            <line x1="40" y1="58" x2="42" y2="76" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />
            <line x1="42" y1="76" x2="44" y2="92" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />

            {/* Right Leg */}
            <line x1="60" y1="58" x2="58" y2="76" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />
            <line x1="58" y1="76" x2="56" y2="92" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="0.6" />
          </motion.svg>

          {/* Animated Glowing Joint Nodes */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          >
            {landmarks.map((lm) => (
              <div
                key={lm.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
              >
                {/* Outer Pulsing Ring */}
                <div className={`w-3 h-3 rounded-full border border-cyan-400/80 flex items-center justify-center ${lm.highlight ? "bg-cyan-400/30 animate-ping" : "bg-cyan-500/20"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${lm.highlight ? "bg-cyan-300" : "bg-emerald-400"}`} />
                </div>

                {/* Optional Telemetry Tag */}
                {lm.label && (
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded-lg border text-[9px] font-mono shadow-lg ${
                    lm.highlight 
                      ? "border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                      : "border-white/10 text-slate-300"
                  }`}>
                    {lm.label} {lm.angle && <span className="text-cyan-400 font-bold">[{lm.angle}]</span>}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Top Floating Badge */}
          <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-3 py-1 rounded-xl text-[10px] text-cyan-400 font-mono font-bold flex items-center gap-1.5 shadow-lg z-30">
            <Crosshair size={12} className="animate-spin-slow" />
            REAL-TIME SKELETAL LANDMARKING
          </div>

          {/* Bottom Floating Badge */}
          <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 px-3 py-1 rounded-xl text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1.5 shadow-lg z-30">
            <ShieldCheck size={12} />
            POSTURE ACCURACY: 88/100
          </div>
        </div>

        {/* Footer HUD Readout */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Activity size={14} /> 33 POSE NODES SYNCHRONIZED
          </span>
          <span className="text-slate-500">FPS: 30.0 | ZERO LATENCY</span>
        </div>
      </div>
    </motion.div>
  );
}
