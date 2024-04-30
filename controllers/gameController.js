// controllers/gameController.js
const Game = require('../models/Game');

// Example controller function to fetch game data
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add other controller functions as needed for CRUD operations
