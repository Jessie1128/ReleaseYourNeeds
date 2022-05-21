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

    // const above_marker={ "lat":(center['lat']) , "lng":(center['lng']) }
    // console.log(above_marker)
    // console.log(<InfoBox/>)
    return (
        <InfoBox 
          // style={info_style}
          position={ center }
          
          onLoad={(e)=>{
            // console.log("啊啊啊啊啊啊啊啊",e)
            // console.log(e.content)
            // console.log(e.closeBoxURL)
            e.closeBoxURL=''
            // console.log(Object.getOwnPropertyNames(e));
          }}

          // onDomReady={()=>{
          //   // console.log("我不要框框關起來")

          // }}

          // onUnmount={(e)=>{
            
          //   e.content.style.display='flex';
          //   // console.log("我不要框框關起來",e)
    
          // }}

          // onCloseClick={()=>{
          //   console.log("哈哈哈哈哈")
          // }}

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