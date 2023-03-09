import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../utils/global";
import CartItem from "./CartItem";
import classes from "./CartList.module.css";

const CartList = (props) => {
  const [data, setData] = useState(null);
  const [onReload, setOnReload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getCartItems = async () => {
      const respone = await fetch(`${serverURL}/cart`);
      const data = await respone.json();
      console.log(data);
      setData(data);
    };
    getCartItems();
  }, [onReload]);

  const reloadHandler = () => {
    setOnReload((prev) => !prev);
  };
  const orderHandler = () => {
    const postOrder = async () => {
      const respone = await fetch(`${serverURL}/order`, {
        method: "POST",
      });
      const data = await respone.json();
      if (respone.status === 200) {
        navigate("/orders");
      }
    };
    postOrder();
  };
  let cartListContent;
  if (data) {
    cartListContent = data.items.map((item, i) => {
      return <CartItem key={i} item={item} onReload={reloadHandler} />;
    });
  }
  return (
    <>
      {(!data || data.items.length == 0) && (
        <p style={{ textAlign: "center" }}>You do not have any product!</p>
      )}
      {data && data.items.length > 0 && (
        <div className={classes.cart}>
          {cartListContent}
          <button
            className={`btn ${classes["order-btn"]}`}
            onClick={orderHandler}
          >
            Order
          </button>
        </div>
      )}
    </>
  );
};

export default CartList;
