import { useUser } from "../context/UserContext";

const ANIMALS = [
  { key:"rabbit", name:"Rabbit", pts:100, emoji:"🐇" },
  { key:"dog", name:"Dog", pts:500, emoji:"🐶" },
  { key:"lion", name:"Lion", pts:1000, emoji:"🦁" }
];

export default function AchievementsPage(){
  const { user } = useUser();
  const total = user.totalPoints || 0;
  return (
    <div className="container">
      <h2>Your Achievements</h2>
      <div className="grid3">
        {ANIMALS.map(a => {
          const unlocked = user.unlocked?.includes(a.key);
          return (
            <div key={a.key} className="card center" style={{opacity: unlocked ? 1 : 0.6}}>
              <div style={{fontSize:44}}>{unlocked ? a.emoji : "🔒"}</div>
              <h4>{a.name}</h4>
              <p>{unlocked ? `Unlocked at ${a.pts} pts` : `Locked — ${a.pts - total} pts left`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
