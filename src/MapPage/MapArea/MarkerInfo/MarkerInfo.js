import React from 'react';
import { InfoBoxComponent } from '@react-google-maps/api';
import { InfoWindow , InfoBox } from '@react-google-maps/api';
import { map } from '@firebase/util';

const MarkerInfo = ({ center , inner }) => {
    // console.log(InfoBox)
    console.log(center)
    let info_style = {
      display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ' rgb(162, 156, 155, 0.8)', 
        borderRadius: '5px',
        width: '70px',
        height: '22px',
        zIndex: '10',
        fontSize: '14px',
    }

    let info_info={
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        zIndex: '10',
    }

    return (
        <InfoBox 
          position={ center }   
          onLoad={(e)=>{
            e.closeBoxURL=''
          }}
        >
          <div style={info_style} >
            <div style={info_info}>
              {inner}
            </div>
          </div>
        </InfoBox>
    )
}

export default MarkerInfo