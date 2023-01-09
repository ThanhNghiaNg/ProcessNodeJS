import classes from "./MovieDetail.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import useHttp from "../../hooks/use-http";
import YouTube from "react-youtube";
import { hostURL } from "../../utils/config";

const MovieDetail = (props) => {
  const globalContext = useContext(GlobalContext); // Use global context for link
  const movieRef = useRef(); // use ref for whole movie to handle click outside event  this movie after
  const [trailerData, setTrailerData] = useState({}); // where to save trailer data after fetching
  const [isShowDetail, setIsShowDeTail] = useState(false); // State to handle toggle detail
  const { error, sendRequest: getTrailerData } = useHttp();

  // Get and store trailer data to trailerData
  useEffect(() => {
    getTrailerData(
      {
        url: `${hostURL}/api/movies/video`,
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {film_id: props.movie.id},
      },
      setTrailerData
    );
  }, [getTrailerData]);

  // Function to close detail of movie when user click out of this movie
  const onClickOutsideMovie = (event) => {
    if (isShowDetail) {
      if (movieRef.current && !movieRef.current.contains(event.target)) {
        setIsShowDeTail(false);
      }
    }
  };
  window.addEventListener("click", onClickOutsideMovie);

  // Function to toggle detail
  const showDetailHandler = (event) => {
    setIsShowDeTail((prevState) => !prevState);
  };

  // Prevent close detail movie when user click inside detail, instead of click to image of movie
  const preventEvent = (event) => {
    event.stopPropagation();
  };
  const url = `${globalContext.baseImgUrl}/${globalContext.defaultSizeImg}${props.movie.poster_path}`;
  const url_backdrop = `${globalContext.baseImgUrl}/${globalContext.defaultSizeImg}${props.movie.backdrop_path}`;
  // The default image backdrop set to video content
  let videoContent = (
    <div>
      <img src={url_backdrop}></img>
    </div>
  );
  // If found trailer video, change videoContent
  if (trailerData.results && trailerData.results.length > 0) {
    videoContent = (
      <YouTube
        videoId={trailerData.results[0].key}
        opts={{
          height: "400",
          width: "100%",
          playerVars: {
            autoplay: 0,
          },
        }}
      />
    );
  }
  // set image class with useGrid for search page, if not use for browse page
  const imgClasses = props.useGrid ? classes["img-grid"] : classes["img-movie"];
  const detailClasses = props.useGrid
    ? `${classes.detail} ${classes["grid-bottom"]}`
    : classes.detail;
  // Each movie has much categories for title, some are missing, so choose one of them if it has
  const movieTitle =
    props.movie.name || props.movie.original_name || props.movie.title;
  const movieDetail = (
    <div className={detailClasses} onClick={preventEvent}>
      <div className={classes.description}>
        <h2>{movieTitle}</h2>
        <hr></hr>
        <h4>Release Date: {props.movie.first_air_date}</h4>
        <h4>Vote: {props.movie.vote_average}</h4>
        <p>{props.movie.overview}</p>
      </div>
      <div className={classes.video}>{videoContent}</div>
    </div>
  );

  return (
    <div className={classes.movie} onClick={showDetailHandler} ref={movieRef}>
      <img
        src={props.usePoster ? url : url_backdrop}
        className={imgClasses}
        alt={movieTitle}
      ></img>
      {isShowDetail && movieDetail}
    </div>
  );
};

export default MovieDetail;
