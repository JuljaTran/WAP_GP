import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { Box, Typography } from "@mui/material";

const ANIMALS = [
  { key: "mouse", name: "Mouse", pts: 50, emoji: "🐭", desc: "You started your journey of knowledge" },
  { key: "rabbit", name: "Rabbit", pts: 100, emoji: "🐰", desc: "Quick learner!" },
  { key: "dog", name: "Dog", pts: 500, emoji: "🐶", desc: "Loyal and smart" },
  { key: "owl", name: "Owl", pts: 800, emoji: "🦉", desc: "Wise observer" },
  { key: "lion", name: "Lion", pts: 1000, emoji: "🦁", desc: "King of knowledge" },
  { key: "dolphin", name: "Dolphin", pts: 1500, emoji: "🐬", desc: "Very clever and playful" },
];

export default function AchievementsPage() {
  const { user } = useUser();
  const total = user.totalPoints || 0;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          justifyContent: "center",
          px: 3,
          py: 6,
          bgcolor: "#F7FAFF",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1000 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
            Your Achievements
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {ANIMALS.map((a) => {
              const unlocked = user.unlocked?.includes(a.key);
              return (
                <Box
                  key={a.key}
                  sx={{
                    textAlign: "center",
                    py: 4,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    opacity: unlocked ? 1 : 0.5,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: unlocked ? "translateY(-4px)" : "none",
                      boxShadow: unlocked ? "0 6px 18px rgba(0,0,0,0.12)" : undefined,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 48 }}>{unlocked ? a.emoji : "🔒"}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                    {a.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "#555", mt: 1 }}>
                    {unlocked
                      ? `${a.desc} — unlocked at ${a.pts} pts`
                      : `Locked — ${a.pts - total} pts left`}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
