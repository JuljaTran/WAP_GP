import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QUESTIONS } from "../data/questions";

export default function QuizPage(){
  const { category, difficulty } = useParams();
  const nav = useNavigate();
  const loc = useLocation();

  const exitQuiz = () => {
  nav("/home");
};


  const questions = QUESTIONS[category]?.[difficulty] || [];
  const total = questions.length;

  const startIndex = loc.state?.currentIndex ?? 0;
  const startScore = loc.state?.score ?? 0;

  const [index, setIndex] = useState(startIndex);
  const [score, setScore] = useState(startScore);

  useEffect(() => {
    if (index >= total) {
      nav("/result", { state: { score } });
    }
  }, [index, total, nav, score]);

  useEffect(() => {
    if (loc.state?.currentIndex !== undefined) setIndex(loc.state.currentIndex);
    if (loc.state?.score !== undefined) setScore(loc.state.score);
  }, [loc.state]);

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
     <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f7faffff",
        px: 3,
        py: 4
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        {/* EXIT BUTTON */}
        <Button
          onClick={exitQuiz}
          variant="outlined"
          color="error"
          sx={{
            mb: 3,
            borderRadius: 30,
            textTransform: "none",
            borderColor: "#EF4444",
            color: "#EF4444",
            "&:hover": {
              backgroundColor: "#EF4444",
              color: "#FFFFFF",
              borderColor: "#EF4444"
            }
          }}
          >
          Exit Quiz
        </Button>

        {/* HEADER CARD */}
        <Box
          sx={{
            backgroundColor: "#e1e8faff",
            borderRadius: 4,
            p: 4,
            mb: 4,
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 4,
            alignItems: "center"
          }}
        >
          {/* LEFT */}
          <Box>
            <Typography
              fontSize={14}
              color="#032051"
              fontWeight={500}
              mb={1}
            >
              {readable(category)} — {capitalize(difficulty)}
            </Typography>

            <Box
              component="img"
              src="/Assets/LOGO.png"
              alt="Logo"
              sx={{ width: 200 }}
            />
          </Box>

          {/* RIGHT */}
          <Typography variant="h3" fontWeight={700}>
            {q.question}
          </Typography>
        </Box>

        {/* QUESTION COUNTER */}
        <Typography
          fontSize={14}
          color="#032051"
          mb={2}
        >
          Question {index + 1} of {total}
        </Typography>

        {/* ANSWERS */}
        <Box sx={{ display: "grid", gap: 2 }}>
          {q.options.map((opt, i) => (
            <Button
              key={i}
              onClick={() => handleAnswer(i)}
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: 16,
                color: "#000",
                borderRadius: 3,
                py: 1.6,
                borderColor: "#C7D2FE",
                backgroundColor: "#EEF2FF",
                "&:hover": {
                  backgroundColor: "#cee3ffff",
                  borderColor: "#2A86FF"
                }
              }}
            >
              {opt}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
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

