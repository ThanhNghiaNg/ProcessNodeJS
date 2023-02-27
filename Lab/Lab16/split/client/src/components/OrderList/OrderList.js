import "./orders.css";
import { useEffect, useState } from "react";
import { serverURL } from "../utils/global";
const OrderList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${serverURL}/order`)
      .then((resopne) => {
        if (resopne.ok) {
          return resopne.json();
        }
      })
      .then((data) => {
        console.log(data);
        setData(data.orders);
        setIsLoading(false);
      });
  }, []);
  let orderListContent = <p>Loading...</p>;
  if (data.length > 0) {
    orderListContent = data.map((order) => {
      const itemContent = order.products.map((product) => {
        return (
          <li className="orders__products-item" key={product.product._id}>
            {product.product.title} ({product.quantity})
          </li>
        );
      });
      return (
        <li className="orders__item" key={order._id}>
          <h1>Order - #{order._id}</h1>
          <ul className="orders__products">{itemContent}</ul>
        </li>
      );
    });
  } else {
    if (!isLoading) {
      orderListContent = <p>No Orders</p>;
    }
  }
  return <ul className="orders">{orderListContent}</ul>;
};

export default OrderList;
