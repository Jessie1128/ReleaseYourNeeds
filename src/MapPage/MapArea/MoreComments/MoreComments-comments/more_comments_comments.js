import React , { useState , useEffect } from "react";
import '../more_comments.css'
import { deleteField , setDoc ,  deleteDoc , getDoc , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt, arrayRemove } from "firebase/firestore";
import { db } from "../../../../connection_firebase/connection_firebase";

const MoreCommentsComments = ({ url , commented_time , commented_inner , user_Name , background , inner ,  get_user_data , 
                                setFiltered_comments , setGet_exist_comment , setCommented , setTop , setComment_exist , setClick_and_more_comments }) => {

    const [ edit_text , setEdit_text ] = useState(null)
    const [ editable , setEditable ] = useState(false)
    const [ editable_style , setEditable_style ] = useState('show_review_user_inner')
    let [ display , setDisplay ] = useState({display:'none'})
    const [ ori_text , setOri_text ] = useState(commented_inner)

    useEffect(()=>{
        // console.log(commented_inner)
        // console.log(ori_text)
        setOri_text(commented_inner)
    },[commented_inner])

    // const [ height , setHeight ] = useState(null)

    // <>
    //     <div className='show_review_user_inner'>{commented_inner}</div>
    //     <textarea readOnly className='edit_review_user_inner' placeholder={commented_inner} ></textarea> 
    //     <textarea className='edit_review_user_inner'></textarea> 
    // </>

    // useEffect(()=>{
    //     setEdit_text(
    //         [<div className='show_review_user_inner'>{commented_inner}</div>]
    //     )
    // },[edit_text])

    // <textarea className='edit_review_user_inner' placeholder={commented_inner}></textarea>\
    // useEffect(()=>{
    //     console.log('這邊')
    // },[])

    const init_textarea = (e) => {
        console.log(e)
    }

    const edit_mes = (e) => {
        console.log(e)
        // setOri_text(e)
        console.log('我要編輯留言')
        setEditable(true)
        setEditable_style('edit_review_user_inner')
        setDisplay({display:'flex'})
        // console.log(height)
    }

    const confirm_onclick = (e) => {
        console.log(e)
    }

    const cancel_onclick = () => {
        Promise.resolve().then(() => {
            setOri_text(commented_inner)
            console.log('有')
        })
        .then(()=>{
            setEditable(false)
            setEditable_style('show_review_user_inner')
            setDisplay({display:'none'})
        })
        // console.log(commented_inner)
        // setOri_text(commented_inner)
        // setEdit_text(commented_inner)
        // setEditable(false)
        // setEditable_style('show_review_user_inner')
        // setDisplay({display:'none'})
        // console.log(commented_inner)
        // console.log(ori_text)
        // setOri_text(commented_inner)
    }

    // const text_on_click = (e) => {
    //     console.log(e)
    //     console.log(e.target.innerText)
    //     console.log(e.target.offsetHeight)
    // }

    const onInput = (e) => {
        console.log(ori_text)
        console.log(commented_inner)
        setEdit_text(e.target.innerHTML)
        console.log(edit_text)
    }


    const reverse_array = (new_res) => {
        let info=[]
        new_res=new_res.reverse()
        let i=0
        // let info=[]
        new_res.map(item=>{
            let time=item['create_at']['seconds']
            console.log(time)
            time=JSON.stringify(new Date(time*1000))
            time=time.replaceAll('"','').split('T')
            item['time']=time[0]
            if( i%2 == 0 ){
                item['background']={background:'rgb(128, 141, 142, 0.9)'}
            }else{     
                item['background']={background:'rgb(58, 68, 69, 0.3)'}
            }
            info.push(item)
            i++
        })
        // setFiltered_comments(info)
        // setCommented(null)
        // setTop({top:'480px'})
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
        // console.log(place)
        // console.log(id)
        // await deleteDoc(doc(db, "user", "DC"));

        try {
            let data = doc( db, 'user', email );
            await setDoc(data, {
                user_comments : { [`${place}`] : deleteField() }
            } , { merge : true } );

            const docRef = doc(db, "comments", inner['公廁名稱']+id);
            const docSnap = await getDoc( docRef );
            let res = docSnap.data()
            console.log(res)
            let new_res = res['data'].filter(item=>item['user_Email']!=email)
            if( JSON.stringify(new_res) == []){
                console.log('我這邊要直接回應沒有留言')
            } 
            console.log(new_res)
            await updateDoc(doc(db, "comments", inner['公廁名稱']+id), {
                data: new_res
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            })
            console.log('這邊要做 成功 刪除留言提示框')
            if( JSON.stringify(new_res) == JSON.stringify([])){
                console.log('我這邊要直接回應沒有留言')
            } 
            setGet_exist_comment(false)
            setTop({top:'480px'})
            setComment_exist(false)
            setCommented(null)
            setClick_and_more_comments('查看更多評論...')
            // setTop({top:'480px'})
            // reverse_array(new_res)
        } catch (error) {
            console.log(error)
            console.log('這邊要做刪除留言 失敗 提示框')
        }
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
                        { user_Name===undefined? 
                            (   
                                // <div className="contentEditable_style">
                                <>
                                    <div className={editable_style} onInput={onInput}>{ori_text}</div>
                                    <div className="inner_edit" style={display}>
                                        <div className="inner_confirm" onClick={confirm_onclick}>確認</div>
                                        <div className="inner_confirm" onClick={cancel_onclick}>取消</div>
                                    </div>
                                    <textarea className='edit_review_user_inner' placeholder={commented_inner} style={display}></textarea> 
                                </>
                                // </div>

                                // <>
                                    // <div contentEditable={editable} className={editable_style} onInput={onInput}>{ori_text}</div>
                                    // <div className="inner_edit" style={display}>
                                        // <div className="inner_confirm" onClick={confirm_onclick}>確認</div>
                                        // <div className="inner_confirm" onClick={cancel_onclick}>取消</div>
                                    // </div>
                                    // <textarea className='edit_review_user_inner' placeholder={commented_inner} style={display}></textarea> 
                                // </>
                                
                            ):(
                                <div className='show_review_user_inner'>{commented_inner}</div>
                            )
                        }
                        { user_Name===undefined? 
                            (
                                <div className='show_full_mes'>
                                    {/* <div className='show_full_mes_img' onClick={edit_mes}>
                                        <img className='full_mes_img' src={require('../../../../source/edit.png')}></img>
                                    </div> */}
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