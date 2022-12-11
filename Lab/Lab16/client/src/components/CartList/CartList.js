import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../utils/global";
import "./cart.css";
import CartItem from "./CartItem";

const CartList = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const updateDelete = () => {
    setUpdate((prevState) => !prevState);
  };
  const orderHandler = () => {
    fetch(`${serverURL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json", body: null },
    })
      .then((respone) => {
        if (respone.ok) {
          navigate("/orders");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const resopne = await fetch(`${serverURL}/cart`, {
          credentials: "include",
        });
        const data = await resopne.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
    // fetch(`${serverURL}/cart`)
    //   .then((result) => result.json())
    //   .then((data) => {
    //     setData(data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [update]);

  let listCartContent = isLoading && <p>Loading...</p>;
  if (data.length > 0) {
    listCartContent = data.map((product) => {
      return (
        <CartItem
          key={product.productId._id}
          product={product}
          updateDelete={updateDelete}
        />
      );
    });
    listCartContent.push(
      <button className="btn" onClick={orderHandler}>
        Order
      </button>
    );
  } else {
    if (!isLoading) {
      listCartContent = <p>No Product Found!</p>;
    }
  }

  return <div className="cart__item-list">{listCartContent}</div>;
};

export default CartList;
