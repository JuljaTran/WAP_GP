import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ResultPage() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Result Page</h1>
      <p>This is a dummy result page showing points and achievements.</p>
      <button onClick={() => nav("/home")}>Back to Home</button>
      <button onClick={() => nav("/leaderboard")}>View Leaderboard</button>
    </div>
  );
}
