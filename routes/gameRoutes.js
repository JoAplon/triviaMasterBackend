const express = require('express');
const Game = require('../models/Game');
const axios = require('axios');
const router = express.Router();
const { getTriviaQuestions } = require('../utils/triviaAPI'); 

// Add routes for starting a game, fetching questions from the API, and saving game results

// Route to start a new game
router.post('/start', async (req, res) => {
    try {
      // Logic to start a new game, initialize game state, etc.
      // You may need to create a new game document in your database
      // and return the ID of the newly created game to the client
      res.status(200).json({ message: 'Game started successfully' });
    } catch (error) {
      console.error('Error starting a new game:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.get('/questions', async (req, res) => {
    try{
        const quesitons = await getTriviaQuesitons();
        res.json(questions);
    } catch (error) {
        res.status(500),json({message: 'Internal Server Error'});
    }
});

// Route to save game results
router.post('/results', async (req, res) => {
    try {
      const { userId, category, difficulty, questions } = req.body;
      // Logic to save game results to your database
      // You can use the data provided in the request body
      // to create a new Game document in your MongoDB collection
      const newGame = await Game.create({ userId, category, difficulty, questions });
      res.status(201).json({ message: 'Game results saved successfully', gameId: newGame._id });
    } catch (error) {
      console.error('Error saving game results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
