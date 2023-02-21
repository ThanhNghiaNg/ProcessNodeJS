import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import Card from "../UI/Card";
import classes from "./HotelList.module.css";
import classesPageNav from '../TransactionList/Pagenavigation.module.css'
import Alert from "../Modal/Alert";
import Error from "../Modal/Error";

function HotelList() {
  const navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    maxPage: 1,
    totalResult: 0,
  });
  const [hotels, setHotels] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [reload, setReload] = useState(false);
  const { error, setError, sendRequest } = useHttp();
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
      setPageInfo({
        page: data.page,
        totalResult: data.totalResult,
        maxPage: data.maxPage,
      });
      setHotels(data.result);
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
  const onDeleteHotelHandler = () => {
    sendRequest(
      {
        url: `${serverURL}/admin/delete-hotel`,
        method: "POST",
        body: { hotelId: selectedHotel },
      },
      (data) => {
        console.log(data);
        setReload((prev) => !prev);
      }
    );
  };

  const onShowAlert = (event) => {
    const id = event.target.getAttribute("id");
    setSelectedHotel(id);
    setShowAlert(true);
  };

  const gotoEditHotel = (event) => {
    return navigate(`/edit-hotel/${event.target.getAttribute("id")}`);
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
      <>
        <button
          id={hotel._id}
          onClick={onShowAlert}
          className={`btn btn-outline-danger ${classes.dotted}`}
        >
          Delete
        </button>
        ,
        <button
          id={hotel._id}
          className={`btn btn-outline-secondary ${classes.dotted}`}
          onClick={gotoEditHotel}
        >
          Edit
        </button>
      </>,
    ]);
  }
  return (
    <Card>
      <div className={classes.header}>
        <h3 className="text-secondary">Hotel List</h3>
        <Link to="/add-hotel">Add New</Link>
      </div>
      {data[0] && (
        <>
          <Table headers={headers} data={data} />
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
          message="Are you sure you want to delete this hotel?"
          callback={onDeleteHotelHandler}
          onClose={() => {
            setShowAlert(false);
            setSelectedHotel("");
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

export default HotelList;
