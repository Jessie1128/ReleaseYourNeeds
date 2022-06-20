import '../Component/base.css'
import './homePage.css'
import * as React from "react";
import '../Component/Header/header.css'
import { Link } from "react-router-dom";
import { useContext , useEffect , useState } from 'react';
import { Brightness } from '../Component/ContextFolder/context_folder';
import { Alert_Box } from '../Component/AlertBox/alert_box';
import Loading_effect from '../Component/LoadingEffect/loadingEffect';


const HomePage = () => {

    const { bright , setBright } = useContext(Brightness)
    const [ header_background , setHeader_background ] = useState({height:''})
    const [ title_top , setTitle_top ] = useState({top: '50%'})
    const [ title_font_size , setTitle_font_size ] = useState({fontSize: '54px'})
    const [ title_width , setTitle_width ] = useState({width: '1100px'})
    const [ intro_height , setIntro_height ]  = useState({height: ''})
    const [ loading , setLoading ] = useState(<Loading_effect/>)
    const [ change , setChange ] = useState('hover_marker')
    const [ check , setCheck ] = useState('check_current')

    useEffect(()=>{
        if(JSON.stringify(bright)==JSON.stringify({filter: 'brightness(0.6)'})){
            setBright({filter: 'brightness(1.0)'})
        }
    },[])

    const load = () => {
        let vh = window.innerHeight * 0.01;
        let height=(vh*100)-100;
        let i=0
        let y=0
        setTimeout(()=>{
            setHeader_background({height: '80px', borderBottom: '2px #000 solid'})
        },'2600')
        setTimeout(()=>{
            setIntro_height({height:height})
        },'3100')
        setTimeout(()=>{
            setTitle_font_size({fontSize: '32px'})
            setTitle_top({top: '0px'})
            setTitle_width({width: '200px'})
            getWindowDimensions() 
            setLoading('')
        },'1500')
        setInterval(() => {
            if(i===0){
                setChange('hover_marker')
            }else if(i===1){
                setChange('check_more')
            }else if(i===2){
                setChange('coll_comment')
            }else if(i===3){
                setChange('coll_place')
            }
            i++;
            if(i===4){
                i=0
            }
        }, 2000);
        setInterval(() => {
            if(y===0){
                setCheck('check_current')
            }else if(y===1){
                setCheck('check_coll')
            }else if(y===2){
                setCheck('check_comment')
            }
            y++;
            if(y===3){
                y=0
            }
        }, 2000);
        
        
        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            // console.log(width)
            // console.log(height)
                if(width<620){
                    setTitle_font_size({fontSize: '24px'})
                }else{
                    setTitle_font_size({fontSize: '30px'})
                }
        }
        // getWindowDimensions()
        
    }

    return (
        <div>
            <img 
                className='home_area_color' 
                src={require('../source/mapImg-2.png')} 
                onLoad={load}
            />
            <div className='home_area_color' style={bright}>
            <div className='header_background' style={header_background}/>
                <div className='home_title' >
                    <div className='home_title_inner' style={Object.assign( {} , title_top , title_font_size , title_width )}>
                        <div className='title_inner_text'>
                            <div className='title_frame'>
                                <h3>Release Your</h3>
                                <div className='loading_frame'>
                                    <h3>Needs</h3>
                                    <div className='loading'>{loading}</div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className='intro' style={Object.assign( {} , intro_height  )}>
                    <div className='public_frame'>
                        <div className='intro_width_frame'>
                            <div className='intro_frame'>
                                <div className='intro_title'>
                                    <h3>依據台北市政府公廁點位資訊</h3>
                                    <h4>提供定點搜尋鄰近廁所</h4>
                                    <h4>隨心所欲暢遊台北</h4>
                                    <div className='intro_to_rwd'>
                                        <nav>
                                            <Link to="/map" className='to_next_page_inner'>
                                                開始尋找
                                            </Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <nav className='intro_to'>
                                <Link to="/map" className='to_next_page_inner'>
                                    開始尋找
                                </Link>
                            </nav>
                        </div>
                    </div>
                    <div className='public_frame'>
                        <div className='intro_pic_width_frame'>
                            <div className='intro_pic'>
                                <div className='intro_pic_data'>
                                    <div className='intro_pic_img_frame'>
                                        <img className='intro_pic_img' src={require('../source/big_data.png')}/>
                                    </div>
                                    <div className='intro_pic_inner'>
                                        <h6 className='intro_pic_text'>
                                            <div>地圖中的公廁點位</div>
                                            <div>依據場所當前是否營業</div>
                                            <div>區分為不同顏色的地標</div>
                                        </h6>
                                        <div className='grid_frame'>
                                            <img src={require('../source/current_place.png')}/>
                                            <span>目前位置</span>
                                        </div>
                                        <div className='grid_frame'>
                                            <img src={require('../source/current_opened.png')}/>
                                            <span>場所目前營業中</span>
                                        </div>
                                        <div className='grid_frame'>
                                            <img src={require('../source/current_pending.png')}/>
                                            <span>場所目前尚未提供開放時間</span>
                                        </div>
                                        <div className='grid_frame'>
                                            <img src={require('../source/current_closed.png')}/>
                                            <span>場所目前已過開放時間</span>
                                        </div>
                                    </div>
                                    {/* <div className='marker_intro_hover'>uu
                                        <div className='marker_intro_hover_frame'>地標介紹
                                            <div className='marker_intro_text'> yy

                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className='public_frame'>
                        <div className='intro_pic_width_frame'>
                            <div className='intro_pic'>
                                <div className='intro_pic_data'>
                                    <div className='intro_pic_img_frame'>
                                        <img className='intro_pic_img' src={require('../source/no_data.png')}/>
                                    </div>
                                    <div className='intro_pic_inner'>
                                        <h6 className='intro_pic_text'>
                                            <div>當前位置附近無公廁點位</div>
                                            <div>會出現提示視窗</div>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className='public_frame'>
                        <div className='intro_pic_width_frame'>
                            <div className='intro_pic'>
                                <div className='intro_pic_data'>
                                    <div className='intro_hover_img_frame'>
                                        <img className='intro_pic_img' src={require(`../source/${change}.png`)}/>
                                    </div>
                                    <div className='intro_pic_inner'>
                                        <h6 className='intro_pic_text'>
                                            <div>點擊地標顯示地點名稱</div>
                                            <div>點擊查看更多顯示詳細資訊</div>
                                            <div>寫下留言 收藏喜歡的地點</div>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className='public_frame'>
                        <div className='coll_pic_width_frame'>
                            <div className='coll_pic'>
                                <div className='coll_pic_data'>
                                    <div className='coll_pic_inner'>
                                        <img className='coll_pic_src' src={require(`../source/${check}.png`)}/>
                                        <div className='coll_pic_block'>
                                            <div className='coll_pic_text'>點擊定位 <div>返回當前位置</div></div>
                                            <div className='coll_pic_text'>點擊書籤 <div>顯示收藏地點</div></div>
                                            <div className='coll_pic_text'>點擊留言 <div>顯示已寫下留言</div></div>
                                            <nav className='coll_to_next_page'> <Link to="/map" className='to_next_page_inner'>前往搜尋頁面</Link> </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='to_next_page'>
                                <nav> <Link to="/map" className='to_next_page_inner'>前往搜尋頁面</Link> </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert_Box/>
            
            {/* <Header /> */}
            {/* <div className='rwd_to_next_page'>
                <nav> <Link to="/map" className='button_rwd'>前往搜尋頁面</Link> </nav>
            </div>    ←← for rwd botton
            <div className='home_area_color' style={bright}>
                <div className='home_area'>
                    <div className='main_intro'>
                        <h3 className='main_intro_inner_h3'>依據台北市政府彙整公廁資料</h3>
                        <h4 className='main_intro_inner_h4'>提供搜尋定位地點周邊的鄰近廁所</h4>
                    </div>
                </div>
            </div> */}
            {/* <div className='home_area_color' style={bright}>
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
            </div> */}
        </div>
    )
}

export default HomePage