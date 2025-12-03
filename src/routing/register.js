import express from 'express';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = express.Router();

//Registrierung
router.post('/', async(req, res) => {
    try {
        const db = req.app.get('db');

        const email = req.body.email;
        const username = req.body.username;

        if (!email || !username) {
            return res.status(400).json({ error: "Email and username are required" });
        }

        const exists = await db.collection('user').findOne({ $or: [{ username }, { email }] });

        if (exists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const insertion = await db.collection('user').insertOne({ 
            username: req.body.username,
            email: req.body.email,
            password: null,
            role: 'user',
            active: false        
        });       

        if (!insertion.acknowledged) {
            return res.status(500).send();
        }

        const token = v4();

        await db.collection('token').insertOne({
            emailToken: token,
            emailTokenExpiresAt: new Date(Date.now() + (1000 * 60 * 60)),
            user_id: insertion.insertedId,
        });
        
        console.log(`Activation link: http://localhost:1234/activate/${token}`);
        res.status(201).json({ message: "User created. Check console for activation link." });

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Aktivierung
router.put('/:token', async (req, res) => {
    try {
        const db = req.app.get('db');
        const password = req.body.password;

        if (!password) {
            return res.status(400).json({ error: "Password required"});
        }

        const token = await db.collection('token').findOne({ emailToken: req.params.token });
        
        if (!token) {
            return res.status(400).json({ error: "Invalid or expired token"});
        }
        
        const hashedPW = await bcrypt.hash(password, 10);

        //PW setzen und Profil verbinden
        const updated = await db.collection('user').updateOne(
            { _id: token.user_id }, 
            { $set: { password: hashedPW , active: true } }
        );
            
        if (updated.modifiedCount !== 1) {
            return res.status(500).send();
        } 

        //Token löschen
        await db.collection('token').deleteOne({ emailToken: req.params.token });
        return res.status(200).json({ message: "Account activated. You can now log in."});

        } catch (err) {
            console.error(err);
            res.status(500).send();
    }
});

export default router
