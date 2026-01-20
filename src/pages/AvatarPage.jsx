import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/useUser.js";

const AVATARS = ["fox","rabbit","dog","lion","owl", "cat"];

export default function AvatarPage() {
  const navigate = useNavigate();
  const { setAvatar} = useUser();

  const choose = async (a) => {
    try{
      await setAvatar(a);
      navigate("/home");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Could not update avatar. Please try again.");
    }
  };

  return (
    <>
     <Navbar />

      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          bgcolor: "#F7FAFF",
          px: 3,
          py: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1000, textAlign: "center" }}>

          {/* HEADER HERO */}
          <Box
            sx={{
              width: "100%",
              minHeight: 200,
              borderRadius: 6,
              backgroundColor: "#E1E8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 6,
              position: "relative",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Choose your character
            </Typography>
          </Box>

          {/* AVATAR GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 4,
              justifyContent: "center",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {AVATARS.map((a) => (
              <Box
                key={a}
                onClick={() => choose(a)}
                sx={{
                  height: 140,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Typography fontSize={44}>{avatarEmoji(a)}</Typography>
                <Typography sx={{ mt: 1, fontWeight: 600, textTransform: "capitalize" }}>
                  {a}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

function avatarEmoji(key) {
   switch (key) {
    case "fox": return "🦊";
    case "rabbit": return "🐰";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "owl": return "🦉";
    case "cat": return "🐱";
    default: return "🙂";
  }
}
