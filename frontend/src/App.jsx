import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {

  return (
    <>
    <Router>
      <Login />
      <Register />
    </Router>
    </>
  )
}

export default App
