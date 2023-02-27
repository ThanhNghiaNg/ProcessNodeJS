import "./forms.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../utils/global";
const AddProductForm = (props) => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const urlImageRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const params = useParams();
  const edit = params.id && props.edit;
  const [errorMsg, setErrorMsg] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  useEffect(() => {
    // Dùng credentials để gửi đi thông tin của session
    if (edit) {
      fetch(`${serverURL}/admin/edit-product/${params.id}`, {
        credentials: "include",
      })
        .then((respone) => respone.json())
        .then((data) => {
          titleRef.current.value = data.result.title;
          urlImageRef.current.value = data.result.imageUrl;
          priceRef.current.value = data.result.price;
          descriptionRef.current.value = data.result.description;
        });
    }
  }, [edit]);
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
        credentials: "include",
      });
      const data = await respone.json();
      if (respone.status === 200) {
        navigate("/");
      } else {
        console.log(data);
        setErrorFields(data.errors.errors.map((err) => err.param));
        setErrorMsg(data.message);
      }
    };
    sendProduct();
    return;
  };
  console.log(errorFields);
  return (
    <>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form className="form-control">
        <label>Title</label>
        <input
          type="text"
          ref={titleRef}
          className={`${errorFields.includes("title") ? "error-field" : ""}`}
        ></input>

        <label>Image URL</label>
        <input
          type="text"
          ref={urlImageRef}
          className={`${errorFields.includes("imageUrl") ? "error-field" : ""}`}
        ></input>

        <label>Price</label>
        <input
          type="number"
          ref={priceRef}
          className={`${errorFields.includes("price") ? "error-field" : ""}`}
        ></input>

        <label>Description</label>
        <textarea
          ref={descriptionRef}
          className={`${
            errorFields.includes("description") ? "error-field" : ""
          }`}
        ></textarea>

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
    </>
  );
};

export default AddProductForm;
