import './mapPage.css'
import React from 'react'
import Header from '../Component/Header/header'
import MapArea from './MapArea/mapArea'
import { useEffect , useContext } from 'react';
import { Brightness } from '../Component/ContextFolder/context_folder';
import { Alert_Box } from '../Component/AlertBox/alert_box';

const MapPage = () =>{

    const { bright , setBright } = useContext(Brightness)

    let bodyBackground ={
        backgroundImage: `url(${require('../source/mapImg-2.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'100vh'
    }

    useEffect(()=>{
        if(JSON.stringify(bright)==JSON.stringify({filter: 'brightness(0.6)'})){
            setBright({filter: 'brightness(1.0)'})
        }
    },[])

    // const [ login_name , setLogin_name ] = useState('') // 先從header拉過來，借用一下

    return (
            <div style={bodyBackground}>
                <Alert_Box/>
                <Header />
                <MapArea />
            </div>
    )
}

export default MapPage