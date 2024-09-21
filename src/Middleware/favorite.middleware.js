const express = require('express');
const router = express.Router();
const Favorite = require('../Models/Favorite.model');
const authenticateToken = require('../Middleware/authenticateToken'); // Middleware JWT

// Lấy danh sách yêu thích của người dùng
router.get('/favorites', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Lấy userId từ token đã xác thực
  
  try {
    const favorites = await Favorite.find({ userId });
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

module.exports = router;
