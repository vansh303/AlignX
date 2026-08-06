"use client"

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm text-blue-600">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-bold text-slate-900 text-base mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}