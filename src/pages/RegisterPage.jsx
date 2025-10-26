import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function RegisterPage(){
  const [username,setUsername] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handle = () => {
    if (!username) return alert("Enter username");
    login(username);
    navigate("/avatar");
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:"40px auto"}}>
        <h2>Create account</h2>
        <input placeholder="Choose username" value={username} onChange={e=>setUsername(e.target.value)} style={{width:"100%",padding:8,marginBottom:8}}/>
        <button onClick={handle}>Register</button>
      </div>
    </div>
  );
}
