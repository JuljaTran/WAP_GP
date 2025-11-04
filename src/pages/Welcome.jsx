import { Link } from 'react-router-dom';

function Welcome() {

    return (
        <div className="login-container">
            <h1>Welcome to Quizzpanda</h1>        
            <button className="btn">
                <Link to="/login" className="btn">Login</Link>           
            </button>
            <button className="btn">
                <Link to="/register" className="btn">Register</Link>           
            </button>                    
        </div>
    )
}

export default Welcome;