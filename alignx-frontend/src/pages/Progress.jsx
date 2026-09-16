"use client";

import { TrendingUp, Flame, Calendar, Trophy, ArrowUpRight, Zap, Activity } from "lucide-react";
import LiquidMetalBg from "../components/ui/LiquidMetalBg";

export default function Progress() {
  const weekData = [40, 65, 55, 75, 85, 90, 88];
  const maxScore = 100;
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <LiquidMetalBg className="fixed inset-0 pointer-events-none opacity-15 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Zap size={14} /> BIOMECHANICAL ANALYTICS & METRICS
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Posture & Mobility <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Recovery Progress</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 font-mono text-xs font-bold w-fit">
            <Flame size={16} className="fill-amber-400 animate-pulse" />
            <span>12 DAY STREAK ACTIVE</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBox 
            label="Total AI Sessions" 
            value="42" 
            trend="+12%" 
            icon={<Calendar size={20} className="text-cyan-400" />} 
          />
          <StatBox 
            label="Hours Tracked" 
            value="8.5h" 
            trend="+5%" 
            icon={<TrendingUp size={20} className="text-emerald-400" />} 
          />
          <StatBox 
            label="Pain Level Reduction" 
            value="-45%" 
            trend="Clinical Improvement" 
            icon={<ArrowUpRight size={20} className="text-teal-400" />} 
          />
          <StatBox 
            label="Milestones Achieved" 
            value="7" 
            trend="Active Level 3" 
            icon={<Trophy size={20} className="text-amber-400" />} 
          />
        </div>

        {/* Chart & Activity Section */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Weekly Performance Bar Chart */}
           <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                 <div>
                   <h3 className="text-xl font-bold text-white tracking-tight">Weekly Posture Score Accuracy</h3>
                   <p className="text-xs text-slate-400 mt-0.5">Dynamic score trajectory across last 7 days</p>
                 </div>
                 <select className="bg-slate-950 text-slate-300 text-xs font-mono font-bold py-1.5 px-3 rounded-xl border border-white/10 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </div>
              
              <div className="flex items-end justify-between gap-3 h-64 w-full pt-4">
                {weeks.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                    <div 
                      className="w-full bg-slate-950 rounded-2xl relative transition-all duration-500 group-hover:bg-cyan-500/20 border border-white/5 overflow-hidden flex flex-col justify-end"
                      style={{ height: `${(weekData[idx] / maxScore) * 100}%` }}
                    >
                       <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_15px_#06b6d4]"></div>
                       
                       {/* Value Tooltip */}
                       <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-cyan-500/30 px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          {weekData[idx]}%
                       </div>
                    </div>
                    <p className="text-slate-400 text-xs mt-3 font-mono font-bold">{day}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Recent Activity Feed */}
           <div className="lg:col-span-1 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
                  <Activity size={18} className="text-cyan-400" />
                  Recent Scan Logs
                </h3>
                <div className="space-y-4">
                   <ActivityItem title="Cervical Retraction" time="2 hours ago" points="+15 pts" />
                   <ActivityItem title="Full Spine Diagnostic" time="Yesterday" points="+50 pts" />
                   <ActivityItem title="Posture Correction" time="2 days ago" points="+20 pts" />
                   <ActivityItem title="Shoulder Level Scan" time="3 days ago" points="+30 pts" />
                </div>
              </div>
              <button className="w-full mt-8 py-3 text-xs font-mono font-bold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-white/10 rounded-2xl transition-all cursor-pointer">
                 View Complete Diagnostic Log
              </button>
           </div>

        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, trend, icon }) {
    return (
        <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-white/10">{icon}</div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">{trend}</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white hud-text">{value}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold mt-1">{label}</div>
            </div>
        </div>
    );
}

function ActivityItem({ title, time, points }) {
    return (
        <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-2xl border border-white/5">
            <div>
                <h4 className="text-white font-bold text-xs">{title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{time}</p>
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">{points}</div>
        </div>
    );
}