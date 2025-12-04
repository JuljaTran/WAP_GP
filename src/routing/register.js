import express from 'express';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const router = express.Router();

/*ändern -> 2 collections 
Collection user_auth - sensible daten
{
  "_id": ObjectId,
  "username": "string",
  "email": "string",
  "password": "hashed string",
  "role": "user | admin",
  "active": true/false
}

Collection user - daten für das frontend
{
  "_id": ObjectId,
  "user_auth_id": ObjectId, // Referenz auf user_auth
  "avatar": null,
  "totalPoints": 0,
  "unlocked": []
}
*/
//Registrierung
router.post('/', async(req, res) => {
    try {
        const db = req.app.get('db');

        const email = req.body.email;
        const username = req.body.username;

        if (!email || !username) {
            return res.status(400).json({ error: "Email and username are required" });
        }

        const exists = await db.collection('user_auth').findOne({ $or: [{ username }, { email }] });

        if (exists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const userProfile = await db.collection('user_auth').insertOne({ 
            username: req.body.username,
            email: req.body.email,
            password: null,
            role: 'user',
            active: false
        });       

        if (!userProfile.acknowledged) {
            return res.status(500).send();
        }

        const token = v4();

        await db.collection('token').insertOne({
            emailToken: token,
            emailTokenExpiresAt: new Date(Date.now() + (1000 * 60 * 60)),
            user_id: userProfile.insertedId,
        });
        
        console.log(`Activation link: http://localhost:1234/activate/${token}`);

        res.status(201).json({ message: "User created. Check console for activation link." });

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:token', async (req, res) => {
    const db = req.app.get('db');
    const token = await db.collection('token').findOne({ emailToken: req.params.token });

    if (!token) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

    return res.status(200).json({ message: "Token valid" });
})

//Aktivierung
router.put('/:token', async (req, res) => {
    try {
        const db = req.app.get('db');
        const password = req.body.password;

        if (!password) {
            return res.status(400).json({ error: "Password required"});
        }

        const token = await db.collection('token').findOne({ 
            emailToken: req.params.token 
        });
        
        if (!token) {
            return res.status(400).json({ error: "Invalid or expired token"});
        }
        console.log("Token user_id:", token.user_id)

        const hashedPW = await bcrypt.hash(password, 10);

        //PW setzen und Profil verbinden
        const authUser = await db.collection('user_auth').findOne(
            { _id: new ObjectId(token.user_id) }
        );

        if (!authUser) {
            return res.status(400).json({ error: "Auth user not found"});
        }
        
/*
        if (updated.modifiedCount !== 1) {
            return res.status(500).json({ error: "Could not update user_auth"});
        } 
*/      
        const profileInsert = await db.collection('user').insertOne({ 
            user_auth_id: authUser._id,
            avatar: null,
            totalPoints: 0,
            unlocked: []
        });
        
        //Create User Profile 
        await db.collection('user_auth').updateOne(
            { _id: authUser._id },
            {
                $set: {
                    password: hashedPW,
                    active: true,
                    userId: profileInsert.insertedId
                }
            }
        );

        //Token löschen
        await db.collection('token').deleteOne({ emailToken: req.params.token });
        return res.status(200).json({ message: "Account activated. You can now log in."});

        } catch (err) {
            console.error(err);
            res.status(500).send();
    }
});

export default router
