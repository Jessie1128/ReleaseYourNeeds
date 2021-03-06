import React , { useContext , useEffect , useState } from 'react'
import './find_collection.css'
import '../../../Component/rwd.css'
import { db } from '../../../connection_firebase/connection_firebase'
import { collection , getDocs , query , where } from "firebase/firestore";
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect'
import { AlertFrame } from '../../../Component/ContextFolder/context_folder'
import { Brightness } from '../../../Component/ContextFolder/context_folder'
import { E_and_P_user } from '../../../Component/ContextFolder/context_folder'
import { Google_user } from '../../../Component/ContextFolder/context_folder'
import { stringify } from '@firebase/util';
import CreateComm from './CreateCommentsInfo/create_comments_info';
import CreateColl from './CreatePlaceInfo/create_place_info';
import { Plus_or_Minus } from '../../../Component/ContextFolder/context_folder';


const FindColl = ({ filtered_marker , setFiltered_marker , 
    bookmarks_click , setBookmarks_click , comments_click , setComments_click , map_obj }) => {

    const { comment_plus , comment_minus , background_circle_comments , 
            bookmarks_plus , bookmarks_minus ,  background_circle_bookmarks,
            setComment_plus , setComment_minus , setBackground_circle_comments , 
            setBookmarks_plus , setBookmarks_minus , setBackground_circle_bookmarks } = useContext(Plus_or_Minus)
    const { setBright } = useContext(Brightness)
    const { alert_text , error , clear } = useContext(AlertFrame)
    const { e_and_p_user } = useContext(E_and_P_user)
    const { google_user } = useContext(Google_user)

    let [ loading_place , setLoading_place ] = useState(null)
    const [ place_dis , setPlace_dis ] = useState({display:'none'})
    const [ plcae_text , setPlace_text ] = useState('點擊展開')
    const [ place_member_dis , setPlace_member_dis ] = useState({display:'none'})
    const [ filter_place , setFilter_place ] = useState([])
    const [ place_inner , setPlace_inner ] = useState('- 請先登錄會員 -')
    const [ coll_height , setColl_height ] = useState({height:'50px'})

    let [ loading_comments , setLoading_comments ] = useState(null)
    const [ comments_dis , setComments_dis ] = useState({display:'none'})
    const [ comments_text , setComments_text ] = useState('點擊展開')
    const [ comments_member_dis , setComments_member_dis ] = useState({display:'none'})
    const [ filter_comments , setFilter_comments ] = useState([])
    const [ comments_inner , setComments_inner ] = useState('- 請先登錄會員 -') 
    const [ comm_height , setComm_height ] = useState({height:'50px'})

    const [ comm_circle_height , setComm_circle_height ] = useState({top: '80px'})


    useEffect(()=>{
        if(alert_text===null) return 
        if( alert_text==='登出成功' || alert_text==='登陸成功' ){
            setPlace_text('點擊展開')
            setPlace_dis({display:'none'})
            setLoading_place('')
            setColl_height({height:'50px'})
            setComm_height({height:'50px'})
            setComments_text('點擊展開')
            setComments_dis({display:'none'})
            setLoading_comments('')
            setComment_plus({display:'none'})
            setComment_minus({display:'none'})
            setBookmarks_minus({display:'none'})
            setBookmarks_plus({display:'none'})
            setBackground_circle_bookmarks({background: 'none'})
            setBackground_circle_comments({background: 'none'})
            setComm_circle_height({top: '80px'})
            if( e_and_p_user===null && google_user===null ){
                setFilter_comments([])
                setFilter_place([])
                setPlace_inner('- 請先登錄會員 -')
                setComments_inner('- 請先登錄會員 -')
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
            let email
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
            get_comments_data(email)
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
            let email
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
            get_place_data(email)
        }
    },[alert_text])

    const get_place_data = async(email) => {
        setLoading_place(<Loading_effect loading_effect_height={{height:'150px'}}/>)
        try {
            let get_res = collection(db, "user");
            let res = query(get_res , where('user_email' , '==' , email ));  
            let snapshot = await getDocs(res);
            let data
            snapshot.forEach((doc) => {
                data=doc.data()
            })
            // console.log(data['user_collection'])
            if(data['user_collection'].length===0){
                setLoading_place('')
                setPlace_inner('目前還沒有收藏的地點')
                setLoading_place(null)
                setFilter_place([])
                setPlace_member_dis({display:''})
            }else{
                setLoading_place('')
                setPlace_member_dis({display:'none'})
                let rev=data['user_collection'].reverse()
                setFilter_place(rev)
            }
        } catch (e) {
            console.log(e)    
            error('系統忙碌中，請稍後再試！')
        }
    }

    const find_info_coll_place = (e) => {
        // console.log(e)
        if(e.target.innerHTML==='點擊展開'){
            let email
            // console.log(filtered_marker)
            setPlace_text('點擊收闔')
            setPlace_dis({display:''})
            setColl_height({height:'280px'})
            setBookmarks_plus({display:'none'})
            setBookmarks_minus({display:'none'})
            setComm_circle_height({top: '310px'})
            setBackground_circle_bookmarks({background: 'none'})
            // console.log( e_and_p_user )
            // console.log( google_user )
            if( e_and_p_user===null && google_user===null ){
                setPlace_member_dis({display:''})
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
                setPlace_member_dis({display:'none'})
                get_place_data(email)
            }
        }else{
            setColl_height({height:'50px'})
            setPlace_text('點擊展開')
            setPlace_dis({display:'none'})
            setLoading_place('')
            setComm_circle_height({top: '80px'})
            setBookmarks_plus({display:'none'})
            setBookmarks_minus({display:'none'})
            setBackground_circle_bookmarks({background: 'none'})
        }
    }

    const get_comments_data = async(email) => {
        setLoading_comments(<Loading_effect loading_effect_height={{height:'150px'}}/>)
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
                setComments_inner('目前還沒有留下的留言')
                setLoading_comments(null)
                setFilter_comments([])
                setComments_member_dis({display:''})
            }else{
                setComments_member_dis({display:'none'})
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
                    info['key']=`${email}${stringify(data['user_comments'][item]['create_at']['seconds'])}`
                    new_res.push(info)
                })
                // console.log(new_res)
                // console.log(JSON.stringify(new_res))
                setFilter_comments(new_res)
                setLoading_comments('')
            }
        } catch (e) {
            console.log(e)    
            error('系統忙碌中，請稍後再試！')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                clear()
                setBright({filter: 'brightness(1.0)'})
            },'1500')
        }
    }
    
    const find_info_coll_comments = (e) => {
        if(e.target.innerHTML==='點擊展開'){
            setComments_text('點擊收闔')
            setComments_dis({display:''})
            setComm_height({height:'280px'})
            setComment_minus({display:'none'})
            setComment_plus({display:'none'})
            setBackground_circle_comments({background: 'none'})
            let email
            if( e_and_p_user===null && google_user===null ){
                setComments_member_dis({display:''})
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
                setComments_member_dis({display:'none'})
                get_comments_data(email)
            }
            // console.log(email)
        }else{
            setComm_height({height:'50px'})
            setComments_text('點擊展開')
            setComments_dis({display:'none'})
            setLoading_comments('')
            setComment_minus({display:'none'})
            setComment_plus({display:'none'})
            setBackground_circle_comments({background: 'none'})
        }
    }

    return(
        <>
            <div className='function-area'>
                <div className='find_coll_frame'>
                    <div className='find_coll_coll' style={coll_height}>
                        <div className='find_coll_inner'>
                            <div className='find_coll_inner_frame'>

                                <div className='find_coll_bookmarks_circle' style={background_circle_bookmarks}>
                                    {/* <div className='circle_inner'>{bookmarks_circle_inner}</div> */}
                                    <div className='find_coll_circle_inner' style={bookmarks_plus}>&#43;</div>
                                    <div className='find_coll_circle_inner' style={bookmarks_minus}>&#8722;</div>
                                </div>

                                <div className='find_coll_open'>
                                    <div className='find_coll_text'>已儲存的地點</div>
                                    <div className='find_coll_open_text' onClick={find_info_coll_place}>{plcae_text}</div>
                                </div>
                            </div>
                            {/* <hr className='find_coll_hr'/> */}
                            <div className='find_coll_fetch' style={place_dis}>
                                <div className='find_coll_start'>
                                    {loading_place}
                                    <div className='plz_login' style={place_member_dis}>{place_inner}</div>
                                    {filter_place.map(item=>{
                                        return(
                                            <CreateColl 
                                                item={item}
                                                map_obj={map_obj}
                                                setFiltered_marker={setFiltered_marker}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='find_coll_comm' style={comm_height}>
                        <div className='find_coll_inner'>
                        <div className='find_coll_inner_frame'>
                            <div className='find_coll_comments_circle' style={ Object.assign( {} , background_circle_comments , comm_circle_height )} >
                                <div className='find_coll_circle_inner' style={comment_plus}>&#43;</div>
                                <div className='find_coll_circle_inner' style={comment_minus}>&#8722;</div>
                            </div>

                            <div className='find_coll_open'>
                                <div className='find_coll_text'>已寫下的留言</div>
                                <div className='find_coll_open_text' onClick={find_info_coll_comments}>{comments_text}</div>
                            </div>
                        </div>
                            {/* <hr className='find_coll_hr'/> */}
                            <div className='find_coll_fetch' style={comments_dis}>
                                <div className='find_coll_start'>
                                    {loading_comments}
                                    <div className='plz_login' style={comments_member_dis}>{comments_inner}</div>
                                    {filter_comments.map(item=>{
                                        return(
                                            <CreateComm item={item}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindColl