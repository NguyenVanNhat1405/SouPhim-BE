// models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  movieId: { type: String, required: true },
  username: { type: String, required: true },
  name: {type: String, required: true},
  rating: { type: Number, required: true, min: 1, max: 10 },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);
