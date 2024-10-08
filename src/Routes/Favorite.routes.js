const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../Controllers/favorite.controller');
const authMiddleware = require('../Middleware/authMiddleware');

// Đảm bảo rằng các tham số truyền vào là các hàm callback hợp lệ
router.get('/get', authMiddleware, getFavorites);  // Fetch favorites for authenticated user
router.post('/add', authMiddleware, addFavorite);  // Add a new favorite
router.delete('/delete/:movieId', authMiddleware, removeFavorite);  // Remove a favorite

module.exports = router;
