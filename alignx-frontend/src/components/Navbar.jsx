import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Brain, User, LogOut, LayoutDashboard } from "lucide-react";
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
    { name: "Pricing", path: "/pricing" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Brain className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Align<span className="text-cyan-400">X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Logged In State: Show Dashboard Link */}
          {userProfile && (
             <Link
             to="/dashboard"
             className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
           >
             <LayoutDashboard size={16} />
             Dashboard
           </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {userProfile ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <span className="text-slate-400 text-sm hidden lg:block">Hi, {userProfile.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-300 border border-white/10 rounded-lg transition-all text-sm font-semibold"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-slate-300 hover:text-cyan-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {userProfile ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-emerald-400 font-medium py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <div className="h-px bg-white/10 my-2"></div>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full py-3 bg-red-500/10 text-red-400 rounded-xl font-bold border border-red-500/20 flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/login"
                className="w-full py-3 text-center bg-slate-800 text-white rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full py-3 text-center bg-cyan-500 text-slate-900 rounded-xl font-bold"
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