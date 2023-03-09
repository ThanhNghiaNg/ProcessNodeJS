import classes from "./SearchForm.module.css";
import React, { useContext, useRef } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import useHttp from "../../hooks/use-http";
import { hostURL } from "../../utils/config";
import Filters from "./Filters";

const SearchForm = (props) => {
  const globalContext = useContext(GlobalContext); // use Global context
  const queryRef = useRef(); // State to store user query
  const { error, sendRequest: getSearchResult } = useHttp();
  const filterRef = useRef(null);

  // Function to set Search result in Search.jsx
  const setSearchResultHandler = (data) => {
    props.onSetResult(data.results);
  };

  // Reset input state from filters
  const resetHandler = () => {
    filterRef.current.resetFilters();
  };
  // Function to handle user clicked search button
  const searchtHandler = (event) => {
    event.preventDefault(); // Prevent reload page when form submited
    // const urlSearch = `${globalContext.baseUrl}/search/movie?api_key=${globalContext.API_KEY}&language=en-US&query=${queryRef.current.value}&page=1&include_adult=false`; // url search base on user query
    const urlSearch = `${hostURL}/api/movies/search`;
    const { genre, mediaType, language, year } =
      filterRef.current.getFilterValues();
    // Fetch data from url
    getSearchResult(
      {
        url: urlSearch,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { keyword: queryRef.current.value, genre, mediaType, language, year},
      },
      setSearchResultHandler
    );
    // set state isTouch to true to confirm that user clicked Search button
    props.onClickedSearch(true);
  };
  return (
    <form className={classes.form} onSubmit={searchtHandler}>
      <div className={classes["input-controls"]}>
        <input type="text" ref={queryRef}></input>
        <button>
          <svg
            className={`svg-inline--fa fa-search fa-w-16 ${classes["search-icon"]}`}
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </button>
      </div>
      <hr></hr>
      <Filters ref={filterRef} />
      <div className={classes["action-controls"]}>
        <button type="reset" onClick={resetHandler}>
          Reset
        </button>
        <button type="submit" className={classes["high-light"]}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
