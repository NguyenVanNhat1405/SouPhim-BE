const User = require('../Models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Đăng ký người dùng
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Người dùng đã tồn tại' }); // Trả về JSON hợp lệ
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Lỗi server' }); // Sửa lỗi này: trả về JSON hợp lệ với thông báo lỗi
  }
};


// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log('User not found')
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username, // Thêm thông tin người dùng
        email: user.email, // Thêm thông tin người dùng
        avatar: user.avatar // Thêm thông tin avatar nếu có
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user }); // Trả về cả token và thông tin người dùng
    })    
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};

