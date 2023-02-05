import classes from "./OrderList.module.css";
const OrderList = (props) => {
  const _classes = `${classes} ${props.className}`;
  return <section className={_classes}>2</section>;
};

export default OrderList