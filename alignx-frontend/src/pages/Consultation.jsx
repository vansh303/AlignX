"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, ArrowLeft, MoreVertical, Sparkles, Stethoscope, Activity, ShieldCheck, Check } from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Consultation() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial Greeting
  useEffect(() => {
    setTimeout(() => {
        addBotMessage("Hello. I am Dr. Align, your AI Physiotherapy Consultant.", 500);
        addBotMessage("I am here to clinically analyze your posture and pain. To begin, may I have your full name?", 1500);
    }, 500);
  }, []);

  const addBotMessage = (text, delay = 0) => {
    setTimeout(() => {
      setIsTyping(true);
      const thinkingTime = Math.min(800 + text.length * 15, 2500); 
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { text, sender: "bot", id: Date.now() }]);
      }, thinkingTime); 
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { text, sender: "user", id: Date.now() }]);
    processResponse(text);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // --- DOCTOR LOGIC ENGINE ---
  const [step, setStep] = useState(0);

  const processResponse = (userText) => {
    const lowerText = userText.toLowerCase();

    // STEP 0: NAME
    if (step === 0) { 
      addBotMessage(`Pleasure to meet you, ${userText}.`);
      addBotMessage("Please describe your primary discomfort. Where is the pain located? (e.g., Neck, Lower Back, Shoulder)", 1200);
      setStep(1);
    } 
    
    // STEP 1: LOCATION
    else if (step === 1) { 
      const empathy = [
        `I understand. ${userText} issues are very common but require attention.`,
        `I see. We should examine that area closely to prevent chronic issues.`,
        `Thank you. Let's focus on relieving that tension in your ${userText}.`
      ];
      addBotMessage(empathy[Math.floor(Math.random() * empathy.length)]);
      addBotMessage("On a clinical scale of 1 to 10 (10 being severe/incapacitating), how would you rate the pain?", 1500);
      setStep(2);
    } 
    
    // STEP 2: SEVERITY
    else if (step === 2) { 
      const painLevel = parseInt(userText.match(/\d+/)) || 5;

      if (painLevel >= 8) {
        addBotMessage("Your pain level indicates acute distress. I strongly advise consulting a human specialist immediately.", 500);
        addBotMessage("However, I can still perform a non-invasive postural scan to identify triggers. Shall we proceed?", 2000);
      } else {
        addBotMessage(`Noted (Level ${painLevel}). This suggests a mechanical or postural root cause.`, 500);
        addBotMessage("I recommend a 'Cervical & Spine Mobility Scan' to analyze your range of motion.", 2000);
        addBotMessage("Are you ready to enter the examination suite?", 3000);
      }
      setStep(3);
    }
    
    // STEP 3: CONSENT
    else if (step === 3) { 
      if (lowerText.includes("yes") || lowerText.includes("sure") || lowerText.includes("ready") || lowerText.includes("ok")) {
        addBotMessage("Initializing secure scanning protocol...", 0);
        setTimeout(() => navigate("/assessment"), 3000);
      } else {
        addBotMessage("Take your time. I am standing by.");
      }
    }
  };

  return (
    <div className="h-[100dvh] bg-slate-950 flex flex-col font-sans overflow-hidden relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      {/* --- HEADER --- */}
      <header className="flex-none h-20 border-b border-cyan-500/20 flex items-center px-4 md:px-6 bg-slate-950/80 backdrop-blur-2xl z-30 shadow-2xl">
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate("/")} 
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                              <Stethoscope size={20} className="text-cyan-400" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-sm flex items-center gap-2">
                            Dr. Align <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">AI CONSULTANT v2.4</span>
                        </h1>
                        <p className="text-slate-400 text-xs font-mono">Clinical Telehealth Assistant</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck size={14} /> HIPAA ENCRYPTED
            </div>
        </div>
      </header>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth z-10">
        <div className="max-w-3xl mx-auto space-y-6 pb-2">
            
            {/* Security Badge */}
            <div className="flex justify-center my-2">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                    <ShieldCheck size={14} className="text-cyan-400" /> 
                    CONFIDENTIAL AI MEDICAL CONSULTATION SESSION
                </div>
            </div>

            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
                {/* Doctor Avatar */}
                {msg.sender === "bot" && (
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center mr-3 mt-1 shrink-0 shadow-md">
                        <Bot size={18} className="text-cyan-400" />
                    </div>
                )}

                <div
                className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed relative ${
                    msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-medium rounded-tr-sm shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900/90 text-slate-200 border border-white/10 backdrop-blur-xl rounded-tl-sm shadow-xl"
                }`}
                >
                    {msg.text}
                    <div className={`text-[9px] font-mono mt-1.5 opacity-60 text-right ${msg.sender === "user" ? "text-slate-900 font-bold" : "text-slate-400"}`}>
                        {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
            <div className="flex justify-start w-full animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center mr-3 shrink-0">
                    <Activity size={18} className="text-cyan-400 animate-pulse" />
                </div>
                <div className="bg-slate-900/90 border border-white/10 px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                   <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                   <span className="text-xs font-mono text-slate-400">Dr. Align is analyzing...</span>
                </div>
            </div>
            )}
            
            <div ref={messagesEndRef} className="h-2" />
        </div>
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="flex-none p-4 bg-slate-950/90 backdrop-blur-2xl z-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto relative">
            
            {/* Smart Suggestions */}
            {step === 1 && !isTyping && (
                <div className="absolute -top-14 left-0 right-0 flex gap-2 overflow-x-auto px-1 pb-2 no-scrollbar">
                    {["Neck Pain", "Lower Back Pain", "Shoulder Tension", "Knee Stiffness", "Full Posture Check"].map(opt => (
                        <button key={opt} onClick={() => addUserMessage(opt)} className="flex-none px-4 py-2 bg-slate-900 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 rounded-xl text-xs font-mono text-cyan-300 transition-all shadow-md cursor-pointer">
                            {opt}
                        </button>
                    ))}
                </div>
            )}
             {step === 3 && !isTyping && (
                <div className="absolute -top-14 left-0 right-0 flex gap-2 px-1 pb-2">
                     <button onClick={() => addUserMessage("I am ready for the scan")} className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg">
                        Proceed to Assessment Suite
                    </button>
                    <button onClick={() => addUserMessage("Wait a moment")} className="px-6 py-2 bg-slate-900 border border-white/10 hover:bg-slate-800 rounded-xl text-xs font-mono text-slate-400 transition-all cursor-pointer">
                        Wait
                    </button>
                </div>
            )}

            <div className="relative flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="w-full bg-slate-900/90 border border-white/15 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all shadow-xl"
                    autoFocus
                />
                
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="absolute right-2 p-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-0 disabled:scale-75 rounded-xl transition-all duration-300 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                    <Send size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
      </footer>

    </div>
  );
}