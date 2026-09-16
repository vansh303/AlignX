import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlignX } from '../context/AlignXContext';
import { Camera, MoveRight, Info, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import LiquidMetalBg from '../components/ui/LiquidMetalBg';

export default function Instructions() {
  const navigate = useNavigate();
  const { selectedLanguage } = useAlignX();

  const content = {
    en: {
      title: "Preparation & Setup Guide",
      subtitle: "Follow these clinical instructions for millimeter-accurate 33-landmark posture tracking.",
      steps: ["Stand 2 meters (5-6 feet) away from the camera lens.", "Ensure your full head, shoulders, and hips are visible.", "Avoid loose or excessively baggy clothing for optimal landmark detection."],
      voice: "Welcome to Align-X. Please stand 2 meters away and ensure your full body is visible.",
      btn: "Launch AI Assessment Scan"
    },
    hi: {
      title: "स्कैन की तैयारी गाइड",
      subtitle: "सटीक 33-लैंडमार्क AI विश्लेषण के लिए इन निर्देशों का पालन करें।",
      steps: ["कैमरे से 2 मीटर दूर खड़े हों।", "पूरा शरीर कैमरे में दिखना चाहिए।", "ढीले कपड़े न पहनें ताकि लैंडमार्क सही से दिखें।"],
      voice: "नमस्ते! अलाइन-एक्स में आपका स्वागत है। कृपया कैमरे से 2 मीटर दूर खड़े हो जाइए और ध्यान रहे कि आपका पूरा शरीर दिखे।",
      btn: "AI स्कैन शुरू करें"
    }
  };

  const cur = content[selectedLanguage] || content.en;

  useEffect(() => {
    const speak = () => {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(cur.voice);
      msg.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(msg);
    };
    const timer = setTimeout(speak, 1000);
    return () => { window.speechSynthesis.cancel(); clearTimeout(timer); };
  }, [selectedLanguage]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap size={14} /> SCAN PROTOCOL SETUP
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cur.title}
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            {cur.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {cur.steps.map((s, i) => (
            <div 
              key={i} 
              className="p-6 bg-slate-900/70 border border-white/10 rounded-3xl backdrop-blur-2xl flex gap-5 items-center shadow-xl hover:border-cyan-500/30 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-extrabold text-base shrink-0 shadow-lg">
                0{i+1}
              </div>
              <p className="text-slate-200 text-base leading-relaxed font-medium">{s}</p>
            </div>
          ))}
        </div>

        {/* Launch CTA */}
        <button 
          onClick={() => navigate("/perform-assessment/spine-scan")} 
          className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-extrabold text-lg rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          <span>{cur.btn}</span>
          <MoveRight size={22} />
        </button>

      </div>
    </div>
  );
}