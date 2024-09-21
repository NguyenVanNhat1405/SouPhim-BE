const Favorite = require('../Models/Favorite.model');
require('dotenv').config();

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    if (!favorites.length) {
      return res.status(404).json({ message: 'No favorites found' });
    }
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
};

const addFavorite = async (req, res) => {
  const { itemId, name, imageUrl } = req.body;

  if (!itemId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newFavorite = new Favorite({ userId: req.user.id, itemId, name, imageUrl });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding favorite' });
  }
};

const removeFavorite = async (req, res) => {
  const { itemId } = req.params;

  try {
    const favorite = await Favorite.findOneAndDelete({ userId: req.user.id, itemId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing favorite' });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
