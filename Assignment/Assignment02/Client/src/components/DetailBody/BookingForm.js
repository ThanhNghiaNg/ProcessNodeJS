import classes from "./BookingForm.module.css";
import DataRangeCom from "../Header/DataRangeCom";
import { useState, useRef, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import Button from "../UI/Button";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import AuthContext from "../../store/AuthContext";

function dateStringDiff(date1, date2) {
  const convert = (dateString) =>
    new Date(dateString.split("/").reverse().join("-"));

  const diff = (convert(date1) - convert(date2)) / (1000 * 60 * 60 * 24);
  return Math.abs(diff);
}

function BookingForm(props) {
  const hotel = props.data;
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  // Popup Daterange picker
  const options = [
    "vi-VN",
    { year: "numeric", month: "2-digit", day: "numeric" },
  ];
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cardNumberRef = useRef();
  const [rooms, setRooms] = useState(hotel.rooms);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { sendRequest } = useHttp();

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

  // calculate totalBill base on number of day and room selected
  const totalBill = selectedRooms.reduce((acc, room) => {
    return acc + room.price * (dateStringDiff(dateStartVal, dateEndVal) + 1);
  }, 0);

  useEffect(() => {
    // Get available rooms for today
    sendRequest(
      {
        url: `${serverURL}/available-rooms`,
        method: "POST",
        body: {
          hotelId: hotel._id,
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

  // handle changing payment method
  const changePaymentMethodHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  // handle reserve rooms
  const reserveHandler = (event) => {
    event.preventDefault();
    if (!fullNameRef.current.value) {
      return alert("Please fill out your name!");
    }
    if (!emailRef.current.value) {
      return alert("Please fill out your email!");
    }
    if (!phoneRef.current.value) {
      return alert("Please fill out your phone number!");
    }
    if (!cardNumberRef.current.value) {
      return alert("Please fill out your Identity Card number!");
    }
    if (selectedRooms.length === 0) {
      return alert("Please select your room!");
    }
    if (!paymentMethod) {
      return alert("Please select your payment method!");
    }

    return sendRequest(
      {
        url: `${serverURL}/create-transaction`,
        method: "POST",
        body: {
          hotelId: hotel._id,
          rooms: selectedRooms,
          date: { startDate: dateStartVal, endDate: dateEndVal },
          paymentMethod: paymentMethod,
          user: {
            id: authCtx.userId,
            user: fullNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            cardNumber: cardNumberRef.current.value,
          },
          price: totalBill,
        },
      },
      (data) => {
        navigate('/transactions')
        console.log(data);
      }
    );
  };

  // room list element
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
        <select
          name="payment"
          id="payment"
          className="bg-light"
          onChange={changePaymentMethodHandler}
        >
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
