import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";
const Shop = () => {
  //    const data=fakeData.slice(0,10);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  document.title="shop"
  useEffect(()=>{
    fetch('http://localhost:5000/products')
    .then(res=>res.json())
    .then(data=>{
      setProduct(data);
    })
  },[])
  useEffect(() => {
    const saveData = getDatabaseCart();
    const productKey = Object.keys(saveData);
    fetch('http://localhost:5000/groupProductKey',{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(productKey)
    })
    .then(res=>res.json())
    .then(data=>{
      setCart(data);
    })
  }, []);
  const handleEvent = (product) => {
    const tobeAdded = product.key;
    const sameproduct = cart.find((pd) => pd.key === tobeAdded);
    let count = 1;
    let newCart;
    if (sameproduct){
      count = sameproduct.quantity + 1;
      sameproduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== tobeAdded);
      newCart = [...others, sameproduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="main-container">
      <div className="product-container">
        {product.map((pd) => (
          <Product
            product={pd}
            handleEvent={handleEvent}
            addtoCart={true}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        {
          <Cart cart={cart}>
            <Link to="/review">
              <button className="cart-btn">Review your order</button>
            </Link>
          </Cart>
        }
      </div>
    </div>
  );
};
export default Shop;
