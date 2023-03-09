export const serverURL = "http://localhost:5000";
export const convertDateToStr = (date) => {
  return date.toLocaleDateString("en-GB");
};

export const stringCut = (str, maxLength) => {
  if (!str) return "";
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};
