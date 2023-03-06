import React from "react";
import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import useHttp from "../../hooks/useHttp";
import { addStyleCurrency, serverUrl } from "../../utils/global";

function ProductItem({ item, onReload }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const { sendRequest } = useHttp();

  const showConfirmModalHandler = () => {
    setIsShowModal(true);
  };
  const hideConfirmModalHandler = () => {
    setIsShowModal(false);
  };
  const onDeleteHandler = () => {
    sendRequest(
      {
        url: `${serverUrl}/admin/product/${item._id}`,
        method: "DELETE",
      },
      (data) => {
        setIsShowModal(false);
        onReload();
      }
    );
  };
  return (
    <tr>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{addStyleCurrency(item.price)}</td>
      <td className={classes.img}>
        <img src={item.img1} alt={item.name} />
      </td>
      <td>{item.category}</td>
      <td>
        <Link
          to={`/update-product/${item._id}`}
          className="btn btn-success me-2"
        >
          Update
        </Link>

        <button className="btn btn-danger" onClick={showConfirmModalHandler}>
          Delete
        </button>
        {isShowModal && (
          <ConfirmModal
            message={"Are you sure to delete this Product?"}
            handler={onDeleteHandler}
            onClose={hideConfirmModalHandler}
          />
        )}
      </td>
    </tr>
  );
}

export default ProductItem;
