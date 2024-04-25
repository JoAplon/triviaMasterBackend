// triviaAPI.js
const axios = require('axios');

exports.getTriviaQuestions = async (amount = 10, category = 9, difficulty = 'easy', type = 'multiple') => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};
