import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

const AVATARS = ["fox","rabbit","dog","lion","eagle"];

export default function AvatarPage() {
  const navigate = useNavigate();
  const { setAvatar, user } = useUser();

  const choose = async (a) => {
    try{
      const response = await fetch("http://localhost:1234/api/auth/user/avatar", {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ avatar: a })
      });
      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }
      setAvatar(a);
      navigate("/home");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Could not update avatar. Please try again.");
    }
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <Navbar />
      </div>
      <div className="container">
        <h2 className="center">Choose your avatar</h2>
        <div className="grid3" style={{maxWidth:800, margin:"20px auto"}}>
          {AVATARS.map(a => (
            <div key={a} className="card center">
              <div style={{fontSize:48}}>{avatarEmoji(a)}</div>
              <div style={{marginTop:8}}>{a}</div>
              <div style={{marginTop:8}}>
                <button onClick={()=>{choose(a); navigate("/home");}}>Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function avatarEmoji(key){
  switch(key){
    case "fox": return "🦊";
    case "rabbit": return "🐇";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "eagle": return "🦅";
    default: return "🙂";
  }
}

