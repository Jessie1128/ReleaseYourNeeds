import '../Component/base.css'
// import './homePage.css'
import * as React from "react";
import Header from '../Component/Header/header';
import '../Component/Header/header.css'
import { Link } from "react-router-dom";
import LoginStatus from '../Component/LoginStatus/loginStatus';
import { useState } from 'react';

const HomePage = () => {

    return (
        <div>
            <Header />
            <div className='header'>Release Your Needs</div>
            {/* <div className="contain">讓你在外也能隨心所欲，沒有拘束</div> */}
            <nav className="to_next_page"> 
                <Link to="/map" className="button">開始尋找鄰近的廁所</Link>
            </nav>
        </div>
    )
}

export default HomePage