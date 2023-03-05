import classes from "./Orders.module.css";
import React from "react";
import Card from "../UI/Card";
import OrderItem from "./OrderItem";

function Orders(props) {
  const tableBodyContent = props.orders.map((item, idx) => {
    return <OrderItem item={item} key={idx}/>;
  });
  return (
    <Card className={classes.orders}>
      <h5>History</h5>
      <table class={`table ${classes.table} text-secondary`}>
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{tableBodyContent}</tbody>
      </table>
    </Card>
  );
}

export default Orders;
