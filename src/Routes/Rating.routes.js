// routes/ratingRoutes.js
const express = require('express');
const ratingController = require('../Controllers/rating.controller');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
// Route to add or update a rating
router.post('/',authMiddleware, ratingController.addOrUpdateRating);
router.get('/',authMiddleware, ratingController.getAllRatings);
// Route to get all ratings for a specific movie
router.get('/:userId/:movieId',authMiddleware, ratingController.getRatingsByMovie);
router.delete('/delete/:movieId',authMiddleware, ratingController.removeRating)
router.delete('/admin/delete/:id', ratingController.deleteRating)
module.exports = router;
