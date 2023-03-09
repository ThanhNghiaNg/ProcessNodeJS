const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/is_auth");
const movieControllers = require("../controllers/movie");

// Get trending movies
route.get("/trending/:page?", isAuth, movieControllers.getMoviesTrending);

// Get top rated movies
route.get("/top-rate/:page?", isAuth, movieControllers.getMoviesTopRated);

// Get movies by genre
route.get("/discover/:genre?/:page?", isAuth, movieControllers.getMoviesByGenre);

// Get movie trailers
route.post("/video", isAuth, movieControllers.postMoviesTrailer);

// Get movies by query and params
route.post("/search", isAuth, movieControllers.postSearchMovies);

// Export route
module.exports = route;
