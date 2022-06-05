import React , { Fragment , useState , useEffect } from 'react'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect'
import './more_comments.css'
import { getDoc , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt } from "firebase/firestore";
import { db } from '../../../connection_firebase/connection_firebase';
import MoreCommentsComments from './MoreComments-comments/more_comments_comments';

const More_Comments = ({ url , info_board ,  top , setTop , commented , inner , get_user_data ,
                         click_and_more_comments , setClick_and_more_comments , commented_inner , commented_time }) => {

    // let [ top , setTop ] = useState ({top:'480px'})
    // let [ click_and_more_comments , setClick_and_more_comments ] = useState ('查看更多留言...')
    let [ loading , setLoading ] = useState (<Loading_effect />)
    const [ get_exist_comment , setGet_exist_comment] = useState(false)
    let [ fillter_comments , setFiltered_comments ] = useState([])
    let [ data , setDate ] = useState(null)
    

    useEffect(()=>{
        console.log('我會每次都有嗎')
        setTop({top:'480px'})
        setClick_and_more_comments('查看更多評論...')
        setGet_exist_comment(false)
        setFiltered_comments([])
    },[info_board])

    useEffect(()=>{
        console.log(get_exist_comment)
        if(click_and_more_comments==='查看更多評論...') return
        console.log(commented)
        get_all_user_comments()
        // if(commented===undefined){
        //     console.log('不用再留言框')
        // }else{
        //     console.log('要在')
        //     // get_all_user_comments()
        //     console.log(commented)
        // }
    },[top])

    const get_all_user_comments = async() => {
        if(get_exist_comment===true) return 
        // 這邊要打資料ㄧㄛ
        console.log(inner)
        let id=(inner['公廁名稱'].length)*(inner['緯度']+inner['經度'])
        console.log(id)

        const docRef = doc(db, "comments", inner['公廁名稱']+id);
        const docSnap = await getDoc(docRef);
        let info=[]
        if (docSnap.exists()) {
            let res=docSnap.data().data
            res=res.reverse()
            let i=0
            // let info=[]
            res.map(item=>{
                let time=item['create_at']['seconds']
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
            // console.log('順序1')
            console.log(info)
            console.log(JSON.stringify(info))
        } else {
            console.log("目前沒有任何留言");
            setLoading(null)
            setFiltered_comments(['null'])
            console.log(fillter_comments)
            return 
        }
        console.log('順序2')
        // console.log(JSON.stringify(res))
        setGet_exist_comment(true)
        setLoading('')
        setFiltered_comments(info)
    }

    // const create_comments_div = (data) => {
    //     console.log(data)
    // }

    const more_comments_onClick = () => {
        if(click_and_more_comments==='查看更多評論...'){
            setClick_and_more_comments('關閉留言')
            setTop({top:'22px'})
        }else{
            setClick_and_more_comments('查看更多評論...')
            setTop({top:'480px'})
        }
    }

    // if((data['user_collection'].indexOf(inner['公廁名稱']) == -1)) return
    // setBookmarks_current(true)
    // setBookmarks_color(require('../../../source/mark_yellow.png')) 

    return (
        <>
            <div className='more_comments' onClick={more_comments_onClick}>{click_and_more_comments}</div>
            <div style={top} className='more_comments_board'>
                <div style={{display:'block'}}>
                    { commented===undefined ? 
                        (<></>) : 
                        (
                            <>
                                <MoreCommentsComments 
                                    url={url}
                                    background={{background:'rgb(58, 68, 69, 0.3)'}}
                                    commented_time={commented_time}
                                    commented_inner={commented_inner}
                                    inner={inner}
                                    get_user_data={get_user_data}
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
                                    url={item['user_img']}
                                    background={item['background']}
                                    user_Name={item['user_Name']}
                                    commented_time={item['time']}
                                    commented_inner={item['user_Comments']}
                                    inner={inner}
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