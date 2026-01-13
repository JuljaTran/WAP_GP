import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

const CATEGORIES = [
  {
    key: "ancient-history",
    title: "Ancient World History",
    image: "/Assets/categories/history.png",
    gradient: "linear-gradient(180deg, #FFC796 0%, #CA6602 100%)",
  },
  {
    key: "nature",
    title: "Nature & Animals",
    image: "/Assets/categories/nature.png",
    gradient: "linear-gradient(180deg, #FFE197 0%, #FFC945 100%)",
  },
  {
    key: "general",
    title: "General Knowledge",
    image: "/Assets/categories/general.png",
    gradient: "linear-gradient(180deg, #EBFFE2 0%, #8CB777 100%)",
  },
  {
    key: "politics",
    title: "Political Knowledge",
    image: "/Assets/categories/politics.png",
    gradient: "linear-gradient(180deg, #80B0FF 0%, #2A86FF 100%)",
  }
];

export default function HomePage() {
  const nav = useNavigate();
  const categories = ["ancient-history", "nature", "politics", "general"];
  const { user } = useUser();

  useEffect(() => {
    if (user && !user.avatar) {
      nav("/avatar");
    }
  }, [user, nav]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          justifyContent: "center",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            px: 4,
            py: 6,
          }}
        >

          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Hello, {user?.username}!
          </Typography>

          <Typography
            sx={{
              fontSize: "1.3rem",
              color: "#555",
              fontWeight: 600,
              mb: 6,
            }}
          >
            Play, learn & win
          </Typography>

          {/* === CATEGORIES GRID === */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
              mt: 15,
            }}
          >
            {CATEGORIES.map((cat) => (
              <Box
                key={cat.key}
                sx={{
                  width: 260,
                  position: "relative",
                }}
              >
                {/* CHARACTER IMAGE (OVER CARD) */}
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.title}
                  sx={{
                    width: 250,
                    position: "absolute",
                    top: -70,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                />

                {/* CARD */}
                <Box
                  sx={{
                    height: 300,
                    borderRadius: 4,
                    background: cat.gradient,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    pb: 3,
                    pt: 8,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {cat.title}
                  </Typography>

                  <Button
                    onClick={() => nav(`/category/${cat.key}`)}
                    sx={{
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: '50%',
                      backgroundColor: "#fff",
                      color: "#032051",
                      fontSize: { xs: 16, sm: 20 },
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      "&:hover": { backgroundColor: "#f1f1f1" },
                    }}
                  >
                    →
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
