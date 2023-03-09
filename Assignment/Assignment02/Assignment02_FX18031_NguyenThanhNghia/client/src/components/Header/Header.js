import classes from "./Header.module.css";
import Container from "../UI/Container";
import DataRangeCom from "./DataRangeCom";

import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingContext from "../../store/BookingContext";

const Header = (props) => {
  const navigate = useNavigate();
  const bookingCtx = useContext(BookingContext);
  const [location, setLocation] = useState("");
  const adultRef = useRef();
  const childrenRef = useRef();
  const roomRef = useRef();

  // Popup Daterange picker
  const options = [
    "vi-VN",
    { year: "numeric", month: "2-digit", day: "numeric" },
  ];
  const [[dateStartVal, dateEndVal, dateRange], setDateRanges] = useState([
    new Date().toLocaleString(...options),
    new Date().toLocaleString(...options),
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
  ]);
  const [toggleDateRange, setToggleDateRange] = useState(false);
  const onShowDateRangeHandler = (event) => {
    setToggleDateRange(!toggleDateRange);
  };

  // handle click to navigate to Search Page
  const toSearchPage = function () {
    bookingCtx.book(
      location,
      { startDate: dateStartVal, endDate: dateEndVal, ranges: dateRange },
      {
        adult: adultRef.current.value,
        children: childrenRef.current.value,
        room: roomRef.current.value,
      }
    );
    navigate("/search");
  };

  return (
    <Container className={classes.header}>
      <h2>A lifetime of discounts? It's Genius.</h2>
      <p>
        Get rewarded for your travels - unclock instant savings of 10% or more
        with a free account
      </p>
      <button>Sign in/ Register</button>
      <form className={classes["search-form"]}>
        <div className={classes["input-item"]}>
          <span className={classes["icon-input"]}>
            <i className={`fa fa-bed`} aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder="Where are you going"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          ></input>
        </div>
        <div className={classes["input-item"]}>
          <span className={classes["icon-input"]}>
            <i className={classes["fa fa-calendar"]}></i>
          </span>
          <input
            type="text"
            value={`${dateStartVal} to ${dateEndVal}`}
            onChange={() => {}}
            onClick={onShowDateRangeHandler}
            size="22"
          ></input>
          <DataRangeCom
            onShow={toggleDateRange}
            onUpdateRange={setDateRanges}
            options={options}
            ranges={dateRange}
          />
        </div>
        <div className={`${classes["input-item"]} ${classes["non-padding"]}`}>
          <span className={`${classes["icon-input"]} pe-4`}>
            <i className="fa fa-child" aria-hidden="true"></i>
          </span>
          <input type="number" placeholder={`1 adult`} ref={adultRef}></input>
          <input
            type="number"
            placeholder={`0 children`}
            ref={childrenRef}
          ></input>
          <input type="number" placeholder={`1 room`} ref={roomRef}></input>
        </div>
        <button onClick={toSearchPage}>Search</button>
      </form>
    </Container>
  );
};
export default Header;
