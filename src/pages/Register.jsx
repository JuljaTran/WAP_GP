import { useState } from 'react'
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Register({setUser}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    
    const handleRegister = async (e) => {
        e.preventDefault();
        const url = "http://localhost:1234/api/auth/register";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({username, email, password})  
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Register failed');
            }

            const result = await response.json();
            console.log("Register successful:", result);
            setUser(result.user);
            navigate('/avatar');
            
        } catch (error) {
            console.error("Register error:", error.message);
            setError(error.message);

        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleRegister} className="login-form">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={username}    
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
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
                <button type="submit">Register</button>
                <button>            
                    <Link to="/login">Go to Login</Link>
                </button>
            </form>
        </div>
    )
}

export default Register;