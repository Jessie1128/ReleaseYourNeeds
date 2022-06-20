import React , { useContext } from 'react'
import './create_comments_info.css'
import { AlertFrame } from '../../../../Component/ContextFolder/context_folder'
import { Brightness } from '../../../../Component/ContextFolder/context_folder'
import { db } from '../../../../connection_firebase/connection_firebase'
import { deleteField , setDoc , doc , getDoc , updateDoc } from "firebase/firestore";


const CreateComm = ({ item }) => {

    const { success , error , clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)

    let tme_inner = `( ${item['time']} )`

    const delete_comm = async(e) => { 
        // console.log(e)
        // console.log(item['email'])
        // console.log(item['place'])
        try {
            let data = doc( db, 'user', item['email'] );
            await setDoc(data, {
                user_comments : { [`${e}`] : deleteField() }
            } , { merge : true } );

            const docRef = doc(db, "comments", item['place']);
            const docSnap = await getDoc( docRef );
            let res = docSnap.data()
            // console.log(res)
            let new_res = res['data'].filter(ele=>ele['user_Email']!=item['email'])
            // console.log(new_res)
            await updateDoc(doc(db, "comments", item['place']), {
                data: new_res
                // user_collection: firebase.firestore.FieldValue.arrayUnion([inner['公廁名稱']])
            })

            success('刪除留言成功')
            setBright({filter: 'brightness(0.8)'})
            setTimeout(()=>{
                clear()
                setBright({filter: 'brightness(1.0)'})
            },'1500')
        } catch (e) {
            console.log(e)    
            error('系統忙碌中，請稍後再試！')
        }
    }

    return(
        <div className='frame_frame'>
            <div className='comm_frame'>
                <div className='comm_top_frame'>
                    <div className='comm_text_place'>{item['place']}</div>
                    <div className='comm_delete'>
                        <div className='comm_delete_inner' onClick={delete_comm.bind(null,item['place'])}>刪除</div>
                    </div>
                </div>
                <>
                    <div className='comm_text_time'>{tme_inner}</div>
                    <div className='comm_text_comments'>{item['comments']}</div>
                </>
            </div>
        </div>
    )
}

export default CreateComm