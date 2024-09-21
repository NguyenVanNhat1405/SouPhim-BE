const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/Routes/User.routes');
const favoriteRoutes = require('./src/Routes/favorite.routes'); // Import routes yêu thích
const movieRoutes = require('./src/Routes/Movie.Routes');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());

// Đăng ký các routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Souphim' });
});

module.exports = app;
