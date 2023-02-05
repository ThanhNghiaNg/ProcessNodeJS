import { useReducer } from "react";
import OrderContext from "./OrderContext";
const intitState = {};

const orderReducer = (state, action) => {};
const OrderProvider = (props) => {
  const [order, dispatchOrder] = useReducer(orderReducer, intitState);
  const value = {
    data: order.data,
  };
  return <OrderContext value={value}>{props.children}</OrderContext>;
};

export default OrderProvider;
