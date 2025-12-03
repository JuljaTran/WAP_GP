import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Activate() {
    const { token} = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleActivate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:1234/activate/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ password })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Activation failed');
            }

            setSuccess(true);
            alert('Account activated! You can now log in.');
            navigate('/HomePage');

        } catch (error) {
            console.error("Activation error:", error.message);
            setError(error.message);
        }
    };

return (
    <div className="activation-container">
      <h2>Activate Account</h2>
      {error && <div className="error">{error}</div>}
      {success ? (
        <div>Account activated! Redirecting to login...</div>
      ) : (
        <form onSubmit={handleActivate}>
          <div>
            <label htmlFor="password">Set your password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Activate Account</button>

        </form>
      )}
    </div>
  );
}

export default Activate;