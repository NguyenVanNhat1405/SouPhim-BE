const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.cookies['x-auth-token']; // Lấy token từ cookie

  // Kiểm tra nếu không có token
  if (!token) {
      return res.status(401).json({ msg: 'Không có token, quyền truy cập bị từ chối' });
  }

  try {
      // Xác minh token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};

