import React , { useState , useEffect , useCallback , useMemo} from 'react'
// import { useState , useEffect , useRef , useCallback , useMemo} from 'react'
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
// import googleMapStyles from './googleMapStyles';
// import { db } from "../../../connection_firebase/connection_firebase.js"
// import { collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt , arrayUnion } from "firebase/firestore";
// // import './mapFrame.css'
// import MarkerInfo from '../MarkerInfo/MarkerInfo.js'
// import MarkerInfoLabel from '../MarkerInfo/MarkerInfoLabel'
// import { async, stringify } from '@firebase/util';
// import Source from '../../../source/oriSource.json'
// import Loading_effect from '../LoadingEffect/loadingEffect';
// import { v4 } from 'uuid';
import MarkerInfoLabel from '../../MarkerInfo/MarkerInfoLabel';
import { v4 } from 'uuid';

const MarkerForToilet = ({ key_value , position , icon , inner , setMarker_info , setInfo_board , info_board , map_obj , loading , setLoading }) => {
    
    const [ hover , setHover ] = useState('')
    const [ hover_dis , setHover_dis ] = useState({display:'none'})
    // console.log(position)
    // console.log(icon)
    // // key={Number((item["緯度"]))+Number((item["經度"]))}
    // // center={new_lat_lng} 
    // console.log(inner)
    // console.log(setMarker_info)
    // // map_obj={map_obj}
    // console.log(setInfo_board)
    // console.log(info_board)
    // console.log(map_itself)
    // console.log(loading)
    // console.log(setLoading)
    // const rrrrrrrr = (inner) => {
    //     setMarker_info(
    //         <MarkerInfoLabel 
    //             center={position} 
    //             inner={inner} 
    //             // hover={hover}
    //             setMarker_info={setMarker_info} 
    //             setInfo_board={setInfo_board}
    //             info_board={info_board}
    //             map_itself={map_itself}
    //             loading={loading}
    //             setLoading={setLoading}
    //         />
    //     )
    // }
    // let rrr
    // let info
    // useEffect(() => {
    //     console.log('uuuuuuu',hover)
    //     if(hover===undefined){
    //         return
    //     }
    //     console.log(position)
    //     console.log(hover)
    //     console.log(setMarker_info)
    //     console.log(setInfo_board)
    //     console.log(info_board)
    //     console.log(map_itself)
    //     console.log(loading)
    //     console.log(setLoading)
    //     setMarker_info(
    //         <MarkerInfoLabel 
    //             center={position} 
    //             inner={hover} 
    //             // hover={hover}
    //             setMarker_info={setMarker_info} 
    //             setInfo_board={setInfo_board}
    //             info_board={info_board}
    //             map_itself={map_itself}
    //             loading={loading}
    //             setLoading={setLoading}
    //         />
    //     )
    //     return ()=>{
            
    //     }
    // }, [hover])

    const render_marker_info_label = (e) => {
        setMarker_info(
            <MarkerInfoLabel 
                center={position} 
                inner={e} 
                key={key_value+2}
                // hover={hover}
                setMarker_info={setMarker_info} 
                setInfo_board={setInfo_board}
                info_board={info_board}
                map_obj={map_obj}
                loading={loading}
                setLoading={setLoading}
            />
        )
    }

    const render_marker_info_onClick = (e) => {  // for phone 
        setMarker_info(
            <MarkerInfoLabel 
                center={position} 
                inner={e} 
                key={key_value+2}
                // hover={hover}
                setMarker_info={setMarker_info} 
                setInfo_board={setInfo_board}
                info_board={info_board}
                map_obj={map_obj}
                loading={loading}
                setLoading={setLoading}
            />
        )
    }

    return(
        <>
            <Marker 
                key={key_value+3}
                position={position}  
                icon={icon}
                inner={inner}
                onMouseOver={render_marker_info_label.bind(null,inner)}
                onClick={render_marker_info_onClick.bind(null,inner)}
            />
        </>
    )
}

export default MarkerForToilet