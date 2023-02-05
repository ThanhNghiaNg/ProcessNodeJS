import { NavLink, useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/global";

const ProductItem = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const addToCartHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id, price: product.price }),
    }).then((respone) => {
      console.log(respone);
      if (respone.ok === true) {
        navigate("/cart");
      }
    });
  };
  return (
    <form className="product-form" onSubmit={addToCartHandler}>
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
          {props.showDetailButton && (
            <NavLink className="btn" to={`/products/${product.id}`}>
              Detail
            </NavLink>
          )}
          <button className="btn" type="submit">
            Add to cart
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductItem;
