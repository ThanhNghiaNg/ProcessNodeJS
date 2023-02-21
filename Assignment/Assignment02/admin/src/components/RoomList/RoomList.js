import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverURL, stringCut } from "../../utils/global";
import { Link, useNavigate } from "react-router-dom";
import Table from "../Table/Table";
import Card from "../UI/Card";
import classes from "./RoomList.module.css";
import classesHotel from "../HotelList/HotelList.module.css";
import classesPageNav from '../TransactionList/Pagenavigation.module.css'
import Alert from "../Modal/Alert";
import Error from "../Modal/Error";

function RoomList() {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    maxPage: 1,
    totalResult: 0,
  });
  const [rooms, setRooms] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reload, setReload] = useState(false);
  const { error, setError, sendRequest } = useHttp();
  const navigate = useNavigate();
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
      setPageInfo({
        page: data.page,
        totalResult: data.totalResult,
        maxPage: data.maxPage,
      });
      setRooms(data.result);
    });
  }, [reload]);
  const prevPageHandler = () => {
    setPageInfo((prev) => {
      const prevPage = prev.page - 1;
      return { ...prev, page: prevPage >= 1 ? prevPage : prev.page };
    });
  };

  const nextPageHandler = () => {
    setPageInfo((prev) => {
      const nextPage = prev.page + 1;
      return { ...prev, page: nextPage <= prev.maxPage ? nextPage : prev.page };
    });
  };
  const onDeleteRoomHandler = (event) => {
    sendRequest(
      {
        url: `${serverURL}/admin/delete-room`,
        method: "POST",
        body: { roomId: selectedRoom },
      },
      (data) => {
        setReload((prev) => !prev);
      }
    );
  };

  const gotoEditPage = (event) => {
    navigate(`/edit-room/${event.target.getAttribute("id")}`);
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
        // className={classesHotel.delete}
        className={`btn btn-outline-danger ${classes.dotted}`}
      >
        Delete
      </button>,
      <button
        className={`btn btn-outline-secondary`}
        onClick={gotoEditPage}
        id={room._id}
      >
        Edit
      </button>,
    ]);
  }
  return (
    <Card>
      <div className={classesHotel.header}>
        <h3 className="text-secondary">Room List</h3>
        <Link to="/add-room">Add New</Link>
      </div>
      {data[0] && (
        <>
          <Table headers={headers} data={data} />{" "}
          <div className={classesPageNav["page-navigation"]}>
            <span>
              {pageInfo.page}-{pageInfo.maxPage} of {pageInfo.maxPage}
            </span>
            <button onClick={prevPageHandler}>
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={nextPageHandler}>
              {" "}
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
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
