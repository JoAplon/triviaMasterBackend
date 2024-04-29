// controllers/leaderboardController.js
const Leaderboard = require('../models/leaderboard');

// Controller function to fetch leaderboard data for a specific difficulty level
exports.getLeaderboard = async (req, res) => {
  const { difficulty } = req.params;
  try {
    const leaderboard = await Leaderboard.find({ difficulty })
      .sort({ score: -1 })
      .limit(10);
    res.json(leaderboard);
  } catch (error) {
    console.error(`Error fetching ${difficulty} leaderboard:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add other controller functions as needed for CRUD operations related to leaderboard
