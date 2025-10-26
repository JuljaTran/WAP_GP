import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function FeedbackPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addPoints } = useUser();

  if (!state) return <div className="container card">No feedback data.</div>;

  const { 
    isCorrect, 
    info, 
    selectedText, 
    correctText, 
    nextIndex, 
    score, 
    pointsGained, 
    category, 
    difficulty, 
    totalQuestions 
  } = state;

  const handleNext = () => {
    if (pointsGained > 0) addPoints(pointsGained);

    if (nextIndex < totalQuestions) {
      // still more questions → continue quiz
      navigate(`/quiz/${category}/${difficulty}`, { 
        state: { currentIndex: nextIndex, score } 
      });
    } else {
      // finished quiz → go to results
      navigate("/result", { state: { score } });
    }
  };

  const isLastQuestion = nextIndex === totalQuestions; // check if it's the last one

  return (
    <div className="container">
      <div className="card center">
        <h2>{isCorrect ? "✅ Correct!" : "❌ Incorrect"}</h2>

        {!isCorrect ? (
          <p>
            Correct answer: <strong>{correctText}</strong>
          </p>
        ) : (
          <p>Good job! +{pointsGained} points</p>
        )}

        {info && (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              background: "#f7f7f7",
              borderRadius: 6,
            }}
          >
            {info}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button onClick={handleNext}>
            {isLastQuestion ? "End" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
