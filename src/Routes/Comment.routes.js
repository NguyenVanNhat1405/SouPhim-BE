// routes/commentRoutes.js
const express = require('express');
const { getComments, addComment, deleteComment, editComment } = require('../Controllers/comment.controller');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
// const adminAuth = require('../Middleware/adminMiddleware');
// Route to get comments for a movie
router.get('/get', getComments);

// Route to add a new comment
router.post('/add', authMiddleware, addComment);

// Route to delete a comment
router.delete('/delete/:id',authMiddleware, deleteComment);
router.delete('/admin/delete/:id', deleteComment);
// Route to edit a comment
router.put('/edit/:id',authMiddleware, editComment);

module.exports = router;
