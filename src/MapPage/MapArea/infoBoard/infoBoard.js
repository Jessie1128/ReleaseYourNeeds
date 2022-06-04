import React from 'react';
import { Fragment , useState , useEffect , useRef } from 'react'
import { InfoBox } from '@react-google-maps/api';
import './infoBoard.css'
import CloseBotton from '../../../Component/closeBotton/closeBotton';
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
import { collection , getDocs , doc, setDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect';
import GetData from '../GetDataFromGoogleApi/get_data_from_google_api';
import Comments from '../../Comments/comments';
import LoginStatus from '../../../Component/LoginStatus/loginStatus';
import { db } from '../../../connection_firebase/connection_firebase';
import CheckBookmarks from '../CheckBookmarks/check_bookmarks';
import Review_Comments from '../../../Component/ReviewComments/review_comments';


const InfoBoard = ({ setInfo_board , inner , info_board , map_obj , setLoading , loading }) => {

    const [ loading_pic , setLoading_pic ] = useState(<Loading_effect/>)
    const [ open_status , setOpen_status ] = useState('')
    const [ weekly_open , setWeekly_open ] = useState('')
    const [ photo_url , setPhoto_url ] = useState('') 
    const [ comment_exist , setComment_exist ] = useState(false)

    // const [ bookmarks_text , setBookmarks_text ] = useState ('')
    // const [ bookmarks_color , setBookmarks_color ] =useState (require('../../../source/mark_white.png'))
    // const [ color , setColor ] = useState({background:'none'})
    // const [ bookmarks_current , setBookmarks_current] = useState (false)
    const [ login_user_photoUrl , setLogin_user_photoUrl ] =useState ('')
    let [ get_user_data , setGet_user_data ] = useState('')
    const [ confirm_hover , setConfirm_hover ] = useState ({display:'none'})
    const [ confirm_botton , setConfirm_botton ] =useState('ENTER')
    let [ top , setTop ] = useState ({top:'480px'})
    let [ click_and_more_comments , setClick_and_more_comments ] = useState ('查看更多留言...')
    const [ commented , setCommented ] = useState (null)

    let day=new Date().getDay()
    // let open_status
    // let weekly_open

    let init_loadBoard = () => {
        console.log('哇每開戲呀')
        setLoading_pic(<Loading_effect/>)

        if(inner['opened']==='ok'){
            setOpen_status('營業中')
            // open_status='營業中'
        }else if(inner['opened']==='pending'){
            setOpen_status('尚未提供營業時間')
            // open_status='尚未提供營業時間'
        }else if(inner['opened']==='none'){
            setOpen_status('非營業時間')
            // open_status='關閉中'
        }

        if(inner['weekday_text']==='none'){
            setWeekly_open('--')
        }else{
            if(day===0){
                day=7
            }
            setWeekly_open(inner['weekday_text'][day-1])
        }

        console.log(inner)
        console.log(map_obj.current)
        let url = new GetData(inner,map_obj.current);
        let photo = async() => {
            let photo_url_from_api = await url.get_photos();
            console.log( photo_url_from_api )
            if(photo_url_from_api==='no'){
                setLoading_pic(require('../../../source/no_photo.png'))
                setPhoto_url()
            }else{
                console.log( photo_url_from_api )
                setLoading_pic('')
                setPhoto_url(photo_url_from_api)
            }
        }
        photo()
    }


    let state = async() => { // 從 user_data 呼叫
        let res
        return res = await LoginStatus()
        console.log(res)
        console.log(res['state'])
        console.log(res['login_user'])
        // if(res['state']===true){
        //     setLogin_status('LOG OUT')
        //     setLogin_name(res['login_user']['displayName'])
        //     setLogin_photo(res['login_user']['photoURL'])
        //     setDis({display:"flex"})
        // }else{
        //     console.log('還沒登陸')
        // }
    }

    let user_data = async() => {
        let data = await state()
        setGet_user_data(data)
        // let data_cookie = document.cookie
        // console.log('data_cookie',data_cookie)
        // data_cookie=data_cookie.split('userEmail=')
        // data_cookie=data_cookie[1].split('expires=')
        // console.log('data_cookie',data_cookie)
        // console.log('data_cookie',data_cookie)
        console.log(data)
        if(data===false){
            setLogin_user_photoUrl('')
            return 
        }
        console.log(data['state'])
        console.log(data['login_user'])
        console.log(data['login_user']['photoURL'])
        setLogin_user_photoUrl(data['login_user']['photoURL'])
    }

    useEffect(()=>{
        setComment_exist(false)
        if(photo_url===undefined){
            console.log('空空空空空空空')
            // init_loadBoard()
            // state()
            return
        }
        init_loadBoard()
        user_data()
    },[info_board])

    useEffect(()=>{
        if(comment_exist===false){
            console.log('comment_exist是false')
            return
        }else{
            init_loadBoard()
            user_data()
            console.log('comment_exist是true')
        }

    },[comment_exist])

    // const bookmarks_onOver = () => {
    //     if(!bookmarks_current){
    //         setBookmarks_text('收藏地點') 
    //         setColor({background:'#393E41'})
    //     }else{
    //         setBookmarks_text('取消收藏') 
    //         setColor({background:'#393E41'})
    //     }
    // }

    // const bookmarks_onOut = () => {
    //     setBookmarks_text('') 
    //     setColor({background:'none'})
    // }
    
    // const bookmarks_onClick = () => {
    //     setBookmarks_text('') 
    //         setColor({background:'none'})
    //     if(!bookmarks_current){
    //         setBookmarks_current(true)
    //         setBookmarks_color(require('../../../source/mark_yellow.png')) 
    //     }else{
    //         setBookmarks_current(false)
    //         setBookmarks_color(require('../../../source/mark_white.png')) 
    //     }
    // }


    return (
        <div className='infoBoardFrame'>
            <div className='infoBoardCloseBotton'>
                <CloseBotton setInfo_board ={ setInfo_board }/>
            </div>
            <div className='infoBoardTop'>
                <div className='infoBoardLoading'>
                    { loading_pic }
                    <div className='infoBoardPic'>
                    <img className='infoBoardSrc' src={photo_url}/>
                </div>
                </div>
                <div className='infoBoardPlaceInfo'>
                    <div className='placeInfoInner' style={{fontSize:'16px',fontWeight:'bold',height:'16px'}}>{inner['公廁名稱']}</div>
                    <div className='placeInfoInner' style={{fontWeight:'bold'}}>{open_status} 
                        <span style={{color:'black',marginLeft:'12px',fontWeight:'normal'}}>{weekly_open}</span>
                    </div>
                    <div className='placeInfoInner'>{inner['公廁地址']}</div>
                    <div className='placeInfoInner'>無障礙廁所座數：{inner['無障礙廁所座數']} 座</div>
                    <div className='placeInfoInner'>親子廁所座數：{inner['親子廁所座數']} 座</div>
                    <div style={{display:'flex',width:'100%'}}>
                        <div className='placeInfoInner' style={{paddingBottom:'10px'}}>親子廁所座數：{inner['親子廁所座數']} 座</div>
                        <CheckBookmarks 
                            info_board={info_board} 
                            get_user_data={get_user_data} 
                            inner={inner}
                            comment_exist={comment_exist}
                            setComment_exist={setComment_exist}
                            confirm_hover={confirm_hover}
                            setConfirm_hover={setConfirm_hover}
                            confirm_botton={confirm_botton}
                            setConfirm_botton={setConfirm_botton}
                            commented={commented}
                            setCommented={setCommented}
                        />
                    </div>
                </div>
                {confirm_botton==='ENTER' ? 
                    (
                        <Comments 
                            url={login_user_photoUrl}
                            info_board={info_board}
                            get_user_data={get_user_data}
                            inner={inner}
                            comment_exist={comment_exist}
                            setComment_exist={setComment_exist}
                            confirm_hover={confirm_hover}
                            setConfirm_hover={setConfirm_hover}
                            confirm_botton={confirm_botton}
                            setConfirm_botton={setConfirm_botton}
                            top={top}
                            setTop={setTop}
                            click_and_more_comments={click_and_more_comments}
                            setClick_and_more_comments={setClick_and_more_comments}
                        />
                    ) : 
                    (
                        <Review_Comments 
                            url={login_user_photoUrl}
                            info_board={info_board}
                            confirm_hover={confirm_hover}
                            setConfirm_hover={setConfirm_hover}
                            top={top}
                            setTop={setTop}
                            click_and_more_comments={click_and_more_comments}
                            setClick_and_more_comments={setClick_and_more_comments}
                            commented={commented}
                            setCommented={setCommented}
                            inner={inner}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default InfoBoard