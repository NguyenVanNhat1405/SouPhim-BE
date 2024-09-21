const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../Controllers/favorite.controller');
const authMiddleware = require('../Middleware/authMiddleware');

// Đảm bảo rằng các tham số truyền vào là các hàm callback hợp lệ
router.get('/', authMiddleware, getFavorites);  // Fetch favorites for authenticated user
router.post('/', authMiddleware, addFavorite);  // Add a new favorite
router.delete('/:itemId', authMiddleware, removeFavorite);  // Remove a favorite

module.exports = router;
