import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchForm from "../../components/SearchForm/SearchForm";
import ResultList from "../../components/ResultList/ResultList";
import Footer from '../../components/Footer/Footer'

const Search = () => {
  const [searchResult, setSearchResult] = useState([]); // State for storing the search result
  const [isTouched, setIsTouched] = useState(false); // State for handle if user is clicked Search button

  return (
    <div>
      <Navbar />
      <SearchForm
        onSetResult={setSearchResult}
        onClickedSearch={setIsTouched}
      />
      <ResultList movies={searchResult} isTouched={isTouched} />

      <Footer isFixed={searchResult.length === 0}></Footer>
    </div>
  );
};

export default Search;
