import React , { useContext } from "react";
import { db } from '../../../connection_firebase/connection_firebase'
import { arrayUnion , arrayRemove , collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt } from "firebase/firestore";
import { Google_user } from "../../../Component/ContextFolder/context_folder";
import { E_and_P_user } from "../../../Component/ContextFolder/context_folder";
import { LoginThrouht } from "../../../Component/ContextFolder/context_folder";

const Lil_bookmarks = () => {

    const { google_user } = useContext(Google_user)
    const { e_and_p_user } = useContext(E_and_P_user)
    const { throught } = useContext(LoginThrouht)

    console.log('google   lililililililik',google_user)
    console.log('E&P      lililililililik',e_and_p_user)
    console.log('lililililililik',throught)
//     console.log(user_email)
//     let get_res = collection(db, "user");
//     let res = query(get_res , where('user_email' , '==' , user_email ));  
// // // database.ref('warehouse/wares').orderByChild('id').equalTo(id)
//     try {
//         console.log('家家家')
//         let snapshot = await getDocs(res);
//         let data
//         snapshot.forEach((doc) => {
//             data=doc.data()
//         })
//         console.log(data['user_collection'])
//         console.log(data['user_collection'][0]===undefined)
//         console.log('家家家',data)
//         if(data['user_collection'][0]===undefined){
//             console.log('沒有任何資料')
//         }else if ((data['user_collection'].indexOf(inner['公廁名稱']) == -1)){
//             console.log('沒有這個地方')
//         }else{
//             setBookmarks_current(true)
//             setBookmarks_color(require('../../../source/mark_yellow.png')) 
//         }
//         console.log(data['user'])

//         if(inner['公廁名稱'] in data['user_comments']){
//             setConfirm_botton('顯示留言')   
//             setCommented(data['user_comments'][inner['公廁名稱']])
//             console.log(commented)
//         }else{
//             console.log('還沒留言喔')
//             setConfirm_botton('ENTER')
//         }
//         // if((data['user_collection'].indexOf(inner['公廁名稱']) == -1)) return
//         // setBookmarks_current(true)
//         // setBookmarks_color(require('../../../source/mark_yellow.png')) 
//     } catch (error) {
//         console.log(error)
//         return 
//     }

    return (
        <div></div>
    )
}

export default Lil_bookmarks
