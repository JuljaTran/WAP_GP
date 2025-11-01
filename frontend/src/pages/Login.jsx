import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Placeholder for actual login logic
        /*try {
            console.log('Login attempt:', {name, password});
             navigate('/home');
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    }*/

        try {
            login(name); 
            navigate('/home'); 
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const goToRegister = () => {
        // Navigate to register page for new users
        navigate('/register');
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}    
                        onChange={(e) => setName(e.target.value)}
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
                    required
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={goToRegister}>Go to Register</button>
            </form>
        </div>
    )
}

export default Login;