"use client";
import { useState } from "react";
import { useAlignX } from "../context/AlignXContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Activity,
  Brain,
  TrendingUp,
  ScanLine,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Crosshair,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import LanguageModal from "../components/LanguageModal";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";
import PoseSkeletonVisual from "../components/ui/PoseSkeletonVisual";

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
        "Millimeter-precise 33-joint skeletal tracking using advanced computer vision.",
    },
    {
      icon: Brain,
      title: "AI Diagnostics",
      description:
        "Instant real-time analysis of posture deviations and potential injury risks.",
    },
    {
      icon: TrendingUp,
      title: "Recovery Metrics",
      description: "Track mobility improvements with clinical-grade analytics and visual charts.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description:
        "All computer vision analysis happens in real-time. Full HIPAA compliant standards.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white selection:bg-cyan-500 selection:text-black">
      {/* Background Liquid Metal Accent */}
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-20 z-0" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-8 relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AI-POWERED COMPUTER VISION PHYSIOTHERAPY
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
              Fix Your Posture <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hud-text">
                With Millimeter Precision.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Eliminate chronic neck & spinal discomfort using computer vision AI. Zero sensors required—just your webcam.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLangModalOpen(true)}
                className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-bold rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-3 group text-base cursor-pointer"
              >
                <span className="relative flex items-center gap-2">
                  <span>Start AI Assessment</span>
                  <ScanLine
                    className="group-hover:rotate-90 transition-transform duration-300"
                    size={20}
                  />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/consultation")}
                className="px-8 py-4 bg-slate-900/80 text-white border border-white/15 rounded-2xl font-bold hover:bg-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 group text-base backdrop-blur-md cursor-pointer"
              >
                <MessageCircle
                  size={20}
                  className="text-cyan-400 group-hover:scale-110 transition-transform"
                />
                <span>Talk to AI Assistant</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" /> Real-time Landmark AI
              </span>
              <span className="flex items-center gap-2">
                <Lock size={16} className="text-cyan-400" /> Private & Secure
              </span>
            </div>
          </motion.div>

          {/* Right Hero Preview: AI Human Skeleton Visual */}
          <div className="w-full flex justify-center">
            <PoseSkeletonVisual />
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-900/40 border-y border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Clinical-Grade AI Biomechanical Technology
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Engineered for millimeter accuracy, simplified for everyday ergonomic posture health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 relative overflow-hidden text-center border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.15)]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400"></div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Transform Your Posture?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience real-time posture analysis and personalized exercises with clinical precision right in your browser.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 rounded-2xl font-extrabold text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
          >
            Get Started Now
          </motion.button>
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
