const Movie = require("../models/Movies");
const Video = require("../models/Videos");
const getPage = require("../utils/paging").getPage;
const getPageGenre = require("../utils/paging").getPageGenre;

// GET TRENDING MOVIES
exports.getMoviesTrending = (req, res, next) => {
  const page = req.params.page ? Number(req.params.page) : 1;
  const allMovies = Movie.all().sort((a, b) => b.popularity - a.popularity);
  res.status(200).send(getPage(page, allMovies));
};

//  GET TOP RATED MOVIES
exports.getMoviesTopRated = (req, res, next) => {
  const page = req.params.page ? Number(req.params.page) : 1;
  const allMovies = Movie.all().sort((a, b) => b.vote_average - a.vote_average);
  res.status(200).send(getPage(page, allMovies));
};

// GET MOVIES BY GENRE
exports.getMoviesByGenre = (req, res, next) => {
  const genreId = req.params.genre;
  if (!genreId) {
    // return error message when user do not pass a genre param
    return res.status(400).send({ message: "Not found gerne param" });
  }
  const page = req.params.page ? Number(req.params.page) : 1;
  const allMovies = Movie.all().filter((movie) =>
    movie.genre_ids.includes(Number(genreId))
  );
  // return error message do not find movies matched with the genre param
  if (allMovies.length === 0) {
    return res.status(400).send({ message: "Not found that gerne id" });
  }
  return res.status(200).send(getPageGenre(page, allMovies, genreId));
};

// GET MOVIE TRAILERS
exports.postMoviesTrailer = (req, res, next) => {
  const film_id = req.body.film_id;
  if (!film_id) {
    return res.status(400).send({ message: "Not found film_id parram" });
  }
  // Get video information matched with film_id
  const video = Video.all().filter((v) => v.id === Number(film_id))[0];
  if (video && video.videos.length > 0) {
    const officialYoutubeVideos = video.videos.filter(
      (v) => v.site === "YouTube" && v.official === true
    );
    const trailers = officialYoutubeVideos
      .filter((v) => v.type === "Trailer")
      .sort((v1, v2) => (v1.published_at > v2.published_at ? -1 : 1));
    const teasers = officialYoutubeVideos
      .filter((v) => v.type === "Teaser")
      .sort((v1, v2) => (v1.published_at > v2.published_at ? -1 : 1));

    if (trailers.length === 0 && teasers.length === 0) {
      // return error message when do not find any trailer or teaser
      return res.status(404).send({ message: "Not found video" });
    }

    if (trailers.length > 0) {
      // return the latest trailer
      return res
        .status(200)
        .send({ id: Number(film_id), results: [trailers[0]] });
    }

    // return the latest teaser if do not exist any official youtube trailer
    if (teasers.length > 0) {
      return res
        .status(200)
        .send({ id: Number(film_id), results: [teasers[0]] });
    }
  } else {
    // return error message when do not find any official youtube trailer or teaser
    return res.status(404).send({ message: "Not found video" });
  }
};

exports.postSearchMovies = (req, res, next) => {
  const keyword = req.body.keyword;
  const page = req.params.page? req.params.page : 1;
  const allMovies = Movie.all();
  const result = allMovies.filter(
    (movie) =>
      {
        return (movie.overview && movie.overview.toLowerCase().includes(keyword.toLowerCase())) ||
        (movie.title && movie.title.toLowerCase().includes(keyword.toLowerCase()))
      }
  );
  res.status(200).send(getPage(page, result));
};
