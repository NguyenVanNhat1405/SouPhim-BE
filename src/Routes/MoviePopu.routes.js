const express = require('express');

const moviePopuController = require('../Controllers/moviePopu.controller') // Đảm bảo đường dẫn đúng đến controller
const router = express.Router();


// Route để lấy phim phổ biến
router.get('/', moviePopuController.getAllMovies);
router.get('/:movieId', moviePopuController.getMoviePopu); // Route để lấy phim phổ biến


module.exports = router; // Xuất router để sử dụng trong app chính
