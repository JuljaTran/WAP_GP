import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

export default function ResultPage() {
  const nav = useNavigate();
  const { user } = useUser();
  const { state } = useLocation();

  if (!state) return <div>No results.</div>;

  const { score, unlockedThisQuiz } = state;
  const message = score >= 100 ? "Great job!" : "Keep practicing!";

  const thresholds = [
    { key: "rabbit", pts: 100 },
    { key: "dog", pts: 500 },
    { key: "lion", pts: 1000 }
  ];

  //Find the next animal that is not yet unlocked
  const nextThreshold = thresholds.find(t => !user.unlocked.includes(t.key));
  const pointsNeeded = nextThreshold ? nextThreshold.pts - user.totalPoints : 0;

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h2>Quiz Finished!</h2>
      <p>Points earned this quiz: {score}</p>
      <p>{message}</p>

      {unlockedThisQuiz ? (
        <p>🎉 You unlocked a new animal: {unlockedThisQuiz}!</p>
      ) : nextThreshold ? (
        <p>Next animal ({nextThreshold.key}) unlocks in {pointsNeeded} points.</p>
      ) : (
        <p>All animals unlocked! 🏆</p>
      )}

      <button onClick={() => nav("/leaderboard")}>Go to Leaderboard</button>
    </div>
  );
}
