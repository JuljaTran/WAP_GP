//Alle User daten geupdated - Punkte, avatar 
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

//Update user points
router.patch('/:userId/points', async(req, res) => {
    try {
        const db = req.app.get('db');
        const { points } = req.body;
        const { userId } = req.params;

        const userProfile = await db.collection('user').findOne({ _id: new ObjectId(userId) });
        
        if (!userProfile) return res.status(404).json({ error: "User not found" });

        const totalPoints = (userProfile.totalPoints || 0) + points;
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error"});
        }

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

});

//set Avatar
router.patch('/:userId/avatar', async (req, res) => {
    try {
        const db = req.app.get('db');
        const { avatar } = req.body;
        const { userId } = req.params;

        const userProfile = await db.collection('user').findOne({ _id: new ObjectId(userId) });
        
        if (!userProfile) return res.status(404).json({ error: "User not found" });

        await db.collection('user').updateOne(
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
