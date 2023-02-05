import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { serverURL } from "../../utils/global";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const respone = await fetch(`${serverURL}/product/${id}`);
    const data = await respone.json();
    console.log(data);
    setProduct(data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={classes.detail}>
      {!product && <p>Loading...</p>}
      {product && (
        <>
          <h3>{product.title}</h3>
          <hr></hr>
          <div className={classes.info}>
            <img src={`${product.imageUrl}`}></img>
            <div className={classes.price}>{product.price}</div>
            <div>{product.description}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
