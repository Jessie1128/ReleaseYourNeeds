import React, { useState , useRef , Fragment } from "react";
import { firebaseConfig , db, connect } from "../../connection_firebase/connection_firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider , signOut , onAuthStateChanged } from "firebase/auth";
import { collection , getDocs , doc, setDoc , query , where } from "firebase/firestore";
import { async } from "@firebase/util";

const LoginStatus=(login_user)=>{

    const auth = getAuth();
    let state 
    return new Promise ((reslove,reject)=>{
        onAuthStateChanged(auth, (login_user) => {
            console.log(login_user)
            if (login_user) {
                console.log(login_user)
                console.log('目前登陸中')
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = login_user.uid;
                console.log(uid)
                state= true
                reslove({state,login_user})
                return
            } else {
                console.log(login_user)
                console.log('蛤')
                state = false
                reslove(state)
                return
            }
        });
        console.log('會嗎')
    })
}

export default LoginStatus
