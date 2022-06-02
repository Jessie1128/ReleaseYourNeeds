import React from 'react'
import { GoogleMap } from '@react-google-maps/api'
import './back_to_current.css'

const BackToCurrent = ({ if_center_move , map_obj }) => {
    return (
        <div className='bottom_function-icon'>
            <div className='bottom_function-back-to-current'>
                <img 
                    className='bottom_map-back-to-current' 
                    src={require('../../source/direction.png')} 
                    onClick={()=>{
                        map_obj.current.panTo(if_center_move)
                    }}
                />
            </div>
            <div className='bottom_function-icon-text'>返回當前位置</div>
        </div>
    )
}

export default BackToCurrent