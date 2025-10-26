import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QUESTIONS } from "../data/questions";

export default function QuizPage(){
  const { category, difficulty } = useParams();
  const nav = useNavigate();
  const loc = useLocation();

  const startIndex = loc.state?.currentIndex ?? 0;
  const startScore = loc.state?.score ?? 0;

  const questions = QUESTIONS[category]?.[difficulty] || [];
  const total = 10; // ensure at least 10 in questions data
  const [index, setIndex] = useState(startIndex);
  const [score, setScore] = useState(startScore);

  useEffect(() => {
    if (index >= total) {
      nav("/result", { state: { score } });
    }
  }, [index, total, nav, score]);

  if (!questions || questions.length === 0) {
    return <div className="container card">No questions for this category/difficulty yet.</div>;
  }

  const q = questions[index];
  const pointsPer = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;

  const handleAnswer = (optionIndex) => {
    const isCorrect = optionIndex === q.correct;
    const gained = isCorrect ? pointsPer : 0;
    const newScore = score + gained;
    nav("/feedback", {
      state: {
        isCorrect,
        info: q.info,
        selectedText: q.options[optionIndex],
        correctText: q.options[q.correct],
        nextIndex: index + 1,
        score: newScore,
        pointsGained: gained,
        category,
        difficulty,
        totalQuestions: total
      }
    });
  };

  return (
    <div className="container">
      <h3>{readable(category)} — {capitalize(difficulty)}</h3>
      <div style={{marginTop:12}}>
        <div className="small">Question {index+1} / {total}</div>
        <div className="card" style={{marginTop:8}}>
          <h4>{q.question}</h4>
          <div style={{display:"grid",gap:8,marginTop:12}}>
            {q.options.map((opt, i)=>(
              <button key={i} onClick={()=>handleAnswer(i)} style={{padding:10,textAlign:"left"}}>{opt}</button>
            ))}
          </div>
        </div>
        <div style={{marginTop:12}}>Current score (this quiz): {score}</div>
      </div>
    </div>
  );
}

function capitalize(s){ return s[0].toUpperCase()+s.slice(1);}
function readable(key){
  switch(key){
    case "ancient-history": return "Ancient World History";
    case "nature": return "Nature & Animals";
    case "politics": return "Political Knowledge";
    case "general": return "General Knowledge";
    default: return key;
  }
}
