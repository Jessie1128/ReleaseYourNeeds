import React , { useState } from "react";
import '../more_comments.css'

const MoreCommentsComments = ({ url , commented_time , commented_inner , user_Name , background }) => {

    const [ edit_text , setEdit_text ] = useState(  )

    // <textarea className='edit_review_user_inner' placeholder={commented_inner}></textarea>
    const edit_mes = (e) => {
        console.log(e)
        console.log('我要編輯留言')
    }

    const delete_mes = () => {
        console.log('我要刪掉留言')
    }

    return (
        <>
            <div className='user_commemnts'>
                <div className='user_comment_inner'>
                    <div className='inner_img_frame'>
                        <img src={url} className='inner_img'></img>
                    </div>
                    <div className='inner_text' style={background}>
                        { user_Name===undefined? 
                            (
                                <div className='show_review_user_time'>{commented_time}</div>
                            ):(
                                <div className='show_review_user_time'>{user_Name} ({commented_time})</div>
                            )
                        }
                        {   user_Name===undefined? 
                            (
                                <div contenteditable>
                                    <div className='show_review_user_inner'>{commented_inner}</div>
                                    {/* <textarea readOnly className='edit_review_user_inner' placeholder={commented_inner} ></textarea>  */}
                                </div>
                            ):(
                                <div className='show_review_user_inner'>{commented_inner}</div>
                            )
                        }
                        { user_Name===undefined? 
                            (
                                <div className='show_full_mes'>
                                    <div className='show_full_mes_img' onClick={edit_mes.bind(null,commented_inner,)}>
                                        <img className='full_mes_img' src={require('../../../../source/edit.png')}></img>
                                    </div>
                                    <div className='show_full_mes_img' onClick={delete_mes}>
                                        <img className='full_mes_img' src={require('../../../../source/delete.png')}></img>
                                    </div>
                                </div>
                            ):(
                                <div className='show_full_mes'>
                                    {/* <div className='show_full_mes_mes'>顯示全部內容</div> */}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* <hr/> */}
        </>
    )
}

export default MoreCommentsComments