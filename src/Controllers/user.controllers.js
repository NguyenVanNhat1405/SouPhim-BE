const User = require('../Models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Đăng ký người dùng
exports.register = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Kiểm tra người dùng đã tồn tại
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Người dùng đã tồn tại' });
    }

    // Kiểm tra xem người tạo có phải là admin hay không
    const currentUser = req.user; // Giả sử bạn có token chứa thông tin người dùng
    if (isAdmin && (!currentUser || !currentUser.isAdmin)) {
      return res.status(403).json({ msg: 'Chỉ admin mới có quyền tạo tài khoản admin' });
    }

    // Tạo tài khoản người dùng mới
    user = new User({
      username,
      email,
      password,
      isAdmin: isAdmin || false, // Thiết lập isAdmin, mặc định là false
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Lỗi server' });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, // Thêm isAdmin vào payload
      },  
    };

    // Tạo token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;

      // Thiết lập cookie
      res.cookie('x-auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        path: '/', // Đảm bảo rằng cookie có thể được truy cập từ mọi đường dẫn
    });
    

      return res.status(200).json({ msg: 'Đăng nhập thành công', user: payload.user , token});
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};

// Cập nhật thông tin người dùng
exports.update = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user.user.id; // Lấy userId từ token đã giải mã

  try {
    let user = await User.findById(userId); // Tìm người dùng theo ID

    if (!user) {
      return res.status(404).json({ msg: 'Người dùng không tồn tại' });
    }

    // Nếu admin muốn cập nhật thông tin của người dùng khác
    if (req.user.user.isAdmin) {
      const targetUser = await User.findById(req.params.id); // Lấy ID người dùng từ params
      if (!targetUser) {
        return res.status(404).json({ msg: 'Người dùng không tồn tại' });
      }
      if (username) targetUser.username = username;
      if (email) targetUser.email = email;
      await targetUser.save();
      return res.json({ msg: 'Thông tin người dùng đã được cập nhật', user: targetUser });
    }

    // Cập nhật thông tin cho người dùng hiện tại
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.json({ msg: 'Thông tin người dùng đã được cập nhật', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Lỗi server' });
  }
};
// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    // Tìm người dùng dựa trên ID từ params
    const targetUser = await User.findById(req.params.id); 
    if (!targetUser) {
      return res.status(404).json({ msg: 'Người dùng không tồn tại' });
    }

    // Xóa người dùng
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Người dùng đã bị xóa' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Lỗi server' });
  }
};


