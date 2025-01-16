import React from "react";
import product from "./Product.module.css";

function Product({ name, title, price }) {
  return (
    <div className={product.div}>
      <h1 className={product.h1}>{title}</h1>

      <p className={product.p}>Mobile - {name}</p>

      <p className={product.p}>RS {price}</p>
    </div>
  );
}

export default Product;
