import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"
import { UserProvider } from "./context/UserContext.jsx";

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Welcome from "./pages/Welcome.jsx"
import AchievementsPage from "./pages/AchievementsPage";
import AvatarPage from "./pages/AvatarPage";
import CategoryPage from "./pages/CategoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => { 
    fetch("/api/auth/me", { credentials: "include" })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);

  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/register" element={<Register setUser={setUser} />}/>
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/home" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
    </UserProvider> 
    </>
  )
}

export default App
