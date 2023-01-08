const express = require("express")
const route = express.Router()
const movieControllers = require('../controllers/movie')

// Get trending movies 
route.get("/trending", movieControllers.getMoviesTrending);
route.get("/trending/:page", movieControllers.getMoviesTrending);

// Get top rated movies 
route.get("/top-rate", movieControllers.getMoviesTopRated);
route.get("/top-rate/:page", movieControllers.getMoviesTopRated);

// Get movies by genre
route.get("/discover", movieControllers.getMoviesByGenre);
route.get("/discover/:genre", movieControllers.getMoviesByGenre);
route.get("/discover/:genre/:page", movieControllers.getMoviesByGenre);

// Get movie trailers
route.get("/video", movieControllers.getMoviesTrailer);
route.get("/video/:film_id", movieControllers.getMoviesTrailer);



module.exports = route