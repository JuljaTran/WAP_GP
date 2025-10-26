import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AchievementsPage from "./pages/AchievementsPage";
import AvatarPage from "./pages/AvatarPage";
import CategoryPage from "./pages/CategoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";

export default function App(){
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
