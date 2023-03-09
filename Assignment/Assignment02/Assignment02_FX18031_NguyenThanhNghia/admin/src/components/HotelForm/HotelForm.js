import classes from "./HotelForm.module.css";
import classesCard from "../UI/Card.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import useInput from "../../hooks/useInput";
import { useState, useEffect } from "react";
import Error from "../Modal/Error";
import useHttp from "../../hooks/useHttp";
import { serverURL } from "../../utils/global";
import { useNavigate, useParams } from "react-router-dom";

function HotelForm(props) {
  const edit = props.edit;
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { error: requestErr, sendRequest } = useHttp();
  const {
    value: name,
    setValue: setName,
    onChangeValue: onChangeName,
  } = useInput("");
  const {
    value: type,
    setValue: setType,
    onChangeValue: onChangeType,
  } = useInput("");
  const {
    value: city,
    setValue: setCity,
    onChangeValue: onChangeCity,
  } = useInput("");
  const {
    value: address,
    setValue: setAddress,
    onChangeValue: onChangeAddress,
  } = useInput("");
  const {
    value: distance,
    setValue: setDistance,
    onChangeValue: onChangeDistance,
  } = useInput(0);
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
  const { value: images, setValue: setImages } = useInput([]);
  const {
    value: featured,
    setValue: setFeatured,
    onChangeValue: onChangeFeatured,
  } = useInput("");
  const {
    value: rooms,
    setValue: setRooms,
    onChangeValue: onChangeRooms,
  } = useInput("");

  useEffect(() => {
    if (edit) {
      sendRequest({ url: `${serverURL}/admin/hotel/${id}` }, (data) => {
        console.log(data);
        setName(data.name);
        setType(data.type);
        setCity(data.city);
        setAddress(data.address);
        setDistance(data.distance);
        setTitle(data.title);
        setDescription(data.desc);
        setPrice(data.price);
        setImages(data.photos);
        setFeatured(data.featured);
      });
    }
  }, [edit]);

  const onChangeImagesHandler = (event) => {
    setImages(event.target.value.split(",").map((url) => url.trim()));
  };
  const onBlurImages = (event) => {
    setImages((images) => images.filter((url) => url !== ""));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !distance ||
      !title ||
      !description ||
      !price ||
      images.length === 0 ||
      !rooms
    ) {
      return setError("Please fill out all information!");
    }

    sendRequest(
      {
        url: `${serverURL}/admin/${edit ? "update-hotel" : "create-hotel"}`,
        method: "POST",
        body: {
          id,
          name,
          type,
          city,
          address,
          distance,
          title,
          description,
          price,
          images,
          rooms,
          featured: featured === "Yes" ? true : false,
        },
      },
      (data) => {
        if (!requestErr) {
          navigate("/hotels");
        }
      }
    );
  };
  console.log(featured);
  return (
    <>
      <Card>
        {" "}
        <p className="fs-3 text-secondary">Add New Hotel</p>{" "}
      </Card>
      <form
        className={`${classesCard.card} ${classes.form}`}
        onSubmit={submitHandler}
      >
        <div className={classes.grid2}>
          <div className={classes["inputs-control"]}>
            <label>Name</label>
            <input
              type={"text"}
              placeholder="My Hotel"
              value={name}
              onChange={onChangeName}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Type</label>
            <input
              type={"text"}
              placeholder="hotel"
              value={type}
              onChange={onChangeType}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>City</label>
            <input
              type={"text"}
              placeholder="New York"
              value={city}
              onChange={onChangeCity}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Address</label>
            <input
              type={"text"}
              placeholder="elton st, 216"
              value={address}
              onChange={onChangeAddress}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Distance from City Center</label>
            <input
              type={"text"}
              placeholder="500"
              value={distance}
              onChange={onChangeDistance}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Title</label>
            <input
              type={"text"}
              placeholder="The best Hotel"
              value={title}
              onChange={onChangeTitle}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Description</label>
            <input
              type={"text"}
              placeholder="description"
              value={description}
              onChange={onChangeDescription}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Price</label>
            <input
              type={"text"}
              placeholder="100"
              value={price}
              onChange={onChangePrice}
            ></input>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Images</label>
            <textarea
              value={images.join(", ")}
              onChange={onChangeImagesHandler}
              onBlur={onBlurImages}
              placeholder="give comma between images url"
            ></textarea>
          </div>
          <div className={classes["inputs-control"]}>
            <label>Featured</label>
            <select onChange={onChangeFeatured}>
              <option value={"Yes"} selected={featured === true}>
                Yes
              </option>
              <option value={"No"} selected={featured === false}>
                No
              </option>
            </select>
          </div>
        </div>
        <div className={`${classes["inputs-control"]}`}>
          <label>Rooms</label>
          <textarea
            className={classes["height-10"]}
            value={rooms}
            onChange={onChangeRooms}
          ></textarea>
        </div>
        <Button>{edit ? "Update" : "Send"}</Button>
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

export default HotelForm;
