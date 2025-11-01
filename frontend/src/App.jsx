import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AchievementsPage from "./pages/AchievementsPage";
import AvatarPage from "./pages/AvatarPage";
import CategoryPage from "./pages/CategoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/Login";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/Register";
import ResultPage from "./pages/ResultPage";



function App() {

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
    </UserProvider>
  )
}

export default App
