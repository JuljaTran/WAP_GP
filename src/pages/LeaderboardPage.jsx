import { Box, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/useUser.js";

export default function LeaderboardPage() {
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

  const displayedRows = useMemo(() => {
    if (!user || rows.length === 0) return [];

    const result = [];
    const top20 = rows.slice(0, 20);
    const myIndex = rows.findIndex(
      r => r.username === user.username
    );

    // Top 20 immer anzeigen
    top20.forEach((r, i) => {
      result.push({
        ...r,
        rank: i + 1
      });
    });

    // Eigener Rang ist unter den Top 20
    if (myIndex !== -1 && myIndex < 20) {
      if (rows.length > 20) {
        result.push({ _id: "ellipsis-bottom", ellipsis: true });
      }
      return result;
    }

    // Eigener Rang ist unter den Top 20
    if (myIndex !== -1 && myIndex >= 20) {
      result.push({ _id: "ellipsis-top", ellipsis: true });

      result.push({
        ...rows[myIndex],
        rank: myIndex + 1,
        isMe: true
      });

      result.push({ _id: "ellipsis-bottom", ellipsis: true });
    }

    return result;
  }, [rows, user]);

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
          py: 6
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            Leaderboard
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {displayedRows.map(r => {
              if (r.ellipsis) {
                return (
                  <Box
                    key={r._id}
                    sx={{
                      textAlign: "center",
                      py: 1,
                      color: "#999",
                      fontWeight: 600
                    }}
                  >
                    ...
                  </Box>
                );
              }

              return (
                <Box
                  key={r._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    borderRadius: 3,
                    backgroundColor:
                      r.username === user?.username ? "#fff9c4" : "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {r.rank}. {r.username} — {r.totalPoints} pts
                  </Typography>
                  <Typography sx={{ fontSize: 28 }}>
                    {avatarEmoji(r.avatar)}
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

function avatarEmoji(k) {
  switch (k) {
    case "fox": return "🦊";
    case "rabbit": return "🐰";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "owl": return "🦉";
    case "cat": return "🐱";
    default: return "🙂";
  }
}
