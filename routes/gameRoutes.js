const express = require('express');
const Game = require('../models/Game');
const axios = require('axios');
const router = express.Router();
const { getTriviaQuestions } = require('../utils/triviaAPI');
const User = require('../models/User');
const auth = require('../utils/authMiddleware');

// Add routes for starting a game, fetching questions from the API, and saving game results

// Example route to save a game to a user's profile
router.post('/games', auth, async (req, res) => {
    
    try {
        const userId = req.user._id;
        // Save the game data to the database, associating it with the user's ID
        const games = await Game.find({ userId });

        res.status(201).json(games);
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Route to save game results
router.post('/results', async (req, res) => {
    try {
        const { userId, category, difficulty, questions } = req.body;
        console.log(req.body);

        const categories = await triviaAPI.getTriviaCategories();

        // Find category name by category ID
        const categoryName = categories[category] || 'Unknown Category';


        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newGame = await Game.create({ user_id: userId, category, difficulty, questions });

        user.games.push(newGame._id);
        await user.save();

        res.status(201).json({ message: 'Game results saved successfully', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game results:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
