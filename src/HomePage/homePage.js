import '../Component/base.css'
import './homePage.css'
import * as React from "react";
import Header from '../Component/Header/header';
import '../Component/Header/header.css'
import { Link } from "react-router-dom";
import LoginStatus from '../Component/LoginStatus/loginStatus';
import { useContext , useEffect } from 'react';
import { AlertFrame } from '../Component/ContextFolder/context_folder';
import { Brightness } from '../Component/ContextFolder/context_folder';

const HomePage = () => {

    const { bright , setBright } = useContext(Brightness)

    useEffect(()=>{
        if(JSON.stringify(bright)==JSON.stringify({filter: 'brightness(0.6)'})){
            setBright({filter: 'brightness(1.0)'})
        }
    },[])
    // const {  alert_status ,setAlert_status ,alert_text, setAlert_text ,success , error,clear } = useContext(AlertFrame)
    // useEffect(()=>{
        
    // },[])
    // success()
    // console.log(alert_status)
    // const test = () => {
    //     console.log('test')
    //     setAlert_status('嗨')
    //     success('嗨')
    //     // setTimeout(() => {
    //     //     clear()
    //     // }, "2000")
    // }
    // setAlert_status('嗨')

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
            <div className='rwd_to_next_page'>前往搜尋頁面</div>   {/*  ←← for rwd botton */}
            <div className='home_area_color' style={bright}>
                <div className='home_area'>
                    <div className='intro'>
                        <div className='intro_frame'>
                            <div className='intro_inner'>
                                <div className='intro_inner_text'>
                                    <img src={require('../source/current_place.png')}></img>
                                    <div className='intro_marker_text'>當前位置</div>
                                </div>
                                <div className='intro_inner_text'>
                                    <img src={require('../source/current_opened.png')}></img>
                                    <div className='intro_marker_text'>場所目前營業中</div>
                                </div>
                                <div className='intro_inner_text'>
                                    <img src={require('../source/current_closed.png')}></img>
                                    <div className='intro_marker_text'>場所目前已過開放時間</div>
                                </div>
                                <div className='intro_inner_text'>
                                    <img src={require('../source/current_pending.png')}></img>
                                    <div className='intro_marker_text'>場所目前尚為提供營業時間</div>
                                </div>
                            </div>
                        </div>
                        <div className='intro_ps'>
                            <div className='ps_text_frame'>
                                <div className='ps_time'>場所營業時間，僅供參考。實際開放時間請以各場所為主。</div>
                                <div className='ps_thanks'>感謝各場所維護人員的辛勞！</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='to_next_page_frame'>
                    <div className='to_next_page'>
                        <nav> <Link to="/map" className="button">前往尋找</Link> </nav>
                    </div>
                </div>
                {/* <div className='home_area'>
                    <div className='to_next_page'>
                        <nav> <Link to="/map" className="button">前往尋找</Link> </nav>
                    </div>
                </div> */}
                {/* <div className='home_area'>
                    <div className='intro'>
                        <div className='intro_marker'>
                            <div className='intro_marker_color'>
                                <img src={require('../source/current_opened.png')}></img>
                                <div className='intro_marker_text'>場所目前營業中</div>
                            </div>
                            <div className='intro_marker_color'>
                                <img src={require('../source/current_closed.png')}></img>
                                <div className='intro_marker_text'>場所目前已過開放時間</div>
                            </div>
                            <div className='intro_marker_color'>
                                <img src={require('../source/current_pending.png')}></img>
                                <div className='intro_marker_text'>場所目前尚為提供營業時間</div>
                            </div>
                        </div>
                        <div className='ps_rwd'>
                            <div className='ps_frame'>
                                <div className='ps_time'>場所營業時間，僅供參考。實際開放時間請以各場所為主。</div>
                                <div className='ps_thanks'>感謝各場所維護人員的辛勞！</div>
                            </div>
                            <div className='to_next_page_rwd'>
                                <nav> <Link to="/map" className="button">前往尋找</Link> </nav>
                            </div>
                        </div>
                    </div>
                    <div className='to_next_page'>
                        <nav> <Link to="/map" className="button">前往尋找</Link> </nav>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default HomePage