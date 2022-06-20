import React , { useState , useContext , useEffect } from 'react'
import './alert_box.css'
import { AlertFrame } from '../ContextFolder/context_folder'
import Loading_effect from '../LoadingEffect/loadingEffect'
import CloseBotton from '../closeBotton/closeBotton'
import { ForDisplay } from '../ContextFolder/context_folder'
import LoginBoard from '../LoginBoard/login_board'

const Alert_Box = () => {

    // const { setFor_display } = useContext(ForDisplay)
    const { alert_status , alert_text } = useContext(AlertFrame)
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
    // let [ go_login_dis , setGo_login_dis ] = useState({display:'none'})

    useEffect(()=>{
        // console.log(alert_box)
        if(alert_box==='exist') return
        if(alert_box===''){
            setDisplay({display:'none'})
        }
    },[alert_box])

    useEffect(()=>{
        if( alert_status===null || alert_text===null ){
            setDisplay({display:'none'})
            setMargin_bottom(null)
            setloading(null)
            setHeight(null)
            setWidth(null)
        }else if(alert_status==='SUCCESS'){
            setloading(null)
            setDisplay({display:'flex'})
            setHeight({height:'60px'})
            setWidth({width:'300px'})
            setTop({top:'-2px'})
            setAlert_box_block_height({height:'57px'})
            setBackground({background:'rgb(165 171 175)'})
        }else if(alert_status==='ERROR'){
            setloading(null)
            setDisplay({display:'flex'})
            setHeight({height:'60px'})
            setWidth({width:'300px'})
            setTop({top:'-2px'})
            setAlert_box_block_height({height:'57px'})
            setBackground({background:'rgb(186, 63, 29)'})
        }else if( alert_status === 'LOADING'){
            setTop({top:'-7px'})
            setDisplay({display:'flex'})
            setHeight({height:'120px'})
            setWidth({width:'300px'})
            setMargin_bottom({marginBottom:'15px'})
            setBackground({background:'rgb(165 171 175)'})
            setAlert_box_block_height({height:'106px'})
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