import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Manage from "./components/Manage/Manage";

export const userContext=createContext();

function App() {
   const[loggedinUser,setLoggedinUser]=useState({});
  return (
    <userContext.Provider value={[loggedinUser,setLoggedinUser]}>
       <h3>Email bro:{loggedinUser.email}</h3>
       <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
             <Shop></Shop>
          </Route>
          <Route path="/home">
             <Shop></Shop>
          </Route>

          <Route path="/review">
             <Review></Review>
          </Route>

          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>

          <Route path="/login">
              <Login></Login>
          </Route>

          <PrivateRoute path="/manage">
              <Manage></Manage>
          </PrivateRoute>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}
export default App;
