import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Login Page</h1>
      <button onClick={() => nav("/avatar")}>Go to Avatar Page</button>
    </div>
  );
}
