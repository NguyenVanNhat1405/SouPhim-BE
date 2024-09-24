// utils/movieSaver.js
const Movie = require('../Models/movie.model');

async function saveMovieToAllCollections(movieData, trailer, MovieModel) {
    const movie = new MovieModel({
        id: movieData.imdbID,
        title: movieData.Title,
        poster: movieData.Poster,
        countries: movieData.Country ? movieData.Country.split(', ') : [],
        release_date: movieData.Released,
        overview: movieData.Plot,
        genres: movieData.Genre ? movieData.Genre.split(', ') : [],
        director: movieData.Director,
        runtime: movieData.Runtime,
        actors: movieData.Actors ? movieData.Actors.split(', ') : [],
        trailer: trailer
    });

    // Lưu vào model cụ thể nếu chưa tồn tại
    const existingModelMovie = await MovieModel.findOne({ id: movieData.imdbID });
    if (!existingModelMovie) {
        await movie.save();
    }

    // Kiểm tra xem phim đã tồn tại trong Movie chưa, nếu chưa thì lưu vào Movie
    const existingMainMovie = await Movie.findOne({ id: movieData.imdbID });
    if (!existingMainMovie) {
        const mainMovie = new Movie({
            id: movieData.imdbID,
            title: movieData.Title,
            poster: movieData.Poster,
            countries: movieData.Country ? movieData.Country.split(', ') : [],
            release_date: movieData.Released,
            overview: movieData.Plot,
            genres: movieData.Genre ? movieData.Genre.split(', ') : [],
            director: movieData.Director,
            runtime: movieData.Runtime,
            actors: movieData.Actors ? movieData.Actors.split(', ') : [],
            trailer: trailer
        });
        await mainMovie.save();
    }
}

module.exports = saveMovieToAllCollections;
