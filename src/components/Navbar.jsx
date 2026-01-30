import { AppBar, Toolbar, Tabs, Tab, Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.js";
import { useState } from "react";

const NAV_HEIGHT = 72;

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: "1px solid #98a4bc",
        borderTop: "1px solid #E5E7EB"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: NAV_HEIGHT,
          px: 3,
          maxWidth: 1100,
          mx: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
      {/* DESKTOP TABS */}
      <Tabs
        value={currentTab}
        onChange={(_, value) => navigate(value)}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minHeight: NAV_HEIGHT,
          overflowX: "auto",
          display: { xs: "none", sm: "flex" }, // Nur auf sm+ anzeigen
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
        <Tab label="Achievements" value="/achievements" />
      </Tabs>

      {/* MOBILE BURGER MENU */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{ display: { xs: "flex", sm: "none" } }} // Nur auf xs anzeigen
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => { navigate("/home"); handleMenuClose(); }}>Home</MenuItem>
        <MenuItem onClick={() => { navigate("/leaderboard"); handleMenuClose(); }}>Leaderboard</MenuItem>
        <MenuItem onClick={() => { navigate("/achievements"); handleMenuClose(); }}>Achievements</MenuItem>
      </Menu>


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
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 20,
            px: 2,
            py: 0.6,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.error.main,
              color: "#fff",
            },
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


