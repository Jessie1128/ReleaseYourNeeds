import React , { useContext } from 'react'
import './create_place_info.css'
import { AlertFrame } from '../../../../Component/ContextFolder/context_folder'
import { Brightness } from '../../../../Component/ContextFolder/context_folder'
import { db } from '../../../../connection_firebase/connection_firebase'
import { deleteField , setDoc , doc , getDoc , updateDoc , arrayRemove } from "firebase/firestore";
import { E_and_P_user } from '../../../../Component/ContextFolder/context_folder'
import { Google_user } from '../../../../Component/ContextFolder/context_folder'
import GetCurrentTime from '../../../GetCurrentTime/get_current_time'

const CreateColl = ({ item , map_obj , setFiltered_marker }) => {
    // console.log(item['info']['place'])

    const { e_and_p_user } = useContext(E_and_P_user)
    const { google_user } = useContext(Google_user)
    const { success , error , clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    

    const bookmarks_cancel = async(e) => {
        try {
            let email
            if( e_and_p_user!=null){
                if(e_and_p_user['user']['email']===undefined){
                    email=e_and_p_user['user']['login_user']['email']
                }else{
                    email=e_and_p_user['user']['email']
                }
            }else{
                if(email=google_user['email']===undefined){
                    email=google_user['login_user']['email']
                }else{
                    email=google_user['email']
                }
            }
            console.log(item)
            let info={}
            info['place']=item['info']['place']
            info['data']=item['info']['data']

            await updateDoc(doc(db, "user", email), {
                user_collection: arrayRemove({info})
            })
            success('取消收藏成功')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                clear()
                setBright({filter: 'brightness(1.0)'})
            },'1200')
        } catch (e) {
            console.log(e)    
            error('系統忙碌中，請稍後再試！')
        }
    }

    const move_map_to = () => {
        console.log(item['info']['data']['經度'])
        console.log(item['info']['data']['緯度'])
        console.log(item['info']['data'])
        let newCenter={"lat":item['info']['data']['緯度'] , "lng":item['info']['data']['經度']}
        map_obj.current.panTo(newCenter)
        let place_marker = []
        place_marker.push(item['info']['data'])
        let show_place = new GetCurrentTime ( place_marker , map_obj , setFiltered_marker)
        show_place.get_current_time()
        console.log(show_place)
    }

    return(
        <div className='frame_frame'>
            <div className='coll_frame'>
                <div className='coll_frame_place'>{item['info']['place']}</div>
                {/* <hr className='coll_hr'/> */}
                <div className='coll_frame_cancel'>
                    <div className='coll_cancel' onClick={bookmarks_cancel.bind(null,item['info']['place'])}>取消收藏</div>
                    <div className='coll_go_there' onClick={move_map_to}>地圖上顯示</div>
                </div>
            </div>
        </div>
    )
}

export default CreateColl