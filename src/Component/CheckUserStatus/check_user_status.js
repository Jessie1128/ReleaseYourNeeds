// import React, { useState , useRef , Fragment } from "react";
// import { firebaseConfig , db, connect } from "../../connection_firebase/connection_firebase";
// import { getAuth, signInWithPopup, GoogleAuthProvider , signOut} from "firebase/auth";
// import { collection , getDocs , doc, setDoc , query , where } from "firebase/firestore";
// import { async } from "@firebase/util";

// async function UserStatus () {
//     // const get_cookie = () =>{
//         if(window.document.cookie===''){
//             console.log('沒有')
//             return false
//         }else{
//             console.log('有')
//             let current = new Date().toUTCString()
//             console.log(current)
//             console.log(document.cookie)
//             let user_info=document.cookie.split(';')
//             console.log(user_info)
//             let time
//             function getCookieValue(name) {
//                 let result = document.cookie.match("(^|[^;]+)\s*" + name + "\s*=\s*([^;]+)")
//                 let new_Resule = result ? result.pop() : ""
//                 return new_Resule.split('expires=')
//             }

//             let email = getCookieValue("userEmail")
//             let token = getCookieValue("userToken")
//             console.log(email[0])
//             console.log(token[0])
//             // return new Promise ((reslove,erject)=>{
//                 let get_user = collection(db, "user");
//                 let res = query(get_user, where("user_email", "==", 'abc@gmail.com')); 
//                 console.log(res)
//                 let snapshot = await getDocs(res);
//                 let rrr =[]
//                 snapshot.forEach((doc)=>{
//                     console.log(doc.data())
//                     rrr.push(doc.data()) 
//                 })
//                 console.log(rrr)
//                 console.log(snapshot)
//                 return snapshot
//         }
// }

// export default UserStatus