// import Source from '../source/source'
import './mapPage.css'
import React from 'react'
import Header from '../Component/Header/header'
import MapArea from './MapArea/mapArea'
// import Source from '../source/source.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginStatus from '../Component/LoginStatus/loginStatus';


const MapPage = () =>{

    const bodyBackground ={
        backgroundImage: `url(${require('../source/mapImg-2.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'100vh'
      }

    return (
        <div style={bodyBackground}>
            <Header />
            <MapArea />
        </div>
    )
}

export default MapPage