const mongoose = require('mongoose');

const movieNewSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Đổi từ Number thành String
    title: { type: String, required: true },
    poster: { type: String, required: true },
    countries: [String],
    release_date: { type: String },
    overview: { type: String },
    genres: [String], // Thể loại phim
    director: { type: String }, // Đạo diễn
    runtime: { type: String}, //
    actors: [String], // Đổi thành mảng để lưu danh sách diễn viên
    trailer: { type: String }, // Thêm trường cho trailer
    writer:  [String ], //
    production_companies: [String],
    award: [String ],
    seasons: {type: Number },
    episodes: { type: Number },   // Thêm trường cho trailer
    imdbRating:{type: String}, // Thêm tr
});

const MovieNew = mongoose.model('MovieNew', movieNewSchema);

module.exports = MovieNew;
