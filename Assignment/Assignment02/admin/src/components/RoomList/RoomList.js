import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL, stringCut } from "../../utils/global";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import Card from "../UI/Card";
import classes from "./RoomList.module.css";
import classesHotel from "../HotelList/HotelList.module.css";

function RoomList() {
  const [rooms, setRooms] = useState(null);
  const [reload, setReload] = useState(false);
  const { sendRequest } = useHttp();
  const headers = [
    <input type={"checkbox"}></input>,
    "ID",
    "Title",
    "Description",
    "Price",
    "Max People",
    "Action",
  ];

  useEffect(() => {
    sendRequest({ url: `${serverURL}/admin/rooms` }, (data) => {
      console.log(data);
      setRooms(data);
    });
  }, [reload]);

  const onDeleteRoomHandler = (event) => {
    const id = event.target.getAttribute("id");
    sendRequest(
      {
        url: `${serverURL}/admin/delete-room`,
        method: "POST",
        body: { roomId: id },
      },
      (data) => {
        console.log(data);
        setReload((prev) => !prev);
      }
    );
  };
  let data = [];
  if (rooms) {
    data = rooms.map((room) => [
      <input type={"checkbox"}></input>,
      room._id,
      room.title,
      stringCut(room.desc, 75),
      room.price,
      room.maxPeople,
      <button
        id={room._id}
        onClick={onDeleteRoomHandler}
        className={classesHotel.delete}
      >
        Delete
      </button>,
    ]);
  }
  return (
    <Card>
      <div className={classesHotel.header}>
        <h3 className="text-secondary">Room List</h3>
        <Link to="/add-room">Add New</Link>
      </div>
      {data[0] && <Table headers={headers} data={data} />}
    </Card>
  );
}

export default RoomList;
