import { getAuth , onAuthStateChanged } from "firebase/auth";


const LoginStatus = () => {

    let auth = getAuth();
    let state 

    return new Promise ((reslove,reject)=>{
        onAuthStateChanged(auth, (login_user) => {
            // console.log(login_user)
            if (login_user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = login_user.uid;
                // if(uid!=undefined){
                //     console.log(uid)
                // }else{
                //     console.log('沒有uid')
                // }
                state = true
                reslove({state,login_user})
            } else {
                // console.log(login_user)
                state = false
                reslove(state)
            }
        });
    })
}

export default LoginStatus
