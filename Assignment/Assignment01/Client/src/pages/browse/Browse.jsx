import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";
import GlobalContext from "../../contexts/GlobalContext";
import Footer from "../../components/Footer/Footer";
import {hostURL} from '../../utils/config'

function Browse() {
  const globalContext = useContext(GlobalContext);
  return (
    <div>
      <Navbar />
      <Banner />
      <MovieList
        moviesURL={`${hostURL}/api/movies/trending`}
        caption={"Xu hướng"}
      />
      <MovieList
        moviesURL={`${globalContext.baseUrl}${globalContext.requests.fetchNetflixOriginals}`}
        caption={""}
        usePoster={true}
      />
      
      <MovieList
        moviesURL={`${hostURL}/api/movies/top-rate`}
        caption={"Xếp hạng cao"}
      />
      <MovieList
        moviesURL={`${hostURL}/api/movies/discover/28`}
        caption={"Hành Động"}
      />
      <MovieList
        moviesURL={`${hostURL}/api/movies/discover/35`}
        caption={"Hài"}
      />
      <MovieList
        moviesURL={`${hostURL}/api/movies/discover/27`}
        caption={"Kinh dị"}
      />
      <MovieList
        moviesURL={`${hostURL}/api/movies/discover/10749`}
        caption={"Lãng mạn"}
      />
      <MovieList
        moviesURL={`${hostURL}/api/movies/discover/99`}
        caption={"Tài liệu"}
      />
      <Footer></Footer>
    </div>
  );
}

export default Browse;
