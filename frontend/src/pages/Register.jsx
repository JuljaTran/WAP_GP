import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register } = useUser(); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Placeholder for actual register logic
        /*try {
            console.log('Register attempt:', {name, email, password});
            navigate('/avatar');
        } catch (error) {
            setError('Register failed. Please try again.');
        }*/

           try {
            register(name); // create new user with 0 points
            navigate('/avatar'); // then go to avatar selection
        } catch (err) {
            setError('Register failed. Please try again.');
        } 
    };

    const goToLogin = () => {
        navigate('/login');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Register</h2>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}    
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Register</button>
                <button type="button" onClick={goToLogin}>Go to Login</button>
            </form>
        </div>
    )
}

export default Register;