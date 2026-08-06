"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignX } from "../context/AlignXContext";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Activity, 
  TrendingUp,
  ShieldCheck,
  Flame
} from "lucide-react";

export default function Dashboard() {
  const { userProfile } = useAlignX();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
  }, [userProfile, navigate]);

  if (!userProfile) return null;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          User Dashboard
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: User Profile Card */}
          <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-fit">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                <span className="text-3xl font-bold text-white">
                  {userProfile.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
              <span className="text-cyan-400 text-sm font-medium mt-1">Free Plan Member</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                <Mail className="text-slate-400" size={18} />
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm text-slate-200 truncate">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                <Calendar className="text-slate-400" size={18} />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Member Since</p>
                  <p className="text-sm text-slate-200">{userProfile.joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                <Clock className="text-slate-400" size={18} />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Last Login</p>
                  <p className="text-sm text-slate-200">{userProfile.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COL: Activity & Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="text-emerald-400" size={20} />
                  <span className="text-slate-400 text-xs uppercase font-bold">Total Sessions</span>
                </div>
                <p className="text-3xl font-mono text-white">{userProfile.activityStats?.sessionsCompleted || 0}</p>
              </div>

              <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Flame className="text-orange-400" size={20} />
                  <span className="text-slate-400 text-xs uppercase font-bold">Current Streak</span>
                </div>
                <p className="text-3xl font-mono text-white">{userProfile.activityStats?.streak || 0} <span className="text-sm text-slate-500">Days</span></p>
              </div>

              <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-cyan-400" size={20} />
                  <span className="text-slate-400 text-xs uppercase font-bold">Active Time</span>
                </div>
                <p className="text-3xl font-mono text-white">{userProfile.activityStats?.totalMinutes || 0} <span className="text-sm text-slate-500">Min</span></p>
              </div>
            </div>

            {/* Main Activity Area */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 min-h-[300px] flex flex-col justify-center items-center text-center">
              <TrendingUp size={48} className="text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Activity Overview</h3>
              <p className="text-slate-400 max-w-md">
                Your detailed scan history and progress charts will appear here as you continue your journey.
              </p>
            </div>

            {/* Security Note */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-emerald-400 font-bold text-sm">Account Secured</p>
                <p className="text-emerald-500/70 text-xs mt-1">Your data is encrypted and stored locally where possible to ensure maximum privacy.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}