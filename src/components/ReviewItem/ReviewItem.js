import React from "react";
import "./ReviewItem.css";
const ReviewItem = (props) => {
  const { img, name, quantity, price, key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h4 className="product-name">{name}</h4>
        <h4>${price}</h4>
        <h4>{quantity}</h4>
        <button
          onClick={() => props.removeProduct(key)}
          className="product-btn"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default ReviewItem;
