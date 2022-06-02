import React , { Fragment , useState , useEffect } from 'react'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect'
import './more_comments.css'

const More_Comments = ({ info_board ,  top , setTop , click_and_more_comments , setClick_and_more_comments }) => {

    // let [ top , setTop ] = useState ({top:'480px'})
    // let [ click_and_more_comments , setClick_and_more_comments ] = useState ('查看更多留言...')
    let [ loading , setLoading ] = useState (<Loading_effect />)

    useEffect(()=>{
        console.log('我會每次都有嗎')
        setTop({top:'480px'})
        setClick_and_more_comments('查看更多評論...')
    },[info_board])

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
                {loading}
            </div>
        </>
    )
}

export default More_Comments