const Movie = require("../models/Movies");
const Video = require("../models/Videos");
const Genre = require("../models/Genres");
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
  // Get genre name by genre id
  const genreName = Genre.all().filter(
    (genre) => genre.id === Number(genreId)
  )[0];
  // return error message when user do not pass a genre param
  if (!genreId) {
    return res.status(400).send({ message: "Not found gerne param" });
  }
  // return error message when user pass an invalid genre id param
  if (!genreName) {
    return res.status(400).send({ message: "Not found that gerne id" });
  }
  const page = req.params.page ? Number(req.params.page) : 1; // default page is 1 if do not defined
  // get all movies include genre id
  const allMovies = Movie.all().filter((movie) =>
    movie.genre_ids.includes(Number(genreId))
  );
  return res.status(200).send(getPage(page, allMovies, genreName));
};

// GET MOVIE TRAILERS
exports.postMoviesTrailer = (req, res, next) => {
  const film_id = req.body.film_id;
  // return error message if not found film_id parram
  if (!film_id) {
    return res.status(400).send({ message: "Not found film_id parram" });
  }
  // Get video information matched with film_id
  const video = Video.all().filter((v) => v.id === Number(film_id))[0];
  if (video && video.videos.length > 0) {
    // filter official and youtube movies
    const officialYoutubeVideos = video.videos.filter(
      (v) => v.site === "YouTube" && v.official === true
    );
    // get all trailers sorted by publish date desceding
    const trailers = officialYoutubeVideos
      .filter((v) => v.type === "Trailer")
      .sort((v1, v2) => (v1.published_at > v2.published_at ? -1 : 1));
    // get all teasers sorted by publish date desceding
    const teasers = officialYoutubeVideos
      .filter((v) => v.type === "Teaser")
      .sort((v1, v2) => (v1.published_at > v2.published_at ? -1 : 1));

    // return error message when do not find any trailer or teaser
    if (trailers.length === 0 && teasers.length === 0) {
      return res.status(404).send({ message: "Not found video" });
    }
    // return the latest trailer
    if (trailers.length > 0) {
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
  const page = req.params.page ? req.params.page : 1; // set default page is 1 if page param undefined
  const keyword = req.body.keyword;
  const { genre, mediaType, language, year } = req.body;
  // return error message when user do not pass keyword param (undefined not empty string '')
  if (!keyword && keyword !== "") {
    return res.status(400).send({ message: "Not found keyword parram" });
  }
  const allMovies = Movie.all();
  const genres = Genre.all();
  const result = allMovies.filter((movie) => {
    // check if genres of movies is matched with genre param
    const isMatchedGenre = genre
      ? movie.genre_ids.includes(
          // get id mached with genre name param
          genres.filter((g) => g.name.toLowerCase() === genre.toLowerCase())[0]
            .id
        )
      : true;
    // check if media type of movies is matched with mediaType param
    const isMatchedMediaType = mediaType
      ? movie.media_type === mediaType
      : true;
    // check if language of movies is matched with language param
    const isMatchedLanguage = language
      ? movie.original_language === language
      : true;
    // Check if release year of movie matched with year param
    const isMatchedYear = year
      ? movie.release_date && movie.release_date.includes(year)
      : true;
    // Check if movie overview and title include keyword param
    const isIncludeKeyword =
      (movie.overview &&
        movie.overview.toLowerCase().includes(keyword.toLowerCase())) ||
      (movie.title &&
        movie.title.toLowerCase().includes(keyword.toLowerCase()));

    return (
      isIncludeKeyword &&
      isMatchedGenre &&
      isMatchedMediaType &&
      isMatchedLanguage &&
      isMatchedYear
    );
  });
  res.status(200).send(getPage(page, result));
};
