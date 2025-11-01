import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AvatarPage() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Avatar Page</h1>
      <button onClick={() => nav("/home")}>Go to Home Page</button>
    </div>
  );
}
