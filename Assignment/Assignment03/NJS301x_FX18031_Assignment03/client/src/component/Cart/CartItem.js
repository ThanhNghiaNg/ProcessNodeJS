import classes from "./CartItem.module.css";
import detailClasses from "../DetailProduct/DetailProduct.module.css";
import { addStyleCurrency } from "../../utils/constant";
import { cartActions } from "../../store/cart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const product = props.record.productId;
  const availableQuantity = product.quantity;
  const { sendRequest } = useHttp();
  const [quantity, setQuantity] = useState(props.record.quantity); // state for handling quantity of product

  // Increase quantity of product in cart, and save it to store, as well as local storage
  const increaseQuantityHandler = () => {
    const displayquantity =
      quantity + 1 <= availableQuantity ? quantity + 1 : quantity;
    if (displayquantity !== quantity) {
      sendRequest(
        {
          url: `${serverUrl}/update-quantity-product-cart`,
          method: "POST",
          body: JSON.stringify({ product: product, quantity: quantity + 1 }),
        },
        (data) => {
          props.onLoad();
        }
      );
    }
  };

  // Descrease quantity of product in cart, and save it to store, as well as local storage
  const descreaseQuantityHandler = () => {
    const displayquantity = quantity - 1 > 0 ? quantity - 1 : 1;
    if (displayquantity !== quantity) {
      sendRequest(
        {
          url: `${serverUrl}/update-quantity-product-cart`,
          method: "POST",
          body: JSON.stringify({ product: product, quantity: displayquantity }),
        },
        (data) => {
          props.onLoad();
        }
      );
    }
  };

  // Delete product in cart, and save it to store, as well as local storage
  const deleteItemHandler = () => {
    sendRequest(
      {
        url: `${serverUrl}/delete-product-cart/${product._id}`,
        method: "DELETE",
      },
      (data) => {
        console.log(data);
        props.onLoad();
      }
    );
  };

  const totalPrice = product.price * props.record.quantity; // total price of this product

  return (
    <div className={`row ${classes.item}`}>
      <div className="col-1">
        <img src={product.img1}></img>
      </div>
      <div className="col-3 fw-bold">{product.name}</div>
      <div className="col light-gray">{addStyleCurrency(product.price)}</div>
      <div className="col">
        <div
          className={`${detailClasses["add-form"]} ${classes["auto-margin"]} border-0 p-0`}
        >
          <button
            className={detailClasses["no-style"]}
            onClick={descreaseQuantityHandler}
          >
            <i className="fa fa-caret-left"></i>
          </button>
          <input type="number" value={quantity} min={1}></input>
          <button
            className={detailClasses["no-style"]}
            onClick={increaseQuantityHandler}
          >
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </div>
      <div className="col-1 light-gray">
        {addStyleCurrency(`${totalPrice}`)}
      </div>
      <div className="col">
        <button
          className={`border-0 ${classes["auto-margin"]}`}
          onClick={deleteItemHandler}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
