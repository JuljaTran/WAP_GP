import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function CategoryPage(){
  const { category } = useParams();
  const nav = useNavigate();
  const levels = ["easy","medium","hard"];

  const hero = getHero(category);


  return (
    <>
      <Navbar />

      {/* Outer background + center */}
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
        {/* Inner container */}
        <Box sx={{ width: "100%", maxWidth: 1100 }}>
          {/* HERO */}
          <Box
            sx={{
              width: "100%",
              borderRadius: 4,
              overflow: "hidden",
              background: hero.gradient,
              minHeight: 330,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
              pt: 4,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: 32,
                fontWeight: 500,
              }}
            >
              Welcome to
            </Typography>

            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 600
              }}
            >
              {readable(category)}
            </Typography>

            <Box
              component="img"
              src={hero.image}
              alt={readable(category)}
              sx={{
                position: "absolute",
                width: { xs: 170, md: 200 },
                bottom: -20, 
                userSelect: "none",
              }}
            />
          </Box>

          {/* CONTENT */}
          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#032051",
                mb: 2,
              }}
            >
              Choose your  level
            </Typography>

            {/* Level cards list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {levels.map((l) => (
                <Box
                  key={l}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Left icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F3F6FF",
                      fontSize: 28,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    {levelEmoji(l)}
                  </Box>

                  {/* Text */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 800, color: "#032051" }}>
                      {levelTitle(category, l)}
                    </Typography>
                    <Typography sx={{ fontSize: "0.9rem", color: "#6B7280" }}>
                      {capitalize(l)} • 10 Questions
                    </Typography>
                  </Box>

                  {/* Arrow button */}
                  <Button
                    onClick={() => nav(`/quiz/${category}/${l}`)}
                    sx={{
                      minWidth: 44,
                      minHeight: 44,
                      borderRadius: "50%",
                      backgroundColor: "#EEF4FF",
                      color: "#3B82F6",
                      fontSize: 18,
                      fontWeight: 900,
                      "&:hover": {
                        backgroundColor: "#3B82F6",
                        color: "#fff",
                      },
                    }}
                  >
                    →
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function capitalize(s){ return s[0].toUpperCase()+s.slice(1); }
function readable(key){
  switch(key){
    case "ancient-history": return "Ancient World History";
    case "nature": return "Nature & Animals";
    case "politics": return "Political Knowledge";
    case "general": return "General Knowledge";
    default: return key;
  }
}

function getHero(category) {
  switch (category) {
    case "ancient-history":
      return {
        image: "/Assets/categories/history.png",
        gradient: "linear-gradient(180deg, #FFCC80 0%, #D97706 100%)",
      };
    case "nature":
      return {
        image: "/Assets/categories/nature.png",
        gradient: "linear-gradient(180deg, #FFE29A 0%, #F6C85F 100%)",
      };
    case "general":
      return {
        image: "/Assets/categories/general.png",
        gradient: "linear-gradient(180deg, #D8F3DC 0%, #95D5B2 100%)",
      };
    case "politics":
      return {
        image: "/Assets/categories/politics.png",
        gradient: "linear-gradient(180deg, #9CC3FF 0%, #4C8DFF 100%)",
      };
    default:
      return {
        image: "/Assets/categories/general.png",
        gradient: "linear-gradient(180deg, #E5E7EB 0%, #CBD5E1 100%)",
      };
  }
}

function levelEmoji(level) {
  switch (level) {
    case "easy":
      return "🏛️";
    case "medium":
      return "🎓";
    case "hard":
      return "🧠";
    default:
      return "➡️";
  }
}

function levelTitle(category, level) {
  const prefixMap = {
    "ancient-history": "History",
    "nature": "Nature",
    "general": "General",
    "politics": "Political",
  };

  const levelMap = {
    easy: "Basics",
    medium: "Scholar",
    hard: "Expert",
  };

  const prefix = prefixMap[category] ?? readable(category);
  const suffix = levelMap[level] ?? capitalize(level);

  return `${prefix} ${suffix}`;
}