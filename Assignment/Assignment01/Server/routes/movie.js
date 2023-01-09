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
route.post("/video", movieControllers.postMoviesTrailer);

// Get movies by query and params
route.post('/search', movieControllers.postSearchMovies)

// Export route
module.exports = route