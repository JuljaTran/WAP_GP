import { CssBaseline, ThemeProvider } from "@mui/material"
//import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { UserProvider } from "./context/UserContext.jsx"
import theme from "./theme.js"

import AchievementsPage from "./pages/AchievementsPage"
import Activate from './pages/Activate'
import AvatarPage from "./pages/AvatarPage"
import CategoryPage from "./pages/CategoryPage"
import FeedbackPage from "./pages/FeedbackPage"
import HomePage from "./pages/HomePage"
import LeaderboardPage from "./pages/LeaderboardPage"
import Login from './pages/Login.jsx'
import NotFound from "./pages/NotFound.jsx"
import QuizPage from "./pages/QuizPage"
import Register from './pages/Register.jsx'
import ResultPage from "./pages/ResultPage"
import Welcome from "./pages/Welcome.jsx"

function App() {

  /*const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api", { credentials: "include" })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);*/

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/avatar" element={<ProtectedRoute> <AvatarPage /> </ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /> </ProtectedRoute>} />
        <Route path="/category/:category" element={<ProtectedRoute> <CategoryPage /> </ProtectedRoute>} />
        <Route path="/quiz/:category/:difficulty" element={<ProtectedRoute> <QuizPage /> </ProtectedRoute>} />
        <Route path="/feedback" element={ <ProtectedRoute> <FeedbackPage /> </ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ResultPage /> </ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /> </ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
    </UserProvider>
    </ThemeProvider>
  )
}

export default App
