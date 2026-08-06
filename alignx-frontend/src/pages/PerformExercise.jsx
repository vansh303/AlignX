// FILE: src/pages/PerformExercise.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlignX } from "../context/AlignXContext";
import { ArrowLeft, Video, Activity, PlayCircle, Square } from "lucide-react";
import ThreeDPlayer from "../components/ThreeDPlayer";

export default function PerformExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExerciseById, API_URL, selectedLanguage } = useAlignX();
  ``;
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
      const wsUrl = import.meta.env.VITE_WS_URL || "ws://127.0.0.1:8000";
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Exercise...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition text-slate-400 hover:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{exercise.name}</h1>
            <p className="text-slate-400 text-sm">
              {exercise.age} • {exercise.part} • {exercise.difficulty}
            </p>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8 h-[600px]">
          {/* LEFT: DEMO VIDEO */}
          {/* LEFT: DEMO SECTION (Video OR 3D) */}
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden border border-white/10 relative group h-full">
            {/* LOGIC: Check if 'model' exists in exercise data */}
            {exercise.model ? (
              <ThreeDPlayer modelPath={`/models/${exercise.model}`} />
            ) : (
              // Fallback to YouTube Video
              <>
                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <Video size={14} className="text-cyan-400" /> Demo Video
                </div>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${exercise.video
                    ? exercise.video.includes("shorts/")
                      ? exercise.video.split("shorts/")[1].split("?")[0] // Handle Shorts
                      : exercise.video.split("v=")[1]?.split("&")[0] // Handle Normal Video
                    : "3VC0_tW-XFQ" // Fallback ID
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
                  className="w-full h-full object-cover opacity-80"
                ></iframe>
              </>
            )}
          </div>

          {/* RIGHT: LIVE CAMERA */}
          <div className="lg:col-span-3 bg-black rounded-3xl overflow-hidden border border-white/10 relative h-full">
            {isActive ? (
              <img
                src={`${API_URL}/stream/video_feed`}
                alt="Live AI Analysis"
                className="w-full h-full object-cover scale-x-[-1]" // Added mirror effect
              />
            ) : (
              // PLACEHOLDER
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Video size={32} />
                </div>
                <p>Camera is currently off</p>
                <p className="text-sm opacity-60">
                  Click Start to enable AI tracking
                </p>
              </div>
            )}

            {/* Feedback Overlay */}
            {isActive && (
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-cyan-500/30 text-center z-30">
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Real-time Feedback
                </p>
                <p className="text-xl font-mono text-white">{feedback}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- CONTROLS & INSTRUCTIONS --- */}
        <div className="max-w-3xl mx-auto">
          {/* START BUTTON */}
          <div className="flex justify-center mb-12">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-3 px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xl rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
              >
                <PlayCircle size={24} />
                START SESSION
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="flex items-center gap-3 px-12 py-5 bg-red-500 hover:bg-red-400 text-white font-bold text-xl rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all transform hover:scale-105"
              >
                <Square size={24} fill="currentColor" />
                STOP SESSION
              </button>
            )}
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-sm">
                STEP-BY-STEP
              </span>
              Instructions
            </h3>
            <div className="space-y-4">
              {exercise.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
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
