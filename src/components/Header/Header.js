import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../App";
const Header = () => {
  const[loggedinUser,setLoggedinUser]=useContext(userContext);
  return (
    <div className="Header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/review">Review</Link>
        <Link to="/manage">Manage Inventory</Link>
        <Link to="/shop">shop</Link>
        <button onClick={()=>setLoggedinUser("")}>Log Out</button>
      </nav>
    </div>
  );
};

export default Header;
