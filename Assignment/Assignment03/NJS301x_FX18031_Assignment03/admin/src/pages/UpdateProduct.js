import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";

function UpdateProduct(props) {
  const id = useParams().id;
  return (
    <div>
      <h5 className="my-3">Update Product</h5>
      <ProductForm id={id} />
    </div>
  );
}

export default UpdateProduct;
