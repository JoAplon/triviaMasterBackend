const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    category: String,
    difficulty: String,
    questions: [{
        question_id: String,
        user_answer: String,
        correct_answer: String,
        order: Number,
        result: String
    }]
});

module.exports = mongoose.model('Game', GameSchema);