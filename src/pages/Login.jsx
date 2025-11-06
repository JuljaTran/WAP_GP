import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:1234/api/auth/login";

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email, password})  
            });

            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

            const result = await response.json();
            console.log("Login successful:", result);
            setUser(result.user);
            navigate('/avatar');

        } catch (error) {
            console.error("Login error:", error.message);
            setError(error.message);
        }
        
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input
                        type="email"
                        id="name"
                        value={email}    
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                    />
                </div>
                <button type="submit">Login</button>
                <button>            
                    <Link to="/register">Go to register</Link>
                </button>
            </form>
        </div>
    )
}

export default Login;