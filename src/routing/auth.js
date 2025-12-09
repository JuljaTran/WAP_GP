/*import express from 'express';
import users from '../data/users.js';

const router = express.Router();

let currentUser = null;

//Register
router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    if (users.find(u =>  u.username === username || u.email === email)) {
        return res.status(400).json({ error: "User already exists"});
    }

    const newUser = {id: users.length + 1, username, email, password, role:"user", avatar: null, totalPoints: 0, unlocked: []}; 
    users.push(newUser);

    req.session.user = newUser;

    res.status(201).json({ message: "Registered successfully", user: {username: newUser.username, role: newUser.role, avatar: newUser.avatar, totalPoints: newUser.totalPoints,
    unlocked: newUser.unlocked}})
});

//Login
router.post("/login", (req, res) => {
    console.log("Body received:", req.body);
    const {email, password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    //console.log("User found:", user);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials"});
    }

    req.session.user = user;
    res.json({ message: "You are logged in", user: {username: user.username, role: user.role, avatar: user.avatar || null, totalPoints: user.totalPoints || 0, unlocked: user.unlocked || []} });
});

//Current user
router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({message: "Not logged in."})
    }
    res.json(req.session.user);
});

//Set avatar
router.patch("/user/avatar", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { avatar } = req.body;
  const currentUser = users.find(u => u.id === req.session.user.id);

  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  currentUser.avatar = avatar;
  req.session.user.avatar = avatar;

  res.json({
    message: "Avatar updated",
    user: {
      username: currentUser.username,
      role: currentUser.role,
      avatar: currentUser.avatar,
    },
  });
});

//Add points
router.patch("/user/points", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { points } = req.body;
  const currentUser = users.find(u => u.id === req.session.user.id);

  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  currentUser.totalPoints = (currentUser.totalPoints || 0) + points;

  // unlock logic
  const thresholds = [
    { key: "rabbit", pts: 100 },
    { key: "dog", pts: 500 },
    { key: "lion", pts: 1000 }
  ];

  currentUser.unlocked = currentUser.unlocked || [];
  thresholds.forEach(t => {
    if (currentUser.totalPoints >= t.pts && !currentUser.unlocked.includes(t.key)) {
      currentUser.unlocked.push(t.key);
    }
  });

  // Update session
  req.session.user.totalPoints = currentUser.totalPoints;
  req.session.user.unlocked = currentUser.unlocked;

  res.json({
    message: "Points updated",
    totalPoints: currentUser.totalPoints,
    unlocked: currentUser.unlocked
  });
});


//Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out bro"});
});

//export für die middleware
export { currentUser };
export default router;
*/