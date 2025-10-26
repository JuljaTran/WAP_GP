import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AVATARS = ["fox","hare","dog","lion","eagle"];

export default function AvatarPage(){
  const { setAvatar } = useUser();
  const navigate = useNavigate();

  const choose = (a) => {
    setAvatar(a);
    // navigate immediately to home OR let user press continue (we navigate)
  };

  return (
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
  );
}

function avatarEmoji(key){
  switch(key){
    case "fox": return "🦊";
    case "hare": return "🐇";
    case "dog": return "🐶";
    case "lion": return "🦁";
    case "eagle": return "🦅";
    default: return "🙂";
  }
}
