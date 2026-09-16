
import React, { useRef, useState } from "react";
import { ShieldCheck, Activity } from "lucide-react";

const PostureScan = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:5000/api/v1";

    // Prevent repeated voice feedback
    const lastSpokenIssue = useRef("");

    const speakFeedback = (issue) => {
        if (!("speechSynthesis" in window) || !issue) {
            return;
        }

        // Don't repeat the same feedback
        if (lastSpokenIssue.current === issue) {
            return;
        }

        lastSpokenIssue.current = issue;

        window.speechSynthesis.cancel();

        let message = "";

        switch (issue) {
            case "Good Neck Alignment":
                message =
                    "Good posture. Your neck alignment looks good.";
                break;

            case "Minor Forward Head Posture":
                message =
                    "Minor forward head posture detected. Please straighten your head.";
                break;

            case "Moderate Neck Inclination":
                message =
                    "Moderate neck inclination detected. Please keep your head and neck upright.";
                break;

            case "High Neck Inclination":
                message =
                    "High neck inclination detected. Please correct your head and neck position.";
                break;

            default:
                message = `${issue} detected. Please adjust your posture.`;
        }

        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "en-US";
        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    };

    const startScan = async () => {
        alert("START SCAN FUNCTION CALLED")
        setIsScanning(true);
        setScanResult(null);
        setError(null);
        setProgress(0);

        // Reset voice feedback for a new scan
        lastSpokenIssue.current = "";
        window.speechSynthesis?.cancel();

        let progressInterval = null;

        try {
            // Visual progress indicator
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) {
                        return 95;
                    }

                    return prev + 2;
                });
            }, 60);

            /*
             * Give MediaPipe enough time to process
             * several camera frames before requesting
             * the latest analysis.
             */
            await new Promise((resolve) =>
                setTimeout(resolve, 3000)
            );

            console.log(
                "Requesting posture analysis from:",
                `${API_URL}/start-screening`
            );

            const response = await fetch(
                `${API_URL}/start-screening`
            );

            console.log(
                "Backend response status:",
                response.status
            );

            if (!response.ok) {
                throw new Error(
                    `Backend returned ${response.status}`
                );
            }

            const data = await response.json();

            console.log("POSTURE ANALYSIS RESULT:", data);

            if (!data || typeof data.score === "undefined") {
                throw new Error(
                    "Invalid posture analysis response"
                );
            }

            clearInterval(progressInterval);
            progressInterval = null;

            setProgress(100);

            const result = {
                score: Number(data.score),
                issue: data.issue || "No issue detected",
                neckAngle:
                    data.neck_angle !== null &&
                        data.neck_angle !== undefined
                        ? Number(data.neck_angle)
                        : null,
                rec: "Cervical Retraction",
            };

            console.log("FINAL SCAN RESULT:", result);

            setScanResult(result);

            // Speak feedback according to AI analysis
            speakFeedback(result.issue);

        } catch (err) {
            console.error(
                "Posture scan failed:",
                err
            );

            if (progressInterval) {
                clearInterval(progressInterval);
            }

            setError(
                "Unable to connect to the posture analysis backend."
            );
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">

            <p className="text-red-500 text-2xl font-bold">
                POSTURE SCAN TEST
            </p>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-cyan-400" />

                AI Posture Screening
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ================= CAMERA ================= */}

                <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 aspect-video relative">

                    <img
                        src={`${API_URL}/stream/video_feed`}
                        alt="Camera Feed"
                        className="w-full h-full object-cover"
                    />

                    {isScanning && (
                        <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">

                            <div className="text-center">

                                <Activity
                                    className="animate-pulse w-16 h-16 mx-auto mb-2 text-cyan-400"
                                />

                                <p className="font-bold">
                                    Analyzing Body Alignment...{" "}
                                    {progress}%
                                </p>

                            </div>

                        </div>
                    )}

                </div>

                {/* ================= RESULTS ================= */}

                <div className="bg-slate-900 p-8 rounded-3xl border border-white/10">

                    {/* INITIAL STATE */}

                    {!scanResult &&
                        !isScanning &&
                        !error && (
                            <div className="text-center py-20">

                                <p className="text-slate-400 mb-6">
                                    Khade ho jaiye aur button
                                    dabaiye AI scan shuru karne
                                    ke liye.
                                </p>

                                <button
                                    onClick={startScan}
                                    className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full font-bold transition-all"
                                >
                                    Start AI Scan
                                </button>

                            </div>
                        )}

                    {/* SCANNING STATE */}

                    {isScanning && (
                        <div className="text-center py-20">

                            <Activity
                                className="animate-pulse w-12 h-12 mx-auto mb-4 text-cyan-400"
                            />

                            <p className="text-lg font-semibold">
                                AI is analyzing your posture...
                            </p>

                            <p className="text-slate-400 mt-2">
                                Please maintain your position.
                            </p>

                            <p className="text-cyan-400 mt-4 font-mono">
                                {progress}%
                            </p>

                        </div>
                    )}

                    {/* ERROR STATE */}

                    {error && (
                        <div className="text-center py-20">

                            <p className="text-red-400 font-medium mb-6">
                                {error}
                            </p>

                            <button
                                onClick={startScan}
                                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {/* RESULT STATE */}

                    {scanResult && !isScanning && (
                        <div>

                            <h3 className="text-2xl font-bold mb-4">
                                Scan Complete!
                            </h3>

                            {/* SCORE + ANGLE */}

                            <div className="grid grid-cols-2 gap-4 mb-6">

                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">

                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">
                                        Posture Score
                                    </p>

                                    <p className="text-5xl font-bold text-cyan-400">
                                        {scanResult.score}
                                        <span className="text-xl text-slate-500">
                                            /100
                                        </span>
                                    </p>

                                </div>

                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">

                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">
                                        Neck Angle
                                    </p>

                                    <p className="text-4xl font-bold text-cyan-300">

                                        {scanResult.neckAngle !== null
                                            ? `${scanResult.neckAngle.toFixed(2)}°`
                                            : "--"}

                                    </p>

                                </div>

                            </div>

                            {/* ISSUE */}

                            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20 mb-4">

                                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
                                    Detected Issue
                                </p>

                                <p className="text-lg text-red-400 font-semibold">
                                    {scanResult.issue}
                                </p>

                            </div>

                            {/* RECOMMENDATION */}

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">

                                <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">
                                    Recommended Exercise
                                </p>

                                <p className="text-xl text-cyan-300">
                                    {scanResult.rec}
                                </p>

                            </div>

                            {/* NEW SCAN */}

                            <button
                                onClick={startScan}
                                className="w-full bg-white text-black py-3 rounded-xl font-bold mt-4"
                            >
                                Scan Again
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PostureScan;
