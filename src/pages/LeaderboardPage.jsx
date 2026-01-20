import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/useUser.js";

export default function LeaderboardPage(){
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard", {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error("Failed to load leaderboard");
        }

        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading leaderboard...</p>
        </div>
      </>
    );
  }

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
          py: 6,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
            Leaderboard
          </Typography>

          {loading ? (
            <Typography textAlign="center">Loading leaderboard...</Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {rows.map((r, i) => (
                <Box
                  key={r._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    borderRadius: 3,
                    backgroundColor: r.username === user?.username ? "#fff9c4" : "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {i + 1}. {r.username} — {r.totalPoints} pts
                  </Typography>
                  <Typography sx={{ fontSize: 28 }}>{avatarEmoji(r.avatar)}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

function avatarEmoji(k){
  switch(k){
    case "fox": return "🦊";
    case "rabbit": return "🐰";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "owl": return "🦉";
    case "cat": return "🐱";
    default: return "🙂";
  }
}
