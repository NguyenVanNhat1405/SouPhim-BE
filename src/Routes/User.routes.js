const express = require('express');
const { register, login, update } = require('../Controllers/user.controllers');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
require('dotenv').config();
// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);
// Lấy danh sách yêu thích của người dùng
router.post('/update', authMiddleware, update);

module.exports = router;
