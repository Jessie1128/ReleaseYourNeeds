import React , { useState , useEffect , useContext } from 'react'
import './check_bookmarks.css'
import { db } from '../../../connection_firebase/connection_firebase'
import AlertBox from '../../../Component/AlertBox/alert_box'
import { arrayUnion , arrayRemove , collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { AlertFrame } from '../../../Component/ContextFolder/context_folder';
import { Brightness } from '../../../Component/ContextFolder/context_folder';
import { clear } from '@testing-library/user-event/dist/clear';
// import { firestore } from 'firebase/firestore'
// import firestore from "firebase/firestore";

const CheckBookmarks = ({ info_board , get_user_data , inner , confirm_hover , setConfirm_hover , 
                          confirm_botton , setConfirm_botton ,  commented , setCommented }) => {

    // const { value , setValue } = useContext(AlertBox);
    const { success , clear , alert_text } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    const [ bookmarks_text , setBookmarks_text ] = useState ('')
    const [ bookmarks_color , setBookmarks_color ] =useState (require('../../../source/mark_white.png'))
    const [ color , setColor ] = useState({background:'none'})
    const [ bookmarks_current , setBookmarks_current ] = useState (false)

    // useEffect(()=>{
    //     setBookmarks_current(false)
    // },[])
    useEffect(()=>{
        if(alert_text===null) return 
        if( alert_text==='登出成功' || alert_text==='登陸成功' ){
            // init_loadBoard()
            // user_data()
            console.log('要做reload')
        }
        if( alert_text==='取消收藏成功') {
            // init_loadBoard()
            // user_data()
            let user_email=get_user_data['login_user']['email']
            user_bookmarks_check(user_email)
            setBookmarks_current(false)
            setBookmarks_color(require('../../../source/mark_white.png')) 
            console.log('要做reload，重新載入收藏')
        }
    },[alert_text])

    const bookmarks_onOver = () => {
        if(!bookmarks_current){
            setBookmarks_text('收藏地點') 
            setColor({background:'#393E41'})
        }else{
            setBookmarks_text('取消收藏') 
            setColor({background:'#393E41'})
        }
    }

    const bookmarks_onOut = () => {
        setBookmarks_text('') 
        setColor({background:'none'})
    }
    
    const bookmarks_onClick = () => {
        setBookmarks_text('') 
        setColor({background:'none'})
        if(!bookmarks_current){
            console.log(get_user_data)
            if(get_user_data===false){
                console.log('還沒有讀到')
                success('請先登錄會員')
                setBright({filter: 'brightness(0.8)'})
                return 
            }
            console.log('我要存資料')
            insert_bookmarks()
        }else{
            console.log(get_user_data)
            if(get_user_data===false){
                console.log('還沒有讀到')
                return
            }
            console.log('我要移除資料')
            remove_bookmarks()
        }
    }

    let user_bookmarks_check = async(user_email) => { // 從 user_Effect 呼叫
        try {
            let get_res = collection(db, "user");
            let res = query(get_res , where('user_email' , '==' , user_email ));  
            let snapshot = await getDocs(res);
            let data
            snapshot.forEach((doc) => {
                data=doc.data()
            })
            console.log(data)
            // if(data['user_collection'][0]===undefined){
            //     console.log('沒有任何資料')
            // }else if ((data['user_collection'].indexOf(inner['公廁名稱']) == -1)){
            //     console.log('沒有這個地方')
            // }else{
            //     setBookmarks_current(true)
            //     setBookmarks_color(require('../../../source/mark_yellow.png')) 
            // }
            if(data['user_collection'][0]===undefined){
                console.log('沒有任何資料')
            }else{

                // let i=0
                for (const item of data['user_collection']) {
                    if(item['info']['place']===inner['公廁名稱']){
                        setBookmarks_current(true)
                        setBookmarks_color(require('../../../source/mark_yellow.png')) 
                        console.log('我有存啊')
                        return
                    }else{
                        setBookmarks_current(false)
                        setBookmarks_color(require('../../../source/mark_white.png')) 
                    }
                    // if(i==2){
                    //     return
                    // }
                    console.log(item)
                    console.log(item['info']['place']===inner['公廁名稱'])
                    console.log(item['info']['place']+'='+inner['公廁名稱'])
                    // console.log(i)
                    // i++

                }

                // data['user_collection'].map(item=>{
                //     console.log(item)
                //     console.log(item['info']['place']===inner['公廁名稱'])
                //     console.log(item['info']['place']+'='+inner['公廁名稱'])
                //     if(item['info']['place']===inner['公廁名稱']){
                //         setBookmarks_current(true)
                //         setBookmarks_color(require('../../../source/mark_yellow.png')) 
                //         console.log('我有存啊')
                //         return
                //     }else{
                //         setBookmarks_current(false)
                //         setBookmarks_color(require('../../../source/mark_white.png')) 
                //         return
                //     }
                // })
            }
            // else{
            //     setBookmarks_current(true)
            //     setBookmarks_color(require('../../../source/mark_yellow.png')) 
            // }
            console.log(data['user'])

            if(inner['公廁名稱'] in data['user_comments']){
                setConfirm_botton('顯示留言')   
                setCommented(data['user_comments'][inner['公廁名稱']])
                console.log(commented)
            }else{
                console.log('還沒留言喔')
                setConfirm_botton('ENTER')
            }
            // if((data['user_collection'].indexOf(inner['公廁名稱']) == -1)) return
            // setBookmarks_current(true)
            // setBookmarks_color(require('../../../source/mark_yellow.png')) 
        } catch (error) {
            console.log(error)
            return 
        }
    }

    let insert_bookmarks = async() => {
        let email = get_user_data['login_user']['email']
        console.log(inner)

        // ===========================================
        let info={}
        info['place']=inner['公廁名稱']
        info['data']=inner
         // ===========================================
        await updateDoc(doc(db, "user", email), {
            // user_collection: arrayUnion(inner)
             // ===========================================
            user_collection: arrayUnion({info})
             // ===========================================
            // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
        })
        console.log(inner['公廁名稱'])
        console.log(get_user_data)
        console.log('我存好了')
        success('收藏成功')
        setBright({filter: 'brightness(0.8)'})
        setTimeout(()=>{
            clear()
            setBright({filter: 'brightness(1.0)'})
        },'1200')

        setBookmarks_current(true)
        setBookmarks_color(require('../../../source/mark_yellow.png')) 
    }

    let remove_bookmarks = async() => {
        let email = get_user_data['login_user']['email']
         // ===========================================
        let info={}
        info['place']=inner['公廁名稱']
        info['data']=inner
         // ===========================================
        await updateDoc(doc(db, "user", email), {
            user_collection: arrayRemove({info})
            // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
        })
        success('取消收藏成功')
        setBright({filter: 'brightness(0.8)'})
        setTimeout(()=>{
            clear()
            setBright({filter: 'brightness(1.0)'})
        },'1200')
        setBookmarks_current(false)
        setBookmarks_color(require('../../../source/mark_white.png')) 
    }

    useEffect(()=>{
        console.log('我要每次點開都有喔')
        console.log('啊哺嚕餔嚕',get_user_data)
        setBookmarks_current(false)
        setBookmarks_color(require('../../../source/mark_white.png')) 
        if( get_user_data==='' || get_user_data===false ){
            console.log('啊哺嚕餔嚕金罵阿眉')
            return 
        }
        console.log('有勒',get_user_data)
        console.log('有勒',get_user_data['login_user']['email'])
        let user_email=get_user_data['login_user']['email']
        user_bookmarks_check(user_email)
    },[info_board,get_user_data ])



    return(
        <div className='placeAddBookmark'
            onMouseOver={bookmarks_onOver}
            onMouseOut={bookmarks_onOut}
            onClick={bookmarks_onClick}
        >
            <div className='bookmarks_text' style={color}>{bookmarks_text}</div>
            <img className='bookmarks_img' src={bookmarks_color}></img>
        </div>
    )
}

export default CheckBookmarks