import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeFirsebase, handlGoogleSignIn,handleSignOut, craeteUserEmailAndPassword, signInWithEmailAndPassword } from './LoginManage';

initializeFirsebase();

function Login(){
    const[loggedinUser,setLoggedinUser]=useContext(userContext)
    const[newUser,setNewUser]=useState(false);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    document.title="login"
   const[user,setUser]=useState({
     isSignedIn:false,
     name:'',
     email:'',
     password:'',
     error:'',
     success:false
   })
   const googleSignIn=()=>{
     handlGoogleSignIn()
     .then(res=>{
       handleResponse(res,true);
     })
   }
   const signOut=()=>{
     handleSignOut()
     .then(res=>{
      handleResponse(res,false);
    })
   }
   const handleResponse=(res,redirect)=>{
    setUser(res);
    setLoggedinUser(res);
    if(redirect)
    {
      history.replace(from);
    }
   }
   const handleBlur=(event)=>{
     let isValid=true;

     if(event.target.name==='email'){
        isValid=/\S+@\S+\.\S+/.test(event.target.value);
     }
    /*  At least one uppercase letter
        At least one lowercase letter
        At least one digit
        At least one special symbol
        should be more than 4 character
    */
     if(event.target.name==='password'){
         const pw=event.target.value;
         isValid=/[A-Z]/.test(pw) &&/[a-z]/.test(pw) &&/[0-9]/.test(pw) &&/[^A-Za-z0-9]/.test(pw) && pw.length > 4;
     }
    // console.log(event.target.name,event.target.value); password:123abcABC%
    if(isValid)
     {
      const userInfo={...user};
       userInfo[event.target.name]=event.target.value;
       setUser(userInfo);
     }
  }
  const handleSubmit=(e)=>{
    if(newUser && user.email && user.password){
         craeteUserEmailAndPassword(user.name,user.email,user.password)
         .then(res=>{
             handleResponse(res,true);
         })
      } 
     if(!newUser && user.email && user.password)
     {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        handleResponse(res,true);
      })
     }
    e.preventDefault();
  }
  return (
    <div style={{textAlign:'center'}}>
    { user.isSignedIn? <button onClick={signOut}>sign Out</button>:
      <button onClick={googleSignIn}>sign in</button>
    } 

    {
        user.isSignedIn && <div>
        <p>this user name is: {user.name}</p>
        <p>this user email is: {user.email}</p>
        </div>
    }
   
    <h3>User info is:</h3>
    <h4>userName:{user.name}</h4>
    <h4>userEmail is:{user.email}</h4>
    <h4>user password is:{user.password}</h4>

    <form onSubmit={handleSubmit}>
      <input type="checkbox" name="newUser"  onChange={()=>setNewUser(!newUser)} id=""/>
        <label htmlFor="newUser">sign up for new user</label>
     <br/><br/>
     { newUser && <input type="text" name="name" onBlur={handleBlur}  placeholder="Enter your Name" required/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur}  placeholder="Enter your email" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur}   placeholder="Enter Your Password" required/>
      <br/>
      <input type="submit" value={newUser?'sign up':'sign in'}/>
    </form>
        <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>this {newUser?'sign up':'signed in'} succed</p>
      }
    </div>
  );
}
export default Login;
