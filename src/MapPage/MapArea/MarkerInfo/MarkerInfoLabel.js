import React from 'react';
import { InfoBox } from '@react-google-maps/api';    
import './MarkerInfoLabel.css'
import InfoBoard from '../infoBoard/infoBoard';
import CloseBotton from '../../../Component/closeBotton/closeBotton.js'

const MarkerInfoLabel = ({ hover_dis , center , inner , info_board , setMarker_info , setInfo_board , map_obj , loading , setLoading }) => {
    
    let info_frame_MouseOnClick = (e) =>{
        // e.stopPropagation();
    }

    let moreInfo_MouseOver = (e) => {
        // console.log(e)
        // console.log(hover)
        e.target.style.color = '#000';
        e.target.style.cursor = 'pointer';
    }

    let moreInfo_MouseOut = (e) => {
        e.target.style.color = 'rgb(78, 79, 78, 0.9)';
    }

    let moreInfo_onClick = (e) => {
        // console.log(inner)
        e.stopPropagation();
        setInfo_board(
            <InfoBoard  
                setInfo_board={setInfo_board} 
                inner={inner} 
                map_obj={map_obj} 
                info_board={info_board}
                loading={loading}
                setLoading={setLoading}
            />
        )
    }

    let moreInfo_onTouchStart = (e) => {
        // console.log(inner)
        e.stopPropagation();
        setInfo_board(
            <InfoBoard  
                setInfo_board={setInfo_board} 
                inner={inner} 
                map_obj={map_obj} 
                info_board={info_board}
                loading={loading}
                setLoading={setLoading}
            />
        )
    }

    

    return (
        <div style={{display:'none'}}>
        <InfoBox
            position={ center }
            onLoad={(e)=>{
                e.closeBoxURL=''
            }}
        >
            <div className='info_frame' onClick={info_frame_MouseOnClick}>
                <div className='info_style'>
                    <div className='info_info'>
                        {inner['公廁名稱']}
                    </div>
                    <CloseBotton setMarker_info={setMarker_info}/>
                </div>
                <div style={{display:'flex'}}>
                    <div 
                        className='more_info'
                        onMouseOver={moreInfo_MouseOver} 
                        onMouseOut={moreInfo_MouseOut} 
                        onClick={moreInfo_onClick}
                        onTouchStart={moreInfo_onTouchStart}
                    >
                        查看更多資訊 ...
                    </div>
                </div>             
            </div>
        </InfoBox>
        </div>
    )
}

export default MarkerInfoLabel