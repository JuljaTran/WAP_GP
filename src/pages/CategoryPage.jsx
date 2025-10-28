import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CategoryPage() {
  const { category } = useParams();
  const nav = useNavigate();
  const difficulties = ["easy", "medium", "hard"];

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Category Page: {category}</h1>
      {difficulties.map(diff => (
        <button key={diff} style={{ display:"block", margin:5 }} onClick={() => nav(`/quiz/${category}/${diff}`)}>
          {diff}
        </button>
      ))}
    </div>
  );
}
