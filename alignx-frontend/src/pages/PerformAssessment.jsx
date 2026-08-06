"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  Activity,
  AlertCircle,
  Scan,
} from "lucide-react";
import ReactPlayer from "react-player";
import { useAlignX } from "../context/AlignXContext";
import { ShieldCheck, Crosshair, CheckCircle2, Info } from "lucide-react";

export default function PerformAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessmentById, selectedLanguage, API_URL } = useAlignX();
  const apiBase = API_URL || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    const found = getAssessmentById(id);
    if (found) setAssessment(found);
    setLoading(false);
  }, [id, getAssessmentById]);

  const handleToggleSession = () => {
    if (!isStarted) {
      setCameraError(false);
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
          const data = await res.json();

          if (data && data.issue && data.issue !== "Scanning...") {
            if (data.issue !== lastSpokenRef.current) {
              lastSpokenRef.current = data.issue;
              window.speechSynthesis.cancel();

              let spokenText = data.issue;
              if (selectedLanguage === 'hi') {
                if (data.issue === "Minor Forward Head Posture") spokenText = "आपका सिर थोड़ा आगे की ओर झुका हुआ है, कृपया इसे सीधा करें";
              } else {
                if (data.issue === "Minor Forward Head Posture") spokenText = "Minor Forward Head Posture detected, please straighten your head.";
              }

              const msg = new SpeechSynthesisUtterance(spokenText);
              msg.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
              window.speechSynthesis.speak(msg);
            }
          }
        } catch (err) {
          console.error("Failed to fetch feedback", err);
        }
      }, 2000);
    } else {
      window.speechSynthesis.cancel();
      lastSpokenRef.current = "";
    }
    return () => {
      if (interval) clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [isStarted, selectedLanguage]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Module...
      </div>
    );

  if (!assessment)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-xl text-red-400">Assessment Not Found</h2>
        <button
          onClick={() => navigate("/assessment")}
          className="px-4 py-2 bg-slate-800 rounded"
        >
          Return to Menu
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/assessment")}
            className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white border border-white/10"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {assessment.name}
            </h1>
            <p className="text-emerald-400 text-sm font-medium flex items-center gap-2">
              <Scan size={14} /> Diagnostic Mode
            </p>
          </div>
        </div>

        {/* Dual Screen Interface */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8 items-start">
          {/* LEFT: Demo Video */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-cyan-400" /> AI Diagnostic
              Status
            </h3>
            <div className="flex-1 bg-slate-900/60 rounded-3xl border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-6 relative z-10">
                {/* Active Analysis Indicator */}
                <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-3 h-3 rounded-full ${isStarted ? "bg-emerald-500 animate-pulse" : "bg-slate-600"}`}
                    ></div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      {isStarted ? "Deep Scan Active" : "System Standby"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    AI is monitoring 33 skeletal landmarks for biomechanical
                    deviations.
                  </p>
                </div>

                {/* Posture Points Checklist */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-2">
                    Analyzing Metrics:
                  </h4>
                  {[
                    { label: "Spinal Curvature (C7-L5)", id: "spine" },
                    { label: "Shoulder Level Symmetry", id: "shoulder" },
                    { label: "Pelvic Tilt Alignment", id: "pelvic" },
                  ].map((point) => (
                    <div
                      key={point.id}
                      className="flex items-center gap-3 text-xs text-slate-400"
                    >
                      <div
                        className={`p-1 rounded-full ${isStarted ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-600"}`}
                      >
                        <CheckCircle2 size={12} />
                      </div>
                      {point.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Posture Hint Banner */}
              <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-3">
                <Info size={18} className="text-amber-400 shrink-0" />
                <p className="text-[11px] leading-relaxed text-amber-200/80">
                  <span className="font-bold text-amber-400 block mb-0.5">
                    POSTURE HINT:
                  </span>
                  Avoid wearing baggy clothes for the most accurate
                  millimeter-precise tracking.
                </p>
              </div>

              {/* Decorative HUD Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Crosshair size={240} className="text-cyan-400" />
              </div>
            </div>
          </div>
          {/* RIGHT: Live Camera */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Activity size={16} className="text-emerald-500" /> Live Sensor
                Feed
              </h3>
              {isStarted && (
                <span className="text-xs text-emerald-500 font-bold animate-pulse">
                  ● ACTIVE
                </span>
              )}
            </div>

            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center">
              {isStarted ? (
                <>
                  <img
                    src={`${apiBase}/stream/video_feed`}
                    alt="Live Stream"
                    className="w-full h-full object-cover transform scale-x-[-1]"
                    onError={() => setCameraError(true)}
                  />
                  {cameraError && (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center z-20">
                      <AlertCircle className="text-red-500 mb-2" size={40} />
                      <p className="text-white font-bold">
                        Sensor Connection Failed
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Check Python Backend (Port 8000)
                      </p>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded border border-white/10 backdrop-blur text-xs text-emerald-400 font-mono">
                    AI_SCANNING...
                  </div>
                </>
              ) : (
                <div className="text-center p-6 text-slate-500">
                  <Scan size={32} className="mx-auto mb-4" />
                  <p className="font-medium">System Standby</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="max-w-xl mx-auto mb-12">
          <button
            onClick={handleToggleSession}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${isStarted
              ? "bg-slate-800 text-red-400 border border-red-500/20 hover:bg-slate-700"
              : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-emerald-500/25"
              }`}
          >
            {isStarted ? (
              <>
                <Pause fill="currentColor" /> Stop Assessment
              </>
            ) : (
              <>
                <Play fill="currentColor" /> Start Assessment
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            Assessment Protocol
          </h3>
          <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
            {assessment.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 font-bold text-sm border border-white/10">
                  {idx + 1}
                </div>
                <p className="text-slate-300 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
