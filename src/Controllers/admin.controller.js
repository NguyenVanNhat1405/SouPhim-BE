// controllers/adminController.js
const User = require('../Models/User.model'); // Model người dùng
const Comment = require('../Models/comment.model'); // Model bình luận
const Movie = require('../Models/movie.model'); // Model phim
const Rating = require('../Models/rating.model'); // Model đánh giá

// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách bình luận
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách phim
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách đánh giá
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
