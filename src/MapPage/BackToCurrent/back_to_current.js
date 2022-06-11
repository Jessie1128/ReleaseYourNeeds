import React , { useState , useContext } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import './back_to_current.css'
import Lil_bookmarks from './Lil_bookmarks/lil_bookmarks'
import { Google_user } from '../../Component/ContextFolder/context_folder'
import { E_and_P_user } from "../../Component/ContextFolder/context_folder";
import { AlertFrame } from '../../Component/ContextFolder/context_folder'
import { Brightness } from '../../Component/ContextFolder/context_folder'

const BackToCurrent = ({ if_center_move , map_obj }) => {

    const { google_user } = useContext(Google_user)
    const { e_and_p_user } = useContext(E_and_P_user)
    const { success } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)

    // console.log('lililililililik',google_user)
    // console.log('lililililililik',e_and_p_user)
    
    let [ dis_current , setDis_current ] = useState({display:'none'})
    let [ dis_bookmarks , setDis_bookmarks ] = useState({display:'none'})
    let [ dis_comments , setDis_comments ] = useState({display:'none'})
    let [ dis_filter , setDis_filter ] = useState({display:'none'})

    const [ bookmarks_click , setBookmarks_click ] = useState('')
    const [ comments_click , setComments_click ] = useState('')
    const [ filter_click , setFilter_click ] = useState('')
    // const onMouseOver_img = () => {
    //     setDis({display:''})
    // }

    // const onMouseOut_img = () => {
    //     setDis({display:'none'})
    // }

    const onMouseOver_current = () => {
        setDis_current({display:''})
    }

    const onMouseOut_current = () => {
        setDis_current({display:'none'})
    }

    const onMouseOver_bookmarks = () => {
        setDis_bookmarks({display:''})
    }

    const onMouseOut_bookmarks = () => {
        setDis_bookmarks({display:'none'})
    }

    const onClick_bookmarks = () => {
        console.log('要想一下怎麼設計 bookmarks')
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.6)'})
            return
        }
        setBookmarks_click(<Lil_bookmarks/>)
    }

    const onMouseOver_comments = () => {
        setDis_comments({display:''})
    }

    const onMouseOut_comments = () => {
        setDis_comments({display:'none'})
    }

    const onClick_comments = () => {
        if( google_user===null && e_and_p_user===null ){
            success('請先登錄會員')
            setBright({filter: 'brightness(0.6)'})
            return
        }
        console.log('要想一下怎麼設計 comments')
    }

    const onMouseOver_filter = () => {
        setDis_filter({display:''})
    }

    const onMouseOut_filter = () => {
        setDis_filter({display:'none'})
    }

    const onClick_filter = () => {
        console.log('要想一下怎麼設計 filter')
    }

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
                        <div className='bottom_function_function'>
                            <div className='arrow-up' style={dis_bookmarks}>
                                <div className='function-text' style={dis_bookmarks}>已儲存的地點</div>
                            </div>    
                            <img 
                                className='bottom_map-back-to-current' 
                                src={require('../../source/bookmark_coll.png')} 
                                onMouseOver={onMouseOver_bookmarks}
                                onMouseOut={onMouseOut_bookmarks}
                                onClick={onClick_bookmarks}
                            />
                        </div>
                        <div className='bottom_function_function'>
                            <div className='arrow-up' style={dis_comments}>
                                <div className='function-text' style={dis_comments}>已寫下的留言</div>
                            </div>
                            <img 
                                className='bottom_map-back-to-current' 
                                src={require('../../source/comment_coll.png')} 
                                onMouseOver={onMouseOver_comments}
                                onMouseOut={onMouseOut_comments}
                                onClick={onClick_comments}
                            />
                        </div>
                        <div className='bottom_function_filter'>
                            {/* <div className='filter_text' style={dis_filter}>進階篩選</div> */}
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
                        </div>
                    </div>
                {/* </div> */}
            </div>
            <Lil_bookmarks/>
        </>
    )
}

export default BackToCurrent