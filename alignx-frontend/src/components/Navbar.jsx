import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Brain, User, LogOut, LayoutDashboard, Activity, Sparkles, ShieldCheck } from "lucide-react";
import { useAlignX } from "../context/AlignXContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userProfile, logout } = useAlignX();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Standard Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Assessment", path: "/assessment" },
    { name: "Exercises", path: "/exercises" },
    { name: "Pricing", path: "/pricing" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
          : "bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
            <Brain className="text-slate-950 font-bold" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight hud-text">
              Align<span className="text-cyan-400">X</span>
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase -mt-1 hidden sm:block">
              AI CLINICAL VISION
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Logged In State: Show Dashboard Link */}
          {userProfile && (
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 ${
                location.pathname === "/dashboard"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {userProfile ? (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <span className="text-slate-300 text-xs font-mono font-medium hidden xl:block">
                Hi, <span className="text-cyan-400 font-bold">{userProfile.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-300 border border-white/10 hover:border-red-500/30 rounded-xl transition-all text-xs font-semibold cursor-pointer"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-slate-300 hover:text-white font-semibold text-xs transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] text-xs flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 rounded-xl border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950/95 border-b border-white/10 p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-slate-300 hover:text-cyan-400 font-medium py-2.5 px-4 rounded-xl border border-transparent transition-all ${
                location.pathname === link.path ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {userProfile ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-emerald-400 font-medium py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full py-3 bg-red-500/10 text-red-400 rounded-xl font-bold border border-red-500/20 flex items-center justify-center gap-2 text-sm"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              <Link
                to="/login"
                className="w-full py-3 text-center bg-slate-900 text-slate-200 rounded-xl font-semibold border border-white/10 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full py-3 text-center bg-cyan-500 text-slate-950 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}