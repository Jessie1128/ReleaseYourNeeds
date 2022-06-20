import React , { useState , useEffect , useContext } from 'react'
import './comments.css'
import { db } from '../../../connection_firebase/connection_firebase'
import { serverTimestamp , setDoc , arrayUnion , doc } from "firebase/firestore";
import More_Comments from '../MoreComments/more_comments'
// import { AlertFrame } from '../../Component/ContextFolder/context_folder'
// import { AlertBox } from '../../Component/AlertBox/alert_box'
import { LoginThrouht } from '../../../Component/ContextFolder/context_folder'
import { E_and_P_user } from '../../../Component/ContextFolder/context_folder'
import { AlertFrame } from '../../../Component/ContextFolder/context_folder' 
import { Brightness } from '../../../Component/ContextFolder/context_folder'

const Comments = ({ url , info_board , inner , get_user_data , comment_exist , setComment_exist , 
                    confirm_hover , setConfirm_hover , confirm_botton , setConfirm_botton ,
                    top , setTop , click_and_more_comments , setClick_and_more_comments , setCommented }) => {


    const { e_and_p_user } = useContext(E_and_P_user)
    const { throught } = useContext(LoginThrouht)
    const { success , clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    const [ user_img_display , setUser_img_display] = useState({display:'none'})
    const [ user_img_comments_width_css, setUser_img_comments_width_css ] = useState('user_img_comments')
    const [ user_img_input_width_css, setUser_img_input_width_css ] =useState('user_img_input')
    const [ user_comments , setUser_comments] = useState('')
    let [ E_and_P_noPhoto , setE_and_P_noPhoto ] = useState(null) // 這邊先處理 E&P 的暫定大頭照

    useEffect(()=>{
        if(get_user_data===false){
            setUser_img_comments_width_css('user_img_comments')
            setUser_img_input_width_css('user_img_input')
        }
        if(get_user_data===undefined||get_user_data===''||get_user_data===null||get_user_data===false){
            return
        }else if(get_user_data['login_user']['photoURL']===null){ // 這邊先處理 E&P 的暫定大頭照
            // console.log(get_user_data)
            // console.log(get_user_data['login_user'])
            // console.log(get_user_data['login_user']['photoURL'])
            setE_and_P_noPhoto( get_user_data['login_user']['email'].charAt(0))
        }
        if(url===''){
            // console.log('error')
        }else{
            setUser_img_display({display:'flex'})
            setUser_img_comments_width_css('user_img_comments_login')
            setUser_img_input_width_css('user_img_input_login')
        }
    },[url])

    const comments_frame_mouseOver = () => {
        setConfirm_hover({display:'flex'})
    }

    const comments_frame_mouseOut = () => {
        setConfirm_hover({display:'none'})
    }


    let insert_comment_to_db = async(user_comments) => { // 從 user_Effect 呼叫
        if(user_comments===null){
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
        info_in_array['user_Comments']=user_comments
        info_in_array['create_at']=new Date()
        if(throught==='E&P_login' && name===null){
            info_in_array['user_Name']=e_and_p_user['displayName']
            info_in_array['user_img']=''
            // console.log('非google登陸用戶')
        }else{
            info_in_array['user_Name']=name
            info_in_array['user_img']=url
        }
        try {
            await setDoc(doc(db, "user", email), {
                user_comments:By_Place
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            },{ merge : true })

            await setDoc(doc(db, "comments", inner['公廁名稱']), {
                'data': arrayUnion(info_in_array)
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            },{ merge : true })

            setComment_exist(true)
            setCommented(info_in_array)
            success('新增留言成功')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                clear()
                setBright({filter: 'brightness(1.0)'})
            },'1500')
        } catch (error) {
            console.log(error)
            return 
        }
    }

    const user_img_confirm_text_click = () => {
        if(get_user_data===false){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                setBright({filter: 'brightness(1.0)'})
                clear()
            },'1500')
        }else if(user_comments===''){
            success('哎呀！留言內容不能是空白的')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(() => {                            
                clear()
                setBright({filter: 'brightness(1.0)'})
            }, "1000")   
        }else{
            insert_comment_to_db(user_comments)
        }
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
                        { get_user_data===false || throught===null?(
                            <></>
                        ):url === 'E&P_noPhotoYet' ? (
                            <div className='user_img_no_photo' style={user_img_display}>{E_and_P_noPhoto}</div>
                        ):(
                            <img className='user_img_src' src={url} style={user_img_display}></img>
                        )}
                        <div className={user_img_comments_width_css} >
                            <textarea 
                                placeholder='寫下你的留言...'
                                className={user_img_input_width_css}
                                onChange={user_comments_typing}
                                value={user_comments}
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
                comment_exist={comment_exist}
                get_user_data={get_user_data}
                setComment_exist={setComment_exist}
                setCommented={setCommented}
            />
        </div>
    )
}

export default Comments