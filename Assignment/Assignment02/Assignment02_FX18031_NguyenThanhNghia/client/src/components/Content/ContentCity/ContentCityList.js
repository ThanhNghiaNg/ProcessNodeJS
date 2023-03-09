import "./ContentCityList.css";
import ContentCityItem from "./ContentCityItem";

const ContentCityList = (props) => {
  let contentCityList = <p>Found no city</p>;
  if (props.data.length > 0) {
    contentCityList = props.data.map((city) => {
      return <ContentCityItem key={city.name} item={city} />;
    });
  }
  return <div className="content-city-list">{contentCityList}</div>;
};

export default ContentCityList;
