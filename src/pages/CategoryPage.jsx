import { useNavigate, useParams } from "react-router-dom";

export default function CategoryPage(){
  const { category } = useParams();
  const nav = useNavigate();
  const levels = ["easy","medium","hard"];

  return (
    <div className="container">
      <h2>{readable(category)}</h2>
      <div style={{display:"flex",gap:12, marginTop:12}}>
        {levels.map(l => (
          <div key={l} className="card" style={{flex:1}}>
            <h4>{capitalize(l)}</h4>
            <p className="small">10 questions</p>
            <button onClick={()=>nav(`/quiz/${category}/${l}`)}>Start {capitalize(l)}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function capitalize(s){ return s[0].toUpperCase()+s.slice(1); }
function readable(key){
  switch(key){
    case "ancient-history": return "Ancient World History";
    case "nature": return "Nature & Animals";
    case "politics": return "Political Knowledge";
    case "general": return "General Knowledge";
    default: return key;
  }
}
