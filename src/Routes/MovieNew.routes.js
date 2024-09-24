const express = require('express');

const movieNewController = require('../Controllers/movieNew.controller')
const router = express.Router();


// Route để lấy phim mới
router.get('/', movieNewController.getAllMovies); 
router.get('/:movieId', movieNewController.getMovieNew); // Route để lấy phim mới

module.exports = router; // Xuất router để sử dụng trong app chính
