import './header.css'
import FirebaseLogin from '../FirebaseLogin/firebase-login'
import { useState , useEffect , useCallback , useMemo , useContext } from 'react'
import LoginStatus from '../LoginStatus/loginStatus'
import LoginBoard from '../LoginBoard/login_board'
import { LoginThrouht } from '../ContextFolder/context_folder'

const Header = () =>{

    const { throught , setThrought } = useContext(LoginThrouht)
    const [ login_status , setLogin_status ] = useState('SIGN IN')
    const [ login_name , setLogin_name ] = useState('')
    const [ login_photo , setLogin_photo ] = useState('')
    const [ dis , setDis ] = useState({display:"none"})
    const [ login_board , setLogin_board ] = useState(null)
    
    let res
    let state = async() => {
        res = await LoginStatus()
        console.log(res)
        if(res['state']===true){
            setLogin_status('LOG OUT')
            setLogin_name('歡迎 ， '+res['login_user']['displayName'])
            setLogin_photo(res['login_user']['photoURL'])
            setDis({display:"flex"})
        }else{
            console.log('還沒登陸')
        }
    }

    useMemo(()=>{ 
        console.log('有在動')         
        state();
    },[])

    const login_or_logout = () => {
        if(login_status==='SIGN IN'){
            console.log('我要大改')
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
        }
    }

    return (
        <div className="header-outside-frame">
            {login_board}
            <div className="header">
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
                ):throught==='emailANDpassword' ?(
                    <div>我現在是通過firebase</div>
                ):(
                    <div className='menu_login_botton' onClick={login_or_logout}>
                        {login_status}
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Header