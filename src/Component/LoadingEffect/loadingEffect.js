import { useState , useEffect } from 'react'
import './LoadingEffect.css'

const Loading_effect = ({ loading_effect_height }) => {

    let [ height , setHeight ] = useState({height:'200px'})

    useEffect(()=>{
        // console.log('正常loading 特效尺寸')
        if(loading_effect_height===''){
            setHeight({height:'200px'})
        }else if(loading_effect_height===null){
            setHeight({height:'200px'})
        }else if(loading_effect_height===undefined){
            setHeight({height:'200px'})
        }
        // console.log('縮小版 loading 特效尺寸')
        setHeight(loading_effect_height)
    },[loading_effect_height])
    return (
        <div className='loading_effect'>
            <div className="loading" style={height}>
                <div className="loading-circle loading-circle-ani-1"></div>
                <div className="loading-circle loading-circle-ani-2"></div>
                <div className="loading-circle loading-circle-ani-3"></div>
                <div className="loading-circle loading-circle-ani-4"></div>
                <div className="loading-circle loading-circle-ani-5"></div>
            </div>
        </div>
    )
}

export default Loading_effect