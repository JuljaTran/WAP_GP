import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/useUser.js";

const ANIMALS = [
  { key: "mouse", name: "Mouse", pts: 50, emoji: "🐭", desc: "You started your journey of knowledge" },
  { key: "rabbit", name: "Rabbit", pts: 100, emoji: "🐰", desc: "Quick learner!" },
  { key: "dog", name: "Dog", pts: 500, emoji: "🐶", desc: "Loyal and smart" },
  { key: "owl", name: "Owl", pts: 800, emoji: "🦉", desc: "Wise observer" },
  { key: "lion", name: "Lion", pts: 1000, emoji: "🦁", desc: "King of knowledge" },
  { key: "dolphin", name: "Dolphin", pts: 1500, emoji: "🐬", desc: "Very clever and playful" },
];

export default function ResultPage() {
  const nav = useNavigate();
  const { user } = useUser();
  const { state } = useLocation();

  if (!state) return null;

  const { score } = state;
  const allAchievements = ANIMALS;
  const unlockedKeys = user.unlocked || [];
  const totalPoints = user.totalPoints || 0;

const totalPointsAfterQuiz = (user.totalPoints || 0);
const unlockedKeys = user.unlocked || [];
const newlyUnlocked = ANIMALS.find(a =>
  !unlockedKeys.includes(a.key) && totalPointsAfterQuiz >= a.pts
);

  const nextAchievements = allAchievements
    .filter(a => !unlockedKeys.includes(a.key))
    .slice(0, 2);


  const nextAnimal = ANIMALS.find(a => !unlockedKeys.includes(a.key));

  
  return (
    <>
      <Navbar />
      <h2>Quiz Finished!</h2>
      <p>
        Player: <strong>{user.username}</strong>
      </p>
      <p>Total points: <strong>{user.totalPoints}</strong></p>
      <p>Points earned this quiz: {score}</p>
      <p>{message}</p>

       {newlyUnlocked && (
        <div style={{marginTop:16}}>
          <strong>New Achievement Unlocked!</strong>
          <div style={{fontSize:32}}>{newlyUnlocked.emoji} {newlyUnlocked.name}</div>
        </div>
      )}

      {nextAnimal && (
        <div style={{marginTop:12}}>
          <p>Next achievement: {nextAnimal.name} {nextAnimal.emoji}</p>
          <p>Points needed: {Math.max(nextAnimal.pts - totalPointsAfterQuiz, 0)}</p>
        </div>
      )}


      <button onClick={() => nav("/leaderboard")}>Go to Leaderboard</button>
    </div>
  );
}
