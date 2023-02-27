import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setRefresh, serverURL } from "../utils/global";

const ProductItem = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const authCtx = useContext(AuthContext);
  const addToCartHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/cart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": authCtx.csrfToken,
      },
      body: JSON.stringify({
        id: product._id,
        price: product.price,
      }),
    }).then((respone) => {
      console.log(respone);
      respone.ok && navigate("/cart");
    });
  };

  const editProductHandler = (event) => {
    event.preventDefault();
    console.log(product);
    navigate(`/edit-product/${product._id}`);
  };

  const deleteProductHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/admin/delete-product/${product._id}`, {
      method: "POST",
    }).then((respone) => {
      setRefresh();
      return respone.ok && navigate("/", { replace: true });
    });
  };
  return (
    <form className="product-form">
      <div className="card">
        <div className="product-item">
          <div className="card__header">
            <h1 className="product__title">{product.title}</h1>
          </div>
          <div className="card__content">
            <div className="card__image">
              <img src={product.imageUrl}></img>
            </div>
            <h1 className="product__price">${product.price}</h1>
            <p className="product__description">{product.description}</p>
          </div>
        </div>
        <div className="card__actions">
          {props.edit && (
            <>
              <button className="btn" onClick={editProductHandler}>
                Edit
              </button>
              <button className="btn" onClick={deleteProductHandler}>
                Delete
              </button>
            </>
          )}
          {!props.edit && (
            <button className="btn" onClick={addToCartHandler}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductItem;
