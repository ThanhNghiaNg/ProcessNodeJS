import classes from "./ProductList.module.css";

import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products, onReload }) {
  const tableBodyContent = products.map((item, idx) => {
    return <ProductItem item={item} key={idx} onReload={onReload} />;
  });
  return (
    <table className={`${classes.table} table`}>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Price</td>
          <td>Image</td>
          <td>Category</td>
          <td>Edit</td>
        </tr>
      </thead>
      <tbody>{tableBodyContent}</tbody>
    </table>
  );
}

export default ProductList;
