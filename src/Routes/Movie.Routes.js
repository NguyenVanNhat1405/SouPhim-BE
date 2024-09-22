const express = require('express');
const movieController = require('../Controllers/movie.controller'); // Đảm bảo đường dẫn đúng đến controller
const router = express.Router();

// Route để lấy tất cả phim
router.get('/', movieController.getAllMovies); // Route này sẽ gọi phương thức getAllMovies

// Route để lấy thông tin phim và diễn viên theo ID phim
router.get('/:movieId', movieController.getMovie); // Route này sẽ gọi phương thức getMovie với movieId

module.exports = router; // Xuất router để sử dụng trong app chính
