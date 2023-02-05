import "./forms.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../../utils/global";
const AddProductForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const isEdit = !!id;
  const initProductState = {
    id: id,
    title: "",
    imageUrl: "",
    price: "",
    description: "",
  };
  const [product, setProduct] = useState(initProductState);
  useEffect(() => {
    const getProduct = async () => {
      const respone = await fetch(`${serverURL}/product/${product.id}`);
      const data = await respone.json();
      setProduct(data);
    };
    if (isEdit) {
      getProduct();
    } else {
      setProduct(initProductState);
    }
  }, [product.id]);
  const changeTitleHandler = (event) => {
    setProduct((prev) => {
      return { ...prev, title: event.target.value };
    });
  };
  const changeImageURLHandler = (event) => {
    setProduct((prev) => {
      return { ...prev, imageUrl: event.target.value };
    });
  };
  const changePriceHandler = (event) => {
    setProduct((prev) => {
      return { ...prev, price: event.target.value };
    });
  };
  const changeDesciptionHandler = (event) => {
    setProduct((prev) => {
      return { ...prev, description: event.target.value };
    });
  };

  const addProductHandler = (event) => {
    event.preventDefault();
    if (
      !product.title ||
      !product.imageUrl ||
      !product.description ||
      !product.price
    ) {
      alert("Please fill all field!");
      return;
    }
    const sendProduct = async () => {
      const respone = await fetch(
        `${serverURL}/admin/${isEdit ? `edit-product/${id}` : "add-product"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: product.title,
            imageUrl: product.imageUrl,
            description: product.description,
            price: product.price,
          }),
        }
      );
      const data = await respone.json();
      if (respone.status === 200) {
        navigate("/");
      }
    };
    sendProduct();
    return;
  };
  return (
    <form className="form-control" onSubmit={addProductHandler}>
      <label>Title</label>
      <input
        type="text"
        value={product.title}
        onChange={changeTitleHandler}
      ></input>

      <label>Image URL</label>
      <input
        type="text"
        value={product.imageUrl}
        onChange={changeImageURLHandler}
      ></input>

      <label>Price</label>
      <input
        type="number"
        value={product.price}
        onChange={changePriceHandler}
      ></input>

      <label>Description</label>
      <textarea
        value={product.description}
        onChange={changeDesciptionHandler}
      ></textarea>

      <button className="btn">{isEdit ? "Update" : "Add"} Product</button>
    </form>
  );
};

export default AddProductForm;
