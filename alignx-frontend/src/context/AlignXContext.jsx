import { createContext, useContext, useState, useEffect } from "react";

const AlignXContext = createContext();


// --- HARDCODED DATA (Populated for all categories) ---
const STATIC_EXERCISES = [
  // ==================== KIDS ====================
  {
    id: "kids-neck-1",
    custom_id: "kids-neck",
    name: "Giraffe Stretch",
    age: "Kids",
    part: "Neck",
    difficulty: "Easy",
    instructions: ["Stand tall like a giraffe", "Look up at the leaves", "Look down at your toes", "Repeat slowly"],
    video: "https://www.youtube.com/watch?v=sO76t6j8W74" // Placeholder
  },
  {
    id: "kids-shoulder-1",
    custom_id: "kids-shoulder",
    name: "Airplane Spins",
    age: "Kids",
    part: "Shoulder",
    difficulty: "Fun",
    instructions: ["Arms out like wings", "Spin arms in small circles", "Fly like a plane!"],
    video: ""
  },
  {
    id: "kids-back-1",
    custom_id: "kids-back",
    name: "Cat & Cow",
    age: "Kids",
    part: "Back",
    difficulty: "Easy",
    instructions: ["Hands and knees on floor", "Arch back like a scary cat", "Drop belly like a cow", "Moo!"],
    video: ""
  },
  {
    id: "kids-arms-1",
    custom_id: "kids-arms",
    name: "Strong Bear Crawl",
    age: "Kids",
    part: "Arms",
    difficulty: "Medium",
    instructions: ["Walk on hands and feet", "Keep knees off the ground", "Roar like a bear"],
    video: ""
  },
  {
    id: "kids-legs-1",
    custom_id: "kids-legs",
    name: "Frog Jumps",
    age: "Kids",
    part: "Legs",
    difficulty: "Medium",
    instructions: ["Squat down low", "Touch the floor", "Jump up high like a frog!"],
    video: ""
  },

  // ==================== TEENS ====================
  {
    id: "teen-neck-1",
    custom_id: "teen-neck",
    name: "Gamer Neck Reset",
    age: "Teens",
    part: "Neck",
    difficulty: "Easy",
    instructions: ["Tuck chin backward (double chin)", "Hold for 5 seconds", "Release", "Fixes posture from gaming"],
    video: ""
  },
  {
    id: "teen-shoulder-1",
    custom_id: "teen-shoulder",
    name: "Shoulder Shrugs",
    age: "Teens",
    part: "Shoulder",
    difficulty: "Easy",
    instructions: ["Lift shoulders to ears", "Hold tight", "Drop them down fast"],
    video: ""
  },
  {
    id: "teen-back-1",
    custom_id: "teen-back",
    name: "Wall Angels",
    age: "Teens",
    part: "Back",
    difficulty: "Hard",
    instructions: ["Stand with back against wall", "Keep elbows and wrists on wall", "Slide arms up and down"],
    video: ""
  },
  {
    id: "teen-arms-1",
    custom_id: "teen-arms",
    name: "Desk Pushups",
    age: "Teens",
    part: "Arms",
    difficulty: "Medium",
    instructions: ["Hands on edge of desk", "Step back", "Lower chest to desk", "Push back up"],
    video: ""
  },
  {
    id: "teen-legs-1",
    custom_id: "teen-legs",
    name: "Lunges",
    age: "Teens",
    part: "Legs",
    difficulty: "Medium",
    instructions: ["Step forward with one leg", "Lower hips until knees are 90 degrees", "Return to standing"],
    video: ""
  },

  // ==================== ADULTS ====================
  {
    id: "adult-neck-1",
    custom_id: "adult-neck",
    name: "Cervical Retraction",
    age: "Adults",
    part: "Neck",
    difficulty: "Easy",
    instructions: ["Sit upright", "Pull head straight back", "Keep eyes level", "Hold 3 seconds"],
    video: "https://youtube.com/shorts/yDZJ4ac6SxU?si=7T5rkw3mEZ6I98ST",
    model: "neck_retraction.glb"
  },
  {
    id: "adult-shoulder-1",
    custom_id: "adult-shoulder",
    name: "Side Arm Raises",
    age: "Adults",
    part: "Shoulder",
    difficulty: "Medium",
    instructions: ["Stand straight", "Raise arms to side until shoulder height", "Lower slowly control"],
    video: ""
  },
  {
    id: "adult-back-1",
    custom_id: "adult-back",
    name: "Seated Spinal Twist",
    age: "Adults",
    part: "Back",
    difficulty: "Medium",
    instructions: ["Sit in chair", "Twist torso to the right", "Hold chair for support", "Switch sides"],
    video: ""
  },
  {
    id: "adult-arms-1",
    custom_id: "adult-arms",
    name: "Arm Circles",
    age: "Adults",
    part: "Arms",
    difficulty: "Easy",
    instructions: ["Arms out to sides", "Make small forward circles", "Make small backward circles"],
    video: ""
  },
  {
    id: "adult-legs-1",
    custom_id: "adult-legs",
    name: "Air Squats",
    age: "Adults",
    part: "Legs",
    difficulty: "Medium",
    instructions: ["Feet shoulder-width apart", "Lower hips back and down", "Keep chest up", "Stand back up"],
    video: ""
  },

  // ==================== SENIORS ====================
  {
    id: "senior-neck-1",
    custom_id: "senior-neck",
    name: "Gentle Neck Rotation",
    age: "Seniors",
    part: "Neck",
    difficulty: "Easy",
    instructions: ["Slowly look to the right", "Hold gently", "Slowly look to the left", "Do not force"],
    video: ""
  },
  {
    id: "senior-shoulder-1",
    custom_id: "senior-shoulder",
    name: "Seated Shoulder Roll",
    age: "Seniors",
    part: "Shoulder",
    difficulty: "Easy",
    instructions: ["Sit comfortably", "Roll shoulders up and back", "Repeat 10 times"],
    video: ""
  },
  {
    id: "senior-back-1",
    custom_id: "senior-back",
    name: "Cat Stretch (Seated)",
    age: "Seniors",
    part: "Back",
    difficulty: "Easy",
    instructions: ["Hands on knees", "Round your back", "Then arch slightly looking up"],
    video: ""
  },
  {
    id: "senior-arms-1",
    custom_id: "senior-arms",
    name: "Wall Push (Gentle)",
    age: "Seniors",
    part: "Arms",
    difficulty: "Easy",
    instructions: ["Stand facing wall", "Place hands on wall", "Bend elbows slightly", "Push back"],
    video: ""
  },
  {
    id: "senior-legs-1",
    custom_id: "senior-legs",
    name: "Seated Knee Lifts",
    age: "Seniors",
    part: "Legs",
    difficulty: "Easy",
    instructions: ["Sit in chair", "Lift one knee up", "Hold for 2 seconds", "Lower slowly"],
    video: ""
  }
];

