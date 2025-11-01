import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function FeedbackPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, addPoints } = useUser();

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

  const unlockedThisQuiz = null;

  if (isCorrect) {
    // Add points to user
    addPoints(pointsGained);

    // Determine if a new animal is unlocked with these points
    const thresholds = [
      { key: "rabbit", pts: 100 },
      { key: "dog", pts: 500 },
      { key: "lion", pts: 1000 }
    ];

    thresholds.forEach(t => {
      if ((user.totalPoints + pointsGained) >= t.pts && !user.unlocked.includes(t.key)) {
        unlockedThisQuiz = t.key;
      }
    });
  }

  const handleNext = () => {
    if (nextIndex < totalQuestions) {
      navigate(`/quiz/${category}/${difficulty}`, { state: { currentIndex: nextIndex, score } });
    } else {
      navigate("/result", { state: { score, unlockedThisQuiz } });
    }
  };

  return (
    <div className="container">
      <div className="card center">
        <h2>{isCorrect ? "✅ Correct!" : "❌ Incorrect"}</h2>

        {!isCorrect ? (
          <p>Correct answer: <strong>{correctText}</strong></p>
        ) : (
          <p>Good job! +{pointsGained} points</p>
        )}

        {info && (
          <div style={{ marginTop: 8, padding: 8, background: "#f7f7f7", borderRadius: 6 }}>
            {info}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button onClick={handleNext}>{nextIndex === totalQuestions ? "End" : "Next"}</button>
        </div>
      </div>
    </div>
  );
}
