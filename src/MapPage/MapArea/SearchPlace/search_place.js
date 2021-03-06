import React , { useContext , useEffect } from 'react'
import './search_place.css'
import '../../../Component/rwd.css'
import { Marker_Data } from '../../../Component/ContextFolder/context_folder'

const SearchPlace = () => {

    const { marker_data } = useContext(Marker_Data)
    // let [ loading , setLoading ] = useState(<Loading_effect/>)
    // const [ checked , setChecked ] = useState([])
    
    useEffect(()=>{
        if(marker_data===undefined){
            return
        }else{
            // console.log(marker_data)
        }
    },[marker_data])

    // const search_place_onclick = (e) =>{
    //     console.log(e)
    //     // setColor({ background: '#393E41' })
    // }

    // useEffect(()=>{
    //     // console.log(filter_info)
    // },[filter_info])

    const info = (inner) => {
        // console.log(inner)
        // setFilter_info(function(pre){
        //     // let res = [ ...pre ]
        //     // console.log(res)
        //     // console.log(res.length)
        //     // console.log(res.includes(inner))
        //     // let new_res = {}
        //     // if(res.length==0){
        //     //     console.log('有喔')
        //     //     new_res['inner']=inner
        //     //     // res.push(new_res)
        //     //     // console.log(res)
        //     // }else{
        //     //     res.map((item)=>{
        //     //         if(item['inner']==inner){
        //     //             res.pop(inner)
        //     //         }else{
        //     //             let new_res = {}
        //     //             new_res['inner']=inner
        //     //             res.push(new_res)
        //     //         }
        //     //         console.log('最主要',res)
        //     //     })
        //     // }
        //     // console.log('最主要',res)
        //     return [...pre,{inner}]
        // })
        // console.log(filter_info)
    }

    return(
         <div className='function-area'>
            <div className='function-icon'>
                <input className="function-search-bar" placeholder='輸入關鍵字'></input>
            </div>
            {/* { marker_data===undefined? ( 
                {loading}
            ):( */}
                <div className='search_place_frame'>
                    <div className='search_place'>
                        <div className='search_place_text'>以當前位置搜尋</div>
                        {/* <div className='search_place_filter'> */}

                        <label htmlFor='無障礙廁所' className="container">提供無障礙廁所
                            <input id="無障礙廁所" type="checkbox" onClick={info.bind(null,'無障礙廁所')} onChange={rrr}/>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor='親子廁所' className="container">提供親子廁所
                            <input id="親子廁所" type="checkbox" onClick={info.bind(null,'親子廁所')} onChange={rrr}/>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor='貼心公廁' className="container">提供貼心公廁
                            <input id="貼心公廁" type="checkbox" onClick={info.bind(null,'貼心公廁')} onChange={rrr}/>
                            <span className="checkmark"></span>
                        </label>

                        {/*                         
                        <div className='checkbox_frame'>
                            <input type="checkbox" className='search_place_circle' onClick={info.bind(null,'無障礙廁所')}></input>
                        </div>
                            <div className='search_place_circle' ></div>
                            <div>提供無障礙廁所</div>
                        </div>

                        <input id="one" type="checkbox" onClick={info.bind(null,'無障礙廁所')} />
                        <label for="one" className='label_text'>提供無障礙廁所</label>

                        <div className='search_place_filter'>
                            <div className='search_place_circle' onClick={info.bind(null,'親子廁所')}></div>
                            <div>提供親子廁所</div>
                        </div>
                        <div className='search_place_filter'>
                            <div className='search_place_circle' onClick={info.bind(null,'貼心公廁')}></div>
                            <div>提供貼心公廁</div>
                        </div> */}
                            <hr className='search_place_hr'/>
                        {/* </div> */}
                    </div>
                </div>
            {/* )} */}
        </div>
    )
}

export default SearchPlace