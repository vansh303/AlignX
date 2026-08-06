import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AlignXProvider } from "./context/AlignXContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import PerformExercise from "./pages/PerformExercise";
import Assessment from "./pages/Assessment";
import PerformAssessment from "./pages/PerformAssessment"; // <--- NEW IMPORT
import Report from "./pages/Report";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Feedback from "./pages/Feedback";
import Consultation from "./pages/Consultation";
import Dashboard from "./pages/Dashboard";
import Instructions from "./pages/Instructions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col relative text-white bg-slate-950">
      <div className="bg-noise"></div>
      
      <ScrollToTop />
      <Navbar /> 
      
      <main className="flex-grow z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/perform/:id" element={<PerformExercise />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/perform-assessment/:id" element={<PerformAssessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/report" element={<Report />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AlignXProvider>
      <Router>
        <AppContent />
      </Router>
    </AlignXProvider>
  );
}