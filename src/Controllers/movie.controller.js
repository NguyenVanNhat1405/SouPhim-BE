const axios = require('axios');
const Movie = require('../Models/movie.model');

const omdbApiKey = process.env.OMDB_API_KEY; // API key cho OMDb
const youtubeApiKey = process.env.YOUTUBE_API_KEY; // API key cho YouTube
const baseUrl = 'http://www.omdbapi.com'; // URL của OMDb
const youtubeSearchUrl = 'https://www.googleapis.com/youtube/v3/search'; // URL cho YouTube search API

// Hàm tìm kiếm trailer trên YouTube
async function getTrailerFromYouTube(movieTitle) {
    try {
        // Tìm kiếm trailer phim trên YouTube dựa vào tên phim
        const response = await axios.get(youtubeSearchUrl, {
            params: {
                part: 'snippet',
                q: `${movieTitle} trailer`,
                key: youtubeApiKey,
                type: 'video',
                maxResults: 1
            }
        });

        const videos = response.data.items;
        if (videos && videos.length > 0) {
            const trailer = videos[0];
            return `https://www.youtube.com/watch?v=${trailer.id.videoId}`;
        } else {
            console.log('No trailers found for this movie on YouTube.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching trailer from YouTube:', error);
        return null;
    }
}

async function getMovie(req, res) {
    const movieId = req.params.movieId; // IMDb ID

    try {
        // Kiểm tra xem phim đã tồn tại trong MongoDB chưa
        let movie = await Movie.findOne({ id: movieId });
        if (!movie) {
            // Fetch movie details từ OMDb
            const movieResponse = await axios.get(`${baseUrl}`, {
                params: {
                    i: movieId,
                    apikey: omdbApiKey
                }
            });

            // Kiểm tra xem có dữ liệu phim hay không
            if (movieResponse.data.Response === "False") {
                return res.status(404).json({ message: movieResponse.data.Error });
            }

            // Lấy trailer từ YouTube
            const trailer = await getTrailerFromYouTube(movieResponse.data.Title);

            // Lưu thông tin phim vào MongoDB
            movie = new Movie({
                id: movieResponse.data.imdbID, // IMDb ID
                title: movieResponse.data.Title,
                poster: movieResponse.data.Poster,
                countries: movieResponse.data.Country.split(', '), // Tách danh sách quốc gia
                release_date: movieResponse.data.Released,
                overview: movieResponse.data.Plot,
                genres: movieResponse.data.Genre.split(', '), // Tách thể loại
                director: movieResponse.data.Director, // Đạo diễn
                runtime: movieResponse.data.Runtime,
                actors: movieResponse.data.Actors.split(', '), // Tách danh sách diễn viên
                trailer: trailer // Lưu trailer từ YouTube
            });

            await movie.save(); // Lưu phim vào MongoDB
        }

        // Trả về dữ liệu phim
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: error.message });
    }
}

// Hàm lấy tất cả phim
async function getAllMovies(req, res) {
    try {
        const movies = await Movie.find(); // Lấy tất cả phim từ MongoDB
        res.json(movies);
    } catch (error) {
        console.error('Error fetching all movies:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMovie,
    getAllMovies
};
