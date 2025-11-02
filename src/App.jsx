import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Welcome from './pages/Welcome.jsx'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => { 
    fetch("/api/auth/me", { credentials: "include" })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/dashboard" element={<Dashboard user={user} />}/>
        <Route path="/login" element={<Login  setUser={setUser}/>}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
