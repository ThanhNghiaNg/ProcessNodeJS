import "./ContentHotelTypeItem.css";
import Card from "../../UI/Card";

const ContentHotelTypeItem = props => {
  return <div className="content-hotel-type-item">
    <img src={props.item.image}></img>
    <h5>{props.item.name}</h5>
    <h6>{props.item.count} hotels</h6>
  </div>;
};

export default ContentHotelTypeItem;
