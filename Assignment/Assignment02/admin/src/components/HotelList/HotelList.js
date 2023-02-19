import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import Card from "../UI/Card";
import classes from "./HotelList.module.css";

function HotelList() {
  const [hotels, setHotels] = useState(null);
  const [reload, setReload] = useState(false);
  const { sendRequest } = useHttp();
  const headers = [
    <input type={"checkbox"}></input>,
    "ID",
    "Name",
    "Type",
    "Title",
    "City",
    "Action",
  ];

  useEffect(() => {
    sendRequest({ url: `${serverURL}/admin/hotels` }, (data) => {
      console.log(data);
      setHotels(data);
    });
  }, [reload]);

  const onDeleteHotelHandler = (event) => {
    const id = event.target.getAttribute("id");
    sendRequest(
      {
        url: `${serverURL}/admin/delete-hotel`,
        method: "POST",
        body: { hotelId: id },
      },
      (data) => {
        console.log(data);
        setReload((prev) => !prev);
      }
    );
  };
  let data = [];
  if (hotels) {
    data = hotels.map((hotel) => [
      <input type={"checkbox"}></input>,
      hotel._id,
      hotel.name,
      hotel.type,
      hotel.title ? hotel.title : hotel.name,
      hotel.city,
      <button
        id={hotel._id}
        onClick={onDeleteHotelHandler}
        className={classes.delete}
      >
        Delete
      </button>,
    ]);
  }
  return (
    <Card>
      <div className={classes.header}>
        <h3 className="text-secondary">Hotel List</h3>
        <Link to="/add-hotel">Add New</Link>
      </div>
      {data[0] && <Table headers={headers} data={data} />}
    </Card>
  );
}

export default HotelList;
