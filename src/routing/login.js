import express from 'express';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = req.app.get('db');
        const { email, password } = req.body;

        const userAuth = await db.collection('user_auth').findOne({ email });

        if (!userAuth) {
            return res.status(401).json({ error: "User not found" });
        }

        if (!userAuth.active) {
            return res.status(403).json({ error: "Account not activated" });
        }

        const match = await bcrypt.compare(password, userAuth.password);

        if (!match) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const profile = await db.collection('user').findOne({
            user_auth_id: new ObjectId(userAuth._id)
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: userAuth._id,
                username: userAuth.username,
                email: userAuth.email,
                profileId: profile?._id ?? null
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
