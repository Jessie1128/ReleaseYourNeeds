import { useState , useEffect , useContext , useRef } from 'react'
import './mapArea.css'
import MapFrame from './ＭapApplication/mapFrame'
import FindColl from './FindCollection/find_collection'
import { Brightness } from '../../Component/ContextFolder/context_folder'

const MapArea = () =>{


    const { bright } = useContext(Brightness)
    const [ text , setText ] = useState( "我這邊要放特效" )
    const [ back_to_center , setBack_to_center ] = useState('')
    const [ filtered_marker , setFiltered_marker ] = useState ([])
    const [ bookmarks_click , setBookmarks_click ] = useState({display:'none'})
    const [ comments_click , setComments_click ] = useState({display:'none'})
    const map_obj = useRef()

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