// utils/movieSaver.js
const Movie = require('../Models/movie.model');

async function saveMovieToAllCollections(movieData, trailer, MovieModel) {
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
        await mainMovie.save();
    }
}

module.exports = saveMovieToAllCollections;
