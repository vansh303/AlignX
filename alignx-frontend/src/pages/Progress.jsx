"use client";

import { TrendingUp, Flame, Calendar, Trophy, ArrowUpRight } from "lucide-react";

export default function Progress() {
  const weekData = [40, 65, 55, 75, 85, 90, 88];
  const maxScore = 100;
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
           <div>
             <h1 className="text-4xl font-bold text-white mb-2 font-mono">Recovery Analytics</h1>
             <p className="text-slate-400">Tracking your journey to 100% alignment</p>
           </div>
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 font-mono text-sm">
              <Flame size={16} className="fill-amber-400" />
              12 DAY STREAK
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatBox 
            label="Total Sessions" 
            value="42" 
            trend="+12%" 
            icon={<Calendar size={20} className="text-cyan-400" />} 
          />
          <StatBox 
            label="Hours Active" 
            value="8.5h" 
            trend="+5%" 
            icon={<TrendingUp size={20} className="text-emerald-400" />} 
          />
          <StatBox 
            label="Pain Reduction" 
            value="-45%" 
            trend="Excellent" 
            icon={<ArrowUpRight size={20} className="text-purple-400" />} 
          />
          <StatBox 
            label="Achievements" 
            value="7" 
            trend="New!" 
            icon={<Trophy size={20} className="text-amber-400" />} 
          />
        </div>

        {/* Chart Section */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Weekly Graph */}
           <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-bold text-white font-mono">Weekly Performance</h3>
                 <select className="bg-slate-800 text-slate-300 text-xs py-1 px-3 rounded border border-white/10 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </div>
              
              <div className="flex items-end justify-between gap-4 h-64 w-full">
                {weeks.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                    <div 
                      className="w-full bg-slate-800 rounded-t-sm relative transition-all duration-500 group-hover:bg-cyan-500/20"
                      style={{ height: `${(weekData[idx] / maxScore) * 100}%` }}
                    >
                       <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                       {/* Tooltip */}
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {weekData[idx]}%
                       </div>
                    </div>
                    <p className="text-slate-500 text-xs mt-4 font-mono">{day}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Recent Activity Feed */}
           <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white font-mono mb-6">Recent Activity</h3>
              <div className="space-y-6">
                 <ActivityItem title="Neck Stretch" time="2 hours ago" points="+15 pts" />
                 <ActivityItem title="Full Assessment" time="Yesterday" points="+50 pts" />
                 <ActivityItem title="Lumbar Relief" time="2 days ago" points="+20 pts" />
                 <ActivityItem title="Knee Stabilization" time="3 days ago" points="+30 pts" />
              </div>
              <button className="w-full mt-8 py-3 text-sm text-slate-400 hover:text-white border border-white/5 hover:border-white/20 rounded-xl transition-all">
                 View History
              </button>
           </div>

        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, trend, icon }) {
    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-950 rounded-lg border border-white/5">{icon}</div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{trend}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{label}</div>
        </div>
    )
}

function ActivityItem({ title, time, points }) {
    return (
        <div className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
            <div>
                <h4 className="text-white font-medium text-sm">{title}</h4>
                <p className="text-xs text-slate-500">{time}</p>
            </div>
            <div className="text-xs font-mono text-cyan-400">{points}</div>
        </div>
    )
}