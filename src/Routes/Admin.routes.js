// routes/admin.js
const express = require('express');
const router = express.Router();
const { getUsers, getComments, getMovies, getRatings } = require('../Controllers/admin.controller');

// Lấy danh sách người dùng
router.get('/users', getUsers);

// Lấy danh sách bình luận
router.get('/comments', getComments);

// Lấy danh sách phim
router.get('/movies', getMovies);

// Lấy danh sách đánh giá
router.get('/ratings', getRatings);

module.exports = router;
