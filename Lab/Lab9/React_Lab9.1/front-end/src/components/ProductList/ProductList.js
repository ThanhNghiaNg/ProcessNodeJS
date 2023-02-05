import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./product.css";
import {serverURL} from '../../utils/global'

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const respone = await fetch(`${serverURL}/`)
        
        const data = await respone.json();

        setProducts([...data.products]);

      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  let listProductsContent = (
    <h1 className="product__title">No Products Found</h1>
  );
  if (products.length > 0) {
    console.log(products);
    listProductsContent = products.map((product, i) => {
      return <ProductItem key={i} product={product} showDetailButton={props.showDetailButton}/>;
    });
  }
  return <div className="grid">{listProductsContent}</div>;
};

export default ProductList;
