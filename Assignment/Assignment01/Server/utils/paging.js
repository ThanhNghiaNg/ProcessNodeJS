const Genre = require("../models/Genres");
const RESULT_PER_PAGE = 20;
exports.getPage = (page, allResult) => {
  const total_pages = Math.floor(allResult.length / RESULT_PER_PAGE);
  const result = allResult.slice(page * 20, page * 20 + 20);
  return {
    results: [...result],
    page,
    total_pages: total_pages,
  };
};

exports.getPageGenre = (page, allResult, genreId) => {
  const pageResult = this.getPage(page, allResult);
  const genre = Genre.all().filter((genre) => genre.id === Number(genreId))[0];
  return {
    ...pageResult,
    genre_name: genre.name,
  };
};
