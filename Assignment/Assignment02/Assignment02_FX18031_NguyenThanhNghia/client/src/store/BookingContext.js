import React from "react";
const BookingContext = React.createContext({
  location: "",
  dateRange: {},
  roomInfo: {},
  data: null,
  book: (location, dateRange, room) => {},
  clear: () => {},
  setData: (data) => {},
});

export default BookingContext;
