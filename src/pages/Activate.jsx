import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [tokenValid, setTokenValid] = useState(null);
  const [error, setError] = useState(null);

  //Token validation
  useEffect(() => {
    async function checkToken() {
      try {
        const res = await fetch(`/api/register/${token}`);
        setTokenValid(res.ok);
      } catch {
        setTokenValid(false);
      }
    }
    checkToken();
  }, [token]);

  //Set password
  const handleActivate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/register/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Activation failed");
      }

      alert("Your account was activated! You can now log in.");
      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };


  if (tokenValid === null) {
    return <h3>Checking activation link…</h3>;
  }

  if (tokenValid === false) {
    return <h3>Invalid or expired activation link.</h3>;
  }

  return (
    <div className="activation-container">
      <h2>Activate Your Account</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleActivate}>
        <label>Choose your password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Activate Account</button>
      </form>
    </div>
  );
}

export default Activate;
