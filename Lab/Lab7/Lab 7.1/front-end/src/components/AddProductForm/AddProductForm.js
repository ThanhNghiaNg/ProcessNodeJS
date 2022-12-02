import "./forms.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const AddProductForm = (props) => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const urlImageRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const addProductHandler = (event) => {
    event.preventDefault();
    console.log(!!titleRef.current.value);
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
      const respone = await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleRef.current.value,
          imageUrl: urlImageRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
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
    <form className="form-control" onSubmit={addProductHandler}>
      <label>Title</label>
      <input type="text" ref={titleRef}></input>

      <label>Image URL</label>
      <input type="text" ref={urlImageRef}></input>

      <label>Price</label>
      <input type="number" ref={priceRef}></input>

      <label>Description</label>
      <textarea ref={descriptionRef}></textarea>

      <button className="btn">Add Product</button>
    </form>
  );
};

export default AddProductForm;
