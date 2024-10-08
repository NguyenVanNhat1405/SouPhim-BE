const express = require('express');
const router = express.Router();
const { addWatchHistory, getWatchHistory } = require('../Controllers/history.controller');
const authMiddleware = require('../Middleware/authMiddleware');


router.get('/get', authMiddleware, getWatchHistory); 
router.post('/add', authMiddleware, addWatchHistory);
module.exports = router;