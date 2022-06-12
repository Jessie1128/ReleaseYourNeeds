import React, { useState , useRef , useEffect , useContext } from "react";
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { firebaseConfig , db } from "../../connection_firebase/connection_firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider , signOut , onAuthStateChanged } from "firebase/auth";
import { collection , getDocs , doc, setDoc , query , where , updateDoc } from "firebase/firestore";
import '../Header/header.css'
import './firebase-login.css'
import { async } from "@firebase/util";
// import UserStatus from "../CheckUserStatus/check_user_status";
import LoginStatus from "../LoginStatus/loginStatus";
import { LoginThrouht } from "../ContextFolder/context_folder";
// import GoogleLogin from "react-google-login";
import { E_and_P_user } from "../ContextFolder/context_folder";
import { Brightness } from "../ContextFolder/context_folder";
import { AlertFrame } from "../ContextFolder/context_folder";
import { ForDisplay } from "../ContextFolder/context_folder";
import { Google_user } from "../ContextFolder/context_folder";

const FirebaseLogin = ({ login_status , login_name , login_photo , dis , 
                         setLogin_status, setLogin_name , setLogin_photo , setDis , setName_value , setEmail_value , setPassword_value , email_value }) => {

    const { google_user , setGoogle_user } = useContext(Google_user)
    const { setFor_display } = useContext(ForDisplay)
    const { success, clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    const { setE_and_p_user } = useContext(E_and_P_user)
    const { setThrought } = useContext(LoginThrouht)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    let insert_user_data_to_firebase = async(data) => {
        console.log(data)
        try {
            let get_user = collection(db, "user");
            let res = query(get_user, where("user_email", "==", data['email'])); 
            console.log('底加',res) 
            let snapshot = await getDocs(res);
            let user_exist
            snapshot.forEach((doc) => {
                user_exist=doc.data()
            })
            if(user_exist===undefined){
                console.log('空蕩蕩')
                console.log(data['email'])
                console.log(data['displayName'])
                console.log(data['photoURL'])
                await setDoc(doc(db, "user", data['email']),{
                    ['user_email']: data['email'],
                    ['user_displayName']: data['displayName'],
                    ['user_photoURL']: data['photoURL'],
                    ['user_comments']:'',
                    ['user_collection']:[],
                });
                console.log("新增成功");
                // window.location.reload()
                return "新增成功";
            }else{
                console.log('有存過了ㄧㄛ')
                // console.log(user_exist)
                // console.log(user_exist['user_displayName'])
                // console.log(user_exist['user_photoURL'])
                // console.log(data['photoURL'])
                // console.log(data['displayName'])
                if( data['displayName'] != user_exist['user_displayName'] || data['photoURL']!= user_exist['user_photoURL'] ){
                    console.log('有資料不一樣')
                    const newData = doc(db, "user", data['email']);
                    console.log(data['photoURL'])
                    console.log(data['displayName'])
                    await updateDoc(newData, {
                        user_photoURL: data['photoURL'],
                        user_displayName: data['displayName']
                    });
                    console.log("更新成功");
                    // window.location.reload()  
                    return "更新成功";
                }else{
                    // window.location.reload()
                    console.log('資料完全一樣')
                }
            }

            setGoogle_user(data)
            console.log('底加底加',user_exist)
            
            // const newData = doc(db, "user", 'abc@gmail.com');

            // await setDoc(doc(db, "user", data[0]['email']),{
            //     ['credential_idToken']:data[2]['idToken'],
            //     ['accessToken']: data[1],
            //     ['user_email']: data[0]['email'],
            //     ['idToken']: data[0]['accessToken'],
            //     ['user_displayName']: data[0]['displayName'],
            //     ['user_photoURL']: data[0]['photoURL'],
            //     ['user_providerData_uid']: data[0]['providerData'][0]['uid'],
            //     ['user_uid']: data[0]['uid'],
            // });
            // console.log("新增成功");
            // return "ok";
        } catch (error) {
            console.error(`資料沒有新增成功:${error}`);
            return `failed:${error}`;
        }
    }

    // let create_cookie = (token) => {
    //     console.log(token)
    //     console.log(token[2])
    //     // let idToken = token[2]
    //         console.log(auth)
    //         auth.app.post('/sessionLogin', (req, res) => {
    //             console.log(req)
    //             console.log(res)
    //             // Get the ID token passed and the CSRF token.
    //             const idToken = req.body.idToken.toString();
    //             const csrfToken = req.body.csrfToken.toString();
    //             console.log(idToken)
    //             console.log(csrfToken)
    //             // Guard against CSRF attacks.
    //             if (csrfToken !== req.cookies.csrfToken) {
    //               res.status(401).send('UNAUTHORIZED REQUEST!');
    //               return;
    //             }
    //             // Set session expiration to 5 days.
    //             const expiresIn = 60 * 60 * 24 * 5 * 1000;
    //             // Create the session cookie. This will also verify the ID token in the process.
    //             // The session cookie will have the same claims as the ID token.
    //             // To only allow session cookie setting on recent sign-in, auth_time in ID token
    //             // can be checked to ensure user was recently signed in before creating a session cookie.
    //             getAuth()
    //               .createSessionCookie(idToken, { expiresIn })
    //               .then(
    //                 (sessionCookie) => {
    //                     console.log(sessionCookie)
    //                   // Set cookie policy for session cookie.
    //                   const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    //                   res.cookie('session', sessionCookie, options);
    //                   res.end(JSON.stringify({ status: 'success' }));
    //                 },
    //                 (error) => {
    //                     console.log(error)
    //                   res.status(401).send('UNAUTHORIZED REQUEST!');
    //                 }
    //               );
    //           });
    // }


    let start_login = () => {
        console.log('有執行')
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // const auth = getAuth();
        auth.languageCode = 'zh-tw';
        console.log('有執行')
        provider.setCustomParameters({
            'login_hint': 'xxx@gmail.com',
        });
        signInWithPopup(auth, provider)
        .then((result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log( credential )
            console.log( credential.idToken )
            console.log( token )
            console.log( user )

            const login_user = auth.currentUser;
            if (login_user !== null) {
                // The user object has basic properties such as display name, email, etc.
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
                const uid = user.uid;
                setLogin_status('LOG OUT')
                setLogin_name('歡迎 ， '+displayName)
                setLogin_photo(photoURL)
                setDis({display:"flex"})
                    
                let exp = new Date();
                exp.setTime(exp.getTime() + (24*60*1000));
                let expires = "expires="+ exp.toUTCString();
                // document.cookie='userName='+displayName+expires+';SameSite=Lax ;path=/';
                document.cookie='userEmail='+email+expires+';SameSite=Lax ;path=/';
                // document.cookie='userToken='+token+expires+';SameSite=Lax ;path=/';
                // document.cookie='userName='+displayName+';SameSite=Lax ;path=/';
                console.log(document.cookie)
                // // let rrrr=await LoginStatus(login_user)
                // console.log(rrrr)
                // const auth = getAuth();
                
                return login_user
                
            }else{
                console.log(login_user)
            }
        })
        .then((data)=>{
            console.log(data)
            insert_user_data_to_firebase(data)  
            // return data
        })
        .then(result=>{
            console.log('逼逼八八',result)
            setThrought('google')
            console.log('應該先做一個登入成功視窗，重新整理畫面我在想一些辦法')
            success('登陸成功')
            setFor_display({display:'none'})
            setTimeout(() => {
                clear()
                setBright({filter: 'brightness(1.0)'})
                console.log("Delayed for 2 second.");
            }, "1500")
            // window.location.reload()
        })
        .catch((error) => {
            // isLoggedIn.current=false
            // console.log(isLoggedIn.current)
            console.log(error)
            console.log(error.code)

            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // // ...
            // console.log( errorCode )
            // console.log( errorMessage )
            // console.log( email )
            // console.log( credential )
        });
    }

    let start_logout = () => {
        signOut(auth)
        .then(() => {
            console.log('登出了')
            success('登出成功')
            setLogin_status('SIGN IN')
            setLogin_name('')
            setLogin_photo('')
            setDis({display:"none"})
            setBright({filter: 'brightness(0.6)'})
            setThrought(null)
            setE_and_p_user(null)
            setGoogle_user(null)
            setTimeout(() => {
                clear()
                setBright({filter: 'brightness(1.0)'})
                console.log("Delayed for 1.5 second.");
            }, "1500")
        }).catch((error) => {
            console.log('error',error)
        });
    }

    let check_if_login = async() => {
        if(email_value!=undefined){
            console.log(email_value)
            setName_value('')
            setEmail_value('')
            setPassword_value('')
        }
        let state = await LoginStatus() // ← from the other components
        console.log(state)
        if(state['state']!=true){
            console.log(state)
            start_login()
            // let data = start_login()
            // console.log(data)
        }else{
            console.log(state)
            start_logout()
            // window.location.reload()
        }
    }

    return (
        <div className='menu-login-with_google'>
            { login_status==='SIGN IN'? (
                <div className='menu-login-google' onClick={check_if_login}>LOGIN WITH GOOGLE</div>
            ):login_status==='LOG OUT'?(
                <div className='menu-signout' onClick={check_if_login}>{login_status}</div>
            ):(
                <div className='menu-signIn-or-out' onClick={check_if_login}>{login_status}</div>
            )}
            <div className="menu-login-info" style={dis}>
                <div className='menu-login_name' >{login_name}</div>
                <img className='menu-login_photo' src={login_photo}/>
            </div>
        </div>
    );
};

export default FirebaseLogin