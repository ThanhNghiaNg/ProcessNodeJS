import classes from "./HotelForm.module.css";
import classesCard from "../UI/Card.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
function HotelForm() {
  return (
    <>
      <Card>
        {" "}
        <p className="fs-3 text-secondary">Add New Hotel</p>{" "}
      </Card>
      <form className={`${classesCard.card} ${classes.form}`}>
        <div className={classes.grid2}>
          <div className={classes["inputs-control"]}>
            <label>Name</label>
            <input type={"text"} placeholder="My Hotel"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Type</label>
            <input type={"text"} placeholder="hotel"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>City</label>
            <input type={"text"} placeholder="New York"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Address</label>
            <input type={"text"} placeholder="elton st, 216"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Distance from City Center</label>
            <input type={"text"} placeholder="500"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Title</label>
            <input type={"text"} placeholder="The best Hotel"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Description</label>
            <input type={"text"} placeholder="description"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Price</label>
            <input type={"text"} placeholder="100"></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Images</label>
            <textarea></textarea>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Featured</label>
            <select>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        <div className={`${classes["inputs-control"]}`}>
          <label>Rooms</label>
          <textarea className={classes["height-10"]}></textarea>
        </div>
        <Button>Send</Button>
      </form>
    </>
  );
}

export default HotelForm;
