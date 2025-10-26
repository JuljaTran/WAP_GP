import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ResultPage(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const score = state?.score ?? 0;

  const animals = [
    { key:"rabbit", name:"Rabbit", pts:100, emoji:"🐇" },
    { key:"dog", name:"Dog", pts:500, emoji:"🐶" },
    { key:"lion", name:"Lion", pts:1000, emoji:"🦁" }
  ];

  const locked = animals.find(a => !user.unlocked?.includes(a.key));
  const nextText = locked ? `Next animal unlocks at ${locked.pts} points (${locked.name})` : "All animals unlocked!";

  return (
    <div className="container">
      <div className="card center">
        <h2>Quiz Completed</h2>
        <p>Your score for this quiz: <strong>{score}</strong></p>
        <p>Your total points: <strong>{user.totalPoints}</strong></p>

        {locked ? (
          <div style={{marginTop:12}}>
            <p>Next animal: {locked.emoji} {locked.name}</p>
            <p>{nextText}</p>
          </div>
        ) : (
          <p>Congratulations — you've unlocked all animals!</p>
        )}

        <div style={{marginTop:16}}>
          <button onClick={()=>navigate("/leaderboard")} style={{marginRight:8}}>View Leaderboard</button>
          <button onClick={()=>navigate("/home")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
