import React , { useState , useEffect , useContext } from 'react'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect'
import './more_comments.css'
import { getDoc , toDate , doc  } from "firebase/firestore";
import { db } from '../../../connection_firebase/connection_firebase';
import MoreCommentsComments from './MoreComments-comments/more_comments_comments';
import { LoginThrouht } from '../../../Component/ContextFolder/context_folder'; 

const More_Comments = ({ url , info_board ,  top , setTop , commented , setCommented , inner , get_user_data , comment_exist , 
                         click_and_more_comments , setClick_and_more_comments , commented_inner , commented_time , setComment_exist }) => {

    let [ loading , setLoading ] = useState (<Loading_effect loading_effect_height={{height:'200px'}}/>)
    const [ get_exist_comment , setGet_exist_comment] = useState(false)
    const { throught } = useContext(LoginThrouht)
    let [ fillter_comments , setFiltered_comments ] = useState([])
    let [ data , setData ] = useState(null)

    useEffect(()=>{
        // console.log(url)
        // console.log(get_user_data)
        setTop({top:'480px'})
        setClick_and_more_comments('查看更多評論...')
        setGet_exist_comment(false)
        setFiltered_comments([])
    },[info_board])

    useEffect(()=>{
        // console.log(get_exist_comment)
        if(click_and_more_comments==='查看更多評論...') return
        // console.log(commented)
        get_all_user_comments()
    },[top])

    const get_all_user_comments = async() => {
        // console.log(inner)
        let id=(inner['公廁名稱'].length)*(inner['緯度']+inner['經度'])
        // console.log(id)
        const docRef = doc(db, "comments", inner['公廁名稱']);
        const docSnap = await getDoc(docRef);
        let info=[]
        if (docSnap.exists()) {
            let res=docSnap.data().data
            // console.log(res)
            res=res.reverse()
            let i=0
            res.map(item=>{
                // console.log(item['create_at'].toDate())
                let time = item['create_at'].toDate()
                time = new Date(time.toDateString())
                item['time']=(time.toLocaleDateString()).replaceAll('/','-')
                if( i%2 == 0 ){
                    item['background']={background:'rgb(128, 141, 142, 0.9)'}
                }else{     
                    item['background']={background:'rgb(58, 68, 69, 0.3)'}
                }
                info.push(item)
                i++
            })
            // console.log(JSON.stringify(info))
            if(JSON.stringify(info)==JSON.stringify([])){
                setLoading(null)
                setFiltered_comments(['null'])
                return
            } 
        } else {
            setLoading(null)
            setFiltered_comments(['null'])
            // console.log(fillter_comments)
            return 
        }
        setLoading('')
        setFiltered_comments(info)
    }

    const more_comments_onClick = () => {
        if(click_and_more_comments==='查看更多評論...'){
            setClick_and_more_comments('關閉留言')
            setTop({top:'22px'})
        }else{
            setClick_and_more_comments('查看更多評論...')
            setTop({top:'480px'})
        }
    }

    return (
        <>
            <div className='more_comments' onClick={more_comments_onClick}>{click_and_more_comments}</div>
            <div style={top} className='more_comments_board'>
                <div style={{display:'block'}}>
                    { data }          
                    { get_user_data===false || throught===null ? (
                        <></>
                    ) :commented===undefined || null ? (
                        <></>
                    ) : (
                        <>
                            <MoreCommentsComments 
                                url={url}
                                background={{background:'rgb(58, 68, 69, 0.3)'}}
                                commented_time={commented_time}
                                commented_inner={commented_inner}
                                inner={inner}
                                get_user_data={get_user_data}
                                setFiltered_comments={setFiltered_comments}
                                setGet_exist_comment={setGet_exist_comment}
                                // setCommented={setCommented}
                                setTop={setTop}
                                setComment_exist={setComment_exist}
                                setCommented={setCommented}
                                setClick_and_more_comments={setClick_and_more_comments}
                            />
                            <hr style={{border:'1px solid #000'}}/>
                        </>
                    ) 
                    }
                    { loading }
                    {   
                        fillter_comments.map(item=>{
                            if(item==='null'){
                                return(
                                    <div className='no_comments_yet'>
                                        <div className='no_comments_yet_inner'>- 目前還沒有留言 -</div>
                                    </div>
                                )
                            }
                            return(
                                <MoreCommentsComments 
                                    key={item['create_at']['seconds']}
                                    url={item['user_img']}
                                    background={item['background']}
                                    user_Name={item['user_Name']}
                                    commented_time={item['time']}
                                    commented_inner={item['user_Comments']}
                                    inner={inner}
                                    setFiltered_comments={setFiltered_comments}
                                    setGet_exist_comment={setGet_exist_comment}
                                    // setCommented={setCommented}
                                    setTop={setTop}
                                    setCommented={setCommented}
                                    setComment_exist={setComment_exist}
                                    setClick_and_more_comments={setClick_and_more_comments}
                                />
                            )
                        }) 
                    }
                </div>
            </div>
        </>
    )
}

export default More_Comments