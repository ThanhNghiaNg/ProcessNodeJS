import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./product.css";
import { serverURL } from "../../utils/global";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const reloadHandler = () => {
    setReload((prev) => !prev);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const respone = await fetch(`${serverURL}/`);

        const data = await respone.json();
        console.log(data);
        setProducts([...data.products]);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [reload]);

  let listProductsContent = (
    <h1 className="product__title">No Products Found</h1>
  );
  if (products.length > 0) {
    console.log(products);
    listProductsContent = products.map((product, i) => {
      return (
        <ProductItem
          key={i}
          product={product}
          showDetailButton={props.showDetailButton}
          adminMode={props.isAdmin}
          onReload={reloadHandler}
        />
      );
    });
  }
  return <div className="grid">{listProductsContent}</div>;
};

export default ProductList;
