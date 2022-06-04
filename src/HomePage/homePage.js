import '../Component/base.css'
import './homePage.css'
import * as React from "react";
import Header from '../Component/Header/header';
import '../Component/Header/header.css'
import { Link } from "react-router-dom";
import LoginStatus from '../Component/LoginStatus/loginStatus';
import { useState } from 'react';

const HomePage = () => {

    // let bodyBackground ={
    //     backgroundImage: `url(${require('../source/mapImg-2.png')})`,
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     width:'100%',
    //     height:'100vh'
    // }

    return (
        <div className='body_background'>
            <Header />
            <div className='home_area_color'>
                <div className='home_area'>
                    <div className='intro'>
                        <div className='intro_marker'></div>
                        <div className='ps_time'>場所營業時間，僅供參考。實際開放時間請以各場所為主。</div>
                        <div className='ps_thanks'>感謝各場所維護人員的辛勞！</div>
                    </div>
                    <div className='to_next_page'>
                        <nav> <Link to="/map" className="button">前往尋找</Link> </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage