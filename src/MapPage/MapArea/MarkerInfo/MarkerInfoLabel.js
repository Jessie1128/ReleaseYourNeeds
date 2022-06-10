import React , {  useState , useCallback , useMemo , useRef , useEffect } from 'react';
import { InfoBox } from '@react-google-maps/api';
import { map } from '@firebase/util';     
import './MarkerInfoLabel.css'
import InfoBoard from '../infoBoard/infoBoard';
import CloseBotton from '../../../Component/closeBotton/closeBotton.js'
import { hover } from '@testing-library/user-event/dist/hover';

const MarkerInfoLabel = ({ hover_dis , center , inner , info_board , setMarker_info , setInfo_board , map_obj , loading , setLoading }) => {
    // const MarkerInfoLabel = ({ inner }) => {

    // let info_frame = {
    //     width: '190px',
    //     height: '52px',
    //     backgroundColor: ' rgb(162, 156, 155, 0.8)', 
    //     borderRadius: '5px',
    //     zIndex: '50',
    // }

    // let info_style = {
    //     display: 'flex',
    //     width: '190px',
    //     height: '24px',
    //     fontSize: '14px',
    //     zIndex: '50',
    // }

    // let info_info = {
    //     display: '-webkit-box',
    //     WebkitLineClamp: '1',
    //     WebkitBoxOrient: 'vertical', 
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     width: '170px',
    //     height: '20px',
    //     padding: '2px 2px 0px 5px',
    //     // textAlign: 'justify',
    //     textDecoration:'underline',
    //     textUnderlineOffset:'3px',
    //     zIndex: '50',
    // };


    // let close_wrapper={
    //     display: 'flex',
    //     justifyContent: 'center',
    //     flex: 'none',
    //     marginLeft: '10px',
    //     position: 'relative',
    //     top: '3px',
    //     right: '3px',
    //     width: '16px',
    //     height: '16px',
    //     borderRadius: '50%',
    //     padding: '2px',
    //     background: 'rgb(231, 185, 19, 0.6)',
    //     border: '1px soild #000',
    // }

    // let close_icon = {
    //     fontSize: '14px',
    //     color: 'rgb(78, 79, 78, 0.6)',
    // }

    // let more_info = {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // borderRadius: '5px',
    //     width: '90px',
    //     fontSize: '12px',
    //     color: 'rgb(78, 79, 78, 0.9)',
    //     // background: 'rgb(231, 185, 19, 0.6)',
    //     // padding: '1px 0px',
    //     paddingLeft: '2px',
    //     margin: '6px 0px 2px 0px',
    //     zIndex: '50',
    // }

    let info_frame_MouseOnClick = (e) =>{
        // e.stopPropagation();
    }

    // let close_MouseOver = (e) => {
    //     e.target.style.color = '#000';
    //     e.target.style.cursor = 'pointer';
    // }

    // let close_MouseOut = (e) => {
    //     e.target.style.color = 'rgb(78, 79, 78, 0.6)';
    // }

    // let close_MouseOnClick = (e) => {
    //     e.stopPropagation();
    //     // console.log("我要關掉")
    //     setMarker_info('')
    // }

    let moreInfo_MouseOver = (e) => {
        console.log('我滑進來了')
        // console.log(e)
        // console.log(hover)
        e.target.style.color = '#000';
        e.target.style.cursor = 'pointer';
    }

    let moreInfo_MouseOut = (e) => {
        e.target.style.color = 'rgb(78, 79, 78, 0.9)';
    }

    let moreInfo_onClick = (e) => {
        console.log(inner)
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
        console.log(inner)
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