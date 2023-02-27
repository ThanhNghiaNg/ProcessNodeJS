import { serverURL } from "../utils/global";

const CartItem = ({ product, updateDelete }) => {
  const deleteHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/cart/delete`, {
      method: "POST",
      credentials : "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.productId._id }),
    })
      .then((resopne) => {
        if (resopne.ok) {
          return resopne.json();
        }
      })
      .then((data) => {
        updateDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="cart__item">
      <h1>{product.productId.title}</h1>
      <h2>Quantity: {product.quantity}</h2>
      <button className="btn" onClick={deleteHandler}>
        {" "}
        Delete
      </button>
    </div>
  );
};

export default CartItem;
