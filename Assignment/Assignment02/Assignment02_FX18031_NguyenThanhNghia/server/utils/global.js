exports.convertStrToDate = (dateStr, sep) => {
  return new Date(dateStr.split(sep).reverse().join("-"));
};

exports.getPageResult = (array, page, resultPerPage) => {
  return {
    page: page,
    result: array.slice(resultPerPage * (page - 1), resultPerPage * page),
    resultPerPage,
    totalResult: array.length,
    maxPage: Math.ceil(array.length / resultPerPage),
  };
};
