import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { useUser } from "../context/UserContext.jsx";
import { useUser } from "../context/useUser.js";

const NAV_HEIGHT = 72;
const NAV_WIDTH = 1000;

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate("/");
  };

  const currentTab = location.pathname.startsWith("/leaderboard")
    ? "/leaderboard"
    : location.pathname.startsWith("/achievements")
    ? "/achievements"
    : "/home";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        height: NAV_HEIGHT,
        width: NAV_WIDTH,
        mx: "auto",
        backgroundColor: "#fff",
        borderBottom: "1px solid #E5E7EB",
        borderTop: "1px solid #E5E7EB"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: NAV_HEIGHT,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* LEFT – NAV TABS */}
        <Tabs
          value={currentTab}
          onChange={(_, value) => navigate(value)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minHeight: NAV_HEIGHT,
            "& .MuiTab-root": {
              minHeight: NAV_HEIGHT,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem"
            }
          }}
        >
          <Tab label="Home" value="/home" />
          <Tab label="Leaderboard" value="/leaderboard" />
          <Tab label="Achievement" value="/achievements" />
        </Tabs>

        {/* RIGHT – USER INFO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user?.avatar && (
            <Typography fontSize={22}>
              {avatarEmoji(user.avatar)}
            </Typography>
          )}

          <Typography fontWeight={600}>
            {user?.username}
          </Typography>

          <Box
            sx={{
              px: 2,
              py: 0.7,
              borderRadius: 20,
              border: "1.5px solid #669FFD",
              backgroundColor: "#F5F9FF",
              color: "#032051",
              fontWeight: 600,
              fontSize: "0.95rem"
            }}
          >
            🏆 {user?.totalPoints ?? 0}
          </Box>

          <Button
            onClick={handleLogout}
              sx={{
              borderRadius: 20,
              px: 2,
              py: 0.6,
              border: "1.5px solid #E53935",
              color: "#000",
              fontWeight: 600,
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
              backgroundColor: "#E53935",
              color: "#fff"
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
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


