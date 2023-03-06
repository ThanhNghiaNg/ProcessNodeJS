import classes from "./ProductForm.module.css";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { addStyleCurrency, serverUrl } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../Modal/ConfirmModal";

function ProductForm(props) {
  const id = props.id;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { error, sendRequest } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      sendRequest({ url: `${serverUrl}/product/${id}` }, (data) => {
        setName(data.name || "");
        setCategory(data.category || "");
        setShortDesc(data.short_desc || "");
        setLongDesc(data.long_desc || "");
        setPrice(data.price || "");
        setQuantity(data.quantity || "");
      });
    }
  }, [id]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (!id) {
      for (let i = 0; i < image.length; i++) {
        console.log(image[i]);
        formData.append("files", image[i]);
      }
    }

    formData.append("name", name);
    formData.append("category", category);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    formData.append("price", price);
    formData.append("quantity", quantity);

    console.log(formData);
    sendRequest(
      {
        url: `${serverUrl}/admin/product${id ? `/${id}` : ""}`,
        method: id ? "PUT" : "POST",
        headers: {},
        body: formData,
      },
      (data) => {
        setShowModal(true);
      }
    );
  };
  return (
    <form className={classes.form}>
      <div className={classes["form-group"]}>
        <label className="form-label">Product Name</label>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter Product Name"
        />
      </div>
      <div className={classes["form-group"]}>
        <label className="form-label">Category</label>
        <input
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter Category"
        />
      </div>
      <div className={classes["form-group"]}>
        <label className="form-label">Short Description</label>
        <textarea
          value={shortDesc}
          onChange={(event) => {
            setShortDesc(event.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter Short Description"
        />
      </div>
      <div className={classes["form-group"]}>
        <label className="form-label">Long Description</label>
        <textarea
          value={longDesc}
          onChange={(event) => {
            setLongDesc(event.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter Long Description"
        />
      </div>
      <div className={classes["form-group"]}>
        <label className="form-label">Price</label>
        <input
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          type="number"
          className="form-control"
          placeholder="Enter Price"
        />
      </div>
      <div className={classes["form-group"]}>
        <label className="form-label">Quantity</label>
        <input
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
          type="number"
          className="form-control"
          placeholder="Enter Quantity"
        />
      </div>
      {!id && (
        <div className={classes["form-group"]}>
          <label className="form-label">Upload Image (4 images)</label>
          <input
            type="file"
            multiple={true}
            onChange={(event) => {
              setImage(event.target.files);
            }}
          />
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={submitHandler}>
        Submit
      </button>
      {showModal && (
        <ConfirmModal
          inform={true}
          message={`${id ? "Update" : "Create"} Product successfully!`}
          onClose={() => {
            setShowModal(false);
          }}
          handler={() => {
            navigate("/products");
          }}
        />
      )}
    </form>
  );
}

export default ProductForm;
