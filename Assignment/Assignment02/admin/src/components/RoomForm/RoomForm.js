import classes from "./RoomForm.module.css";
import classesCard from "../UI/Card.module.css";
import classesHotel from "../HotelForm/HotelForm.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
function RoomForm() {
  return (
    <>
      <Card>
        {" "}
        <p className="fs-3 text-secondary">Add New Room</p>{" "}
      </Card>
      <form className={`${classesCard.card} ${classesHotel.form}`}>
        <div className={classesHotel.grid2}>
          <div className={classesHotel["inputs-control"]}>
            <label>Title</label>
            <input type={"text"} placeholder="2 bed room"></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Description</label>
            <input
              type={"text"}
              placeholder="King size bed, 1 bathroom"
            ></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Price</label>
            <input type={"text"} placeholder="100"></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Max people</label>
            <input type={"text"} placeholder="2"></input>
          </div>
        </div>
        <div className={`d-flex justify-content-between `}>
          <div className={`${classesHotel["inputs-control"]}`}>
            <label>Rooms</label>
            <textarea
              className={classes["height-10"]}
              placeholder="give comma between room number"
            ></textarea>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Choose a hotel</label>
            <select>
              <option></option>
            </select>
          </div>
          <Button className={classes["height-fit"]}>Send</Button>
        </div>
      </form>
    </>
  );
}

export default RoomForm;
