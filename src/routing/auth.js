import express from 'express';
import users from '../data/users';

const router = express.Router();

let currentUser = null;

//Register
router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    if (users.find(u =>  u.username === username || u.email === email)) {
        return res.status(400).json({ error: "User already exists"});
    }

    users.push({username, email, password});
    res.status(201).json({ message: "Registered successfully", username })
});

//Login
router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials"});
    }
    currentUser = user;
    res.json({ message: "You are logged in", user: {username: user.username, role: user.role} });
});

//Current user
router.get("/me", (req, res) => {
    if (!currentUser) {
        return res.status(401).json({message: "Not logged in."})
    }
    res.json(currentUser);
});

//Logout
router.post("/logout", (req, res) => {
    currentUser = null;
    res.json({ message: "Logged out bro"});
});

//export für die middleware
export {currentUser};
export default router;
