const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/Routes/User.routes');
const favoriteRoutes = require('./src/Routes/favorite.routes'); // Import routes yêu thích
const movieRoutes = require('./src/Routes/Movie.Routes');
const movieNewRoutes = require('./src/Routes/MovieNew.routes');
const moviePopuRoutes = require('./src/Routes/MoviePopu.routes');
const commentRoutes = require('./src/Routes/Comment.routes');
const ratingRoutes = require('./src/Routes/Rating.routes');
const historyRoutes = require('./src/Routes/History.routes');
const adminRoutes = require('./src/Routes/Admin.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Cho phép yêu cầu từ miền này
    } else {
      callback(new Error('Not allowed by CORS')); // Không cho phép yêu cầu từ miền khác
    }
  },
  credentials: true, // Cho phép cookie được gửi
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Đăng ký các routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/new', movieNewRoutes);
app.use('/api/popular', moviePopuRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Souphim' });
});

module.exports = app;
