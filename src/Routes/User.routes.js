const express = require('express');
const { register, login } = require('../Controllers/user.controllers');
const router = express.Router();
require('dotenv').config();
// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);
// Lấy danh sách yêu thích của người dùng


module.exports = router;
