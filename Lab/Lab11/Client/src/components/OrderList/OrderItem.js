import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const data = props.data;
  const itemsContent = data.items.map((item, index) => {
    return (
      <li key={index}>
        {item.title} ({item.orderItem.quantity})
      </li>
    );
  });
  console.log(data);
  return (
    <li>
      <h3>#{data.orderId}</h3>
      <ul>{itemsContent}</ul>
    </li>
  );
};

export default OrderItem;
