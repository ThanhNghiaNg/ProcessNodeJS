exports.convertStrToDate = (dateStr, sep) => {
  return new Date(dateStr.split(sep).reverse().join("-"));
};
