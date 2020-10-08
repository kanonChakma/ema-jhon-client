import React from 'react';
const Manage=()=>{
  document.title="manage inventory"
      const handleProduct=() =>{
        const product={}
        fetch('http://localhost:5000/addProduct',{
           method: 'POST',
           headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify(product)
        }) 
    }
    return(
        <div>
          <form action="">
             <label htmlFor="">price:</label>
             <input type="text"/><br/>
             <label htmlFor="">quantity:</label>
             <input type="text"/><br/>
             <label htmlFor="">upload image:</label>
             <input type="file"/><br/>
             <button onClick={handleProduct}>add product</button>
            </form>
        </div>
    );
};
export default Manage;