const ASSESSMENT_DB = [
  {
    id: "spine-scan",
    name: "Cervical & Spine Mobility Scan",
    description: "Clinical-grade analysis of range of motion and spinal curvature using AI vision.",
    video: "https://www.youtube.com/watch?v=3VC0_tW-XFQ",
    // Clinical protocol steps for AI synchronization
    instructions: [
      "Position yourself 2 meters from the camera until your full body is visible.",
      "Stand side-on (90 degrees) to the lens for baseline spinal curvature detection.",
      "Slowly tuck your chin toward your chest and hold for 3 seconds.",
      "Extend your neck backward slowly to check cervical range of motion.",
      "Return to a neutral standing position to complete the diagnostic capture."
    ]
  },
  {
    id: "gait-analysis",
    name: "Lower Limb & Gait Stability",
    description: "AI-powered detection of valgus/varus stress and pelvic tilt during movement.",
    video: "https://www.youtube.com/watch?v=sO76t6j8W74",
    instructions: [
      "Stand facing the camera with feet shoulder-width apart.",
      "Perform 3 slow squats, keeping your arms extended forward.",
      "Shift your weight slowly from the left leg to the right leg.",
      "Walk 3 steps forward and 3 steps back to analyze dynamic alignment."
    ]
  }
];

export const AlignXProvider = ({ children }) => {
  const [exerciseDatabase, setExerciseDatabase] = useState(STATIC_EXERCISES); 
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("alignx_token"));
  
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1"; 

  useEffect(() => {
    const storedUser = localStorage.getItem("alignx_user");
    if(storedUser) setUserProfile(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const user = { 
      name: "Demo User", 
      email: email,
      joinDate: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleTimeString(),
      activityStats: { sessionsCompleted: 12, streak: 5, totalMinutes: 140 }
    };
    setUserProfile(user);
    localStorage.setItem("alignx_user", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("alignx_user");
    window.location.href = "/";
  };

  const signup = async (userData) => true;

  const getExerciseById = (id) => exerciseDatabase.find(ex => ex.id === id || ex.custom_id === id);
  const getAssessmentById = (id) => ASSESSMENT_DB.find(as => as.id === id);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <AlignXContext.Provider value={{
        selectedLanguage,
        setSelectedLanguage,
        exerciseDatabase, 
        exercises: exerciseDatabase, // Compatibility alias
        getExerciseById,
        assessmentDatabase: ASSESSMENT_DB, // Fixed "map" error
        getAssessmentById,
        userProfile, 
        token,
        login, logout, signup,
        API_URL
    }}>
      {children}
    </AlignXContext.Provider>
  );
};

export const useAlignX = () => {
  const context = useContext(AlignXContext);
  if (!context) throw new Error("useAlignX must be used within an AlignXProvider");
  return context;
};