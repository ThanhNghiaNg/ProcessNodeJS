import "./DetailBody.css";
import Container from "../UI/Container";
import DetailListImage from "./DetailListImage";
import Button from "../UI/Button";
import BookingForm from "./BookingForm";
import { useState } from "react";

const DetailBody = (props) => {
  const detailData = props.data;
  const [showBookingForm, setShowBookingForm] = useState(false);
  console.log(detailData);
  return (
    <Container className="detail-body">
      <Button className="btn-book-top-right">Reserve or Book Now!</Button>
      <h2>{detailData.name}</h2>
      <p>
        <span>
          <i className="fa fa-map-marker" aria-hidden="true"></i>
        </span>
        <span className="detail-hotel-address">{detailData.address}</span>
      </p>
      <h6 className="detail-hotel-distance">
        Excellent location - {detailData.distance}m from center
      </h6>
      <h6 className="detail-hotel-price">
        Book a stay over ${detailData.cheapestPrice} at this property and get a
        free airport taxi
      </h6>
      <DetailListImage data={detailData.photos} />
      <div className="more-info">
        <div className="text-description">
          <h2>{detailData.title}</h2>
          <p>{detailData.desc}</p>
        </div>
        <div className="book-description">
          <h5>Perfect for a 9-night stay!</h5>
          <p>
            Located n the real heart of Krakow, this property has an excellent
            location score of 9.8!
          </p>
          <div className="price-nine-nights">
            <h2>${(0.9 * 9 * detailData.cheapestPrice).toFixed()} </h2>
            <h2>(9 nights)</h2>
          </div>
          <Button
            className="btn-book"
            onClick={() => {
              setShowBookingForm(true);
            }}
          >
            Reserve or Book Now!
          </Button>
        </div>
      </div>
      {showBookingForm && <BookingForm data={detailData} />}
    </Container>
  );
};

export default DetailBody;
