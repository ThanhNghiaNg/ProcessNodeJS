import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../store/popup";
import Popup from "../Popup/Popup";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { addStyleCurrency } from "../../utils/constant";

// ProductItem Component - for handle task on each product
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isShowPopup = useSelector((state) => state.popup.isShowPopup); // get isShowPopup state from store to handle show Popup about product
  const currentID = useSelector((state) => state.popup.currentID); // get currentID state from store to handle show Popup about product

  // Handle show popup related with the product by id
  const showPopupHandler = () => {
    // If toDetail props is true, go to detail page of product instead of show popup
    if (props.toDetail) {
      const id = props.product._id;
      console.log(id);
      navigate(`/detail/${id}`);
    } else {
      // show pop up
      dispatch(popupActions.showPopup());
      console.log(props.product._id);
      // set current product ID to show popup related
      dispatch(popupActions.pickID(props.product._id));
    }
  };

  return (
    <Fragment>
      {/* If show popup is true, and current ID matched with this product ID, then render Popup */}
      {isShowPopup && currentID === props.product._id && (
        <Popup product={props.product} />
      )}
      <div className={classes.product} onClick={showPopupHandler}>
        <img
          src={props.product.img1}
          className={classes["img-product"]}
          alt={props.product.name}
        ></img>
        <div className={classes.info}>
          <h6>{props.product.name}</h6>
          <p className="light-gray">
            {addStyleCurrency(props.product.price)}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default ProductItem;
