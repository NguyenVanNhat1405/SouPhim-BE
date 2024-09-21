// movieRoutes.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

const API_KEY = process.env.MOVIE_DB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

router.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie data:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch movie data',
      message: error.response?.data?.status_message || error.message
    });
  }
});

module.exports = router;
