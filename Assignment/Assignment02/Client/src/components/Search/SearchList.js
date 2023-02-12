import { useContext } from "react";
import BookingContext from "../../store/BookingContext";
import "./SearchList.css";
import SearchItem from "./SearchListItem";

const SearchList = (props) => {
  const bookingCtx = useContext(BookingContext);
  
  const dataSearch = bookingCtx.data;
  let contentSearchList = <p>Please fill out what kind of Hotel you want!</p>;

  if (dataSearch && dataSearch.length > 0) {
    contentSearchList = dataSearch.map((hotel) => {
      return <SearchItem key={hotel.name} data={hotel} />;
    });
  } else if (dataSearch && dataSearch.length === 0) {
    contentSearchList = <p>No results found</p>;
  }
  return <div className="search-list">{contentSearchList}</div>;
};

export default SearchList;
