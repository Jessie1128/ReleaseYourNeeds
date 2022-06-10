import React , { useState , useEffect , useContext } from 'react'
import './review_comments.css'
import LoginStatus from '../../../Component/LoginStatus/loginStatus'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect'
import { db } from '../../../connection_firebase/connection_firebase'
import { serverTimestamp , setDoc , addDoc , arrayUnion , arrayRemove , collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt } from "firebase/firestore";
import More_Comments from '../MoreComments/more_comments'
import { E_and_P_user } from '../../../Component/ContextFolder/context_folder'

const Review_Comments = ({ url , info_board , confirm_hover , setConfirm_hover , top , setTop , inner ,  get_user_data ,
                           click_and_more_comments , setClick_and_more_comments , commented , setCommented , setComment_exist }) => {

    const { e_and_p_user } = useContext(E_and_P_user)
    const [ commented_inner , setCommented_inner ] = useState(null)
    const [ commented_time , setCommented_time ] = useState(null)
    let [ E_and_P_noPhoto , setE_and_P_noPhoto ] = useState(null) // 這邊先處理 E&P 的暫定大頭照

    useEffect(()=>{
        console.log(e_and_p_user)
        // console.log(e_and_p_user['displayName'])
        console.log(url)
        console.log(get_user_data)
        if(commented===null) return
        if(get_user_data===undefined||get_user_data===''||get_user_data===null||get_user_data===false) return
        if(get_user_data['login_user']['photoURL']===null){ // 這邊先處理 E&P 的暫定大頭照
            setE_and_P_noPhoto( e_and_p_user['displayName'].charAt(0))
        }
        console.log('嗨嗨一',commented)
        let time = commented['create_at']['seconds']
        time=JSON.stringify(new Date(time*1000))
        time=time.replaceAll('"','').split('T')
        console.log(time[0])
        setCommented_inner(commented['comments'])
        setCommented_time(time[0]+' 已留言：')
    },[commented])

    const comments_frame_mouseOver = () => {
        setConfirm_hover({display:'flex'})
    }

    const comments_frame_mouseOut = () => {
        setConfirm_hover({display:'none'})
    }

    const show_review_user_comments = () => {

        console.log('我要打開留言視窗')
        setClick_and_more_comments('關閉留言')
        setTop({top:'22px'})
    }

    return (
        <div style={{display:'block'}}>
            <div className='review_comments_frame'
                onMouseOver={comments_frame_mouseOver}
                onMouseOut={comments_frame_mouseOut}
            >
                <div>
                    <div className='review_user_img_frame'>
                    { url === 'E&P_noPhotoYet' ? (
                        <div className='review_user_no_photo'>{E_and_P_noPhoto}</div>
                    ):(
                        <img className='review_user_img_src' src={url} ></img>
                    )}
                        <div className='review_user_img_comments'>
                            <div className='review_user_text'>
                                <div className='review_user_time'>{commented_time}</div>
                                <div className='review_user_inner'>{commented_inner}</div>
                            </div>
                        </div>
                    </div>
                    <div className='review_user_img_confirm' style={confirm_hover}>
                        <div className='review_user_img_confirm_text' onClick={show_review_user_comments}>顯示、編輯留言</div>
                    </div>
                </div>
            </div>
            <More_Comments 
                get_user_data={get_user_data}
                info_board={info_board}
                top={top} 
                setTop={setTop} 
                click_and_more_comments={click_and_more_comments} 
                setClick_and_more_comments={setClick_and_more_comments}
                url={url}
                commented={commented}
                commented_inner={commented_inner}
                commented_time={commented_time}
                inner={inner}
                setCommented={setCommented}
                setComment_exist={setComment_exist}
            />
        </div>
    )
}

export default Review_Comments