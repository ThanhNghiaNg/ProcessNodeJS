import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import Card from "../components/UI/Card";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/global";
function Products(props) {
  const [query, setQuery] = useState("");
  const [onReload, setOnReload] = useState(false)
  const [products, setProducts] = useState([]);
  const { sendRequest } = useHttp();
  const onChangeQuery = (event) => {
    setQuery(event.target.value);
  };
  const toggleReloadHandler = ()=>{
    setOnReload(prev=>!prev)
  }
  useEffect(() => {
    sendRequest(
      { url: `${serverUrl}/admin/search-products?query=${query}` },
      (data) => {
        setProducts(data);
      }
    );
  }, [query, onReload]);
  return (
    <Card>
      <h5 className="my-3">Product</h5>
      <input
        type="text"
        placeholder="Enter Search"
        className="form-control w-25"
        onChange={onChangeQuery}
      ></input>
        <ProductList products={products} onReload={toggleReloadHandler}/>
    </Card>
  );
}

export default Products;
