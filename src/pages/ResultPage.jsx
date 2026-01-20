import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

const ANIMALS = [
  { key: "mouse", name: "Mouse", pts: 50, emoji: "🐭", desc: "You started your journey of knowledge" },
  { key: "rabbit", name: "Rabbit", pts: 100, emoji: "🐰", desc: "Quick learner!" },
  { key: "dog", name: "Dog", pts: 500, emoji: "🐶", desc: "Loyal and smart" },
  { key: "owl", name: "Owl", pts: 800, emoji: "🦉", desc: "Wise observer" },
  { key: "lion", name: "Lion", pts: 1000, emoji: "🦁", desc: "King of knowledge" },
  { key: "dolphin", name: "Dolphin", pts: 1500, emoji: "🐬", desc: "Very clever and playful" },
];

export default function ResultPage() {
  const nav = useNavigate();
  const { user } = useUser();
  const { state } = useLocation();

  if (!state) return null;

  const { score } = state;
  const allAchievements = ANIMALS;
  const unlockedKeys = user.unlocked || [];
  const totalPoints = user.totalPoints || 0;

  const currentAchievement = allAchievements
    .filter(a => unlockedKeys.includes(a.key))
    .slice(-1)[0];

  const nextAchievements = allAchievements
    .filter(a => !unlockedKeys.includes(a.key))
    .slice(0, 2);
  
  return (
    <>
      <Navbar />

      <Box
        sx={{
          width: "100vw",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          justifyContent: "center",
          bgcolor: "#F7FAFF",
          px: 3,
          py: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 900 }}>

          {/* RESULT CARD */}
          <Box
            sx={{
              backgroundColor: "#E8F0FF",
              borderRadius: 4,
              p: 4,
              mb: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700} mb={1}>
              Quiz Finished 🎉
            </Typography>

            <Typography
              fontSize={24}
              fontWeight={800}
              color="#4F6EF7"
              mb={3}
            >
              Great work, {user.username}
            </Typography>



            <Typography fontSize={18} fontWeight={600}>
              Points earned: +{score}
            </Typography>

            <Typography fontSize={14} color="#555" mt={1}>
              Total points: {totalPoints}
            </Typography>
          </Box>

         <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            fontWeight={800}
            textAlign="center"
            mb={4}
          >
            Your Achievements
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 0.5fr)" },
              gap: 4,
            }}
          >
          {/* CURRENT ACHIEVEMENT */}
          {currentAchievement && (
            <Box
              sx={{
                textAlign: "center",
                py: 5,
                borderRadius: 4,
                backgroundColor: "#fff",
                boxShadow: "0 8px 22px rgba(0,0,0,0.14)",
                transform: "scale(1.05)",
              }}
            >
              <Typography fontSize={56}>
                {currentAchievement.emoji}
              </Typography>

              <Typography variant="h6" fontWeight={800} mt={2}>
                {currentAchievement.name}
              </Typography>

              <Typography fontSize={14} color="#555" mt={1}>
                {currentAchievement.desc}
              </Typography>

              <Typography
                fontSize={13}
                color="#4F6EF7"
                fontWeight={700}
                mt={2}
              >
                Unlocked
              </Typography>
            </Box>
          )}

          {/* NEXT ACHIEVEMENTS */}
          {nextAchievements.map((a) => (
            <Box
              key={a.key}
              sx={{
                textAlign: "center",
                py: 5,
                borderRadius: 4,
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                opacity: 0.6,
              }}
            >
              <Typography fontSize={48}>🔒</Typography>

              <Typography variant="h6" fontWeight={700} mt={2}>
                {a.name}
              </Typography>

              <Typography fontSize={14} color="#555" mt={1}>
                {a.desc}
              </Typography>

              <Typography fontSize={13} mt={2}>
                {Math.max(a.pts - totalPoints, 0)} pts to unlock
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
          {/* CTA */}
          <Button
            fullWidth
            onClick={() => nav("/leaderboard")}
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
            Go to Leaderboard
          </Button>
        </Box>
      </Box>
    </>
  );
}
