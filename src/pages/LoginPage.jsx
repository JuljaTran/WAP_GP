import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return alert("Enter email");
    const uname = email.split("@")[0];
    login(uname);
    navigate("/avatar");
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:"40px auto"}}>
        <h1 className="center">QuizZoo</h1>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,marginBottom:8}} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:8,marginBottom:8}} />
        <div style={{display:"flex",gap:8}}>
          <button onClick={handleLogin} style={{flex:1}}>Login</button>
          <button onClick={()=>navigate("/register")} style={{flex:1}}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
