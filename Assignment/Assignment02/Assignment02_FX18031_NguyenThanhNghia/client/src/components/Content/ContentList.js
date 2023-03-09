/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
import "./ContentList.css";
import Container from "../UI/Container";
import ContentCityList from "./ContentCity/ContentCityList";
import ContentHotelTypeList from "./ContentHotelType/ContentHotelTypeList";
import ContentHotelList from "./ContentHotel/ContentHotelList";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";

const ContentList = (prop) => {
  // const dataCity = require("../../data/city.json");
  // const dataHotelType = require("../../data/type.json");
  const [dataHotel, setDataHotel] = useState([]);
  const [dataHotelType, setDataHotelType] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  // const dataHotel = require("../../data/hotel_list.json");
  const { sendRequest: fetchData } = useHttp();
  useEffect(() => {
    fetchData(
      {
        url: `${serverURL}/number-hotel-by-city`,
        method: "POST",
        body: { cities: ["Ha Noi", "Ho Chi Minh", "Da Nang"] },
      },
      (data) => {
        setDataCity(data);
      }
    );
    fetchData(
      {
        url: `${serverURL}/number-hotel-by-type`,
        method: "POST",
        body: { types: ["hotel", "apartment", "resort", "villa", "cabin"] },
      },
      (data) => {
        setDataHotelType(data);
      }
    );
    fetchData(
      {
        url: `${serverURL}/top-rating-hotel`,
        method: "POST",
        body: { N: 3 },
      },
      (data) => {
        setDataHotel(data);
      }
    );
  }, []);
  return (
    <Container className="content-list">
      <ContentCityList data={dataCity} />
      <ContentHotelTypeList data={dataHotelType} />
      <ContentHotelList data={dataHotel} />
    </Container>
  );
};

export default ContentList;
