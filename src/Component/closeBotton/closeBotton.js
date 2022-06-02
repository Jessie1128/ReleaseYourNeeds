import React from 'react';

const CloseBotton = ({ setMarker_info , setInfo_board }) =>{

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

    let close_MouseOver = (e) => {
        e.target.style.color = '#000';
        e.target.style.cursor = 'pointer';
    }

    let close_MouseOut = (e) => {
        e.target.style.color = 'rgb(78, 79, 78, 0.6)';
    }

    let close_MouseOnClick = (e) => {
        e.stopPropagation();
        console.log(e)
        console.log(e.target)
        if( setMarker_info != undefined ){
            console.log('有了 setMarker_info')
            setMarker_info('')
        }else if( setInfo_board != undefined ){
            console.log('有了 setInfo_board')
            setInfo_board('')
        }
    }

    return (
        <div style={close_wrapper}>
            <div style={close_icon} onMouseOver={close_MouseOver} onMouseOut={close_MouseOut} onClick={close_MouseOnClick} >&#10006;</div>
        </div>
    )
}

export default CloseBotton