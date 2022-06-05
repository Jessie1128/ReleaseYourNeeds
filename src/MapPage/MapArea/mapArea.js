import { useState , useEffect , useContext } from 'react'
import './mapArea.css'
import MapFrame from './ＭapApplication/mapFrame'
// import  MapMarker from './ＭapApplication/marker'
import Loading_effect from '../../Component/LoadingEffect/loadingEffect'
import Source from '../../source/source'
// import i from '../../source/direction.png'
import SearchPlace from './SearchPlace/search_place'

const MapArea = () =>{
    
    const [ text , setText ] = useState( "我這邊要放特效" )
    const [ back_to_center , setBack_to_center ] = useState('')
    // const [ loading , setLoading ] = useState(<Loading_effect />)
    // const [ InfoBoard , setInfo_board ] = useState('') // 傳遞 → MapFrame → MarkerInfoLabel(onClick 做更改)

    useEffect(()=>{
        setBack_to_center(back_to_center)
    },[])

    return (
        <div className='outside-background'>
            <div className='outside-frame'>
                <div className='map-area'>
                    {/* {InfoBoard} */}
                    <MapFrame 
                        setText={setText} 
                        setBack_to_center={setBack_to_center} 
                        // setInfo_board={setInfo_board}
                    />
                    {/* {loading} */}
                </div>
                <div className='function-area'>
                    <div className='function-icon'>
                        <input className="function-search-bar" placeholder='輸入關鍵字'></input>
                    </div>
                    <SearchPlace />
                    {/* <div className='function-icon'>
                        <div className='function-back-to-current'>
                            <img 
                                className='map-back-to-current' 
                                src={require('../../source/direction.png')} 
                                onClick={()=>{
                                    back_to_center.panTo(if_center_move)
                                }}
                            />
                        </div>
                        <div className='function-icon-text'>返回當前位置</div>
                    </div> */}
                    <div className='function-icon'></div>
                </div>
            </div>
        </div>
    )
}

export default MapArea