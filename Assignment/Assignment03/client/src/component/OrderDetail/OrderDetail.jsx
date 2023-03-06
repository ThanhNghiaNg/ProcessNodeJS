import classes from "./OrderDetail.module.css";

import React from "react";
import OrderItem from "./OrderItem";

function OrderDetail(props) {
  const order = props.order;
  console.log(order);
  const contentOrderItems = order.items.map((item, idx) => {
    return <OrderItem item={item} key={idx} />;
  });
  return (
    <div>
      <div className={classes.user}>
        <h2>information order</h2>
        <div>
          <span>ID_User:</span>
          <span>{order.user.userId}</span>
        </div>
        <div>
          <span>Full Name:</span>
          <span>{order.user.fullName}</span>
        </div>
        <div>
          <span>Phone:</span>
          <span>{order.user.phone}</span>
        </div>
        <div>
          <span>Address:</span>
          <span>{order.user.address}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>{order.totalPrice}</span>
        </div>
      </div>
      <table className={classes.items}>
        <thead>
          <tr>
            <th>id product</th>
            <th>image</th>
            <th>name</th>
            <th>price</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>{contentOrderItems}</tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
