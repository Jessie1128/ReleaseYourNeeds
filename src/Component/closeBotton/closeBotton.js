import React , { useContext } from 'react';
import { AlertFrame } from '../ContextFolder/context_folder';
import { Brightness } from '../ContextFolder/context_folder';

const CloseBotton = ({ setMarker_info , setInfo_board , setLogin_board , setAlert_box }) =>{

    const { bright , setBright } = useContext(Brightness)
    const { clear } =useContext(AlertFrame)
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
        console.log(setMarker_info)
        console.log(setInfo_board)
        console.log(setLogin_board)
        if( setMarker_info != undefined ){
            console.log('有了 setMarker_info')
            setMarker_info('')
        }else if( setInfo_board != undefined ){
            console.log('有了 setInfo_board')
            setInfo_board('')
        }else if( setLogin_board != undefined ){
            console.log('我要關掉')
            setBright({filter: 'brightness(1.0)'})
            setLogin_board('')
        }else if ( setAlert_box != undefined){
            console.log('我要關掉這邊要執行')
            clear()
            setAlert_box('')
        }
    }

    return (
        <div style={close_wrapper}>
            <div style={close_icon} onMouseOver={close_MouseOver} onMouseOut={close_MouseOut} onClick={close_MouseOnClick} >&#10006;</div>
        </div>
    )
}

export default CloseBotton