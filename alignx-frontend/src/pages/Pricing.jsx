import { Check, X, Zap, Sparkles } from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Pricing() {
  const plans = [
    {
      name: "Free Tier",
      price: "0",
      description: "Get started with baseline posture screening",
      cta: "Start Free Assessment",
      features: [
        { name: "1 Assessment per month", included: true },
        { name: "Basic exercise library", included: true },
        { name: "Progress tracking", included: false },
        { name: "AI Assistant", included: false },
        { name: "Personalized reports", included: false },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      name: "Pro Clinical",
      price: "9.99",
      description: "Everything you need for continuous posture improvement",
      cta: "Start 14-Day Free Trial",
      featured: true,
      features: [
        { name: "Unlimited assessments", included: true },
        { name: "Full exercise library", included: true },
        { name: "Progress tracking", included: true },
        { name: "AI Assistant", included: true },
        { name: "Personalized reports", included: true },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      name: "Enterprise Clinical",
      price: "29.99",
      description: "For physical therapists and clinical practices",
      cta: "Contact Clinical Sales",
      features: [
        { name: "Unlimited assessments", included: true },
        { name: "Full exercise library", included: true },
        { name: "Progress tracking", included: true },
        { name: "AI Assistant", included: true },
        { name: "Personalized reports", included: true },
        { name: "Advanced analytics", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap size={14} /> TRANSPARENT CLINICAL PRICING
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simple, Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Plans</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose the diagnostic & therapy access level tailored to your health journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between relative shadow-2xl ${
                plan.featured
                  ? "bg-slate-900/90 border-2 border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.25)] md:-translate-y-2"
                  : "bg-slate-900/60 border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-mono font-extrabold uppercase rounded-full tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles size={12} /> MOST POPULAR CHOICE
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.description}</p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white hud-text">${plan.price}</span>
                  <span className="text-slate-400 text-xs font-mono font-bold">/ month</span>
                </div>

                <button
                  className={`w-full py-4 rounded-2xl font-extrabold text-xs tracking-wider uppercase transition-all mb-8 cursor-pointer ${
                    plan.featured
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                      : "bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10"
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3.5 pt-4 border-t border-white/10">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3 text-xs">
                      {feature.included ? (
                        <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                          <Check size={14} />
                        </div>
                      ) : (
                        <div className="p-0.5 rounded-full bg-slate-800 text-slate-600 shrink-0">
                          <X size={14} />
                        </div>
                      )}
                      <span className={feature.included ? "text-slate-200 font-medium" : "text-slate-500"}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pt-12 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel anytime with zero hidden fees or obligations." },
              { q: "Is there a free trial?", a: "Yes, Pro Clinical includes a 14-day full access trial." },
              { q: "Can I switch plans later?", a: "Yes, you can upgrade or adjust your plan directly from your account settings." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl"
              >
                <h4 className="font-bold text-white text-sm mb-2">{item.q}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
