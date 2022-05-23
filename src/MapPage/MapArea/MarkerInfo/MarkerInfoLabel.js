import React from 'react';
import { InfoBox } from '@react-google-maps/api';
import { map } from '@firebase/util';
import './MarkerInfoLabel.css'

const MarkerInfoLabel = ({ center , inner , setMarker_info , map_obj }) => {

    // console.log(InfoBox)

    let info_frame = {
        width: '190px',
        height: '52px',
        backgroundColor: ' rgb(162, 156, 155, 0.8)', 
        borderRadius: '5px',
    }

    let info_style = {
        display: 'flex',
        width: '190px',
        height: '24px',
        fontSize: '14px',
    }

    let info_info = {
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '170px',
        height: '23px',
        padding: '2px 2px 0px 5px',
        // textAlign: 'justify',
        textDecoration:'underline',
        textUnderlineOffset:'3px',
    };


    let close_wrapper={
        display: 'flex',
        justifyContent: 'center',
        flex: 'none',
        marginLeft: '10px',
        position: 'relative',
        top: '3px',
        right: '3px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        padding: '2px',
        background: 'rgb(231, 185, 19, 0.6)',
        border: '1px soild #000',
    }

    let close_icon = {
        fontSize: '14px',
        color: 'rgb(78, 79, 78, 0.6)',
    }

    let more_info = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: '5px',
        width: '90px',
        fontSize: '12px',
        color: 'rgb(78, 79, 78, 0.9)',
        // background: 'rgb(231, 185, 19, 0.6)',
        // padding: '1px 0px',
        paddingLeft: '2px',
        margin: '6px 0px 2px 0px',
    }

    let info_frame_MouseOnClick = (e) =>{
        e.stopPropagation();
    }

    let close_MouseOver = (e) => {
        e.target.style.color = '#000';
        e.target.style.cursor = 'pointer';
    }

    let close_MouseOut = (e) => {
        e.target.style.color = 'rgb(78, 79, 78, 0.6)';
    }

    let close_MouseOnClick = (e) => {
        e.stopPropagation();
        // console.log("我要關掉")
        setMarker_info('')
    }

    let moreInfo_MouseOver = (e) => {
        e.target.style.color = '#000';
        e.target.style.cursor = 'pointer';
    }

    let moreInfo_MouseOut = (e) => {
        e.target.style.color = 'rgb(78, 79, 78, 0.9)';
    }

    let moreInfo_onClick = (e) => {
        e.stopPropagation();
        // console.log("我要用一個資訊框框")
        // // console.log(center)
        // let new_lng=(center['lng']-0.02)
        // // console.log(new_lng)
        // map_obj.current.panTo({ 'lat':center['lat'] , 'lng':center['lng']-0.02 })
    }

    let above_marker={ "lat":(center['lat']) , "lng":(center['lng']) }
    // console.log(above_marker)
    // console.log(<InfoBox/>)

    return (
        <InfoBox
          position={ above_marker }
          onLoad={(e)=>{
            e.closeBoxURL=''
          }}
        >
            <div style={info_frame} onClick={info_frame_MouseOnClick}>
                <div style={info_style}>
                    <div style={info_info}>
                    {inner}
                    </div>
                    <div style={close_wrapper}>
                        <div style={close_icon} onMouseOver={close_MouseOver} onMouseOut={close_MouseOut} onClick={close_MouseOnClick} >&#10006;</div>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                {/* <div style={{display:'flex',justifyContent:'end'}}> */}
                    <div style={more_info} onMouseOver={moreInfo_MouseOver} onMouseOut={moreInfo_MouseOut} onClick={moreInfo_onClick}>查看更多資訊 ...</div>
                </div>             
            </div>
        </InfoBox>
    )
}

export default MarkerInfoLabel