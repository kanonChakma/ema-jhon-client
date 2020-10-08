import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = (props) => {
  const {img,name,price,stock,key} = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h4 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <h4>${price}</h4>
        <p>only {stock} are available</p>
        {props.addtoCart && (
          <button
            onClick={() => props.handleEvent(props.product)}
            className="product-btn"
          >
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};
export default Product;
