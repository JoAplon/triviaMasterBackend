const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboard');
const User = require('../models/User');


  // Route to fetch leaderboard data for a specific difficulty level
router.get('/:difficulty', async (req, res) => {
    const { difficulty } = req.params;
    try {
      // Fetch leaderboard data for the specified difficulty level
      const leaderboard = await Leaderboard.find({ difficulty })
        .sort({ score: -1 }) // Sort scores in descending order
        .limit(10); // Limit to top 10 scores
      res.json(leaderboard);
    } catch (error) {
      console.error(`Error fetching ${difficulty} leaderboard:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Route to save a user's score to the leaderboard
  router.post('/save-score', async (req, res) => {
    const { username, score, difficulty } = req.body;
    try {
      // Check if the user already has a score in the leaderboard
      let userScore = await Leaderboard.findOne({ username, difficulty });
      if (!userScore) {
        // If the user doesn't have a score, create a new entry
        userScore = new Leaderboard({ username, score, difficulty });
      } else {
        // If the user already has a score, update the existing entry
        userScore.score = Math.max(userScore.score, score); // Update score if current score is higher
      }
      await userScore.save();
      res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
      console.error('Error saving user score:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Route to fetch a user's position in the leaderboard
  router.get('/user-position/:username', async (req, res) => {
    const { username } = req.params;
    try {
      // Find the user's score in the leaderboard
      const userScore = await Leaderboard.findOne({ username });
      if (!userScore) {
        res.status(404).json({ message: 'User not found in leaderboard' });
      } else {
        // Find the user's rank by counting the number of scores higher than the user's score
        const userRank = await Leaderboard.countDocuments({ difficulty: userScore.difficulty, score: { $gt: userScore.score } }) + 1;
        res.json({ position: userRank, score: userScore.score });
      }
    } catch (error) {
      console.error('Error fetching user position:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;


