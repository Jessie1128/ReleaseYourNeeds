import React, { useState , useRef , Fragment , useContext } from "react";
import { firebaseConfig , db, connect } from "../../connection_firebase/connection_firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider , signOut , onAuthStateChanged } from "firebase/auth";
import { collection , getDocs , doc, setDoc , query , where } from "firebase/firestore";
import { async } from "@firebase/util";
import { LoginThrouht } from "../ContextFolder/context_folder";

const LoginStatus=(login_user)=>{

    const { throught , setThrought } = useContext(LoginThrouht)
    // console.log(throught)
    let auth = getAuth();
    let state 
    // if(throught==='E&P_register'){
    //     return
    // }
    return new Promise ((reslove,reject)=>{
        onAuthStateChanged(auth, (login_user) => {
            console.log(login_user)
            console.log(throught)
            if (login_user) {
                console.log(login_user)
                console.log('目前登陸中')
                console.log(throught)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = login_user.uid;
                console.log(uid)
                if(uid!=undefined){
                    console.log(uid)
                }else{
                    console.log('沒有uid')
                }
                state = true
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
