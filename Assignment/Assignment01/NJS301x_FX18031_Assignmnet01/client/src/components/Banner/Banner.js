import classes from "./Banner.module.css";
import React, { useEffect, useState, useCallback } from "react";
import useHttp from "../../hooks/use-http";
import { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import Container from "../UI/Container";

const Banner = (props) => {
  const globalContext = useContext(GlobalContext); // use global context
  const [dataBanner, setDataBanner] = useState({}); // state for storing banner data
  const { error, sendRequest: fetchBanner } = useHttp();

 
  useEffect(() => {
    const onGetBanner = (data) => {
      // Choose random movie from fetched data
      const random_data =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setDataBanner(random_data);
    };

     // fetching movies from  netflix originals
    fetchBanner(
      {
        url: `${globalContext.baseUrl}${globalContext.requests.fetchNetflixOriginals}`,
      },
      onGetBanner
    );
  }, [fetchBanner]);

  // set imageSrc base on data banner
  const imageSrc = `${globalContext.baseImgUrl}/${globalContext.defaultSizeImg}${dataBanner.backdrop_path}`;

  return (
    <div className={classes.banner}>
      <img src={imageSrc} className={classes["img-banner"]}></img>
      <Container className={classes.description}>
        <h1>{dataBanner.original_name}</h1>
        <div className={classes.actions}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <h5>{dataBanner.overview}</h5>
      </Container>
    </div>
  );
};

export default Banner;
