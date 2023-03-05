import classes from "./OrderItem.module.css";

import React from "react";
import { addStyleCurrency } from "../../utils/constant";

function OrderItem({ item }) {
  return (
    <tr className={classes.item}>
      <td>{item.productId._id}</td>
      <td className={classes.img}>
        <img src={item.productId.img1} alt={item.productId.name} />
      </td>
      <td>{item.productId.name}</td>
      <td>{addStyleCurrency(item.productId.price)}</td>
      <td>{item.quantity}</td>
    </tr>
  );
}

export default OrderItem;
