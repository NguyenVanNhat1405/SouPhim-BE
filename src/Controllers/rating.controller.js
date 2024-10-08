// controllers/ratingController.js
const Rating = require('../Models/rating.model');
require('dotenv').config();
// Add or update a rating
const addOrUpdateRating = async (req, res) => {
  const { imageUrl,name, movieId, rating,username } = req.body;
  const userId = req.user.user.id;
  try {
    // Check if the user already rated the movie
    let existingRating = await Rating.findOne({ movieId, userId });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json({ message: 'Rating updated successfully', rating: existingRating });
    }

    // Create a new rating
    const newRating = new Rating({ movieId, name, imageUrl, userId, rating,username });
    await newRating.save();
    res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add or update rating', details: error.message });
  }
};

// Get ratings for a movie
const getRatingsByMovie = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.user.id;
  
  try {
    // Tìm rating chỉ dựa vào movieId và userId
    const rating = await Rating.findOne({ movieId, userId });
    
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: 'Rating not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({userId: req.user.user.id}); // Fetch all ratings from the database
    res.status(200).json(ratings); // Return the list of ratings
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
const removeRating = async (req, res) => {
  const { movieId } = req.params;

  try {
    const rating = await Rating.findOneAndDelete({ userId: req.user.user.id, movieId });
    if (!rating) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Rating removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing rating' });
  }
};
const deleteRating = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm và xóa rating dựa trên ID
    const rating = await Rating.findByIdAndDelete(id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json({ message: 'Rating removed successfully' });
  } catch (error) {
    console.error(error.message); // Log lỗi để kiểm tra chi tiết
    res.status(500).json({ error: 'Error removing rating' });
  }
};

module.exports = {
  addOrUpdateRating,
  getRatingsByMovie,
  getAllRatings,
  removeRating,
  deleteRating
}