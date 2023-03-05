import classes from "./Checkout.module.css";
import Button from "../UI/Button";
import { addStyleCurrency } from "../../utils/constant";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  let totalPriceCart = 0; // contain total price of cart
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [allRecord, setAllRecord] = useState([]);
  const { error, sendRequest } = useHttp();
  const navigate = useNavigate();
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/cart` }, (data) => {
      setAllRecord(data.items);
    });
    sendRequest({ url: `${serverUrl}/user` }, (data) => {
      setName(data.fullName);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address || "");
    });
  }, []);
  // Get quick information about the cart
  const shortDetail = allRecord.map((record, i) => {
    totalPriceCart += record.productId.price * record.quantity; // calculate total price of cart
    return (
      <div className="row border-bottom mb-2 gap-1" key={i}>
        <p className="col-7 fw-bold text-capitalize p-0">
          {record.productId.name}
        </p>
        <p className="col light-gray p-0">
          {addStyleCurrency(record.productId.price)}{" "}
          <span className="text-lowercase">x{record.amount}</span>
        </p>
      </div>
    );
  });

  const placeOrderHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${serverUrl}/order`,
        method: "POST",
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          address,
          totalPrice: totalPriceCart,
        }),
      },
      (data) => {
        console.log(data);
        navigate("/history");
      }
    );
  };

  return (
    <div className={classes.checkout}>
      <p className="fs-3 text-uppercase mt-5">billing details</p>
      {error && <p className="text-danger">{error}</p>}
      <div className="row text-uppercase">
        <form className="col-7">
          <div className={classes["input-controls"]}>
            <label>full name:</label>
            <input
              placeholder="Enter Your Full Name Here!"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>
          <div className={classes["input-controls"]}>
            <label>email:</label>
            <input
              placeholder="Enter Your Email Here!"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <div className={classes["input-controls"]}>
            <label>Phone Number:</label>
            <input
              placeholder="Enter Your Phone Number Here!"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            ></input>
          </div>
          <div className={classes["input-controls"]}>
            <label>Address: </label>
            <input
              placeholder="Enter Your Address Here!"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            ></input>
          </div>
          <Button className={classes.order} onClick={placeOrderHandler}>
            Place order
          </Button>
        </form>
        <div className="col">
          <div className="row p-5 text-uppercase bg-light-gray ms-4">
            <p className="fs-3 ">your order</p>
            {shortDetail}
            <div className="row">
              <p className="col">total</p>
              <p className="col fs-5">{addStyleCurrency(totalPriceCart)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
