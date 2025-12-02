import express from 'express';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const db = req.app.get('db');

        //ToDo Validate req.body (email)
        const email = req.body.email;
        const username = req.body.username;

        if (!email || !username) {
            return res.status(400).json({ error: "Email and username are required" });
        }

        const insertion = await db.collection('user').insertOne({ 
            username: req.body.username,
            email: req.body.email,
            password: null,
            role: 'user'
            
        });       
        if (insertion.acknowledged) {

            const token = v4();

            const tokenInsertion = await db.collection('token').insertOne({
                emailToken: token,
                emailTokenExpiresAt: new Date(Date.now() + (1000 * 60 * 60)),
                user_id: insertion.insertedId,
            });

            if (tokenInsertion.acknowledged) {
                console.log(`Activation link: http://localhost:1234/api/register/${token}`);

                res.status(201).send();
            } else {
                res.status(500).send();
            }
        } else {
            res.status(500).send();
        }
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put('/:token', async (req, res) => {
    try {
        const db = req.app.get('db');
        //Todo validate req.body(username, email , password)
        const {username, email, password} = req.body;

        if (!username || !email|| !password) {
            return res.status(400).json({ error: "Missing data"});
        }

        const token = await db.collection('token').findOne({ emailToken: req.params.token });
        if (token) {
            const insertion = await db.collection('user').insertOne({ 
                username: req.body.username,
                email: req.body.email,
                permission: { write: false},
            });

            //PW setzen und Profil verbinden
            if (insertion.acknowledged) {
                const updated = await db.collection('user').updateOne({ _id: token.user_id }, { $set: {
                    password: await bcrypt.hash(req.body.password, 10) ,
                    user_id: insertion.insertedId
                } });
                if (updated.modifiedCount === 1) {
                    await db.collection('token').deleteOne({ emailToken: req.params.token });

                    res.status(200).send();
                } else {
                    res.status(500).send();
                }
            } else {
                res.status(500).send();
            }
        } else {
            res.status(500).send();
        }
        } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});



export default router
