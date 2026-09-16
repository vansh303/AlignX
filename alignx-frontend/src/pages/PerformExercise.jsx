// FILE: src/pages/PerformExercise.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAlignX } from "../context/AlignXContext";
import { ArrowLeft, Video, Activity, PlayCircle, Square, Sparkles, CheckCircle2, Box } from "lucide-react";
import ThreeDPlayer from "../components/ThreeDPlayer";
import VoiceIndicator from "../components/ui/VoiceIndicator";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function PerformExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExerciseById, API_URL, selectedLanguage } = useAlignX();

  const [exercise, setExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [feedback, setFeedback] = useState("Waiting to start...");

  // WebSocket for Voice/Feedback
  const ws = useRef(null);

  useEffect(() => {
    const foundEx = getExerciseById(id);
    if (foundEx) {
      setExercise(foundEx);
    }
  }, [id, getExerciseById]);

  useEffect(() => {
    if (isActive) {
      const wsUrl = import.meta.env.VITE_WS_URL || "ws://127.0.0.1:5000";
      ws.current = new WebSocket(`${wsUrl}/ws/feedback`);

      ws.current.onmessage = (event) => {
        setFeedback(event.data);
        // Simple TTS
        if ("speechSynthesis" in window) {
          let spokenText = event.data;

          if (selectedLanguage === 'hi') {
            if (event.data === "Minor Forward Head Posture") spokenText = "आपका सिर थोड़ा आगे की ओर झुका हुआ है, कृपया इसे सीधा करें";
          } else {
            if (event.data === "Minor Forward Head Posture") spokenText = "Minor Forward Head Posture detected, please straighten your head.";
          }

          const utterance = new SpeechSynthesisUtterance(spokenText);
          utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      };

      return () => {
        if (ws.current) ws.current.close();
      };
    }
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    if ("speechSynthesis" in window) {
      const startMsg = selectedLanguage === 'hi' ? "सेशन शुरू हो रहा है" : "Starting Session";
      const msg = new SpeechSynthesisUtterance(startMsg);
      msg.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(msg);
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setFeedback("Session Stopped");
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    window.location.reload(); // Hard reset to clear camera stream buffer
  };

  if (!exercise)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden">
        <LiquidMetalBg className="absolute inset-0 pointer-events-none opacity-30" />
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase">Loading Exercise Module...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 md:px-6 pb-16 relative selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-300 hover:text-white border border-white/10 transition-all shadow-md group shrink-0"
              title="Go Back"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{exercise.name}</h1>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 uppercase font-bold">{exercise.part}</span>
                <span>•</span>
                <span className="text-slate-400">{exercise.age}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold uppercase">{exercise.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <VoiceIndicator active={isActive} text="Real-time Voice Feedback" />
          </div>
        </div>

        {/* --- MAIN DUAL STREAM GRID --- */}
        <div className="grid lg:grid-cols-5 gap-6 items-stretch min-h-[520px]">
          
          {/* LEFT: DEMO VIDEO OR 3D MODEL */}
          <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl flex flex-col min-h-[380px]">
            <div className="p-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between z-10">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-2">
                {exercise.model ? <Box size={14} /> : <Video size={14} />}
                {exercise.model ? "3D ANATOMICAL MODEL" : "EXERCISE DEMO VIDEO"}
              </span>
              <span className="text-[10px] font-mono text-slate-500">REFERENCE TARGET</span>
            </div>

            <div className="flex-1 relative w-full h-full bg-black">
              {exercise.model ? (
                <ThreeDPlayer modelPath={`/models/${exercise.model}`} />
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${exercise.video
                    ? exercise.video.includes("shorts/")
                      ? exercise.video.split("shorts/")[1].split("?")[0]
                      : exercise.video.split("v=")[1]?.split("&")[0]
                    : "3VC0_tW-XFQ"
                    }?autoplay=${isActive ? "1" : "0"}&mute=1&loop=1&playlist=${exercise.video
                      ? exercise.video.includes("shorts/")
                        ? exercise.video.split("shorts/")[1].split("?")[0]
                        : exercise.video.split("v=")[1]?.split("&")[0]
                      : "3VC0_tW-XFQ"
                    }&controls=0&modestbranding=1`}
                  title="Exercise Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover opacity-90"
                />
              )}
            </div>
          </div>

          {/* RIGHT: LIVE AI CAMERA */}
          <div className="lg:col-span-3 bg-slate-900/80 rounded-3xl overflow-hidden border border-cyan-500/20 relative shadow-2xl flex flex-col min-h-[380px] group">
            
            {/* Corner HUD Brackets */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            <div className="p-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between z-10">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-2">
                <Activity size={14} className={isActive ? "animate-pulse" : ""} />
                LIVE AI POSTURE TRACKER
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                isActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"
              }`}>
                {isActive ? "SESSION ACTIVE" : "CAMERA OFF"}
              </span>
            </div>

            <div className="flex-1 relative w-full h-full bg-black flex items-center justify-center">
              {isActive ? (
                <>
                  <img
                    src={`${API_URL}/stream/video_feed`}
                    alt="Live AI Analysis"
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  {/* Laser Scanning Line Overlay */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-scan pointer-events-none z-10" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/90 text-slate-400 p-6 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 text-slate-500 shadow-xl">
                    <Video size={36} />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Camera is Off</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Click <span className="text-cyan-400 font-bold">START SESSION</span> below to activate live pose tracking and voice guidance.
                  </p>
                </div>
              )}

              {/* Dynamic Realtime Feedback Banner */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/40 text-center z-30 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                >
                  <p className="text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    REAL-TIME AI FEEDBACK
                  </p>
                  <p className="text-xl font-mono font-bold text-white tracking-wide">{feedback}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* --- CONTROLS & INSTRUCTIONS --- */}
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* START / STOP BUTTON */}
          <div className="flex justify-center">
            {!isActive ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-bold text-xl rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
              >
                <PlayCircle size={26} />
                <span>START SESSION</span>
                <Sparkles size={20} className="animate-pulse" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStop}
                className="flex items-center gap-3 px-12 py-5 bg-slate-900 border-2 border-red-500/50 text-red-400 font-bold text-xl rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <Square size={24} fill="currentColor" />
                <span>STOP SESSION</span>
              </motion.button>
            )}
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-cyan-400" size={20} />
                Step-by-Step Exercise Instructions
              </span>
              <span className="text-xs font-mono text-slate-500">CORRECT FORM PROTOCOL</span>
            </h3>
            <div className="space-y-4">
              {exercise.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-slate-950/40 rounded-2xl border border-white/5 items-start transition-all hover:border-cyan-500/20"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm border border-cyan-500/30 shrink-0">
                    0{idx + 1}
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
