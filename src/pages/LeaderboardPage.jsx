import { useUser } from "../context/UserContext";

const DUMMY = [
  { username:"Anna", avatar:"fox", points:3200 },
  { username:"Lukas", avatar:"dog", points:2800 },
  { username:"Maya", avatar:"hare", points:1600 }
];

export default function LeaderboardPage(){
  const { user } = useUser();
  const rows = [...DUMMY];
  if(user.username){
    const exists = rows.find(r => r.username === user.username);
    if(!exists) rows.push({ username: user.username, avatar:user.avatar || "guest", points: user.totalPoints || 0});
  }
  rows.sort((a,b)=>b.points - a.points);

  return (
    <div className="container">
      <h2>Leaderboard</h2>
      <ol>
        {rows.map((r,i)=>(
          <li key={i} style={{marginBottom:8, padding:8, background: r.username===user.username ? "#fff9c4" : "#fff", borderRadius:6}}>
            <strong>{r.username}</strong> — {r.points} pts <span style={{marginLeft:8}}>{avatarEmoji(r.avatar)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function avatarEmoji(k){
  switch(k){ case "fox": return "🦊"; case "hare": return "🐇"; case "dog": return "🐶"; case "lion": return "🦁"; default: return "🙂"; }
}
