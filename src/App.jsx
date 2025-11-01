import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" elemen={<Login />}/>
        <Route path="/register" elemen={<Register />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
