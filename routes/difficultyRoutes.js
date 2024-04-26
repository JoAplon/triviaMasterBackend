const express = require('express');
const router = express.Router();


router.get('/difficulty', auth, async (req, res) => {
    try {
        const defaultDifficulty = 'Easy';
        res.json({difficultyLevel: defaultDifficulty });
    } catch (error) {
        console.log('Error saving difficulty.');
        res.status(500).send('Server Error')
    }
}); 

router.put('difficulty', async (req, res) => {
    const { difficultyLevel } = req.body;
    try {
        res.json({ message: 'Difficulty updated successfully!', difficultyLevel });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;