const express = require('express');
const Game = require('../models/Game');
const axios = require('axios');
const router = express.Router();
const { getTriviaQuestions } = require('../utils/triviaAPI'); 

// Add routes for starting a game, fetching questions from the API, and saving game results
router.get('/questions', async (req, res) => {
    try{
        const quesitons = await getTriviaQuesitons();
        res.json(questions);
    } catch (error) {
        res.status(500),json({message: 'Internal Server Error'});
    }
});

module.exports = router;
