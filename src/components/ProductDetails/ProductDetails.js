import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetails = () =>{
  const { productKey} = useParams();
  const[product,setProducts]=useState({})
  document.title="product details"
  useEffect(()=>{
    fetch('http://localhost:5000/productKey/'+productKey)
    .then(res=>res.json())
    .then(result=>{
      setProducts(result);   
    })
  },[productKey])
  
  // console.log(products)
  // const product = products.find((pd) => pd.key === productKey);
  return(
    <div>
          <h1>Product Details </h1>
          <Product addtoCart={false} product={product}></Product>
    </div>
  );
};
export default ProductDetails;
