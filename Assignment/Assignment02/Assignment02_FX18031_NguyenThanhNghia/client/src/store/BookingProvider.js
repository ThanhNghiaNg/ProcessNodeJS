import { useReducer } from "react";
import BookingContext from "./BookingContext";
export const BOOK = "BOOK";
export const CLEAR = "CLEAR";
export const SET_DATA = "SET_DATA";

const initState = {
  location: "",
  dateRange: { endDate: null, startDate: null, ranges: null },
  roomInfo: { adult: 0, children: 0, room: 0 },
  data: null,
};
const BookingReducer = (state, action) => {
  if (action.type === BOOK) {
    return {
      ...state,
      location: action.location,
      dateRange: action.dateRange,
      roomInfo: action.roomInfo,
    };
  }
  if (action.type === SET_DATA) {
    return {
      ...state,
      data: [...action.data],
    };
  }
  if (action.type === CLEAR) {
    return { ...initState };
  }
  return { ...state };
};

function BookingProvider(props) {
  const [booking, dispatch] = useReducer(BookingReducer, initState);
  const bookingHandler = (location, dateRange, roomInfo) => {
    dispatch({ type: BOOK, location, dateRange, roomInfo });
  };
  const setDataHandler = (data) => {
    dispatch({ type: SET_DATA, data });
  };
  const clearBookingHandler = () => {
    dispatch({ type: CLEAR });
  };
  const value = {
    location: booking.location,
    dateRange: booking.dateRange,
    roomInfo: booking.roomInfo,
    data: booking.data,
    book: bookingHandler,
    clear: clearBookingHandler,
    setData: setDataHandler,
  };

  return (
    <BookingContext.Provider value={value}>
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;
