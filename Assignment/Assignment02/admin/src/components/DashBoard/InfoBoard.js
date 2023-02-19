import classes from "./InfoBoard.module.css";
import Card from "../UI/Card";
function InfoBoard({ headers, values, icons }) {
  const infoBoardContent = headers.map((header, idx) => {
    return (
      <Card className={`${classes.info__card} w-25`} key={idx}>
        <div>
          <p className="text-secondary text-uppercase">{header}</p>
          <p className="fs-4">{values[idx]}</p>
        </div>
        <div className={classes.icon}><span>{icons[idx]}</span></div>
      </Card>
    );
  });
  return <div className={`${classes.info} d-flex`}>{infoBoardContent}</div>;
}

export default InfoBoard;
