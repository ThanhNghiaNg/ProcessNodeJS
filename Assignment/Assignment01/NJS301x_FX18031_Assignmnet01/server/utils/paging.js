const Genre = require("../models/Genres");
const RESULT_PER_PAGE = 20; // defline movies per page

// Get result by page
exports.getPage = (page_, allResult, genre) => {
  const page = page_ - 1; // count page from 0
  const total_pages = Math.ceil(allResult.length / RESULT_PER_PAGE);
  const result = {
    results: allResult.slice(page * 20, page * 20 + 20),
    page: page + 1,
    total_pages: total_pages,
  };
  // Return result with genre name when have name
  if (genre) {
    return {
      ...result,
      genre_name: genre,
    };
  }
  // Return result
  return result;
};

// // Get result by page
// exports.getPage = (page_, allResult) => {
//   const page = page_ - 1; // count page from 0
//   const total_pages = Math.ceil(allResult.length / RESULT_PER_PAGE);
//   const result = allResult.slice(page * 20, page * 20 + 20);
//   console.log(allResult.length, page * 20, page * 20 + 20);
//   return {
//     results: [...result],
//     page: page + 1,
//     total_pages: total_pages,
//   };
// };

// // Get result by page and genre
// exports.getPageGenre = (page, allResult, genreId) => {
//   const pageResult = this.getPage(page, allResult);
//   const genre = Genre.all().filter((genre) => genre.id === Number(genreId))[0];
//   return {
//     ...pageResult,
//     genre_name: genre.name,
//   };
// };
