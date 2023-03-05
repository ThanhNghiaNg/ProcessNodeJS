import classes from "./Order.module.css";
import { addStyleCurrency } from "../../utils/constant";
import { Link } from "react-router-dom";
import React from "react";

function Order({ order }) {
  return (
    <tr className={classes.item}>
      <td>{order._id}</td>
      <td>{order.user.userId}</td>
      <td>{order.user.fullName}</td>
      <td>{order.user.phone}</td>
      <td>{order.user.address}</td>
      <td>{addStyleCurrency(order.totalPrice)}</td>
      <td>{order.delivery}</td>
      <td>{order.status}</td>
      <td>
        <Link className="btn btn-outline-secondary" to={`/order/${order._id}`}>
          Detail
        </Link>
      </td>
    </tr>
  );
}

export default Order;
