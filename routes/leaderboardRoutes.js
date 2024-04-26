const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboard');

router.get('/easy', async (req, res) => {
    try {
      // Fetch leaderboard data for easy difficulty
      const easyLeaderboard = await Leaderboard.find({ difficulty: 'easy' })
        .sort({ score: -1 }) // Sort scores in descending order
        .limit(10); 
      res.json(easyLeaderboard);
    } catch (error) {
      console.error('Error fetching easy leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/medium', async (req, res) => {
    try {
      // Fetch leaderboard data for medium difficulty
      const mediumLeaderboard = await Leaderboard.find({ difficulty: 'medium' })
        .sort({ score: -1 })
        .limit(10);
      res.json(mediumLeaderboard);
    } catch (error) {
      console.error('Error fetching medium leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/hard', async (req, res) => {
    try {
      // Fetch leaderboard data for hard difficulty
      const hardLeaderboard = await Leaderboard.find({ difficulty: 'hard' })
        .sort({ score: -1 })
        .limit(10);
      res.json(hardLeaderboard);
    } catch (error) {
      console.error('Error fetching hard leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;


