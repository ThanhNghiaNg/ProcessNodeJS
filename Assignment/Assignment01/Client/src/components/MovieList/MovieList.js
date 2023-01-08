import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Container from "../UI/Container";
import MovieDetail from "./MovieDetail";

import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);

  const { error, sendRequest: getMoviesData } = useHttp();
  useEffect(() => {
    const getMovies = (data) => {
      console.log(data)
      setMovies(data.results);
      console.log(props.moviesURL)
      console.log(data.results)
    };
    
    getMoviesData({ url: props.moviesURL }, getMovies);
  }, [getMoviesData]);
  
  let conetentMovieList = <div></div>;
  if (movies.length > 0) {
    
    // console.log(movies)
    conetentMovieList = movies.map((movie) => {
      return <MovieDetail key={movie.id} movie={movie} usePoster={props.usePoster}/>;
    });
  }
  //console.log(`movie-list ${props.usePoster? 'img-poster' : 'img-backdrop'}`)
  return (
    <Container className={`${classes["movie-list"]} ${classes[props.usePoster? 'img-poster' : 'img-backdrop']}`}>
      <h3>{props.caption}</h3>
      <div className={classes["movie-items"]}>{conetentMovieList}</div>
    </Container>
  );
};

export default MovieList;
