import React , { useState , useEffect , useContext } from 'react'
import './login_board.css'
import CloseBotton from '../closeBotton/closeBotton'
import FirebaseLogin from '../FirebaseLogin/firebase-login'
import { firebaseConfig , db , connect , auth } from "../../connection_firebase/connection_firebase";
import { collection , getDoc , getDocs , doc, setDoc , query , where  } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword , signOut } from "firebase/auth";
import { AlertFrame } from '../ContextFolder/context_folder';
import { Alert_Box } from '../AlertBox/alert_box';
import { LoginThrouht } from '../ContextFolder/context_folder';

const LoginBoard = ({ setLogin_board , login_status , login_name , login_photo , dis , 
                      setLogin_status, setLogin_name , setLogin_photo , setDis}) => {
                    
    const {  alert_status ,setAlert_status ,alert_text, setAlert_text, success, error, clear, loading } = useContext(AlertFrame)
    const { throught , setThrought } = useContext(LoginThrouht)
    const [ account , setAccount ] = useState('haveAccount')
    const [ name_value , setName_value ] = useState(null)
    const [ email_value , setEmail_value ] = useState(null)
    const [ password_value , setPassword_value ] = useState(null)
    const [ height , setHeight ] = useState(null)
    const [ margin , setMargin ] = useState({marginTop:'10px'})
    const [ hint , setHint ] = useState(null)
    const [ mes , setMes ] = useState(null)

    let auth = getAuth();
    const creat_account = (e) => {
        if(e.target.innerText==='點此註冊'){
            console.log('我在這')
            setAccount('notHaveAccount')
            setHeight(null)
            setHint(null)
            setMargin({marginTop:'10px'})
            setMes('')
            setEmail_value(null)
            setPassword_value(null)
            setName_value(null)
        }else{
            console.log('我在這')
            setAccount('haveAccount')
            setHeight(null)
            setHint(null)
            setMargin({marginTop:'10px'})
            setMes('')
            setEmail_value(null)
            setPassword_value(null)
            setName_value(null)
        }
    }

    useEffect(()=>{
        if(mes!='')return
        setMes(null)
    },[mes])

    const name_input = (e) => {
        // console.log(name_value)
        setName_value(e.target.value) 
    }

    const email_input = (e) => {
        setEmail_value(e.target.value) 
    }

    const password_input = (e) => {
        setPassword_value(e.target.value)
    }

    const start_login = () => {
        console.log(email_value , password_value)
        console.log('我現在要做登入連結')
    }


    const start_compare_exist_email = async() => {
        setThrought('E&P_register')
        const q = query(collection(db, "user"), where("user_email", "==", email_value));
        console.log(email_value)
        const snapshot = await getDocs(q);
        let compare = []
        snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.id)
            console.log(doc.data())
            let data=doc.data()
            compare.push(data['user_email'])
        });
        if(JSON.stringify(compare)===JSON.stringify([])){
            console.log('沒有相同伊妹兒')
            loading('註冊中，請稍候')
        }else{
            console.log('有一樣的完了')
            console.log(compare)
            // clear()
            error('註冊失敗，此 EMAIL 已被使用')
            return
        }
        console.log('我有執行完成')
        start_register()
    }
        
    const insert_user_info = async(res) => {
        console.log(res)
        console.log(res['email'])
        console.log(name_value)
        await setDoc(doc(db, "user", res['email']),{
            ['user_email']: res['email'],
            ['user_displayName']: name_value,
            ['user_photoURL']:'',
            ['user_comments']:'',
            ['user_collection']:[],
        });
        console.log("新增成功");
        console.log('可以溜')
        let ans = await signOut(auth)
        console.log(ans)
        clear()
        success('註冊成功，請用新帳戶登錄')
        setAccount('haveAccount')
        setHeight(null)
        setHint(null)
        setMargin({marginTop:'10px'})
        setMes('')
        setEmail_value(null)
        setPassword_value(null)
        setName_value(null)
    }

    const start_logout = () => {
        return new Promise((reslove,reject)=>{
            signOut()
            .then(function() {
                console.log('我登出了')
                console.log(throught)
                if(true){
                    console.log('可以')
                }
                reslove('logout')
                console.log('最後一步')
                // 登出後強制重整一次頁面
                // window.location.reload();
            }).catch(function(error) {
                reject(error)
                console.log(error.message)
            });
        })
    }

    const start_register = () => {
        // setThrought('E&P_register')
        console.log(name_value , email_value , password_value)
        console.log(email_value, password_value)
        // let auth = getAuth();
        createUserWithEmailAndPassword(auth, email_value, password_value)
        .then((userCredential) => {
            // loading('註冊中，請稍候')
            const user = userCredential.user;
            console.log(user)
            return user
        })
        .then((res)=>{
            console.log(res)
            insert_user_info(res)
        })
        .catch((e) => {
            setThrought(null)
            const errorCode = e.code;
            const errorMessage = e.message;
            if(errorCode==='auth/invalid-email'){
                clear()
                error('註冊失敗，請檢查 EMAIL 欄位格式')
            }else if(errorCode==='auth/weak-password'){
                clear()
                error('註冊失敗，密碼 需要大於六個字母')
            }else if(errorCode==='auth/email-already-in-use'){
                clear()
                error('註冊失敗，此 EMAIL 已被使用')
            }
            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    const email_password_login = (e) => {
        console.log(e.target.innerText)
        console.log('進來了')
        if(e.target.innerText==='登入'){
            console.log(email_value)
            console.log(password_value)
            if( email_value===null || password_value===null ){
                setHint('哎呀！ 欄位不能是空白')
                setHeight({height:'19px'})
                return
            }
            start_login()
        }else if(e.target.innerText==='註冊'){
            if( email_value===null || password_value===null || name_value===null){
                console.log(email_value)
                console.log(password_value)
                setHint('哎呀！ 欄位不能是空白')
                setHeight({height:'19px'})
                setMargin({marginTop:'0px'})
                return
            }
            start_compare_exist_email()
        }
    } 

    return (
            <div className='login_board'>
                <Alert_Box />
                <div className='login_board_close_botton'>
                    <CloseBotton setLogin_board={setLogin_board}/>
                </div>
                <div className='login_without_google'>
                    { account === 'haveAccount' ? (
                        <>
                            <div className='login_without_google_frame'>
                                <div className='login_text'>請輸入帳號密碼</div>
                                <div className='login_text_input'>
                                    <input placeholder='輸入EMAIL' className='email_password' onChange={email_input} value={mes}></input>
                                    <input placeholder='輸入PASSWORD' className='email_password' onChange={password_input} type='password' value={mes}></input>
                                </div>
                                <div className='start_login_without_google'>
                                    <div className='start_login_without_google_inner' onClick={email_password_login}>登入</div>
                                </div>
                                <div className='hint'>
                                    <div className='hint_inner' style={height} >{hint}</div>
                                </div>
                            </div>
                            <div className='hr'>
                                <hr className='login_board_hr'/>
                                <div className='register'>還沒有帳戶？
                                    <span className='register_inner' onClick={creat_account}>點此註冊</span>
                                </div>
                            </div>
                        </>
                    ):(
                        <>
                            <div className='login_without_google_frame'>
                                <div className='login_text_register'>請輸入註冊資訊</div>
                                <div className='login_text_input'>
                                    <input placeholder='輸入帳號名稱' className='email_password_register' onChange={name_input} value={mes}></input>
                                    <input placeholder='輸入EMAIL' className='email_password_register' onChange={email_input} value={mes}></input>
                                    <input placeholder='輸入PASSWORD' className='email_password_register' onChange={password_input} type='password' value={mes}></input>
                                </div>
                                <div className='start_login_without_google'>
                                    <div className='start_login_without_google_register' style={margin} onClick={email_password_login}>註冊</div>
                                </div>
                                <div className='hint'>
                                    <div className='hint_inner' style={height} >{hint}</div>
                                </div>
                            </div>
                            <div className='hr'>
                                <hr className='login_board_hr'/>
                                <div className='register'>已經有帳戶？
                                    <span className='register_inner' onClick={creat_account}>點此登入</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
                <div className='login_with_google'>
                    <div className='google_img_frame'>
                        <img src={require('../../source/google.png')} className='google_img'/>
                    </div>
                    <div className='google_text'>
                        <FirebaseLogin  
                            login_status={login_status}
                            login_name={login_name}
                            login_photo={login_photo}
                            dis={dis}
                            setLogin_status={setLogin_status}
                            setLogin_name={setLogin_name}
                            setLogin_photo={setLogin_photo}
                            setDis={setDis}
                        />
                    </div>
                </div>
            </div>
    )
}

export default LoginBoard