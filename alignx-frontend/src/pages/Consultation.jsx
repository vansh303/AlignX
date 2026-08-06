"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, ArrowLeft, MoreVertical, Sparkles, Stethoscope, Activity, ShieldCheck } from "lucide-react";

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
    // MAIN CONTAINER: 100dvh ensures perfect fit on all screens
    <div className="h-[100dvh] bg-slate-950 flex flex-col font-sans overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="flex-none h-16 border-b border-white/5 flex items-center px-4 bg-slate-900/80 backdrop-blur-md z-30 shadow-sm">
        <div className="max-w-3xl w-full mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg border border-white/10">
                            <Stethoscope size={18} className="text-white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-sm flex items-center gap-2">
                            Dr. Align <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1 rounded border border-cyan-500/20 font-mono">AI-MD</span>
                        </h1>
                        <p className="text-slate-400 text-[11px] font-medium">Orthopedic Consultant</p>
                    </div>
                </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full text-slate-400">
                <MoreVertical size={20} />
            </button>
        </div>
      </header>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <div className="max-w-2xl mx-auto space-y-6 pb-2">
            
            {/* Security Badge */}
            <div className="flex justify-center mt-2 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-white/5">
                    <ShieldCheck size={12} className="text-cyan-500" /> 
                    SECURE MEDICAL SESSION
                </div>
            </div>

            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
                {/* Doctor Avatar */}
                {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <Bot size={14} className="text-cyan-400" />
                    </div>
                )}

                <div
                className={`max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm relative ${
                    msg.sender === "user"
                    ? "bg-cyan-600 text-white rounded-tr-sm shadow-md"
                    : "bg-slate-800/90 text-slate-200 border border-white/5 rounded-tl-sm"
                }`}
                >
                    {msg.text}
                    <div className={`text-[9px] mt-1.5 opacity-60 text-right ${msg.sender === "user" ? "text-cyan-100" : "text-slate-500"}`}>
                        {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
            <div className="flex justify-start w-full animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center mr-2 shrink-0">
                    <Activity size={14} className="text-cyan-400 animate-pulse" />
                </div>
                <div className="bg-slate-800/50 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                   <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-cyan-500/60 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                        <div className="w-1.5 h-1.5 bg-cyan-500/60 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                        <div className="w-1.5 h-1.5 bg-cyan-500/60 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
                   </div>
                   <span className="text-xs text-slate-500 font-medium">Analyzing...</span>
                </div>
            </div>
            )}
            
            <div ref={messagesEndRef} className="h-2" />
        </div>
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="flex-none p-3 md:p-4 bg-slate-950/90 backdrop-blur-xl z-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto relative">
            
            {/* Smart Suggestions */}
            {step === 1 && !isTyping && (
                <div className="absolute -top-14 left-0 right-0 flex gap-2 overflow-x-auto px-1 pb-2 no-scrollbar">
                    {["Neck Pain", "Lower Back", "Shoulder", "Knee Pain", "Posture Check"].map(opt => (
                        <button key={opt} onClick={() => addUserMessage(opt)} className="flex-none px-4 py-1.5 bg-slate-800 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-700 rounded-full text-xs text-slate-300 whitespace-nowrap transition-all shadow-md">
                            {opt}
                        </button>
                    ))}
                </div>
            )}
             {step === 3 && !isTyping && (
                <div className="absolute -top-14 left-0 right-0 flex gap-2 px-1 pb-2">
                     <button onClick={() => addUserMessage("I am ready")} className="flex-1 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 transition-all">
                        Start Scan
                    </button>
                    <button onClick={() => addUserMessage("Not yet")} className="flex-1 px-4 py-1.5 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-full text-xs text-slate-400 transition-all">
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
                    className="w-full bg-slate-900 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 focus:bg-slate-800 transition-all shadow-lg"
                    autoFocus
                />
                
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="absolute right-1.5 p-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-0 disabled:scale-75 rounded-full transition-all duration-300 text-white shadow-md"
                >
                    <Send size={16} strokeWidth={2.5} />
                </button>
            </div>
            
            <div className="text-center mt-2 opacity-30 hover:opacity-100 transition-opacity">
                 <p className="text-[9px] text-slate-400 uppercase tracking-widest">
                    Dr. Align AI • v2.4 Medical Protocol
                </p>
            </div>
        </div>
      </footer>

    </div>
  );
}