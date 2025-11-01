import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const nav = useNavigate();
  const categories = ["ancient-history", "nature", "politics", "general"];

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Home Page</h1>
      {categories.map(cat => (
        <button key={cat} style={{ display:"block", margin:5 }} onClick={() => nav(`/category/${cat}`)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
