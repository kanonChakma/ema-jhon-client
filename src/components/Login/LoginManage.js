import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'
export const initializeFirsebase=()=>{
    firebase.initializeApp(firebaseConfig);
}
export const handlGoogleSignIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithPopup(provider)
    .then(result=>{
        const {displayName,email}=result.user;
        const signdInUser={
            isSignedIn:true,
            name:displayName,
            email:email,
            success:true
        }
     return signdInUser;
    })
    .catch(error=>{
      console.log(error);
      console.log(error.message)
    })
}
export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(res=>{
         const signedOutUser={
           isSignedIn:'false',
           name:'',
           email:''
         }
        return signedOutUser;
    })
    .catch(error=>{
       console.log(error);
    })
 }
 const newUserName=(name)=>{
  const user = firebase.auth().currentUser;
  user.updateProfile({
       displayName:name
  })
  .then(function() {
     console.log('updated name');
  })
  .catch(function(error) {
     console.log(error)
  });
}
 export const craeteUserEmailAndPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
      const userInfo=res.user;
       userInfo.error='';
       userInfo.success=true;
       newUserName(name);
       return userInfo;
     })
    .catch(error=>{
      const userInfo={}
       userInfo.error=error.message;
       userInfo.success=false;
       return userInfo;
     });
 }
 export const signInWithEmailAndPassword =(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
      const userInfo=res.user;
       userInfo.error='';
       userInfo.success=true;
       return userInfo;
     })
     .catch(error=>{
      const userInfo={}
       userInfo.error=error.message;
       userInfo.success=false;
       return userInfo;
     });
 }
