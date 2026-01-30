import { Box, Button, Typography } from "@mui/material";
//import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.js";

const CATEGORY_IMAGE = {
  "ancient-history": "/Assets/categories/history.png",
  "nature": "/Assets/categories/nature.png",
  "politics": "/Assets/categories/politics.png",
  "general": "/Assets/categories/general.png",
};

export default function FeedbackPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  //const { user, addPoints } = useUser();
  const { addPoints } = useUser();
  //const [unlockedThisQuiz, setUnlockedThisQuiz] = useState(null);

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
    if (isCorrect && pointsGained > 0) {
      addPoints(pointsGained);
    }

    if (nextIndex < totalQuestions) {
      navigate(`/quiz/${category}/${difficulty}`, { state: { currentIndex: nextIndex, score } });
    } else {
      navigate("/result", { state: { score } });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        justifyContent: "center",
        px: 3,
        py: 5,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        {/* TOP CARD */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#E8F0FF",
            borderRadius: 4,
            px: 5,
            pt: 4,
            pb: 0,
            mb: 5,
            display: "flex",
            alignItems: "center",
            gap: 4,
            overflow: "hidden",
          }}
        >
          {/* CHARACTER */}
          <Box
            component="img"
            src={CATEGORY_IMAGE[category]}
            alt="Character"
            sx={{
              width: 180,
              alignSelf: "flex-end",
              mb: -1,
            }}
          />

          {/* TEXT */}
          <Box>
            <Typography fontSize={14} color="#4F6EF7" mb={1}>
              Question {nextIndex} of {totalQuestions}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              color={isCorrect ? "#16A34A" : "#DC2626"}
            >
              {isCorrect ? "Correct Answer ✅" : "Wrong Answer ❌"}
            </Typography>
          </Box>
        </Box>

        {/* ANSWER INFO */}
        <Box mb={4}>
          {!isCorrect && (
            <>
              <Typography
                fontSize={18}
                fontWeight={600}
                color="#DC2626"
                mb={1}
              >
                Your answer: {selectedText}
              </Typography>

              <Typography
                fontSize={18}
                fontWeight={700}
                color="#16A34A"
                mb={2}
              >
                Correct answer: {correctText}
              </Typography>
            </>
          )}

          {info && (
            <Box
              sx={{
                backgroundColor: "#E8F0FF",
                borderRadius: 3,
                p: 3,
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              {info}
            </Box>
          )}
        </Box>

        {/* POINTS / COINS */}
        {isCorrect && (
          <Box textAlign="center" mb={5}>
            <Typography fontSize={18} fontWeight={600} mb={2}>
              You earn +{pointsGained} points
            </Typography>

            <Box
              component="img"
              src="/Assets/coins.png"
              alt="Coins"
              sx={{ width: 120 }}
            />
          </Box>
        )}

        {/* NEXT BUTTON */}
        <Button
          fullWidth
          onClick={handleNext}
          sx={{
            py: 1.8,
            borderRadius: 30,
            fontSize: 18,
            fontWeight: 600,
            backgroundColor: "#4F6EF7",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#3B5BDB",
            },
          }}
        >
          {nextIndex === totalQuestions ? "Finish Quiz" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

