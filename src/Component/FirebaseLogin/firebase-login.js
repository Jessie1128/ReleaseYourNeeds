import React, { useContext } from "react";
import { db } from "../../connection_firebase/connection_firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider , signOut } from "firebase/auth";
import { collection , getDocs , doc, setDoc , query , where , updateDoc } from "firebase/firestore";
import '../Header/header.css'
import './firebase-login.css'
import LoginStatus from "../LoginStatus/loginStatus";
import { LoginThrouht } from "../ContextFolder/context_folder";
import { E_and_P_user } from "../ContextFolder/context_folder";
import { Brightness } from "../ContextFolder/context_folder";
import { AlertFrame } from "../ContextFolder/context_folder";
import { ForDisplay } from "../ContextFolder/context_folder";
import { Google_user } from "../ContextFolder/context_folder";

const FirebaseLogin = ({ login_status , login_name , login_photo , dis , 
                         setLogin_status, setLogin_name , setLogin_photo , setDis , setName_value , setEmail_value , setPassword_value , email_value }) => {

    const { setGoogle_user } = useContext(Google_user)
    const { setFor_display } = useContext(ForDisplay)
    const { success, clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    const { setE_and_p_user } = useContext(E_and_P_user)
    const { setThrought } = useContext(LoginThrouht)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    let insert_user_data_to_firebase = async(data) => {
        try {
            let get_user = collection(db, "user");
            let res = query(get_user, where("user_email", "==", data['email'])); 
            // console.log(res) 
            let snapshot = await getDocs(res);
            let user_exist
            snapshot.forEach((doc) => {
                user_exist=doc.data()
            })
            if(user_exist===undefined){
                // console.log(data['email'])
                // console.log(data['displayName'])
                // console.log(data['photoURL'])
                await setDoc(doc(db, "user", data['email']),{
                    ['user_email']: data['email'],
                    ['user_displayName']: data['displayName'],
                    ['user_photoURL']: data['photoURL'],
                    ['user_comments']:'',
                    ['user_collection']:[],
                });
                return "新增成功";
            }else{
                if( data['displayName'] != user_exist['user_displayName'] || data['photoURL']!= user_exist['user_photoURL'] ){
                    // console.log('有資料不一樣')
                    const newData = doc(db, "user", data['email']);
                    await updateDoc(newData, {
                        user_photoURL: data['photoURL'],
                        user_displayName: data['displayName']
                    });
                    return "更新成功";
                }else{
                    // console.log('資料完全一樣')
                }
            }

            setGoogle_user(data)
            // console.log(user_exist)
        } catch (error) {
            // console.error(`資料沒有新增成功:${error}`);
            return `failed:${error}`;
        }
    }

    let start_login = () => {
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.languageCode = 'zh-tw';
        provider.setCustomParameters({
            'login_hint': 'xxx@gmail.com',
        });
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // console.log( credential )
            // console.log( credential.idToken )
            // console.log( token )
            // console.log( user )
            const login_user = auth.currentUser;
            if (login_user !== null) {
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                // const emailVerified = user.emailVerified;
                // const uid = user.uid;
                setLogin_status('LOG OUT')
                setLogin_name('歡迎 ， '+displayName)
                setLogin_photo(photoURL)
                setDis({display:"flex"})
                    
                // let exp = new Date();
                // exp.setTime(exp.getTime() + (24*60*1000));
                // let expires = "expires="+ exp.toUTCString();
                // // document.cookie='userName='+displayName+expires+';SameSite=Lax ;path=/';
                // document.cookie='userEmail='+email+expires+';SameSite=Lax ;path=/';
                // // document.cookie='userToken='+token+expires+';SameSite=Lax ;path=/';
                // // document.cookie='userName='+displayName+';SameSite=Lax ;path=/';
                // console.log(document.cookie)
                
                return login_user
                
            }else{
                // console.log(login_user)
            }
        })
        .then((data)=>{
            insert_user_data_to_firebase(data)  
        })
        .then(result=>{
            setThrought('google')
            success('登陸成功')
            setFor_display({display:'none'})
            setTimeout(() => {
                clear()
                setBright({filter: 'brightness(1.0)'})
                console.log("Delayed for 2 second.");
            }, "1500")
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.code)

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
            setName_value('')
            setEmail_value('')
            setPassword_value('')
        }
        let state = await LoginStatus() // ← from the other components
        if(state['state']!=true){
            // console.log(state)
            start_login()
        }else{
            // console.log(state)
            start_logout()
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