import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import  './Shipment.css'
const Shipment = () => {
    const[loggedinUser,setLoggedinUser]=useContext(userContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data =>{
      const savedCart=getDatabaseCart()
      const orderDetails={...loggedinUser,products:savedCart,shipment:data,date:new Date()}
      fetch('http://localhost:5000/addOrders',{
           method: 'POST',
           headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(result=>{
          alert('added data')
        })
    }
    // console.log(watch("example"));
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="ship">
        
        <input name="name" defaultValue={loggedinUser.name} ref={register({ required: true })} placeholder="Enter your name" />
        {errors.name && <span className="error">This name is required</span>}

        <input name="email" defaultValue={loggedinUser.email} ref={register({ required: true })} placeholder="Enter your email"/>
        {errors.email && <span className="error">This email is required</span>}

        <input name="password" ref={register({ required: true })} placeholder="Enter your password"/>
        {errors.password && <span className="error">This password is required</span>}

        <input name="Address" ref={register({ required: true })} placeholder="Enter your Address"/>
        {errors.Address && <span className="error">This address is required</span>}
        <input type="submit" />
      </form>
    ); 
};
export default Shipment;