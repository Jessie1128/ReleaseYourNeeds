import './header.css'
import FirebaseLogin from '../FirebaseLogin/firebase-login'
import { useState , useEffect , useCallback , useMemo , useContext } from 'react'
import LoginStatus from '../LoginStatus/loginStatus'
import LoginBoard from '../LoginBoard/login_board'
import { LoginThrouht } from '../ContextFolder/context_folder'
import { Brightness } from '../ContextFolder/context_folder'
import { E_and_P_user } from '../ContextFolder/context_folder'
import { clear } from '@testing-library/user-event/dist/clear'
import { AlertFrame } from '../ContextFolder/context_folder'
import { ForDisplay } from '../ContextFolder/context_folder'
import { Alert_Box } from '../AlertBox/alert_box';
import { db } from "../../connection_firebase/connection_firebase";
import { collection , getDocs , query , where  } from "firebase/firestore";
import { getAuth , signOut } from "firebase/auth";
import { Google_user } from '../ContextFolder/context_folder'

const Header = () =>{

    const { setGoogle_user } = useContext(Google_user)
    const { for_display , setFor_display } =useContext(ForDisplay)
    const { success, error, clear } = useContext(AlertFrame)
    const { e_and_p_user , setE_and_p_user } = useContext(E_and_P_user)
    const { bright , setBright } = useContext(Brightness)
    const { throught , setThrought } = useContext(LoginThrouht)
    const [ login_status , setLogin_status ] = useState('SIGN IN')
    const [ login_name , setLogin_name ] = useState('')
    const [ login_photo , setLogin_photo ] = useState('')
    const [ dis , setDis ] = useState({display:"none"})
    const [ login_board , setLogin_board ] = useState(null)
    const [ e_and_p_user_name, setE_and_p_user_name ] = useState(null)
    const [ e_and_p_user_photo , setE_and_p_user_photo ] = useState(null)
    
    // let res

    let state = async() => {
        let res = await LoginStatus()
        console.log(res)
        setFor_display({display:'none'})
        if(res['state']===true && res['login_user']['displayName']===null ){
            console.log(res['login_user'])
            console.log(res['login_user']['displayName'])
            console.log(res['login_user']['email'])
            console.log(e_and_p_user)
            // if(res['login_user']['displayName']=null){
            try {
                const q = query(collection(db, "user"), where("user_email", "==", res['login_user']['email']));
                const snapshot = await getDocs(q);
                let info = {}
                info['user']=res
                snapshot.forEach((doc) => {
                    console.log(doc.data())
                    let data=doc.data()
                    info['displayName']=data['user_displayName']
                });
                if(res['login_user']['photoURL']===null){
                    info['no_photo']=info['displayName'].charAt(0)
                }
                console.log('我希望資料完整',info)
                setE_and_p_user(info) 
                setThrought('E&P_login') 
            } catch (e) {
                console.log(e)
                error('系統忙碌中！請稍後再試')
            }
            console.log(e_and_p_user)
            console.log('這邊')
        }else if(res['state']===true){
            setThrought('google')
            setGoogle_user(res)
            setLogin_status('LOG OUT')
            setLogin_name('歡迎 ， '+res['login_user']['displayName'])
            setLogin_photo(res['login_user']['photoURL'])
            setDis({display:"flex"})
        }else{
            console.log(throught)
            console.log('還沒登陸')
        }
    }

    // useEffect(()=>{
    //     let state = async() => {
    //         let res = await LoginStatus()
    //         // console.log(res)
    //         if(res['state']===true){
    //             setLogin_status('LOG OUT')
    //             setLogin_name('歡迎 ， '+res['login_user']['displayName'])
    //             setLogin_photo(res['login_user']['photoURL'])
    //             setDis({display:"flex"})
    //         }else{
    //             console.log('還沒登陸')
    //         }
    //         return () => {
    //             console.info('Bye!') // 👍 
    //         };
    //     }
    //     state();
    // },[])

    
    // useMemo(()=>{ 
    //     console.log('有在動')         
    //     state();
    // },[])

    useEffect(()=>{ 
        console.log('有在動')         
        state();
    },[])

    const E_and_P_logout = async() => {
        let auth = getAuth();
        let ans = await signOut(auth)
        console.log(ans)
        success('登出成功！')
        setBright({filter: 'brightness(0.6)'})
        setThrought(null)
        setTimeout(() => {
            clear()
            setBright({filter: 'brightness(1.0)'})
            console.log("Delayed for 1.5 second.");
        }, "1500")
    }

    useEffect(()=>{
        if( e_and_p_user===null || e_and_p_user==='' || e_and_p_user===undefined ) return
        clear()
        // success('登陸成功')                    ← ← ← ← ← 會造成驗證使用者是否登陸的時候，一直自己跳出來，不要放這邊      
        // setFor_display({display:'none'})      ← ← ← ← ← 會造成驗證使用者是否登陸的時候，一直自己跳出來，不要放這邊
        console.log('我要看這邊',e_and_p_user)
        console.log('我要看這邊',e_and_p_user['displayName'])
        console.log('我要看這邊',e_and_p_user['user'])
        // setTimeout(() => {                              ← ← ← ← ← 會造成驗證使用者是否登陸的時候，一直自己跳出來，不要放這邊
        //     clear()
        //     setBright({filter: 'brightness(1.0)'})
        //     console.log("Delayed for 2 second.");
        // }, "1500")                                      ← ← ← ← ← 會造成驗證使用者是否登陸的時候，一直自己跳出來，不要放這邊
    },[e_and_p_user])

    const login_or_logout = () => {
        if(login_status==='SIGN IN'){
            console.log('我要大改')
            setBright({filter: 'brightness(0.6)'})
            setFor_display({display:''})
            setLogin_board(
                <LoginBoard 
                    setLogin_board={setLogin_board}  
                    login_status={login_status}
                    login_name={login_name}
                    login_photo={login_photo} 
                    dis={dis} 
                    setLogin_status={setLogin_status}
                    setLogin_name={setLogin_name}
                    setLogin_photo={setLogin_photo}
                    setDis={setDis}
                />
            )
        }else{
            console.log('我要大改登出系統')
            console.log('這邊做登出')
        }
    }

    return (
        <div className="header-outside-frame">
            {login_board}
            <div className="header" style={bright}>
                <div className="title">Release Your Needs</div>
                
                <div className="menu">
                {/* <LoginBoard/> */}
                {throught==='google'?(
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
                ):throught==='E&P_login' ?(
                    
                    <div className='E_and_P_login'>
                        { e_and_p_user!=''? (
                            <div className='E_and_P_logout' onClick={E_and_P_logout}>LOG OUT</div>
                        ):(
                            <></>
                        )}
                        <div className='E_and_P_frame'>
                            <div className='E_and_P_login_name'>歡迎，{e_and_p_user['displayName']}</div>
                            { e_and_p_user['user']['photoURL']===null? (
                                <div className='E_and_P_no_photo'>{e_and_p_user['no_photo']}</div>
                            ): e_and_p_user['user']['login_user']['photoURL']===null?(
                                <div className='E_and_P_no_photo'>{e_and_p_user['no_photo']}</div>
                            ):(
                                <img className='E_and_P_login_photo' src={e_and_p_user['photoURL']}/>
                            )}
                        </div>
                    </div>
                ):(
                    <div className='menu_login_botton_height'>
                    <div className='menu_login_botton' onClick={login_or_logout}>
                        {/* <div className='menu_login_botton_height'> */}
                            {login_status}
                        {/* </div> */}
                    </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Header