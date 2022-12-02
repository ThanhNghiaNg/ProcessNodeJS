const ProductItem = (props) => {
  const { product } = props;
  console.log(product);
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
          <button className="btn">Add to cart</button>
        </div>
      </div>
    </form>
  );
};

export default ProductItem;
