import express from 'express'
import questions from '../api/questions.js'

const router = express.Router();

router.get('/', (req, res) => {
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