import express from 'express'
import { ObjectId } from 'mongodb'
import questions from '../api/questions.js'
import isAdmin from '../middleware/roleCheck.js'

const router = express.Router();

//Testrouten für MongoDB-Atlas

router.get('/atlas', async (req, res) => {
    try {
        const db = req.app.get('db');
        const data = await db.collection('data').find({}).toArray();

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post('/atlas', async (req, res) => {
    try{
        const db = req.app.get('db');
        const insertion = await db.collection('data').insertOne(req.body);

        if(insertion.acknowledged) {
            const data = await db.collection('data')
                .findOne({ _id: insertion.insertedId });
            
            if (data) {
                res.status(201).json(data);
            } else {
                res.status(404).send();
            }
        } else {
            res.status(500).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//geschützte admin route
router.get('/', isAdmin, (req, res) => {
    res.json(questions)
})

router.get('/:amount/:difficulty', (req, res) => {
    res.send(req.params.amount + ", " + req.params.difficulty)
    //todo 
    //get random questions from questions array
    //return them 
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    const question = questions.find(q => q.id == req.params.id)
    if (question) {
        res.json(question)
    } else {
        res.status(404).send("Question not found")
    }
})

export default router