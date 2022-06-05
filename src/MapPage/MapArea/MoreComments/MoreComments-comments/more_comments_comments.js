import React , { useState } from "react";
import '../more_comments.css'
import { deleteField , setDoc ,  deleteDoc , getDoc , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt, arrayRemove } from "firebase/firestore";
import { db } from "../../../../connection_firebase/connection_firebase";

const MoreCommentsComments = ({ url , commented_time , commented_inner , user_Name , background , inner ,  get_user_data }) => {

    const [ edit_text , setEdit_text ] = useState(  )

    // <textarea className='edit_review_user_inner' placeholder={commented_inner}></textarea>
    const edit_mes = (e) => {
        console.log(e)
        console.log('我要編輯留言')
    }

    const delete_mes = async(e) => {
        // console.log(e)
        // console.log('我要刪掉留言')
        // console.log(inner)
        // console.log(get_user_data)
        // console.log(get_user_data['login_user']['email'])
        let email = get_user_data['login_user']['email']
        let place = inner['公廁名稱']
        let id=(inner['公廁名稱'].length)*(inner['緯度']+inner['經度'])
        console.log(place)
        console.log(id)
        // await deleteDoc(doc(db, "user", "DC"));


        const data = doc( db, 'user', email );

        // Remove the 'capital' field from the document
        // await setDoc(data, {
        //     user_comments : { [`${place}`] : deleteField() }
        // } , { merge : true } );

        // await updateDoc(doc( db, "comments", inner['公廁名稱']+id ), {
        //     'data': arrayRemove({
        //         ['user_Comments']: "你好",
        //         ['user_Email']: "b19950828@gmail.com"
        //         // user_Name: "林思妤"
        //         // user_img: "https://lh3.googleusercontent.com/a-/AOh14Gg71m-Qf7S_mVdQkOGinlhtMj-ov8ch1Opwn4C8ng=s96-c"
        //     })
        //     // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
        // },{ merge : true })

        const docRef = doc(db, "comments", inner['公廁名稱']+id);
        const docSnap = await getDoc( docRef );
        let res = docSnap.data()
        let new_res = res['data'].filter(item=>item['user_Email']!=email)
        console.log(new_res)


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
                                    <div className='show_full_mes_img' onClick={edit_mes.bind(null,commented_inner)}>
                                        <img className='full_mes_img' src={require('../../../../source/edit.png')}></img>
                                    </div>
                                    <div className='show_full_mes_img' onClick={delete_mes.bind(null,commented_inner)}>
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