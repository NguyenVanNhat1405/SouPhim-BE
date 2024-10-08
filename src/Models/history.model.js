const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  movieId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  watchedAt: { type: Date, default: Date.now }
});

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);
module.exports = WatchHistory;
