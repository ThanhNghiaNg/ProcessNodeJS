import { useEffect, useState } from "react";
import { serverURL } from "../../utils/global";
import OrderItem from "./OrderItem";
import classes from "./OrderList.module.css";
const OrderList = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const respone = await fetch(`${serverURL}/orders`);
      const data = await respone.json();
      //   console.log(data);
      setData(data);
    };
    getOrders();
  }, []);
  let orderListContent;
  if (data) {
    orderListContent = data.map((item, i) => {
      return <OrderItem key={i} data={item} />;
    });
  }
  return (
    <>
      {!orderListContent && <p>You do not have any Order</p>}
      {orderListContent && <ul>{orderListContent}</ul>}
    </>
  );
};

export default OrderList;
