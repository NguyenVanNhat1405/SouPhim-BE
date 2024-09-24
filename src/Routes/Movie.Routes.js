const express = require('express');
const movieController = require('../Controllers/movie.controller');
 
const router = express.Router();

// Route để lấy tất cả phim
router.get('/', movieController.getAllMovies); // Route này sẽ gọi phương thức getAllMovies

// Route để lấy thông tin phim theo ID phim
router.get('/:movieId', movieController.getMovie); // Route này sẽ gọi phương thức getMovie với movieId

// Route để lấy phim phổ biến

module.exports = router; // Xuất router để sử dụng trong app chính
