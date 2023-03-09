import classes from "./ContentCityItem.module.css";
import Card from "../../UI/Card";

const ContentCityItem = (props) => {
  return (
    <Card className={classes["content-city-item"]}>
      <img src={props.item.image} type="image/webp"></img>
      <div className={classes.info}>
        <h2>{props.item.name}</h2>
        <h3>{props.item.number} properties</h3>
      </div>
    </Card>
  );
};

export default ContentCityItem;
