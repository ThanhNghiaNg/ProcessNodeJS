import { useEffect, useState } from "react";
import { serverURL } from "../../utils/global";
import classes from "./CartList.module.css";

const CartList = (props) => {
  const [data, setData] = useState(null);
  const [onReload, setOnReload] = useState(false);
  useEffect(() => {
    const getCartItems = async () => {
      const respone = await fetch(`${serverURL}/cart`);
      const data = await respone.json();
      console.log(data);
      setData(data);
    };
    getCartItems();
  }, [onReload]);
  let cartListContent;
  if (data) {
    cartListContent = <div className={classes.cart}></div>;
  }
  return (
    <>
      {!data && (
        <p style={{ textAlign: "center" }}>You do not have any product!</p>
      )}
      {data && cartListContent}
    </>
  );
};

export default CartList;
