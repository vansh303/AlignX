import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlignX } from '../context/AlignXContext';
import { Camera, MoveRight, Info } from 'lucide-react';

export default function Instructions() {
  const navigate = useNavigate();
  const { selectedLanguage } = useAlignX();

  const content = {
    en: {
      title: "Preparation Guide",
      steps: ["Stand 2 meters away.", "Full body must be visible.", "Avoid baggy clothes."],
      voice: "Welcome to Align-X. Please stand 2 meters away and ensure your full body is visible.",
      btn: "Start AI Scan"
    },
    hi: {
      title: "स्कैन की तैयारी",
      steps: ["कैमरे से 2 मीटर दूर खड़े हों।", "पूरा शरीर कैमरे में दिखना चाहिए।", "ढीले कपड़े न पहनें।"],
      voice: "नमस्ते! अलाइन-एक्स में आपका स्वागत है। कृपया कैमरे से 2 मीटर दूर खड़े हो जाइए और ध्यान रहे कि आपका पूरा शरीर दिखे।",
      btn: "स्कैन शुरू करें"
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
    <div className="min-h-screen pt-32 px-6 bg-slate-950 font-mono">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-white italic">{cur.title}</h1>
        <div className="grid gap-4">
          {cur.steps.map((s, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl flex gap-4 items-center">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">{i+1}</span>
              <p className="text-slate-300 text-lg">{s}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/perform-assessment/spine-scan")} className="w-full py-5 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 flex items-center justify-center gap-3">
          {cur.btn} <MoveRight />
        </button>
      </div>
    </div>
  );
}