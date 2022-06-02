import './header.css'
import FirebaseLogin from '../FirebaseLogin/firebase-login'
import { useState , useEffect , useCallback , useMemo} from 'react'
import LoginStatus from '../LoginStatus/loginStatus'

const Header = () =>{

    const [ login_status , setLogin_status ] = useState('SIGN IN')
    const [ login_name , setLogin_name ] = useState('')
    const [ login_photo , setLogin_photo ] = useState('')
    const [ dis , setDis ] = useState({display:"none"})
    
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

    return (
        <div className="header-outside-frame">
            <div className="header">
                <div className="title">Release Your Needs</div>
                <div className="menu">
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

export default Header