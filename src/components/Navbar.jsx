import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 12, alignItems: "center" }}>
      <Link to="/home">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/achievements">Achievements</Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {user?.avatar && (
            <div style={{ width: "36px", height: "36px", fontSize: "20px" }}>
              {avatarEmoji(user.avatar)}
            </div>
          )}
          <span>{user?.username || "Guest"}</span>
        </div>

        <div style={{ fontWeight: "bold" }}>Points: {user.totalPoints || 0}</div>
        <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
      </div>
    </nav>
  );
}

function avatarEmoji(key) {
  switch (key) {
    case "fox": return "🦊";
    case "hare": return "🐇";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "eagle": return "🦅";
    default: return "🙂";
  }
}
