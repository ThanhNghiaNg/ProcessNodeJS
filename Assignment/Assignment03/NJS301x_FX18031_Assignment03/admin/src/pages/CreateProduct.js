import React from "react";
import ProductForm from "../components/ProductForm/ProductForm";

function CreateProduct(props) {
  return (
    <div>
      <h5 className="my-3">New Product</h5>
      <ProductForm />
    </div>
  );
}

export default CreateProduct;
