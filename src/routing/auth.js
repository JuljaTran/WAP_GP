import express from 'express';
import users from '../data/users.js';

const router = express.Router();

let currentUser = null;

//Register
router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    if (users.find(u =>  u.username === username || u.email === email)) {
        return res.status(400).json({ error: "User already exists"});
    }

    const newUser = {id: users.lenght + 1, username, email, password, role:"user"}; 
    users.push(newUser);
    res.status(201).json({ message: "Registered successfully", username })
});

//Login
router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials"});
    }

    req.session.user = user;
    res.json({ message: "You are logged in", user: {username: user.username, role: user.role} });
});

//Current user
router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({message: "Not logged in."})
    }
    res.json(req.session.user);
});

//Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out bro"});
});

//export für die middleware
export {currentUser};
export default router;
