import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

const ANIMALS = [
  { key:"rabbit", name:"Rabbit", pts:100, emoji:"🐇" },
  { key:"dog", name:"Dog", pts:500, emoji:"🐶" },
  { key:"lion", name:"Lion", pts:1000, emoji:"🦁" }
];

export default function ResultPage() {
  const nav = useNavigate();
  const { user } = useUser();
  const { state } = useLocation();

  if (!state) return <div>No results.</div>;

  const { score } = state;
  const message = score >= 100 ? "Great job!" : "Keep practicing!";

const totalPointsAfterQuiz = (user.totalPoints || 0);
const unlockedKeys = user.unlocked || [];
const newlyUnlocked = ANIMALS.find(a => 
  !unlockedKeys.includes(a.key) && totalPointsAfterQuiz >= a.pts
);

const nextAnimal = ANIMALS.find(a => !unlockedKeys.includes(a.key));


  return (
    <div style={{ padding: 20 }}>
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
