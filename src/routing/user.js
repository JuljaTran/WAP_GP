//Alle User daten geupdated - Punkte, avatar 
import { avatarClasses } from '@mui/material';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

//Get current user
router.get('/me', async(req, res) => {
try {
    const db = req.app.get("db");

    if (!req.user) return res.status(401).json({ error: "Not logged in" });

    const userAuth = await db.collection("user_auth").findOne({ _id: user.user_auth_id  });
    const user = await db.collection("user").findOne({ _id: new ObjectId(req.userId) });

    if (!userAuth || !user) return res.status(404).json({ error: "User not found" });

    res.json({
      username: userAuth.username,
      userId: user._id,
      authId: userAuth._id,
      avatar: user.avatar,
      totalPoints: user.totalPoints,
      unlocked: user.unlocked
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update user points
router.patch('/:userId/points', async(req, res) => {
    try {
        const db = req.app.get('db');
        const { points } = req.body;
        const { userId } = req.params;

        const user= await db.collection('user').findOne({ _id: new ObjectId(userId) });
        
        if (!user) return res.status(404).json({ error: "User not found" });
        
        const newPoints = (user.totalPoints || 0) + points;

        const thresholds = [
            { key: "mouse", pts: 50 },
            { key: "rabbit", pts: 100 },
            { key: "dog", pts: 500 },
            { key: "owl", pts: 800 },
            { key: "lion", pts: 1000 },
            { key: "dolphin", pts: 1500 },
        ];

        //Unlock animals
        const unlocked = user.unlocked || [];
        thresholds.forEach(t => {
            if (newPoints >= t.pts && ! unlocked.includes(t.key)) {
            unlocked.push(t.key);
            }
        });

        await db.collection("user").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { totalPoints: newPoints, unlocked } }
        );

        return res.status(200).json({
            totalPoints: newPoints,
            unlocked
        });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error"});
        }

});

//set Avatar
router.patch('/:userId/avatar', async (req, res) => {
    try {
        const db = req.app.get('db');
        const { avatar } = req.body;
        const { userId } = req.params;

        const user = await db.collection("user").findOne({ _id: new ObjectId(userId) });
        
        if (!user) return res.status(404).json({ error: "User not found" });

        await db.collection("user").updateOne(
            { _id: new ObjectId(userId) },
            { $set: {avatar} }
        );

        return res.status(200).json({ avatar });

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Intern server error"});
    }
});

export default router
