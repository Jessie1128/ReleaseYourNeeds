import React , { useState , useEffect , useContext } from "react";
import '../more_comments.css'
import { deleteField , setDoc , toDate , getDoc , doc , updateDoc  } from "firebase/firestore";
import { db , storage } from "../../../../connection_firebase/connection_firebase";
import { E_and_P_user } from "../../../../Component/ContextFolder/context_folder";
import { Google_user } from "../../../../Component/ContextFolder/context_folder";
import { AlertFrame } from "../../../../Component/ContextFolder/context_folder";
import { LoginThrouht } from "../../../../Component/ContextFolder/context_folder";
import { Brightness } from "../../../../Component/ContextFolder/context_folder";
import { ref , getDownloadURL } from "firebase/storage";

const MoreCommentsComments = ({ url , commented_time , commented_inner , user_Name , background , inner ,  get_user_data , 
                                setFiltered_comments , setGet_exist_comment , setCommented , setTop , setComment_exist , setClick_and_more_comments }) => {

    const { setBright } = useContext(Brightness)
    const { e_and_p_user } = useContext(E_and_P_user)
    const { google_user } = useContext(Google_user)
    const { success , alert_text , clear } = useContext(AlertFrame)
    const [ edit_text , setEdit_text ] = useState(null)
    const [ editable , setEditable ] = useState(false)
    const [ editable_style , setEditable_style ] = useState('show_review_user_inner')
    let [ display , setDisplay ] = useState({display:'none'})
    const [ ori_text , setOri_text ] = useState(commented_inner)
    const [ delete_img , setDelete_img ] = useState('')

    useEffect(()=>{
        getDownloadURL(ref(storage, 'gs://mymap-896b7.appspot.com/delete.png'))
        .then((delete_img)=>{
            setDelete_img(delete_img)
        })
    },[])

    useEffect(()=>{
        if(get_user_data===undefined||get_user_data===''||get_user_data===null||get_user_data===false){
            return
        }
        setOri_text(commented_inner)
    },[commented_inner])

    useEffect(()=>{
        if( alert_text==='??????????????????'){
            let email
            if( e_and_p_user!=null){
                // console.log(e_and_p_user)
                // console.log('?????????????????????')
                if(e_and_p_user['user']['email']===undefined){
                    email=e_and_p_user['user']['login_user']['email']
                }else{
                    email=e_and_p_user['user']['email']
                }
            }else{
                // console.log(google_user)
                // console.log('???google??????')
                if(email=google_user['email']===undefined){
                    email=google_user['login_user']['email']
                }else{
                    email=google_user['email']
                }
            }
        }else{
            return
        }
    },[alert_text])

    // const init_textarea = (e) => {
    //     console.log(e)
    // }

    // const edit_mes = (e) => {
    //     console.log(e)
    //     setEditable(true)
    //     setEditable_style('edit_review_user_inner')
    //     setDisplay({display:'flex'})
    // }

    const confirm_onclick = (e) => {
        // console.log(e)
    }

    const cancel_onclick = () => {
        Promise.resolve().then(() => {
            setOri_text(commented_inner)
        })
        .then(()=>{
            setEditable(false)
            setEditable_style('show_review_user_inner')
            setDisplay({display:'none'})
        })
    }

    const onInput = (e) => {
        // console.log(ori_text)
        // console.log(commented_inner)
        setEdit_text(e.target.innerHTML)
        // console.log(edit_text)
    }

    const set_set = () => {
        setTop({top:'480px'})
        setComment_exist(false)
        setCommented(null)
        setClick_and_more_comments('??????????????????...')
        success('??????????????????')
        setBright({filter: 'brightness(0.8)'})
        setTimeout(()=>{
            clear()
            setBright({filter: 'brightness(1.0)'})
        },'1500')
    }

    const delete_mes = async(e) => {
        let email = get_user_data['login_user']['email']
        let place = inner['????????????']
        let id=(inner['????????????'].length)*(inner['??????']+inner['??????'])

        try {
            let data = doc( db, 'user', email );
            await setDoc(data, {
                user_comments : { [`${place}`] : deleteField() }
            } , { merge : true } );

            const docRef = doc(db, "comments", inner['????????????']);
            const docSnap = await getDoc( docRef );
            let res = docSnap.data()
            // console.log(res)
            let new_res = res['data'].filter(item=>item['user_Email']!=email)
            if( JSON.stringify(new_res) == []){
                // console.log('????????????????????????????????????')
            } 
            // console.log(new_res)
            let ans = await updateDoc(doc(db, "comments", inner['????????????']), {
                data: new_res
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['????????????']])
            })
            set_set()
            // console.log(ans)   
            if( JSON.stringify(new_res) == JSON.stringify([])){
                // console.log('????????????????????????????????????')
            } 
        } catch (e) {
            console.log(e)
            // console.log('???????????????????????? ?????? ?????????')
        }
    }

    return (
        <>
            <div className='user_commemnts'>
                <div className='user_comment_inner'>
                    { url === '' && user_Name !='' ? (
                        <div className='inner_img_frame'>
                            <div className='inner_img_no_photo'>{user_Name.charAt(0)}</div>   {/* ????????????????????????????????? */}
                        </div>
                    ):url === 'E&P_noPhotoYet'? (     
                        <div className='inner_img_frame'>
                            <div className='inner_img_no_photo'>{e_and_p_user['no_photo']}</div>  {/* ???????????? E&P ????????????????????????.charAt(0)???????????????????????????  */}
                        </div>     
                    )
                    :(
                        <div className='inner_img_frame'>
                            <img src={url} className='inner_img'></img>
                        </div>
                    )}
                    <div className='inner_text' style={background}>
                    {/* user_Name===undefined?  ??????????????? ????????????????????????????????? ???????????? */}
                        { user_Name===undefined? (
                            <div className='show_review_user_time'>?????? {commented_time}</div>
                        ):url != 'E&P_noPhotoYet'? (
                            <div className='show_review_user_time'>{user_Name} ({commented_time})</div>
                        ):(
                            <div className='show_review_user_time'>{user_Name} ({commented_time})</div>
                        )
                        }
                        {/* ??????????????????????????? ???*/}
                        {/* user_Name===undefined?  ??????????????? ????????????????????????????????? ???????????? */}
                        { user_Name===undefined? 
                            (   
                                // <div className="contentEditable_style">
                                <>
                                    <div className={editable_style} onInput={onInput}>{ori_text}</div>
                                    <div className="inner_edit" style={display}>
                                        <div className="inner_confirm" onClick={confirm_onclick}>??????</div>
                                        <div className="inner_confirm" onClick={cancel_onclick}>??????</div>
                                    </div>
                                    <textarea className='edit_review_user_inner' placeholder={commented_inner} style={display}></textarea> 
                                </>
                                // </div>

                                // <>
                                    // <div contentEditable={editable} className={editable_style} onInput={onInput}>{ori_text}</div>
                                    // <div className="inner_edit" style={display}>
                                        // <div className="inner_confirm" onClick={confirm_onclick}>??????</div>
                                        // <div className="inner_confirm" onClick={cancel_onclick}>??????</div>
                                    // </div>
                                    // <textarea className='edit_review_user_inner' placeholder={commented_inner} style={display}></textarea> 
                                // </>
                                
                            ):(
                                <div className='show_review_user_inner'>{commented_inner}</div>
                            )
                        }
                        {/* user_Name===undefined?  ??????????????? ????????????????????????????????? ???????????? */}
                        { user_Name===undefined? 
                            (
                                <div className='show_full_mes'>
                                    {/* <div className='show_full_mes_img' onClick={edit_mes}>
                                        <img className='full_mes_img' src={require('../../../../source/edit.png')}></img>
                                    </div> */}
                                    {/* <div className="delete_hint">
                                        (??????????????????)
                                    </div> */}
                                    <div className='show_full_mes_img' onClick={delete_mes.bind(null,commented_inner)}>
                                        <img className='full_mes_img' src={delete_img}></img>
                                    </div>
                                </div>
                            ):(
                                <div className='show_full_mes'>
                                    {/* <div className='show_full_mes_mes'>??????????????????</div> */}
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