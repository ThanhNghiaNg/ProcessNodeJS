import "./SearchListItem.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const SearchItem = (props) => {
  let contentCencel = (
    <div className="hodel-cancel">
      <p>Free cancellation</p>
      <p>You can cancel later, so lock in this great price today</p>
    </div>
  );
  const navigate = useNavigate();
  const gotoDetailHandler = (event) => {
    event.preventDefault();
    navigate(`/detail/${props.data._id}`);
  };
  return (
    <Card className="search-item">
      <div className="img-description">
        <img src={props.data.photos[0]}></img>
      </div>
      <div className="content-description">
        <div className="text-description">
          <h4>{props.data.name}</h4>
          <p className="hodel-distance">{props.data.distance}m from center</p>
          {props.data.tag && (
            <p>
              <span className="hodel-tag">{props.data.tag}</span>
            </p>
          )}
          <p className="hodel-description">{props.data.description}</p>
          <p className="hodel-type">{props.data.type}</p>
          {props.data.free_cancel && contentCencel}
        </div>
        <div className="intuitive-description">
          <div className="hotel-rating">
            {props.data.rate && (
              <>
                <h5 className="hotel-rate_text">{props.data.rate_text}</h5>
                <p className="hotel-rate">{props.data.rate}</p>
              </>
            )}
          </div>
          <div className="hotel-state">
            <h4>${props.data.cheapestPrice}</h4>
            <p>Include taxes and fees</p>
            <Button className="hotel-availability" onClick={gotoDetailHandler}>
              See availability
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchItem;
