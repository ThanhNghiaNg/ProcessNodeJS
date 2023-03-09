import { serverURL } from "../utils/global";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  const item = props.item;
  const deleteItemHandler = (event) => {
    event.preventDefault();
    const postDeleteItem = async () => {
      const respone = await fetch(`${serverURL}/delete-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const data = await respone.json();
      console.log(data);
      if (respone.status === 200) {
        props.onReload();
      }
    };
    postDeleteItem();
  };
  return (
    <div className={classes.item}>
      <p>{item.productInfo.title}</p>
      <span>Quantity: {item.quantity}</span>
      <button onClick={deleteItemHandler}>Delete</button>
    </div>
  );
};

export default CartItem;
