import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
      <Link to="/home">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/achievements">Achievements</Link>
    </nav>
  );
}
