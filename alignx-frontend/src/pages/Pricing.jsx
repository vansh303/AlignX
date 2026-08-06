import { Check, X } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Get started with basic features",
      cta: "Start Free",
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
      name: "Pro",
      price: "9.99",
      description: "Everything you need for consistent improvement",
      cta: "Start Pro Trial",
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
      name: "Clinical",
      price: "29.99",
      description: "For physical therapists and clinics",
      cta: "Contact Sales",
      features: [
        { name: "Unlimited assessments", included: true },
        { name: "Full exercise library", included: true },
        { name: "Progress tracking", included: true },
        { name: "AI Assistant", included: true },
        { name: "Personalized reports", included: true },
        { name: "Advanced analytics", included: true },
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/60">Choose the plan that works best for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-3xl transition-all p-8"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(20px)",
                border: plan.featured ? "2px solid rgba(0, 240, 255, 0.5)" : "1px solid rgba(0, 240, 255, 0.15)",
                transform: plan.featured ? "scale(1.05)" : "scale(1)",
                boxShadow: plan.featured
                  ? "0 8px 32px rgba(0, 240, 255, 0.2), inset 0 1px 0 rgba(0, 240, 255, 0.15)"
                  : "0 8px 32px rgba(0, 240, 255, 0.08), inset 0 1px 0 rgba(0, 240, 255, 0.08)",
              }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(to right, #00f0ff, #00d4ff)",
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/60 mb-6 text-sm">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-white/60">/month</span>
              </div>

              <button
                className="w-full py-3 rounded-lg font-semibold mb-8 transition-all text-white hover:shadow-lg"
                style={{
                  background: plan.featured ? "linear-gradient(to right, #00f0ff, #00d4ff)" : "rgba(0, 0, 0, 0.3)",
                  border: plan.featured ? "none" : "1px solid rgba(0, 240, 255, 0.2)",
                  boxShadow: plan.featured
                    ? "0 4px 16px rgba(0, 240, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "none",
                }}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check style={{ color: "rgb(16, 185, 129)" }} className="flex-shrink-0" size={20} />
                    ) : (
                      <X className="text-white/30 flex-shrink-0" size={20} />
                    )}
                    <span style={{ color: feature.included ? "white" : "rgba(255, 255, 255, 0.4)" }}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel anytime without penalties." },
              { q: "Is there a free trial?", a: "Yes, Pro plan includes a 14-day free trial." },
              { q: "Can I upgrade or downgrade plans?", a: "Yes, you can change plans at any time." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0, 240, 255, 0.15)",
                  boxShadow: "0 8px 32px rgba(0, 240, 255, 0.08), inset 0 1px 0 rgba(0, 240, 255, 0.08)",
                }}
              >
                <h4 className="font-semibold mb-2">{item.q}</h4>
                <p className="text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
