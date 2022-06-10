import React , { useState , useContext , useEffect } from 'react'
import './alert_box.css'
import { AlertFrame } from '../ContextFolder/context_folder'
import Loading_effect from '../LoadingEffect/loadingEffect'
import CloseBotton from '../closeBotton/closeBotton'

const Alert_Box = () => {

    const {  alert_status ,setAlert_status ,alert_text, setAlert_text, success, error, clear } = useContext(AlertFrame)
    let [ display , setDisplay ] = useState({display:'none'})
    let [ loading , setloading ] = useState(null) 
    let [ height , setHeight ] = useState(null)
    let [ width , setWidth ] = useState(null)
    let [ background , setBackground ] = useState(null)
    let [ margin_bottom , setMargin_bottom ] = useState(null)
    const [ alert_box , setAlert_box ] = useState('exist')
    let [ loading_effect_height , setLoading_effect_height ] = useState({height:'50px'})
    let [ top , setTop ] = useState(null)
    const [ alert_box_block_height , setAlert_box_block_height ] = useState(null)

    useEffect(()=>{
        console.log('這邊')
        console.log(alert_box)
        if(alert_box==='exist') return
        if(alert_box===''){
            console.log('這邊是空')
            setDisplay({display:'none'})
        }
        // if(alert_box==='exist') return
    },[alert_box])

    useEffect(()=>{
        console.log('這邊')
        // setDisplay({display:'none'})
        if( alert_status===null || alert_text===null ){
            console.log('不顯示')
            setDisplay({display:'none'})
            setMargin_bottom(null)
            setloading(null)
            setHeight(null)
            setWidth(null)
        }else if(alert_status==='SUCCESS'){
            setloading(null)
            console.log('要顯示')
            setDisplay({display:'flex'})
            setHeight({height:'60px'})
            setWidth({width:'300px'})
            setTop({top:'-2px'})
            setAlert_box_block_height({height:'57px'})
            setBackground({background:'rgb(165 171 175)'})
            // setBackground({background:'rgb(57, 62, 65, 0.4)'})
            console.log('要顯示')
        }else if(alert_status==='ERROR'){
            setloading(null)
            setDisplay({display:'flex'})
            setHeight({height:'60px'})
            setWidth({width:'300px'})
            setTop({top:'-2px'})
            setAlert_box_block_height({height:'57px'})
            setBackground({background:'rgb(186, 63, 29)'})
            // setBackground({background:'rgb(186, 63, 29, 0.6)'})
            console.log('要顯示')
        }else if( alert_status === 'LOADING'){
            console.log('顯示Loading')
            setTop({top:'-7px'})
            setDisplay({display:'flex'})
            setHeight({height:'120px'})
            setWidth({width:'300px'})
            setMargin_bottom({marginBottom:'15px'})
            setBackground({background:'rgb(165 171 175)'})
            setAlert_box_block_height({height:'106px'})
            // setBackground({background:'rgb(57, 62, 65, 0.4)'})
            setloading(<Loading_effect loading_effect_height={loading_effect_height}/>)
        }
    },[alert_status,alert_text])


    return(
        <div className='alert_box' style={Object.assign( {} , display , height , width , background )}>
            <div className='alert_box_block' style={alert_box_block_height}>
                <div className='alert_box_close' style={top}>
                    <CloseBotton setAlert_box={setAlert_box}/>
                </div>
                <div className='alert_box_inner'>
                    <div className='alert_box_text' style={Object.assign( {} , display , margin_bottom )}>
                        {alert_text}
                    </div>
                    {loading}
                </div>
            </div>
        </div>
    )
}

export {Alert_Box} 