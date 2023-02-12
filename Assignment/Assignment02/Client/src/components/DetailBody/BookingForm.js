import classes from "./BookingForm.module.css";
import DataRangeCom from "../Header/DataRangeCom";
import { useState, useRef, useEffect } from "react";
import Button from "../UI/Button";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";

function dateStringDiff(date1, date2) {
  const convert = (dateString) =>
    new Date(dateString.split("/").reverse().join("-"));

  const diff = (convert(date1) - convert(date2)) / (1000 * 60 * 60 * 24);
  return Math.abs(diff);
}

function BookingForm(props) {
  // Popup Daterange picker
  const options = [
    "vi-VN",
    { year: "numeric", month: "2-digit", day: "numeric" },
  ];
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cardNumberRef = useRef();
  const [rooms, setRooms] = useState(props.data.rooms);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { sendRequest: getAvailableRooms } = useHttp();

  const [[dateStartVal, dateEndVal, dateRange], setDateRanges] = useState([
    new Date().toLocaleString(...options),
    new Date().toLocaleString(...options),
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
  ]);

  useEffect(() => {
    getAvailableRooms(
      {
        url: `${serverURL}/available-rooms`,
        method: "POST",
        body: {
          hotelId: props.data._id,
          startDate: dateStartVal,
          endDate: dateEndVal,
        },
      },
      (data) => {
        setRooms(data);
      }
    );
  }, [dateStartVal, dateEndVal]);

  // Handle selecting room
  const selectRoomHandler = (event) => {
    const roomNumber = Number(event.target.getAttribute("number"));
    const roomId = event.target.getAttribute("room");
    const price = Number(event.target.getAttribute("price"));

    if (event.target.checked) {
      setSelectedRooms((state) => [...state, { roomNumber, roomId, price }]);
    } else {
      const updatedRooms = selectedRooms.filter((room) => {
        return (
          JSON.stringify(room) !== JSON.stringify({ roomNumber, roomId, price })
        );
      });
      setSelectedRooms(updatedRooms);
    }
  };

  const roomListContent = rooms.map((room) => {
    return (
      <div className={classes["room-item"]} key={room._id}>
        <div className="information">
          <h6 className="fs-5">{room.title}</h6>
          <p className="m-0">{room.desc}</p>
          <span className="fs-6">
            Max people: <b>{room.maxPeople}</b>
          </span>
          <p className="m-0 fs-6 fw-bold">${room.price}</p>
        </div>
        <ul className={classes["room-numbers"]}>
          {room.roomNumbers.map((number) => {
            return (
              <li key={number} onChange={selectRoomHandler}>
                <label>{number}</label>
                <input
                  type="checkbox"
                  number={number}
                  room={room._id}
                  price={room.price}
                ></input>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  const totalBill = selectedRooms.reduce((acc, room) => {
    console.log(room.price);
    return acc + room.price * (dateStringDiff(dateStartVal, dateEndVal) + 1);
  }, 0);
  const reserveHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form className={classes.form}>
      <div className={classes["top-side"]}>
        <div className={classes["input-date-range"]}>
          <h3>Dates</h3>
          <DataRangeCom
            onShow={true}
            onUpdateRange={setDateRanges}
            options={options}
            ranges={dateRange}
            className={`position-static ${classes["remove-transform"]}`}
          />
        </div>
        <div className="w-100">
          <h3>Reserve Info</h3>
          <div className={classes["input-customer-info"]}>
            <div className={classes["input-items"]}>
              <label>Your Full Name</label>
              <input
                className={`form-control`}
                type="text"
                ref={fullNameRef}
              ></input>
            </div>
            <div className={classes["input-items"]}>
              <label>Your Email</label>
              <input
                className={`form-control`}
                type="text"
                ref={emailRef}
              ></input>
            </div>
            <div className={classes["input-items"]}>
              <label>Your Phone number</label>
              <input
                className={`form-control`}
                type="text"
                ref={phoneRef}
              ></input>
            </div>
            <div className={classes["input-items"]}>
              <label>Your Identity Card Number</label>
              <input
                className={`form-control`}
                type="text"
                ref={cardNumberRef}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["bottom-side"]}>
        <h3>Select Rooms</h3>
        <ul className={classes["room-list"]}>{roomListContent}</ul>
      </div>
      <h3>Total Bill: ${totalBill}</h3>
      <div className={classes.payment}>
        <select name="payment" id="payment" className="bg-light">
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <Button className={`px-5 py-3`} onClick={reserveHandler}>
          Reserve Now
        </Button>
      </div>
    </form>
  );
}

export default BookingForm;
