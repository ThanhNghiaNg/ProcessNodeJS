import classes from "./ResultList.module.css";
import React from "react";
import MovieDetail from "../MovieList/MovieDetail";

const ResultList = (props) => {
  let contentResult = [];
  const numItemsRow = 9; // The number of movies appear on a row, must change with css

  if (props.movies.length > 0) {
    let rowResult = null;
    // If found movies, generate each row that contains 9 (numItemsRow) movies
    for (let i = 0; i < Math.ceil(props.movies.length / numItemsRow); i++) {
      rowResult = (
        <div className={classes["result-row"]} key={i}>
          {props.movies
            .slice(i * numItemsRow, i * numItemsRow + numItemsRow)
            .map((movie) => {
              return (
                <MovieDetail
                  key={movie.id}
                  movie={movie}
                  usePoster={true}
                  useGrid={true}
                />
              );
            })}
        </div>
      );
      // push each row result to the main content result
      contentResult.push(rowResult);
    }
  }
  // If button Search is clicked and not found any movie show not found message
  else if (props.isTouched) {
    contentResult = (
      <h2 className={classes["not-found"]}>
        Sorry, We couldn't find your film!
      </h2>
    );
  }
  return <div className={classes.result}>{contentResult}</div>;
};

export default ResultList;
