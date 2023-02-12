import "./ContentHotelItem.css";
import React from "react";
import { Link } from "react-router-dom";

const ContentHotelItem = (props) => {
  // console.log(props.item)
  return (
    <div className="content-hotel-item">
      <img src={props.item.photos[0]} alt={props.item.name}></img>
      <Link to={`/detail/${props.item._id}`} className="hotel-name">
        {props.item.name}
      </Link>
      <p className="hotel-city">{props.item.city}</p>
      {props.item.cheapestPrice && (
        <p className="hotel-price">{`Starting from $${props.item.cheapestPrice}`}</p>
      )}
    </div>
  );
};

export default ContentHotelItem;
