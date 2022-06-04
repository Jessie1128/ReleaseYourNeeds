import React , { useState , useEffect } from 'react'
import './comments.css'
import LoginStatus from '../../Component/LoginStatus/loginStatus'
import Loading_effect from '../../Component/LoadingEffect/loadingEffect'
import { db } from '../../connection_firebase/connection_firebase'
import { serverTimestamp , setDoc , addDoc , arrayUnion , arrayRemove , collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt } from "firebase/firestore";
import More_Comments from '../MapArea/MoreComments/more_comments'

const Comments = ({ url , info_board , inner , get_user_data , comment_exist , setComment_exist , 
                    confirm_hover , setConfirm_hover , confirm_botton , setConfirm_botton ,
                    top , setTop , click_and_more_comments , setClick_and_more_comments  }) => {
    // console.log('哇啦哇啦',url)
    // let [ top , setTop ] = useState ({top:'480px'})
    // let [ click_and_more_comments , setClick_and_more_comments ] = useState ('查看更多留言...')
    // let [ loading , setLoading ] = useState (<Loading_effect />)
    const [ user_img_display , setUser_img_display] = useState({display:'none'})
    const [ user_img_comments_width, setUser_img_comments_width ] = useState({width:'236px',paddingLeft:'0px'})
    const [ user_img_input_width, setUser_img_input_width ] = useState({width:'236px'})
    // const [ confirm_hover , setConfirm_hover ] = useState ({display:'none'})
    const [ user_comments , setUser_comments] = useState(null)
    // const [ confirm_botton , setConfirm_bottom ] =useState('查看評論')
    // const [ user_img_comments_padding_left, setUser_img_comments_padding_left ] = useState({paddingLeft:'0px'})

    // function getWindowDimensions() {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     console.log('螢幕寬',width)
    //     console.log('螢幕高',height)
    //     if(width<500){
    //         console.log('逼逼逼逼逼逼逼')
    //     }
    //     return {
    //         width,
    //         height
    //     };
    // }
    // getWindowDimensions()


    // useEffect(()=>{
    //     if(comment_exist===false){
    //         console.log(comment_exist)
    //         console.log('comment_exist===false')
    //         return
    //     }
    //     console.log(comment_exist)
    //     console.log('comment_exist===true')
    // },[comment_exist])

    useEffect(()=>{
        if(url===''){
            console.log('沒有照片呀')
        }else{
            setUser_img_display({display:'flex'})
            setUser_img_comments_width({width:'190px',marginLeft:'5px'})
            setUser_img_input_width({width:'190px'})
        }
        console.log('有執行')
        console.log(url)
    },[url])

    // useEffect(()=>{
    //     console.log('我會每次都有嗎')
    //     setTop({top:'480px'})
    //     setClick_and_more_comments('查看更多留言...')
    // },[info_board])

    // const more_comments_onClick = () => {
    //     if(click_and_more_comments==='查看更多留言...'){
    //         setClick_and_more_comments('關閉留言')
    //         setTop({top:'22px'})
    //     }else{
    //         setClick_and_more_comments('查看更多留言...')
    //         setTop({top:'480px'})
    //     }
    // }

    const comments_frame_mouseOver = () => {
        setConfirm_hover({display:'flex'})
    }

    const comments_frame_mouseOut = () => {
        setConfirm_hover({display:'none'})
    }


    let insert_comment_to_db = async(user_comments) => { // 從 user_Effect 呼叫
        // console.log(inner['緯度'],inner['經度'])
        // console.log(inner['緯度']+inner['經度'])
        // console.log(inner['公廁名稱'].length)
        // console.log(inner['公廁名稱']+id)
        // console.log(typeof(inner['公廁名稱']+id))
        // console.log(email)
        // console.log(name)
        // console.log(user_comments)
        if(user_comments===null){
            console.log('沒有打字')
            console.log('這邊要做 不能存空的留言 提示框')
            return
        }
        let info = {}
        let By_Place={}
        let info_in_array={}
        let email = get_user_data['login_user']['email']
        let name = get_user_data['login_user']['displayName']
        let id=(inner['公廁名稱'].length)*(inner['緯度']+inner['經度'])
        info['comments']=user_comments
        info['create_at']=serverTimestamp()
        By_Place[inner['公廁名稱']]=info
        info_in_array['user_Email']=email
        info_in_array['user_Name']=name
        info_in_array['user_Comments']=user_comments
        info_in_array['user_img']=url
        info_in_array['create_at']=new Date()
        console.log(info)
        console.log(info_in_array)
        // let res = query(get_res , where('user_email' , '==' , user_email ));  
        // // database.ref('warehouse/wares').orderByChild('id').equalTo(id)
        try {
            // await db.collection("users").doc(email).update({
            //     user_comments: {
            //       food: "Ice Cream"
            //     }})
            // for(let i=0; i<10 ; i++){
            //     await setDoc(doc(db, "comments", inner['公廁名稱']+id), {
            //         'data': arrayUnion(info_in_array)
            //         // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            //     },{ merge : true })
            // }

            await setDoc(doc(db, "user", email), {
                user_comments:By_Place
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            },{ merge : true })

            await setDoc(doc(db, "comments", inner['公廁名稱']+id), {
                'data': arrayUnion(info_in_array)
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            },{ merge : true })

            console.log(inner['公廁名稱'])
            console.log(get_user_data)
            console.log('我存好了')
            console.log('這邊要做 成功留言 提示框')
            setComment_exist(true)
        } catch (error) {
            console.log(error)
            console.log('這邊要做 留言失敗 提示框')
            return 
        }
    }

    const user_img_confirm_text_click = () => {
        console.log('按下')
        console.log(user_comments)
        if(get_user_data===false){
            console.log('還沒有讀到')
            return 
        }
        if(user_comments===''){
            console.log('這邊要做沒有輸入文字的警告')
            return
        }
        insert_comment_to_db(user_comments)
    }

    const user_comments_typing = (e) => {
        setUser_comments(e.target.value)
    }

    return (
        <div style={{display:'block'}}>
            <div className='comments_frame'
                onMouseOver={comments_frame_mouseOver}
                onMouseOut={comments_frame_mouseOut}
            >
                <div>
                    <div className='user_img_frame'>
                        <img className='user_img_src' src={url} style={user_img_display}></img>
                        <div className='user_img_comments' style={user_img_comments_width} >
                            <textarea 
                                placeholder='寫下你的留言...'
                                className='user_img_input'
                                style={user_img_input_width}
                                onChange={user_comments_typing}
                            />
                        </div>
                    </div>
                    <div className='user_img_confirm' style={confirm_hover}>
                        <div className='user_img_confirm_text' onClick={user_img_confirm_text_click}>{confirm_botton}</div>
                    </div>
                </div>
            </div>
            <More_Comments 
                info_board={info_board}
                top={top} 
                setTop={setTop} 
                click_and_more_comments={click_and_more_comments} 
                setClick_and_more_comments={setClick_and_more_comments}
                url={url}
                inner={inner}
            />
        </div>
    )
}

export default Comments