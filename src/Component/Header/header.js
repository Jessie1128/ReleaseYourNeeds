import './header.css'
import FirebaseLogin from '../FirebaseLogin/firebase-login'
import { useState , useEffect , useCallback , useMemo , useContext } from 'react'
import LoginStatus from '../LoginStatus/loginStatus'
import LoginBoard from '../LoginBoard/login_board'
import { LoginThrouht } from '../ContextFolder/context_folder'
import { Brightness } from '../ContextFolder/context_folder'
import { E_and_P_user } from '../ContextFolder/context_folder'
import { AlertFrame } from '../ContextFolder/context_folder'
import { ForDisplay } from '../ContextFolder/context_folder'
// import { Alert_Box } from '../AlertBox/alert_box';
import { db } from "../../connection_firebase/connection_firebase";
import { collection , getDocs , query , where  } from "firebase/firestore";
import { getAuth , signOut } from "firebase/auth";
import { Google_user } from '../ContextFolder/context_folder'
import { Link } from "react-router-dom";

const Header = () =>{

    const { setGoogle_user } = useContext(Google_user)
    const { setFor_display } =useContext(ForDisplay)
    const { success, error, clear } = useContext(AlertFrame)
    const { e_and_p_user , setE_and_p_user } = useContext(E_and_P_user)
    const { bright , setBright } = useContext(Brightness)
    const { throught , setThrought } = useContext(LoginThrouht)
    const [ login_status , setLogin_status ] = useState('SIGN IN')
    const [ login_name , setLogin_name ] = useState('')
    const [ login_photo , setLogin_photo ] = useState('')
    const [ dis , setDis ] = useState({display:"none"})
    const [ login_board , setLogin_board ] = useState(null)
    // const [ e_and_p_user_name, setE_and_p_user_name ] = useState(null)
    // const [ e_and_p_user_photo , setE_and_p_user_photo ] = useState(null)
    
    let state = async() => {
        let res = await LoginStatus()
        setFor_display({display:'none'})
        if(res['state']===true && res['login_user']['displayName']===null ){
            try {
                const q = query(collection(db, "user"), where("user_email", "==", res['login_user']['email']));
                const snapshot = await getDocs(q);
                let info = {}
                info['user']=res
                snapshot.forEach((doc) => {
                    let data=doc.data()
                    info['displayName']=data['user_displayName']
                });
                if(res['login_user']['photoURL']===null){
                    info['no_photo']=info['displayName'].charAt(0)
                }
                setE_and_p_user(info) 
                setThrought('E&P_login') 
            } catch (e) {
                console.log(e)
                error('系統忙碌中！請稍後再試')
            }
        }else if(res['state']===true){
            setThrought('google')
            setGoogle_user(res)
            setLogin_status('LOG OUT')
            setLogin_name('歡迎 ， '+res['login_user']['displayName'])
            setLogin_photo(res['login_user']['photoURL'])
            setDis({display:"flex"})
        }else{
        }
    }

    useEffect(()=>{        
        state();
    },[])

    const E_and_P_logout = async() => {
        let auth = getAuth();
        let ans = await signOut(auth)
        success('登出成功')
        setE_and_p_user(null)
        setBright({filter: 'brightness(0.8)'})
        setThrought(null)
        setTimeout(() => {
            clear()
            setBright({filter: 'brightness(1.0)'})
        }, "1500")
    }

    const login_or_logout = () => {
        if(login_status==='SIGN IN'){
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
        }
    }

    return (
        <div className="header-outside-frame">
            <div className='header_color'>
                {login_board}
                <div className="header" style={bright}>
                <nav> 
                    <Link to="/" className='title'>Release Your Needs</Link> 
                </nav>
                    <div className="menu">
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
                                {login_status}
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header