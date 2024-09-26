const axios = require('axios');
const Movie = require('../Models/movie.model');
const omdbApiKey = process.env.OMDB_API_KEY; // API key cho OMDb
const youtubeApiKey = process.env.YOUTUBE_API_KEY; // API key cho YouTube
const omdbBaseUrl = 'http://www.omdbapi.com';

// Hàm lấy thông tin phim từ OMDb dựa trên IMDb ID
async function fetchMovieDetailsFromOMDb(imdbID) {
    console.log('Fetching movie details for IMDb ID:', imdbID);
    const response = await axios.get(`${omdbBaseUrl}`, {
        params: {
            i: imdbID,
            apikey: omdbApiKey
        }
    });
    return response.data;
}

// Hàm tìm trailer trên YouTube
async function getTrailerFromYouTube(movieTitle) {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: `${movieTitle} trailer`,
                key: youtubeApiKey,
                type: 'video',
                maxResults: 1
            }
        });
        const videos = response.data.items;
        return videos.length > 0 ? `https://www.youtube.com/watch?v=${videos[0].id.videoId}` : null;
    } catch (error) {
        console.error('Error fetching trailer from YouTube:', error);
        return null;
    }
}

// Hàm lưu phim vào MongoDB
async function saveMovie(movieData, trailer, MovieModel) {
    const movie = new MovieModel({
        id: movieData.imdbID,
        title: movieData.Title,
        poster: movieData.Poster !== "N/A" ? movieData.Poster : "", // Kiểm tra giá trị "N/A"
        countries: movieData.Country && movieData.Country !== "N/A" ? movieData.Country.split(', ') : [],
        release_date: movieData.Released !== "N/A" ? movieData.Released : "",
        overview: movieData.Plot !== "N/A" ? movieData.Plot : "",
        genres: movieData.Genre && movieData.Genre !== "N/A" ? movieData.Genre.split(', ') : [],
        director: movieData.Director !== "N/A" ? movieData.Director : "Chưa có thông tin", // Xử lý director
        runtime: movieData.Runtime !== "N/A" ? movieData.Runtime : "",
        actors: movieData.Actors && movieData.Actors !== "N/A" ? movieData.Actors.split(', ') : [],
        trailer: trailer,
        production_companies: movieData.Production && movieData.Production !== "N/A" ? movieData.Production.split(', ') : [], // Xử lý production_companies
        award: movieData.Awards && movieData.Awards !== "N/A" ? movieData.Awards.split(', ') : [],
        writer: movieData.Writer !== "N/A" ? movieData.Writer.split(', ') : ["Chưa có thông tin"], // Xử lý writer
        seasons: movieData.Type === 'series' && movieData.totalSeasons !== "N/A" ? movieData.totalSeasons : null,
        imdbRating: movieData.imdbRating,
    });
    await movie.save();
}

// Hàm lấy thông tin phim cụ thể từ OMDb và TMDb
async function getMovie(req, res) {
    const movieId = req.params.movieId; // IMDb ID hoặc TMDb ID

    try {
        // Kiểm tra xem phim đã tồn tại trong MongoDB chưa
        let movie = await Movie.findOne({ id: movieId });
        if (!movie) {
            // Fetch movie details từ OMDb
            const movieResponse = await fetchMovieDetailsFromOMDb(movieId);

            // Kiểm tra xem có dữ liệu phim hay không
            if (movieResponse.Response === "False") {
                return res.status(404).json({ message: movieResponse.Error });
            }

            // Lấy trailer từ YouTube
            const trailer = await getTrailerFromYouTube(movieResponse.Title);

            // Lưu phim vào MongoDB
            await saveMovie(movieResponse, trailer, Movie);
            movie = await Movie.findOne({ id: movieId }); // Lấy lại phim đã lưu
        }

        // Trả về dữ liệu phim
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: error.message });
    }
}

// Hàm lấy tất cả phim từ MongoDB
async function getAllMovies(req, res) {
    try {
        const movies = await Movie.find(); // Lấy tất cả phim từ MongoDB
        res.json(movies);
    } catch (error) {
        console.error('Error fetching all movies:', error);
        res.status(500).json({ message: error.message });
    }
}

// Hàm tìm kiếm phim theo tiêu đề và diễn viên
const searchMovies = async (req, res) => {
    const query = req.query.query;
    console.log('Search Query:', query); // Log truy vấn tìm kiếm

    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Tìm theo tiêu đề
                { actors: { $regex: query, $options: 'i' } } // Tìm theo diễn viên
            ]
        });

        // Kiểm tra nếu không tìm thấy phim nào
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        res.json(movies);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMovie,
    getAllMovies,
    searchMovies
};
