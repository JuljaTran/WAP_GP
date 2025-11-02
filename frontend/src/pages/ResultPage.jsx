import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

export default function ResultPage() {
  const nav = useNavigate();
  const { user } = useUser();
  const { state } = useLocation();

  if (!state) return <div>No results.</div>;

  const { score } = state;
  const message = score >= 100 ? "Great job!" : "Keep practicing!";


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

      
      <button onClick={() => nav("/leaderboard")}>Go to Leaderboard</button>
    </div>
  );
}
