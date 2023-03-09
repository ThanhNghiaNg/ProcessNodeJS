/* eslint-disable react-hooks/exhaustive-deps */
import "./SearchPopup.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DataRangeCom from "../Header/DataRangeCom";
import React, { useContext, useEffect, useState } from "react";
import BookingContext from "../../store/BookingContext";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";

const SearchPopup = (props) => {
  const bookingCtx = useContext(BookingContext);
  const { sendRequest: searchHotels } = useHttp();
  const [location, setLocation] = useState(bookingCtx.location);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [adult, setAdult] = useState(bookingCtx.roomInfo.adult);
  const [children, setChildren] = useState(bookingCtx.roomInfo.children);
  const [room, setRoom] = useState(bookingCtx.roomInfo.room);

  // Popup Daterange picker
  const options = [
    "vi-VN",
    { year: "numeric", month: "2-digit", day: "numeric" },
  ];
  const [[dateStartVal, dateEndVal, dateRange], setDateRanges] = useState([
    bookingCtx.dateRange.startDate
      ? bookingCtx.dateRange.startDate
      : new Date().toLocaleString(...options),
    bookingCtx.dateRange.endDate
      ? bookingCtx.dateRange.endDate
      : new Date().toLocaleString(...options),
    bookingCtx.dateRange.ranges
      ? bookingCtx.dateRange.ranges
      : [
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
  const searchHandler = (event) => {
    event.preventDefault();
    bookingCtx.book(
      location,
      {
        startDate: dateStartVal,
        endDate: dateEndVal,
        ranges: dateRange,
      },
      {
        adult,
        children,
        room,
      }
    );
  };
  useEffect(() => {
    searchHotels(
      {
        url: `${serverURL}/search?destination=${location}&startDate=${dateStartVal}&endDate=${dateEndVal}&minPrice=${minPrice}&maxPrice=${maxPrice}&adult=${adult}&children=${children}&room=${room}`,
      },
      (data) => {
        bookingCtx.setData(data);
      }
    );
  }, [bookingCtx.location, bookingCtx.dateRange, bookingCtx.roomInfo]);

  return (
    <Card className="search-popup">
      <form onSubmit={searchHandler}>
        <h4>Search</h4>
        <div className="input-item-popup">
          <label>Destination</label>
          <input
            type="text"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          ></input>
        </div>
        <div className="input-item-popup" id="check-in-date">
          <label>Check-in Date</label>
          <input
            type="text"
            value={`${dateStartVal} to ${dateEndVal}`}
            onClick={onShowDateRangeHandler}
            onChange={() => {}}
            size="25"
          ></input>
          <DataRangeCom
            onShow={toggleDateRange}
            onUpdateRange={setDateRanges}
            options={options}
            ranges={dateRange}
          />
        </div>
        <div className="input-item-popup">
          <label>Options</label>
          <div className="option-list">
            <div className="option-input-item">
              <label>Min price per night</label>
              <input
                type="number"
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                }}
              ></input>
            </div>
            <div className="option-input-item">
              <label>Max price per night</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
              ></input>
            </div>
            <div className="option-input-item">
              <label>Adult</label>
              <input
                type="number"
                value={adult}
                onChange={(event) => {
                  setAdult(event.target.value);
                }}
              ></input>
            </div>
            <div className="option-input-item">
              <label>Children</label>
              <input
                type="number"
                value={children}
                onChange={(event) => {
                  setChildren(event.target.value);
                }}
              ></input>
            </div>
            <div className="option-input-item">
              <label>Room</label>
              <input
                type="number"
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <Button type="submit" className="btn-search-popup">
          Search
        </Button>
      </form>
    </Card>
  );
};

export default SearchPopup;
// eslint-disable-next-line no-unused-vars
