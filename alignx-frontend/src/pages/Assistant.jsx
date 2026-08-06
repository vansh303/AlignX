"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useAlignX } from "../context/AlignXContext";
import { useNavigate } from "react-router-dom";

export default function Assistant() {
  const { exercises } = useAlignX();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [userInputs, setUserInputs] = useState({ reason: null, age: null, area: null, severity: null });
  const [showSevereDisclaimer, setShowSevereDisclaimer] = useState(false);

  const handleStartExercise = (id) => {
    setIsOpen(false);
    navigate(`/exercise/${id}`);
  };

  const getExercisesForArea = (area) => {
    // Safe guard if exercises is undefined
    const safeExercises = Array.isArray(exercises) ? exercises : [];
    if (!area || area === "Multiple areas") return safeExercises;
    
    // Simple filter
    return safeExercises.filter(e => e.area.toLowerCase().includes(area.toLowerCase()));
  };

  // Step Handlers
  const handleInitialChoice = (choice) => {
     if (choice === "start") setStep("reason");
     else setStep("explore");
  };

  const handleReason = (reason) => {
    setUserInputs({ ...userInputs, reason });
    setStep("age");
  };

  const handleAge = (age) => {
    setUserInputs({ ...userInputs, age });
    setStep("area");
  };

  const handleArea = (area) => {
    setUserInputs({ ...userInputs, area });
    setStep("severity");
  };

  const handleSeverity = (severity) => {
    setUserInputs({ ...userInputs, severity });
    if (severity.includes("Severe")) {
      setShowSevereDisclaimer(true);
      setTimeout(() => setStep("results"), 2000);
    } else {
      setStep("results");
    }
  };
  
  const handleFinalChoice = (choice) => {
    if (choice === "library") {
        setIsOpen(false);
        navigate('/exercises');
    } else if (choice === "basics") {
        setStep("basics");
    } else if (choice === "close") {
        setIsOpen(false);
        setStep("initial");
        setUserInputs({ reason: null, age: null, area: null, severity: null });
    } else if (choice === "another") {
        setUserInputs({ ...userInputs, area: null, severity: null });
        setStep("area");
    }
  };

  const recommendedExercises = getExercisesForArea(userInputs.area);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full shadow-[0_0_30px_rgba(14,165,233,0.5)] bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-40 w-96 max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[32rem] bg-slate-900/95 backdrop-blur-xl border border-white/10">
           {/* Header */}
           <div className="p-4 flex items-center justify-between bg-gradient-to-r from-sky-500 to-cyan-500">
             <div>
               <h3 className="font-semibold text-white">AlignX Physio</h3>
               <p className="text-white/80 text-xs">AI Guidance</p>
             </div>
             <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg"><X size={20} className="text-white" /></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Initial Step */}
              {step === "initial" && (
                 <div className="space-y-4">
                    <div className="text-white space-y-3">
                        <p className="text-base font-medium">Hi 👋</p>
                        <p className="text-sm">I'm your AlignX Physio Assistant.</p>
                        <p className="text-sm">I can help you understand your pain and suggest safe exercises.</p>
                        <p className="text-sm font-medium mt-4">Shall we get started?</p>
                    </div>
                    <div className="space-y-2 mt-6">
                        <button onClick={() => handleInitialChoice("start")} className="w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg text-white font-medium text-sm">Yes, start</button>
                        <button onClick={() => handleInitialChoice("explore")} className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm">Just exploring</button>
                    </div>
                 </div>
              )}

              {/* Reason Step */}
              {step === "reason" && (
                <div className="space-y-4">
                  <p className="text-white font-medium">What is your main goal?</p>
                  <div className="space-y-2">
                    {["Pain / Injury", "Posture Improvement", "Recovery", "Learning"].map((reason) => (
                      <button key={reason} onClick={() => handleReason(reason)} className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm">{reason}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Age Step */}
              {step === "age" && (
                <div className="space-y-4">
                  <p className="text-white font-medium">Which age group do you belong to?</p>
                  <div className="space-y-2">
                    {["Under 18", "18–30", "30–45", "45+"].map((age) => (
                      <button key={age} onClick={() => handleAge(age)} className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm">{age}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Area Step */}
              {step === "area" && (
                <div className="space-y-4">
                  <p className="text-white font-medium">Where do you feel discomfort?</p>
                  <div className="space-y-2">
                    {["Neck", "Shoulder", "Back", "Knee", "Multiple areas"].map((area) => (
                      <button key={area} onClick={() => handleArea(area)} className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm">{area}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Severity Step */}
              {step === "severity" && (
                <div className="space-y-4">
                  <p className="text-white font-medium">How intense is the pain?</p>
                  <div className="space-y-2">
                    {["Mild (Noticeable)", "Moderate (Distracting)", "Severe (Limits movement)"].map((sev) => (
                      <button key={sev} onClick={() => handleSeverity(sev)} className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm text-left px-4">{sev}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Step */}
              {step === "results" && (
                  <div className="space-y-4">
                      {showSevereDisclaimer && (
                         <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-xs text-white mb-2">
                            ⚠️ Please consult a doctor for severe pain.
                         </div>
                      )}
                      <p className="text-white text-sm font-medium">Based on your input, try these:</p>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          {recommendedExercises.length > 0 ? recommendedExercises.map(ex => (
                              <button 
                                key={ex.id} 
                                onClick={() => handleStartExercise(ex.id)}
                                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex justify-between items-center group transition-colors"
                              >
                                  <div>
                                    <span className="text-sm text-white font-semibold block">{ex.name}</span>
                                    <span className="text-xs text-slate-400">{ex.difficulty} • {ex.area}</span>
                                  </div>
                                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">Start &rarr;</span>
                              </button>
                          )) : <p className="text-slate-400 text-sm">No specific exercises found.</p>}
                      </div>
                      <div className="pt-4 border-t border-white/10">
                         <button onClick={() => handleFinalChoice("close")} className="w-full py-2 bg-white/10 rounded-lg text-white text-sm">Close</button>
                      </div>
                  </div>
              )}

              {/* Explore/Basics Step */}
              {(step === "explore" || step === "basics") && (
                  <div className="space-y-4">
                      <p className="text-white text-sm">Feel free to browse our Exercise Library.</p>
                      <button onClick={() => handleFinalChoice("library")} className="w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg text-white font-medium text-sm">Go to Library</button>
                  </div>
              )}

           </div>
        </div>
      )}
    </>
  );
}