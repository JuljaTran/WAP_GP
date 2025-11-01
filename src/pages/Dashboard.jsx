import Link from "react-router-dom";

function Dashboard() {

    return (
        <div className="login-container">
            <h1>Welcome to the Dashboard</h1>
            <button>            
                <Link to="/login">Login</Link>
            </button>
            <button>            
                <Link to="/register">Register</Link>
            </button>
        </div>
    )
}

export default Dashboard;