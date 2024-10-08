const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Mặc định không phải admin
  },
},{ timestamps: true });

// Kiểm tra nếu model đã được định nghĩa, nếu không thì định nghĩa
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
