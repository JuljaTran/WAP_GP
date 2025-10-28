import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function QuizPage() {
  const { category, difficulty } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Quiz Page</h1>
      <p>Category: {category}</p>
      <p>Difficulty: {difficulty}</p>
      <p>This is a dummy page for quiz questions.</p>
    </div>
  );
}
