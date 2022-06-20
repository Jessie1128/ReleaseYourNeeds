import React , { useContext } from 'react';
import { AlertFrame } from '../ContextFolder/context_folder';
import { Brightness } from '../ContextFolder/context_folder';

const CloseBotton = ({ setMarker_info , setInfo_board , setLogin_board , setAlert_box , 
                       setDis_comment_box , setDis_bookmarks_box }) =>{

    const { setBright } = useContext(Brightness)
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
        // console.log(e)
        // console.log(e.target)
        if( setMarker_info != undefined ){
            setMarker_info('')
        }else if( setInfo_board != undefined ){
            setInfo_board('')
        }else if( setLogin_board != undefined ){
            setBright({filter: 'brightness(1.0)'})
            setLogin_board('')
        }else if ( setAlert_box != undefined){
            clear()
            setAlert_box('')
            setBright({filter: 'brightness(1.0)'})
        }else if ( setDis_comment_box != undefined ){
            setDis_comment_box({display:'none'})
        }else if ( setDis_bookmarks_box != undefined ){
            setDis_bookmarks_box({display:'none'})
        }
    }

    return (
        <div style={close_wrapper}>
            <div style={close_icon} 
                onMouseOver={close_MouseOver} 
                onMouseOut={close_MouseOut} 
                onClick={close_MouseOnClick} >&#10006;</div>
        </div>
    )
}

export default CloseBotton