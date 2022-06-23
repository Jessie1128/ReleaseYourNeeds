import React , { useState , useContext , useEffect } from 'react'
import './back_to_current.css'
import { Google_user } from '../../Component/ContextFolder/context_folder'
import { E_and_P_user } from "../../Component/ContextFolder/context_folder";
import { AlertFrame } from '../../Component/ContextFolder/context_folder'
import { Brightness } from '../../Component/ContextFolder/context_folder'
import { db , storage } from '../../connection_firebase/connection_firebase';
import { collection , getDocs , query , where } from "firebase/firestore";
import CreateComm from '../MapArea/FindCollection/CreateCommentsInfo/create_comments_info';
import CreateColl from '../MapArea/FindCollection/CreatePlaceInfo/create_place_info';
import CloseBotton from '../../Component/closeBotton/closeBotton';
import Loading_effect from '../../Component/LoadingEffect/loadingEffect';
import { Plus_or_Minus } from '../../Component/ContextFolder/context_folder';
import { v4 } from 'uuid';
import { ref , getDownloadURL } from "firebase/storage";


const BackToCurrent = ({ if_center_move , map_obj , setFiltered_marker , 
    // bookmarks_click , setBookmarks_click , comments_click , setComments_click , filtered_marker
    }) => {

    const { comment_plus , comment_minus , background_circle_comments , 
            bookmarks_plus , bookmarks_minus ,  background_circle_bookmarks,
            setComment_plus , setComment_minus , setBackground_circle_comments , 
            setBookmarks_plus , setBookmarks_minus , setBackground_circle_bookmarks } = useContext(Plus_or_Minus)
    const { google_user } = useContext(Google_user)
    const { e_and_p_user } = useContext(E_and_P_user)
    const { success , clear , error, alert_text  } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    
    let [ dis_current , setDis_current ] = useState({display:'none'})
    let [ dis_bookmarks , setDis_bookmarks ] = useState({display:'none'})
    let [ dis_comments , setDis_comments ] = useState({display:'none'})

    const [ which , setWhich ] = useState('')
    // ================================================================================ for comments
    const [ dis_comment_box , setDis_comment_box ] = useState({display:'none'})
    const [ filter_comment_box , setFilter_comment_box ] = useState([])
    const [ comment_box_loading , setComment_box_loading ] = useState(<Loading_effect loading_effect_height={{height:'130px'}}/>)
    const [ filter_comment_no_data , setFilter_comment_no_data ] = useState('')
    const [ comment_box_no_data_css , setComment_box_no_data_css ] = useState({marginTop:'0px'})

    // ================================================================================ for bookmarks

    const [ dis_bookmarks_box , setDis_bookmarks_box ] = useState({display:'none'})
    const [ bookmarks_box_loading , setBookmarks_box_loading ] = useState(<Loading_effect loading_effect_height={{height:'130px'}}/>)
    const [ filter_bookmarks_box , setFilter_bookmarks_box ] = useState([])
    const [ filter_bookmarks_no_data , setFilter_bookmarks_no_data ] = useState('')
    const [ bookmarks_box_no_data_css , setBookmarks_box_no_data_css ] = useState({marginTop:'0px'})

    // const [ direction , setDirection ] = useState('')
    // const [ comment_coll , setComment_coll ] = useState('')
    // const [ bookmark_coll , setBookmark_coll ]  = useState('')

    // useEffect(()=>{
    //     getDownloadURL(ref(storage, 'gs://mymap-896b7.appspot.com/direction.png'))
    //     .then((direction)=>{
    //         setDirection(direction)
    //     })
    //     getDownloadURL(ref(storage, 'gs://mymap-896b7.appspot.com/comment_coll.png'))
    //     .then((comment_coll)=>{
    //         setComment_coll(comment_coll)
    //     })
    //     getDownloadURL(ref(storage, 'gs://mymap-896b7.appspot.com/bookmark_coll.png'))
    //     .then((bookmark_coll)=>{
    //         setBookmark_coll(bookmark_coll)
    //     })
    // },[])

    useEffect(()=>{
        if(alert_text===null) return 
        if( alert_text==='登出成功' || alert_text==='登陸成功' ){
            setFilter_comment_box([])
            setFilter_bookmarks_box([])
            setDis_comments({display:'none'})
            setDis_comment_box({display:'none'})
            setDis_bookmarks({display:'none'})
            setDis_bookmarks_box({display:'none'})

            setComment_plus({display:'none'})
            setComment_minus({display:'none'})
            setBookmarks_minus({display:'none'})
            setBookmarks_plus({display:'none'})
            setBackground_circle_bookmarks({background: 'none'})
            setBackground_circle_comments({background: 'none'})
        }

        let email
        if(  e_and_p_user === null && google_user === null ){
            return
        }else if( e_and_p_user!=null ){
            // console.log(e_and_p_user)
            // console.log('從帳號密碼登陸')
            if(e_and_p_user['user']['email']===undefined){
                email=e_and_p_user['user']['login_user']['email']
            }else{
                email=e_and_p_user['user']['email']
            }
            // console.log(email)
        }else if( google_user != null ){
            // console.log(google_user)
            // console.log('從google登陸')
            if(email=google_user['email']===undefined){
                email=google_user['login_user']['email']
            }else{
                email=google_user['email']
            }
        }
        if( alert_text==='刪除留言成功' || alert_text==='新增留言成功'){
            if(alert_text==='新增留言成功'){
                setComment_plus({display:''})
                setComment_minus({display:'none'})
                setBackground_circle_comments({backgroundColor: 'rgb(229, 211, 82, 0.8)'})
            }else if(alert_text==='刪除留言成功'){
                setComment_plus({display:'none'})
                setComment_minus({display:''})
                setBackground_circle_comments({backgroundColor: 'rgba(213, 81, 72, 0.8)'})
            }
            get_comments_data_rwd(email)
        }
        if( alert_text==='收藏成功' || alert_text==='取消收藏成功'){
            if(alert_text==='收藏成功'){
                setBookmarks_plus({display:''})
                setBookmarks_minus({display:'none'})
                setBackground_circle_bookmarks({backgroundColor: 'rgb(229, 211, 82, 0.8)'})
            }else if(alert_text==='取消收藏成功'){
                setBookmarks_minus({display:''})
                setBookmarks_plus({display:'none'})
                setBackground_circle_bookmarks({backgroundColor: 'rgba(213, 81, 72, 0.8)'})
            }
            get_coll_data_rwd(email)
        }
    },[alert_text])

    useEffect(()=>{                                    // 判斷 留言 或是 收藏 的框 是否開啟
        let A = JSON.stringify(dis_comment_box)
        let B = JSON.stringify(dis_bookmarks_box)
        let flex = JSON.stringify({"display":"flex"})
        let none = JSON.stringify({"display":"none"})
        
        if( A===none && B===none ){
            setWhich('')
            return 
        } 

        if( A===flex && B===none ) {
            setWhich('A')
        }else if( A===none && B===flex) {
            setWhich('B')
        }

        if( A===flex && B===flex){
            if(which==='A'){
                setDis_comment_box({display:'none'})
            }else if(which==='B'){
                setDis_bookmarks_box({display:'none'})
            }
        }

    },[ dis_comment_box , dis_bookmarks_box ])

    // =========================== ??
    // useEffect(()=>{
    //     let email
    //     if( e_and_p_user!=null){
    //         console.log(e_and_p_user)
    //         console.log('從帳號密碼登陸')
    //         if(e_and_p_user['user']['email']===undefined){
    //             email=e_and_p_user['user']['login_user']['email']
    //         }else{
    //             email=e_and_p_user['user']['email']
    //         }
    //         console.log(email)
    //     }else if(Google_user!=null){
    //         console.log(google_user)
    //         console.log('從google登陸')
    //         if(email=google_user['email']===undefined){
    //             email=google_user['login_user']['email']
    //         }else{
    //             email=google_user['email']
    //         }
    //     }
    // },[])

    // =========================== ??

    // const { height, width } = useWindowDimensions();
    // function getWindowDimensions() {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     // return {
    //     //     width,
    //     //     height
    //     // };
    //     console.log(width)
    //     console.log(height)
    // }
    // useEffect(()=>{

    //     // set_footer_height = (calc) => {
    //     //     let vh = window.innerHeight * 0.01;
    //     //     let footer_height=(vh*100)-calc;
    //     //     if (footer_height <= 104){
    //     //         footer_height=104;
    //     //     }
    //     //     el("footer").style.height=footer_height+"px";
    //     // }
    //     getWindowDimensions()
    // },[])

    // const [ filter_click , setFilter_click ] = useState('')
    // const onMouseOver_img = () => {
    //     setDis({display:''})
    // }

    // const onMouseOut_img = () => {
    //     setDis({display:'none'})
    // }
        // =========================== ??

    // ================================================================================ for current

    const onMouseOver_current = () => {
        setDis_current({display:''})
    }

    const onMouseOut_current = () => {
        setDis_current({display:'none'})
    }

    // ================================================================================ for bookmarks
    const onMouseOver_bookmarks = () => {
        setDis_bookmarks({display:''})
    }

    const onMouseOut_bookmarks = () => {
        setDis_bookmarks({display:'none'})
    }

    const onClick_bookmarks = () => {
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                setBright({filter: 'brightness(1.0)'})
                clear()
            },'1500')
            return
        }
        setDis_bookmarks({display:'none'})
        setDis_bookmarks_box({display:'flex'})
        find_info_coll_place_rwd()
    }

    const onTouchStart_bookmarks = () => {
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                setBright({filter: 'brightness(1.0)'})
                clear()
            },'1500')
            return
        }
        setDis_bookmarks({display:'none'})
        setDis_bookmarks_box({display:'flex'})
        find_info_coll_place_rwd()
    }

    const get_coll_data_rwd = async(email) => {
        // console.log(email)
        try {
            let get_res = collection(db, "user");
            let res = query(get_res , where('user_email' , '==' , email ));  
            let snapshot = await getDocs(res);
            let data
            snapshot.forEach((doc) => {
                data=doc.data()
            })
            if(data['user_collection'].length===0){
                // console.log('沒資料')
                setBookmarks_box_no_data_css({marginBottom:'100px'})
                setBookmarks_box_loading('')
                setFilter_bookmarks_no_data('目前還沒有收藏的地點')
                setFilter_bookmarks_box([])
                setComment_minus((pre)=>{
                    return({display:''})
                })
            }else{
                let rev = data['user_collection'].reverse()
                setFilter_bookmarks_box(rev)
                setBookmarks_box_loading('')
                setBookmarks_box_no_data_css({marginTop:'0px'})
                setFilter_bookmarks_no_data('')
            }
        } catch (e) {
            console.log(e)    
            error('系統忙碌中，請稍後再試！')
        }
    }


    const find_info_coll_place_rwd = () => {
        setBookmarks_plus({display:'none'})
        setBookmarks_minus({display:'none'})
        setBackground_circle_bookmarks({background: 'none'})
        let email
        if( e_and_p_user===null && google_user===null ){
            return
        }else{
            if( e_and_p_user!=null){
                // console.log(e_and_p_user)
                // console.log('從帳號密碼登陸')
                if(e_and_p_user['user']['email']===undefined){
                    email=e_and_p_user['user']['login_user']['email']
                }else{
                    email=e_and_p_user['user']['email']
                }
            }else{
                // console.log(google_user)
                // console.log('從google登陸')
                if(email=google_user['email']===undefined){
                    email=google_user['login_user']['email']
                }else{
                    email=google_user['email']
                }
            }
            get_coll_data_rwd(email)
        }
    }
    // ================================================================================ for comments

    const onMouseOver_comments = () => {
        setDis_comments({display:''})
    }

    const onMouseOut_comments = () => {
        setDis_comments({display:'none'})
    }

    const onClick_comments = () => {
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                setBright({filter: 'brightness(1.0)'})
                clear()
            },'1500')
            return
        }
        setDis_comments({display:'none'})
        setDis_comment_box({display:'flex'})
        find_info_comm_place_rwd()
    }

    const onTouchStart_comments = () => {            // for phone
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                setBright({filter: 'brightness(1.0)'})
                clear()
            },'1500')
            return
        }
        setDis_comments({display:'none'})
        setDis_comment_box({display:'flex'})
        find_info_comm_place_rwd()
    }

    const get_comments_data_rwd = async(email) => {
        try {
            let get_res = collection(db, "user");
            let res = query(get_res , where('user_email' , '==' , email ));  
            let snapshot = await getDocs(res);
            let data
            snapshot.forEach((doc) => {
                data=doc.data()
            })
            // console.log(data['user_comments'])
            if(data['user_comments']==='' || JSON.stringify(data['user_comments']) === JSON.stringify({}) ){
                // console.log('沒資料')
                setFilter_comment_no_data('目前還沒有留下的留言')
                setComment_box_loading('')
                setFilter_comment_box([])
                setComment_box_no_data_css({marginBottom:'100px'})
            }else{
                let res = Object.keys(data['user_comments'])
                let time
                let new_res = []
                res.map(item=>{
                    let info = {}
                    time=data['user_comments'][item]['create_at']['seconds']
                    time=JSON.stringify(new Date(time*1000))
                    time=time.replaceAll('"','').split('T')
                    info['place']=item
                    info['comments']=data['user_comments'][item]['comments']
                    info['time']=time[0]
                    info['email']=email
                    info['key']=`${email}${JSON.stringify(data['user_comments'][item]['create_at']['seconds'])}rwd`
                    new_res.push(info)
                })
                setComment_box_no_data_css({marginTop:'0px'})
                setFilter_comment_no_data('')
                setComment_box_loading('')
                setFilter_comment_box(new_res)
            }
        } catch (e) {
            error('系統忙碌中，請稍後再試！')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                clear()
                setBright({filter: 'brightness(1.0)'})
            },'1500')
        }
    }

    const find_info_comm_place_rwd = () => {
        setComment_minus({display:'none'})
        setComment_plus({display:'none'})
        setBackground_circle_comments({background: 'none'})
        let email
        if( e_and_p_user===null && google_user===null ){
            return
        }else{
            if( e_and_p_user!=null){
                // console.log(e_and_p_user)
                // console.log('從帳號密碼登陸')
                if(e_and_p_user['user']['email']===undefined){
                    email=e_and_p_user['user']['login_user']['email']
                }else{
                    email=e_and_p_user['user']['email']
                }
            }else{
                // console.log(google_user)
                // console.log('從google登陸')
                if(email=google_user['email']===undefined){
                    email=google_user['login_user']['email']
                }else{
                    email=google_user['email']
                }
            }
            // console.log(email)
            get_comments_data_rwd(email)
        }
    }

    // const onMouseOver_filter = () => {
    //     setDis_filter({display:''})
    // }

    // const onMouseOut_filter = () => {
    //     setDis_filter({display:'none'})
    // }

    // const onClick_filter = () => {
    //     console.log('要想一下怎麼設計 filter')
    // }


    return (
        <>
            <div className='bottom_function'>
                {/* <div className='bottom_function-icon'> */}
                    <div className='bottom_function-frame'>
                        <div className='bottom_function_function'>
                            <div className='arrow-up' style={dis_current}>
                                <div className='function-text' style={dis_current}>返回當前位置</div>
                            </div>
                            <img 
                                className='bottom_map-back-to-current' 
                                src={require('../../source/direction.png')} 
                                onMouseOver={onMouseOver_current}
                                onMouseOut={onMouseOut_current}
                                onClick={()=>{
                                    map_obj.current.panTo(if_center_move)
                                }}
                            />
                        </div>
                        <div className='bottom_function_filter'>
                {/* ==========================================================================  */}
                            <div className='bookmarks_box_frame' style={dis_bookmarks_box}>
                                {/* <div className='bookmarks_box' style={move_map_to_height}> */}
                                <div className='bookmarks_box'>
                                <div className='comment_box_close_frame'>
                                    <div className='comment_box_close'>
                                        <div className='comment_box_inner'>已儲存的地點</div>
                                        <div className='comment_box_close_botton'>
                                            <CloseBotton setDis_bookmarks_box={setDis_bookmarks_box}/>
                                        </div>
                                    </div>
                                </div>
                                    {/* <hr className='comment_box_hr'/> */}

                                    <div className='bookmarks_box_no_data' style={bookmarks_box_no_data_css}>
                                        { filter_bookmarks_no_data }
                                    </div>
                                    {
                                        filter_bookmarks_box.map(item=>{
                                            return(
                                                <CreateColl 
                                                    item={item}
                                                    map_obj={map_obj}
                                                    setFiltered_marker={setFiltered_marker}
                                                    key={v4()}
                                                    // setMove_map_to_height={setMove_map_to_height}
                                                />
                                            )
                                        })
                                    }
                                    {bookmarks_box_loading}
                                </div>
                                <div className='arrow_up_bookmarks_box'/>
                            </div>
                {/* ==========================================================================  */}
                            <div className='arrow-up' style={dis_bookmarks}>
                                <div className='function-text' style={dis_bookmarks}>已儲存的地點</div>
                            </div>    
                            <div className='bookmarks_circle' style={background_circle_bookmarks}>
                                {/* <div className='circle_inner'>{bookmarks_circle_inner}</div> */}
                                <div className='circle_inner' style={bookmarks_plus}>&#43;</div>
                                <div className='circle_inner' style={bookmarks_minus}>&#8722;</div>
                            </div>
                            <img 
                                className='bottom_map-back-to-current' 
                                src={require('../../source/bookmark_coll.png')} 
                                onMouseOver={onMouseOver_bookmarks}
                                onMouseOut={onMouseOut_bookmarks}
                                onClick={onClick_bookmarks}
                                onTouchStart={onTouchStart_bookmarks}
                            />
                        </div>
                        <div className='bottom_function_filter'>
                {/* ==========================================================================  */}
                                <div className='comment_box_frame' style={dis_comment_box}>
                                    <div className='comment_box'>
                                    <div className='comment_box_close_frame'>
                                        <div className='comment_box_close'>
                                            <div className='comment_box_inner'>已寫下的留言</div>
                                            <div className='comment_box_close_botton'>
                                                <CloseBotton setDis_comment_box={setDis_comment_box}/>
                                            </div>
                                        </div>
                                    </div>
                                        {/* <hr className='comment_box_hr'/> */}
                                        <div className='comment_box_no_data' style={comment_box_no_data_css}>
                                            { filter_comment_no_data }
                                        </div>
                                        {
                                            filter_comment_box.map(item=>{
                                                return(
                                                    <CreateComm item={item} key={v4()}/>
                                                )
                                            })
                                        }
                                        {comment_box_loading}
                                    </div>
                                    <div className='arrow_up_comment_box'/>
                                </div>
                {/* ==========================================================================  */}
                            <div className='arrow-up' style={dis_comments}>
                                <div className='function-text' style={dis_comments}>已寫下的留言</div>
                            </div>
                            <div className='comments_circle' style={background_circle_comments}>
                                <div className='circle_inner' style={comment_plus}>&#43;</div>
                                <div className='circle_inner' style={comment_minus}>&#8722;</div>
                            </div>
                            <img 
                                className='bottom_map-back-to-current' 
                                src={require('../../source/comment_coll.png')} 
                                onMouseOver={onMouseOver_comments}
                                onMouseOut={onMouseOut_comments}
                                onClick={onClick_comments}
                                onTouchStart={onTouchStart_comments}
                            />
                        </div>
                        {/* <div className='bottom_function_filter'>
                            // <div className='filter_text' style={dis_filter}>進階篩選</div> //
                                <div className='arrow-up' style={dis_filter}>
                                    <div className='filter_text' style={dis_filter}>進階篩選</div>
                                </div>
                            <img 
                                className='bottom_filter_text' 
                                src={require('../../source/filter.png')} 
                                onMouseOver={onMouseOver_filter}
                                onMouseOut={onMouseOut_filter}
                                onClick={onClick_filter}
                            />
                        </div> */}
                    </div>
                {/* </div> */}
            </div>
            {/* <Lil_bookmarks/> */}
        </>
    )
}

export default BackToCurrent