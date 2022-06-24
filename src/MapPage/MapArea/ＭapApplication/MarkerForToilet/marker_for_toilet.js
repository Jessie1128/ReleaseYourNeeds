import React from 'react'
import { Marker } from '@react-google-maps/api';
import MarkerInfoLabel from '../../MarkerInfo/MarkerInfoLabel';

const MarkerForToilet = ({ key_value , position , icon , inner , setMarker_info , setInfo_board , info_board , map_obj , loading , setLoading }) => {
    
    // const [ hover , setHover ] = useState('')
    // const [ hover_dis , setHover_dis ] = useState({display:'none'})

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
                key={key_value+3}
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
        <Marker 
            position={position}  
            icon={icon}
            inner={inner}
            onMouseOver={render_marker_info_label.bind(null,inner)}
            onClick={render_marker_info_onClick.bind(null,inner)}
        />
    )
}

export default MarkerForToilet