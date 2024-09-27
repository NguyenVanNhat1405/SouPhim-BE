const express = require('express');
const movieController = require('../Controllers/movie.controller');
 
const router = express.Router();

// Route để lấy tất cả phim
router.get('/get', movieController.getAllMovies); // Route này sẽ gọi phương thức getAllMovies

// Route để lấy thông tin phim theo ID phim
router.get('/add/:movieId', movieController.getMovie); // Route này sẽ gọi phương thức getMovie với movieId
router.get('/search', movieController.searchMovies);
// Route để lấy phim phổ biến
router.get('/recommendations/:movieId', movieController.getRecommendations);
module.exports = router; // Xuất router để sử dụng trong app chính
