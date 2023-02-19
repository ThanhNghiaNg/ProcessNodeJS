import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL, stringCut } from "../../utils/global";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import Card from "../UI/Card";
import classes from "./RoomList.module.css";
import Alert from "../Modal/Alert";
import Error from "../Modal/Error";
import classesHotel from "../HotelList/HotelList.module.css";

function RoomList() {
  const [rooms, setRooms] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reload, setReload] = useState(false);
  const { error, setError, sendRequest } = useHttp();
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
    sendRequest(
      {
        url: `${serverURL}/admin/delete-room`,
        method: "POST",
        body: { roomId: selectedRoom },
      },
      (data) => {
        console.log(data);
        setReload((prev) => !prev);
      }
    );
  };
  const onShowAlert = (event) => {
    const id = event.target.getAttribute("id");
    setSelectedRoom(id);
    setShowAlert(true);
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
        onClick={onShowAlert}
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
      {showAlert && (
        <Alert
          message="Are you sure you want to delete this room?"
          callback={onDeleteRoomHandler}
          onClose={() => {
            setShowAlert(false);
            setSelectedRoom("");
          }}
        />
      )}
      {error && (
        <Error
          message={error}
          onClose={() => {
            setError("");
          }}
        />
      )}
    </Card>
  );
}

export default RoomList;
