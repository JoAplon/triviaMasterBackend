const express = require('express');
const Game = require('../models/Game');
const axios = require('axios');
const router = express.Router();
const { getTriviaQuestions } = require('../utils/triviaAPI');
const User = require('../models/User');
const auth = require('../utils/authMiddleware');

// Add routes for starting a game, fetching questions from the API, and saving game results

// Example route to save a game to a user's profile
router.post('/save-game', auth, async (req, res) => {
    const userId = req.user.id; // Get user ID from authentication middleware
    const { questions, difficulty, category } = req.body; // Extract game data from request body

    try {
        // Save the game data to the database, associating it with the user's ID
        const game = new Game({
            userId,
            questions,
            difficulty,
            category
        });

        await game.save();

        res.status(201).json({ message: 'Game saved successfully' });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to start a new game
router.post('/start', async (req, res) => {
    try {
        const { userId, category, difficulty } = req.body;
        console.log('Received request to start a new game:');


        const newGame = await Game.create({
            userId,
            category,
            difficulty,
            startTime: Date.now(),
            score: 0,
        });

        res.status(200).json({ message: 'Game started successfully', gameId: newGame._id });
    } catch (error) {
        console.error('Error starting a new game:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/questions', async (req, res) => {
    try {
        const questions = await getTriviaQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500), json({ message: 'Internal Server Error' });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await getTriviaCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to save game results
router.post('/results', async (req, res) => {
    try {
        const { userId, category, difficulty, questions } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newGame = await Game.create({ userId, category, difficulty, questions });

        user.games.push(newGame._id);
        await user.save();

        res.status(201).json({ message: 'Game results saved successfully', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game results:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
