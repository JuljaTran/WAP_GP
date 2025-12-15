import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

export default function LeaderboardPage(){
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard", {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error("Failed to load leaderboard");
        }

        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading leaderboard...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop: 20}}>
        <h2>Leaderboard</h2>
        <ol>
          {rows.map((r,i)=>(
            <li key={r._id} 
                style={{
                  marginBottom:8, 
                  padding:8, 
                  background: r.username===user?.username ? "#fff9c4" : "#fff", 
                  borderRadius:6,
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}>
              <span><strong>{r.username}</strong> — {r.totalPoints} pts</span>
              <span style={{marginLeft:8, fontSize:24}}>{avatarEmoji(r.avatar)}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function avatarEmoji(k){
  switch(k){
    case "fox": return "🦊";
    case "rabbit": return "🐇";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "eagle": return "🦅";
    default: return "🙂";
  }
}
