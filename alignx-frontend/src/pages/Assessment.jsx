import React, { useState, useEffect } from 'react';
import { CameraOff, Scan, Activity } from 'lucide-react';

export default function PerformAssessment() {
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";
  const streamUrl = `${API_BASE}/stream/video_feed?t=${retry}`;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setRetry(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen pt-28 bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* LIVE SENSOR FEED */}
        <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden relative aspect-video shadow-2xl">
          {!error ? (
            <img 
              src={streamUrl} 
              alt="Live Feed"
              className="w-full h-full object-cover"
              onError={() => setError(true)} // Connection fail logic
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Activity className="text-cyan-500 animate-spin mb-4" size={40} />
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">RECONNECTING TO SENSORS...</p>
              <p className="text-[10px] text-slate-500 mt-2 italic">Ensure Python main.py is running on Port 8000</p>
            </div>
          )}
        </div>

        {/* DIAGNOSTIC PANEL */}
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
           <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
             <Scan className="text-emerald-400" /> AI Diagnostic Status
           </h2>
           <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl mb-6">
             <p className="text-emerald-400 text-xs font-bold uppercase">System Message</p>
             <p className="text-sm text-slate-300">Position your full body in frame for skeletal analysis.</p>
           </div>
           <button className="w-full py-4 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
             RUN FULL SCAN
           </button>
        </div>

      </div>
    </div>
  );
}