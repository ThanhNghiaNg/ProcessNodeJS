import React from "react";
import { addStyleCurrency } from "../../utils/global";

function OrderItem({ item }) {
  return (
    <tr>
      <td>{item.user.userId}</td>
      <td>{item.user.fullName}</td>
      <td>{item.user.phone}</td>
      <td>{item.user.address}</td>
      <td>{addStyleCurrency(item.totalPrice)} </td>
      <td>{item.delivery}</td>
      <td>{item.status}</td>
      <td>
        <button className="btn btn-success">Vew</button>
      </td>
    </tr>
  );
}

export default OrderItem;
