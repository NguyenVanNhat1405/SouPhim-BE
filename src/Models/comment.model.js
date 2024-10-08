// Models/comment.model.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // title: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

module.exports = mongoose.model('Comment', commentSchema);
