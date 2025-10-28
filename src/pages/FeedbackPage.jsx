import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function FeedbackPage() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Feedback Page</h1>
      <p>This is a dummy feedback page.</p>
      <button onClick={() => nav("/quiz/ancient-history/easy")}>Next Question</button>
      <button onClick={() => nav("/result")}>End Quiz</button>
    </div>
  );
}
