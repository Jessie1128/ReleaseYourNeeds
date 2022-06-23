import './mapPage.css'
import React , { useState } from 'react'
import Header from '../Component/Header/header'
import MapArea from './MapArea/mapArea'
import { useEffect , useContext } from 'react';
import { Brightness } from '../Component/ContextFolder/context_folder';
import { Alert_Box } from '../Component/AlertBox/alert_box';
import { storage } from '../connection_firebase/connection_firebase';
import { ref , getDownloadURL } from "firebase/storage";

const MapPage = () =>{

    const { bright , setBright } = useContext(Brightness)
    const [ background_pic , setBackground_pic ] = useState('')

    let bodyBackground ={
        backgroundImage: `url(${background_pic})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'100vh'
    }

    useEffect(()=>{
        getDownloadURL(ref(storage, 'gs://mymap-896b7.appspot.com/mapImg-2.png'))
        .then((background)=>{
            setBackground_pic(background)
        })
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