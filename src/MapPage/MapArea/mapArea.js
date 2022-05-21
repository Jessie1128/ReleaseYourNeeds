import { useState ,useEffect } from 'react'
import './mapArea.css'
import MapFrame from './ＭapApplication/mapFrame'
// import  MapMarker from './ＭapApplication/marker'
import Loading_effect from './LoadingEffect/loadingEffect'
import { GoogleMap } from '@react-google-maps/api'
import Source from '../../source/source'
// import i from '../../source/direction.png'

const MapArea = () =>{

    const [ text , setText ] = useState( "我這邊要放特效" )
    const [ back_to_center , setBack_to_center ] = useState('')
    const [ if_center_move , setIf_center_move ] = useState('')

    useEffect(()=>{
        setBack_to_center(back_to_center)
    },[])

    return (
        <div className='outside-background'>
            <div className='outside-frame'>
                <div className='map-area'>
                    <MapFrame 
                        setText={setText} 
                        setBack_to_center={setBack_to_center} 
                        setIf_center_move={setIf_center_move}
                    />
                    <Loading_effect text={text}/>
                </div>
                <div className='function-area'>
                    <div className='function-icon'>
                        {/* <div> */}
                            <img 
                                className='map-back-to-current' 
                                src={require('../../source/direction.png')} 
                                onClick={()=>{
                                    console.log('巴拉巴拉',if_center_move)
                                    back_to_center.panTo(if_center_move)
                                }}
                            />
                        {/* </div> */}
                        <div className='function-icon-text'>返回當前位置</div>
                    </div>
                    <div className='function-icon'></div>
                    <div className='function-icon'></div>
                </div>
            </div>
        </div>
    )
}

export default MapArea