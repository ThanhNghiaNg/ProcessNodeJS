import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { serverURL, refresh } from "../utils/global";
import "./product.css";
import { AuthContext } from "../../context/AuthProvider";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const authCtx = useContext(AuthContext);
  const getProducts = async () => {
    try {
      const respone = await fetch(`${serverURL}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await respone.json();
      console.log(data)
      setProducts([...data.products]);

      authCtx.setToken(data.csrfToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    
    getProducts();
  }, [refresh]);

  let listProductsContent = (
    <h1 className="product__title">No Products Found</h1>
  );
  if (products.length > 0) {
    listProductsContent = products.map((product, i) => {
      return <ProductItem key={i} product={product} edit={props.edit} />;
    });
  }
  return <div className="grid">{listProductsContent}</div>;
};

export default ProductList;
