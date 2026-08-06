"use client";
import { useState } from "react";
import { useAlignX } from "../context/AlignXContext";
import {
  ArrowRight,
  Zap,
  Activity,
  Brain,
  TrendingUp,
  ScanLine,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import spinePNG from "../assets/spin-skeleton.png";
import LanguageModal from "../components/LanguageModal";

export default function Home() {
  const navigate = useNavigate();

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const { setSelectedLanguage } = useAlignX();

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsLangModalOpen(false);
    navigate("/instructions");
  };

  const features = [
    {
      icon: Activity,
      title: "Real-Time Tracking",
      description:
        "Millimeter-precise joint tracking using advanced computer vision.",
    },
    {
      icon: Brain,
      title: "AI Diagnostics",
      description:
        "Instant analysis of posture deviations and potential injury risks.",
    },
    {
      icon: TrendingUp,
      title: "Recovery Metrics",
      description: "Track mobility improvements with clinical-grade analytics.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description:
        "All analysis happens locally on your device. No video upload.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Tech Grid Background (Keep existing) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={
          {
            /*...*/
          }
        }
      ></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-left space-y-8 relative z-10">
            {/* ADD THIS GLOW BEHIND TEXT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none -z-10"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AI-Powered Physiotherapy
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white font-mono">
              Fix Your Posture <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
                With Precision.
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Eliminate chronic pain using military-grade computer vision. No
              expensive equipment needed—just your camera.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="relative overflow-hidden px-8 py-4 bg-cyan-500 text-white rounded-xl font-bold hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                {/* The Shine Effect Span */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />

                <span className="relative flex items-center gap-2">
                  Start Scan
                  <ScanLine
                    className="group-hover:rotate-90 transition-transform"
                    size={20}
                  />
                </span>
              </button>
              <button
                onClick={() => navigate("/consultation")}
                className="px-8 py-4 bg-slate-800/50 text-white border border-white/10 rounded-xl font-semibold hover:bg-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle
                  size={20}
                  className="text-cyan-400 group-hover:scale-110 transition-transform"
                />
                Talk to AI Physio
              </button>
            </div>

            <p className="text-sm text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} /> HIPAA Compliant Standards
            </p>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="aspect-video bg-black/50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-white/5">
                {/* Simulated Scanner Line */}
                <div className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-scan z-20"></div>
                <img
                  src={spinePNG}
                  alt="Scanning"
                  className="w-2/3 opacity-80"
                />

                {/* Floating Labels */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-xs text-cyan-400 font-mono">
                  SPINE: 12° DEVIATION
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-xs text-red-400 font-mono">
                  RISK: MODERATE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Clinical Grade Technology
            </h2>
            <p className="text-slate-400">
              Built for accuracy, designed for simplicity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl p-12 relative overflow-hidden text-center border border-white/10 bg-slate-900/80 backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-500"></div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to align your life?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join the 14-day challenge and see measurable improvements in your
            posture and energy levels.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </section>
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        onSelect={handleLanguageSelect}
      />
    </div>
  );
}
