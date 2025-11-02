import express from 'express';
import questions from '../api/questions.js';

const router = express.Router();

//Scores
let highScores = [
    { username: "Anna", points: 3200 },
    { username: "Lukas", points: 2800 },
    { username: "Maya", points: 1600 }
];

router.get('/highscores/all', (req, res) => {
    res.json(highScores);
});

router.post('/highscores', (req, res) => {
    const { username, points } = req.body;

    if (!username || typeof points !== "number") {
        return res.status(400).json({ error: "Invalid data" });
    }

    highScores.push({ username, points });

    highScores.sort((a, b) => b.points - a.points);

    highScores = highScores.slice(0, 10);

    console.log("New highscore received:", { username, points });
    res.status(201).json({ message: "Highscore saved!" });
});

//Questions
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