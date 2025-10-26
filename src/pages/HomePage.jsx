import { useNavigate } from "react-router-dom";

const CATS = [
  { key: "ancient-history", name: "Ancient World History" },
  { key: "nature", name: "Nature & Animals" },
  { key: "politics", name: "Political Knowledge" },
  { key: "general", name: "General Knowledge" }
];

export default function HomePage(){
  const nav = useNavigate();
  return (
    <div className="container">
      <h1>Quiz Overview</h1>
      <div className="grid2">
        {CATS.map(c => (
          <div key={c.key} className="card">
            <h3>{c.name}</h3>
            <p className="small">Practice {c.name} with quizzes in three difficulty levels.</p>
            <div style={{marginTop:12}}>
              <button onClick={()=>nav(`/category/${c.key}`)}>Open category</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
