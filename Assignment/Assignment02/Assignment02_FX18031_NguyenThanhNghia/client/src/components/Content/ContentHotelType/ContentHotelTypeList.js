import "./ContentHotelTypeList.css";
import ContentHotelTypeItem from "./ContentHotelTypeItem";

const ContentHotelTypeList = (props) => {
  let contentHotelTypeList = <p>Found no data</p>;
  if (props.data.length > 0) {
    contentHotelTypeList = props.data.map((type) => {
      return <ContentHotelTypeItem key={type.name} item={type} />;
    });
  }
  return (
    <div className="content-hotel-type-list">
      <h3>Browse by property type</h3>
      <div className="type-list-items">{contentHotelTypeList}</div>
    </div>
  );
};

export default ContentHotelTypeList;
