const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String },
    correct_answer: { type: String },
    difficulty: { type: String },
    incorrect_answers: [{ type: String }],
    question: { type: String },
    type: { type: String },
})

const GameSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    category: {type: String},
    difficulty: {type: String},
    questions: [ QuestionSchema ]
});

module.exports = mongoose.model('Game', GameSchema);