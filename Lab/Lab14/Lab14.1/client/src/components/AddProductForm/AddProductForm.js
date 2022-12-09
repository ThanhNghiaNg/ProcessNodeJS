import classes from "./forms.module.css";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../utils/global";
const AddProductForm = (props) => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const urlImageRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const params = useParams();
  const edit = params.id && props.edit
  if (edit) {
    fetch(`${serverURL}/admin/edit-product/${params.id}`)
      .then((respone) => respone.json())
      .then((data) => {
        titleRef.current.value = data.result.title;
        urlImageRef.current.value = data.result.imageUrl;
        priceRef.current.value = data.result.price;
        descriptionRef.current.value = data.result.description;
      });
  }
  const updateProductHandler = (event) => {
    event.preventDefault();
    if (
      !titleRef.current.value ||
      !urlImageRef.current.value ||
      !priceRef.current.value ||
      !descriptionRef.current.value
    ) {
      alert("Please fill all field!");
      return;
    }
    const sendProduct = async () => {
      const respone = await fetch(`${serverURL}/admin/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleRef.current.value,
          imageUrl: urlImageRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
          id: edit ? params.id : null,
        }),
      });
      const data = await respone.json();
      if (data.ok) {
        navigate("/");
      }
    };
    sendProduct();
    return;
  };
  return (
    <form className={classes['form-control']}>
      <label>Title</label>
      <input type="text" ref={titleRef}></input>

      <label>Image URL</label>
      <input type="text" ref={urlImageRef}></input>

      <label>Price</label>
      <input type="number" ref={priceRef}></input>

      <label>Description</label>
      <textarea ref={descriptionRef}></textarea>
      {!props.edit && (
        <button className="btn" onClick={updateProductHandler}>
          Add Product
        </button>
      )}
      {props.edit && (
        <button className="btn" onClick={updateProductHandler}>
          Update Product
        </button>
      )}
    </form>
  );
};

export default AddProductForm;
