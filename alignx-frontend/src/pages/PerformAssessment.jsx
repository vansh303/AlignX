"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  Activity,
  AlertCircle,
  Scan,
  ShieldCheck,
  Crosshair,
  CheckCircle2,
  Info,
  ChevronRight,
  Zap,
  RotateCcw,
  Sparkles,
  Box,
} from "lucide-react";
import { useAlignX } from "../context/AlignXContext";
import ScoreRing from "../components/ui/ScoreRing";
import VoiceIndicator from "../components/ui/VoiceIndicator";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";
import ThreeDPlayer from "../components/ThreeDPlayer";

export default function PerformAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessmentById, selectedLanguage, API_URL } = useAlignX();
  const apiBase = API_URL || import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1";

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [show3DModal, setShow3DModal] = useState(false);

  useEffect(() => {
    const found = getAssessmentById(id);
    if (found) setAssessment(found);
    setLoading(false);
  }, [id, getAssessmentById]);

  const handleToggleSession = () => {
    if (!isStarted) {
      setCameraError(false);
      setAnalysisResult(null);
      if ("speechSynthesis" in window) {
        const startMsg = selectedLanguage === 'hi' ? "स्कैन शुरू हो रहा है" : "Starting Assessment";
        const msg = new SpeechSynthesisUtterance(startMsg);
        msg.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(msg);
      }
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
    setIsStarted(!isStarted);
  };

  const lastSpokenRef = useRef("");

  useEffect(() => {
    let interval;

    if (isStarted) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${apiBase}/start-screening`);

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();

          // Update analysis result on screen
          if (data && typeof data.score !== "undefined") {
            setAnalysisResult({
              score: Number(data.score),
              issue: data.issue || "No issue detected",
              neckAngle:
                data.neck_angle !== null &&
                  data.neck_angle !== undefined
                  ? Number(data.neck_angle)
                  : null,
            });
          }

          // Voice feedback
          if (
            data &&
            data.issue &&
            data.issue !== "Scanning..." &&
            data.issue !== lastSpokenRef.current
          ) {
            lastSpokenRef.current = data.issue;

            if ("speechSynthesis" in window) {
              window.speechSynthesis.cancel();

              let spokenText = data.issue;

              if (selectedLanguage === "hi") {
                switch (data.issue) {
                  case "Good Neck Alignment":
                    spokenText =
                      "आपकी गर्दन का alignment सही है।";
                    break;

                  case "Minor Forward Head Posture":
                    spokenText =
                      "आपका सिर थोड़ा आगे की ओर झुका हुआ है, कृपया इसे सीधा करें।";
                    break;

                  case "Moderate Neck Inclination":
                    spokenText =
                      "आपकी गर्दन मध्यम रूप से झुकी हुई है, कृपया अपने सिर और गर्दन को सीधा रखें।";
                    break;

                  case "High Neck Inclination":
                    spokenText =
                      "आपकी गर्दन काफी झुकी हुई है, कृपया अपने सिर और गर्दन की स्थिति को ठीक करें।";
                    break;

                  default:
                    spokenText =
                      `${data.issue}, कृपया अपनी posture को adjust करें।`;
                }
              } else {
                switch (data.issue) {
                  case "Good Neck Alignment":
                    spokenText =
                      "Good posture. Your neck alignment looks good.";
                    break;

                  case "Minor Forward Head Posture":
                    spokenText =
                      "Minor forward head posture detected. Please straighten your head.";
                    break;

                  case "Moderate Neck Inclination":
                    spokenText =
                      "Moderate neck inclination detected. Please keep your head and neck upright.";
                    break;

                  case "High Neck Inclination":
                    spokenText =
                      "High neck inclination detected. Please correct your head and neck position.";
                    break;

                  default:
                    spokenText =
                      `${data.issue} detected. Please adjust your posture.`;
                }
              }

              const msg = new SpeechSynthesisUtterance(spokenText);

              msg.lang =
                selectedLanguage === "hi"
                  ? "hi-IN"
                  : "en-US";

              msg.rate = 0.9;
              msg.pitch = 1;

              window.speechSynthesis.speak(msg);
            }
          }
        } catch (err) {
          console.error("Failed to fetch feedback", err);

          if (interval) {
            clearInterval(interval);
          }

          setCameraError(true);
        }
      }, 2000);
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      lastSpokenRef.current = "";
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isStarted, selectedLanguage, apiBase]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden">
        <LiquidMetalBg className="absolute inset-0 pointer-events-none opacity-30" />
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase">Initializing Diagnostic Core...</p>
      </div>
    );

  if (!assessment)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4 relative">
        <h2 className="text-xl text-red-400 font-bold">Assessment Module Not Found</h2>
        <button
          onClick={() => navigate("/assessment")}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-white/10 font-medium transition-all"
        >
          Return to Assessment Catalog
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 md:px-6 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Subtle Shader */}
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* Header HUD Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/assessment")}
              className="p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl text-slate-300 hover:text-white border border-white/10 transition-all shadow-md group shrink-0"
              title="Return to Menu"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {assessment.name}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Zap size={12} /> AI CORE v2.4
                </span>
              </div>
              <p className="text-emerald-400 text-xs md:text-sm font-medium flex items-center gap-2 mt-1">
                <Scan size={14} className="animate-pulse" /> Real-time Biomechanical Screening Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <VoiceIndicator active={isStarted} text="AI Voice Feedback Active" />
          </div>
        </div>

        {/* Dual Screen Interface */}
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT: AI Diagnostic Status Panel */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-cyan-400" /> AI Diagnostic Status
              </h3>
              <span className="text-[10px] font-mono text-slate-400">ENGINE: MEDIAPIPE 33</span>
            </div>

            <div className="flex-1 bg-slate-900/70 rounded-3xl border border-white/10 p-6 backdrop-blur-xl flex flex-col justify-between overflow-hidden relative shadow-2xl">

              <div className="space-y-6 relative z-10">
                {/* Active Analysis Indicator */}
                <div className={`p-4 rounded-2xl border transition-all ${isStarted
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-slate-800/40 border-white/10"
                  }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${isStarted ? "bg-emerald-400 animate-ping" : "bg-slate-600"}`} />
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isStarted ? "text-emerald-400" : "text-slate-400"}`}>
                        {isStarted ? "Deep Scan Active" : "System Standby"}
                      </span>
                    </div>
                    {isStarted && (
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        STREAMING
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI engine is tracking 33 3D skeletal landmarks in real time to calculate millimeter-precise anatomical angles.
                  </p>
                </div>

                {/* Posture Metrics Checklist */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Monitored Metrics:
                  </h4>
                  {[
                    { label: "Cervical Alignment Angle", id: "spine", metric: "C7 - Ear Tragus" },
                    { label: "Shoulder Level Symmetry", id: "shoulder", metric: "Acromion Axis" },
                    { label: "Pelvic Tilt & Spinal Axis", id: "pelvic", metric: "L1 - L5 Curvature" },
                  ].map((point) => (
                    <div
                      key={point.id}
                      className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex items-center justify-between text-xs transition-colors hover:border-cyan-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg ${isStarted ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"}`}
                        >
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-slate-200 font-medium">{point.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{point.metric}</span>
                    </div>
                  ))}
                </div>

                {/* 3D Model Interactive Button if available */}
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                      <Box size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Interactive 3D Anatomical Model</p>
                      <p className="text-[10px] text-slate-400">View cervical spine target posture</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShow3DModal(!show3DModal)}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/40 transition-all shrink-0"
                  >
                    {show3DModal ? "Close Model" : "View Model"}
                  </button>
                </div>
              </div>

              {/* Posture Hint Banner */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3 items-start relative z-10">
                <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed text-amber-200/90">
                  <span className="font-bold text-amber-400 block mb-0.5 uppercase tracking-wider">
                    Scanning Protocol Hint
                  </span>
                  Sit or stand 3 to 5 feet from camera with shoulders visible for optimal 33-landmark precision.
                </div>
              </div>

              {/* Background Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Crosshair size={260} className="text-cyan-400" />
              </div>
            </div>
          </div>

          {/* RIGHT: Live Sensor Feed Camera HUD */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} className="text-emerald-400" /> Live AI Sensor Stream
              </h3>
              {isStarted && (
                <span className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  ● LIVE FEED ACTIVE
                </span>
              )}
            </div>

            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-cyan-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex items-center justify-center group">

              {/* Corner HUD Brackets */}
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              {/* Camera Stream */}
              <div className="relative w-full h-full bg-slate-950">
                <img
                  src={`${apiBase}/stream/video_feed`}
                  alt="Live Stream"
                  className="w-full h-full object-cover"
                  onError={() => setCameraError(true)}
                />

                {/* Top HUD Overlay Info */}
                {isStarted && !cameraError && (
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                    <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/30 backdrop-blur-md flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      AI_LANDMARK_ENGINE :: STREAMING
                    </div>
                    <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-[10px] text-slate-300 font-mono hidden sm:block">
                      FPS: 30.0 | RES: 1080p | 33 MESH
                    </div>
                  </div>
                )}

                {/* Standby Overlay */}
                {!isStarted && !cameraError && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10">
                    <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                      <Scan size={40} className="animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">AI Sensor Standby</h4>
                    <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                      Press <span className="text-emerald-400 font-bold">Start Assessment</span> below to enable camera stream and real-time posture analysis.
                    </p>
                  </div>
                )}

                {/* Camera Error Overlay */}
                {cameraError && (
                  <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 mb-3">
                      <AlertCircle size={36} />
                    </div>
                    <p className="text-white font-bold text-lg">Backend API Offline</p>
                    <p className="text-slate-400 text-xs mt-1 max-w-xs">
                      Make sure FastAPI Python backend is running on <code className="text-cyan-400 font-mono">http://127.0.0.1:5000</code>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model Modal / Preview Container if toggled */}
        <AnimatePresence>
          {show3DModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Box className="text-cyan-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Anatomical 3D Target Model</h3>
                </div>
                <button
                  onClick={() => setShow3DModal(false)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-white/10"
                >
                  Close
                </button>
              </div>
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/10">
                <ThreeDPlayer modelPath="/models/neck_retraction.glb" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* START / STOP ACTION BAR */}
        <div className="max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggleSession}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl relative overflow-hidden group ${isStarted
                ? "bg-slate-900 text-red-400 border-2 border-red-500/50 hover:bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.25)]"
                : "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
              }`}
          >
            {isStarted ? (
              <>
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <Pause fill="currentColor" size={22} />
                <span>STOP ASSESSMENT</span>
              </>
            ) : (
              <>
                <Play fill="currentColor" size={22} />
                <span>START ASSESSMENT</span>
                <Sparkles size={18} className="text-slate-950 animate-pulse ml-1" />
              </>
            )}
          </motion.button>
        </div>

        {/* AI ANALYSIS RESULT DISPLAY */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/30">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        AI Biomechanical Analysis Summary
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Computed in real-time using MediaPipe 33-landmark posture engine
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-full font-bold">
                    SCAN COMPLETE
                  </span>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                  {/* POSTURE SCORE */}
                  <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative group hover:border-emerald-500/30 transition-colors">
                    <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-widest mb-4">
                      Posture Score
                    </p>
                    <ScoreRing score={analysisResult.score} size={150} strokeWidth={12} />
                  </div>

                  {/* NECK ANGLE */}
                  <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-cyan-500/30 transition-colors">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-widest mb-2">
                        Neck Angle Deviation
                      </p>
                      <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-5xl font-extrabold text-cyan-400 hud-text">
                          {analysisResult.neckAngle !== null && analysisResult.neckAngle !== undefined
                            ? Number(analysisResult.neckAngle).toFixed(2)
                            : "--"}
                        </span>
                        <span className="text-2xl font-bold text-cyan-500">°</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Normal Threshold:</span>
                      <span className="text-emerald-400 font-bold">&lt; 15.00°</span>
                    </div>
                  </div>

                  {/* DETECTED ISSUE */}
                  <div className={`md:col-span-2 lg:col-span-1 border rounded-2xl p-6 flex flex-col justify-between transition-colors ${analysisResult.issue === "Good Neck Alignment"
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-red-500/5 border-red-500/20"
                    }`}>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-widest mb-2">
                        Detected Posture Issue
                      </p>
                      <h4 className={`text-xl font-bold mt-2 ${analysisResult.issue === "Good Neck Alignment" ? "text-emerald-400" : "text-red-400"
                        }`}>
                        {analysisResult.issue || "No issue detected"}
                      </h4>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400 leading-relaxed">
                      {analysisResult.issue === "Good Neck Alignment"
                        ? "Optimal neck-to-spine alignment maintained."
                        : "Head inclination detected beyond optimal ergonomic limit."}
                    </div>
                  </div>
                </div>

                {/* RECOMMENDED EXERCISE */}
                <div className="bg-gradient-to-r from-slate-950/80 to-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
                      <Activity size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-widest">
                        Recommended Corrective Exercise
                      </p>
                      <p className="text-xl font-bold text-cyan-300 mt-0.5">
                        Cervical Retraction (Chin Tucks)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/perform/1")}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all shrink-0"
                  >
                    <span>Start Recommended Exercise</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ASSESSMENT PROTOCOL / INSTRUCTIONS */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
            <span>Assessment Protocol</span>
            <span className="text-xs font-mono text-cyan-400 font-normal">STEP-BY-STEP GUIDE</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {assessment.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 bg-slate-950/40 rounded-2xl border border-white/5 transition-all hover:border-cyan-500/20">
                <div className="flex-shrink-0 w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-cyan-400 font-mono font-bold text-sm border border-cyan-500/30">
                  0{idx + 1}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
