import classes from "./RoomForm.module.css";
import classesCard from "../UI/Card.module.css";
import classesHotel from "../HotelForm/HotelForm.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../../utils/global";
import Error from "../Modal/Error";

function RoomForm(props) {
  const edit = props.edit;
  const params = useParams();
  const roomId = params.id;
  const [hotelList, setHotelList] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(hotelList)
  const {
    value: title,
    setValue: setTitle,
    onChangeValue: onChangeTitle,
  } = useInput("");
  const {
    value: description,
    setValue: setDescription,
    onChangeValue: onChangeDescription,
  } = useInput("");
  const {
    value: price,
    setValue: setPrice,
    onChangeValue: onChangePrice,
  } = useInput(0);
  const {
    value: maxPeople,
    setValue: setMaxPeople,
    onChangeValue: onChangeMaxPeople,
  } = useInput("");
  const {
    value: rooms,
    setValue: setRooms,
    onChangeValue: onChangeRooms,
  } = useInput("");
  const {
    value: hotel,
    setValue: setHotel,
    onChangeValue: onChangeHotel,
  } = useInput("");

  const { error: requestError, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({ url: `${serverURL}/admin/hotels` }, (data) => {
      setHotelList(data.result);
    });
    if (edit) {
      sendRequest({ url: `${serverURL}/admin/room/${roomId}` }, (data) => {
        setTitle(data.title);
        setDescription(data.desc);
        setPrice(data.price);
        setMaxPeople(data.maxPeople);
        setRooms(data.roomNumbers.join(", "));
      });
    }
  }, [edit]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!title || !description || !price || !maxPeople || !rooms) {
      return setError("Please fill all information");
    }
    console.log(rooms);
    sendRequest(
      {
        url: `${serverURL}/admin/${edit ? "update-room" : "create-room"}`,
        method: "POST",
        body: {
          id: roomId,
          title,
          desc: description,
          price,
          maxPeople,
          roomNumbers: rooms.split(",").map((room) => room.trim()),
          hotelId: hotel,
        },
      },
      (data) => {
        if (requestError) {
          setError(data.message);
        } else {
          navigate("/rooms");
        }
      }
    );
  };
  return (
    <>
      <Card>
        {" "}
        <p className="fs-3 text-secondary">Add New Room</p>{" "}
      </Card>
      <form
        className={`${classesCard.card} ${classesHotel.form}`}
        onSubmit={submitHandler}
      >
        <div className={classesHotel.grid2}>
          <div className={classesHotel["inputs-control"]}>
            <label>Title</label>
            <input
              type={"text"}
              placeholder="2 bed room"
              value={title}
              onChange={onChangeTitle}
            ></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Description</label>
            <input
              type={"text"}
              placeholder="King size bed, 1 bathroom"
              value={description}
              onChange={onChangeDescription}
            ></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Price</label>
            <input
              type={"text"}
              placeholder="100"
              value={price}
              onChange={onChangePrice}
            ></input>
          </div>
          <div className={classesHotel["inputs-control"]}>
            <label>Max people</label>
            <input
              type={"text"}
              placeholder="2"
              value={maxPeople}
              onChange={onChangeMaxPeople}
            ></input>
          </div>
        </div>
        <div className={`d-flex justify-content-between `}>
          <div className={`${classesHotel["inputs-control"]}`}>
            <label>Rooms</label>
            <textarea
              className={classes["height-10"]}
              placeholder="give comma between room number"
              value={rooms}
              onChange={onChangeRooms}
            ></textarea>
          </div>
          {!edit && (
            <div className={classesHotel["inputs-control"]}>
              <label>Choose a hotel</label>
              <select onChange={onChangeHotel}>
                {hotelList &&
                  hotelList.map((hotel) => {
                    return (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          <Button className={classes["height-fit"]}>
            {edit ? "Update" : "Send"}
          </Button>
        </div>
      </form>
      {error && (
        <Error
          message={error}
          onClose={() => {
            setError("");
          }}
        />
      )}
    </>
  );
}

export default RoomForm;
