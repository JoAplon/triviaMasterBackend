// triviaAPI.js
const axios = require('axios');

exports.getTriviaQuestions = async (amount = 10, category, difficulty, type = 'multiple') => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};

exports.getTriviaCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching trivia categories:', error);
    throw error;
  }
};