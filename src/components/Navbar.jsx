import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav
      style={{
        padding: "12px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Link to="/home">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/achievements">Achievements</Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {user?.avatar && (
          <div
            style={{
              width: "36px",
              height: "36px",
              fontSize: "20px",
            }}
          >
            {avatarEmoji(user.avatar)}
          </div>
        )}
        <span>{user?.username || "Guest"}</span>
      </div>
    </nav>
  );
}

function avatarEmoji(key) {
  switch (key) {
    case "fox":
      return "🦊";
    case "hare":
      return "🐇";
    case "dog":
      return "🐶";
    case "lion":
      return "🦁";
    case "eagle":
      return "🦅";
    default:
      return "🙂";
  }
}
