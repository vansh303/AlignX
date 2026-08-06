import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, Activity } from 'lucide-react';

const PostureScan = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        setIsScanning(true);
        setScanResult(null);
        setProgress(0);
        
        // 5 second ka fake progress bar for UX
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    // Yahan backend se result fetch karenge (Abhi ke liye dummy result)
                    setScanResult({
                        score: 75,
                        issues: ["Forward Head Posture"],
                        rec: "Cervical Retraction"
                    });
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-cyan-400" /> AI Posture Screening
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Camera Feed */}
                <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 aspect-video relative">
                    <img 
                        src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1"}/stream/video_feed`} 
                        alt="Camera Feed" 
                        className="w-full h-full object-cover"
                    />
                    {isScanning && (
                        <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                            <div className="text-center">
                                <Activity className="animate-pulse w-16 h-16 mx-auto mb-2 text-cyan-400" />
                                <p className="font-bold">Analyzing Body Alignment... {progress}%</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Area */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-white/10">
                    {!scanResult && !isScanning && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 mb-6">Khade ho jaiye aur button dabaiye AI scan shuru karne ke liye.</p>
                            <button 
                                onClick={startScan}
                                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Start AI Scan
                            </button>
                        </div>
                    )}

                    {scanResult && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-2xl font-bold mb-4">Scan Complete!</h3>
                            <div className="text-6xl font-bold text-cyan-400 mb-6">{scanResult.score}/100</div>
                            <div className="space-y-4">
                                <p className="text-red-400 font-medium">Issues: {scanResult.issues.join(", ")}</p>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Recommended Exercise</p>
                                    <p className="text-xl text-cyan-300">{scanResult.rec}</p>
                                </div>
                                <button className="w-full bg-white text-black py-3 rounded-xl font-bold mt-4">
                                    Start Recovery Plan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostureScan;