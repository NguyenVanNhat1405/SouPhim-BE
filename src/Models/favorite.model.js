const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
