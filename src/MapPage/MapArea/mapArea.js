import { useState , useEffect , useContext , useRef } from 'react'
import './mapArea.css'
import MapFrame from './ＭapApplication/mapFrame'
// import  MapMarker from './ＭapApplication/marker'
import Loading_effect from '../../Component/LoadingEffect/loadingEffect'
import Source from '../../source/source'
// import i from '../../source/direction.png'
// import SearchPlace from './SearchPlace/search_place'
import FindColl from './FindCollection/find_collection'
import { Alert_Box } from '../../Component/AlertBox/alert_box';
import { AlertFrame } from '../../Component/ContextFolder/context_folder';
import { Brightness } from '../../Component/ContextFolder/context_folder'

const MapArea = () =>{


    const { bright , setBright } = useContext(Brightness)
    const [ text , setText ] = useState( "我這邊要放特效" )
    const [ back_to_center , setBack_to_center ] = useState('')
    const [ filtered_marker , setFiltered_marker ] = useState ([])
    const [ bookmarks_click , setBookmarks_click ] = useState({display:'none'})
    const [ comments_click , setComments_click ] = useState({display:'none'})
    const map_obj = useRef()

    // const [ loading , setLoading ] = useState(<Loading_effect />)
    // const [ InfoBoard , setInfo_board ] = useState('') // 傳遞 → MapFrame → MarkerInfoLabel(onClick 做更改)

    useEffect(()=>{
        setBack_to_center(back_to_center)
    },[])

    return (
        <div className='outside-background' style={bright}>
            <div className='outside-frame'>
                <div className='map-area'>
                    <MapFrame 
                        map_obj={map_obj}
                        setText={setText} 
                        setBack_to_center={setBack_to_center} 
                        filtered_marker={filtered_marker}
                        setFiltered_marker={setFiltered_marker}
                        bookmarks_click={bookmarks_click} 
                        setBookmarks_click={setBookmarks_click}
                        comments_click={comments_click}
                        setComments_click={setComments_click}
                    />
                </div>
                <FindColl 
                    map_obj={map_obj}
                    bookmarks_click={bookmarks_click} 
                    setBookmarks_click={setBookmarks_click}
                    comments_click={comments_click}
                    setComments_click={setComments_click}
                    filtered_marker={filtered_marker}
                    setFiltered_marker={setFiltered_marker}
                />
            </div>
        </div>
    )
}

export default MapArea