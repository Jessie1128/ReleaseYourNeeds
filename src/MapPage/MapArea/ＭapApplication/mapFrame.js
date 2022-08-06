import React from 'react'
import { useState , useEffect , useCallback , useContext } from 'react'
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
import googleMapStyles from './googleMapStyles';
import { db } from "../../../connection_firebase/connection_firebase.js"
import { collection , getDocs , query , where , limit } from "firebase/firestore";
import './mapFrame.css'
import MarkerInfo from '../MarkerInfo/MarkerInfo.js'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect';
import MarkerForToilet from './MarkerForToilet/marker_for_toilet';
import BackToCurrent from '../../BackToCurrent/back_to_current';
import { Marker_Data } from '../../../Component/ContextFolder/context_folder';
import { AlertFrame } from '../../../Component/ContextFolder/context_folder';
import { Brightness } from '../../../Component/ContextFolder/context_folder';
import GetCurrentTime from '../../GetCurrentTime/get_current_time';

let containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '5px',
  minHeight: '100%',
  position: 'relative',
};

const MapFrame = ({ setText , setBack_to_center , filtered_marker , setFiltered_marker , 
                    bookmarks_click , setBookmarks_click , comments_click , setComments_click , map_obj }) => {

    let test = new GoogleMap
    // console.log(test.options)
    const { error , clear } = useContext(AlertFrame)
    const { setBright } = useContext(Brightness)
    const { marker_data , setMarker_data } = useContext(Marker_Data)

    const [ center , setCenter ] = useState ('')
    const [ label , setLabel ] = useState ('目前位置')
    const [ marker_info , setMarker_info ] = useState('')
    const [ info_board , setInfo_board] = useState('')
    const [ if_center_move , setIf_center_move ] = useState('')
    let [ loading_effect_height , setLoading_effect_height ] = useState({height:'500px'})
    const [ loading , setLoading ] = useState(<Loading_effect loading_effect_height={loading_effect_height}/>)

    const get_your_location = () => {
      if(navigator.geolocation) {                // 向使用者取得定位權限
        function error(e) {
          alert('無法取得你的位置',e);
          setLabel("預設位置")
          setCenter({ "lat":25.09648 , "lng":121.52955 })
        }
        function success(position) {
          let your_location={ "lat":position.coords.latitude, "lng":position.coords.longitude}
          setCenter(your_location)
        }
        navigator.geolocation.getCurrentPosition(success, error);  // 跟使用者拿所在位置的權限
        setText('')
      } else {
        alert('Sorry, 你的裝置不支援地理位置功能。')
        setLabel("預設位置")
        setCenter({ "lat":25.09648 , "lng":121.52955 })
        setText('')
      }
    }

    async function get_data_from_firebase (center) {
      if (center === ''){
        return "none"
      }else{
        let range=0.02
        let min_lat=Number((center['lat']-range).toFixed(6))
        let min_lng=Number((center['lng']-range).toFixed(6))
        let max_lat=Number((center['lat']+range).toFixed(6))
        let max_lng=Number((center['lng']+range).toFixed(6))
        let get_res = collection(db, "test-source");          // for testing
        let res = query(get_res, limit(0))
        // let get_res = collection(db, "source");
        // let res = query(get_res, where("緯度", ">=", min_lat), where("緯度", "<=", max_lat));  
        let snapshot = await getDocs(res);
        let i=0
        let result=[]
        snapshot.forEach((doc) => {
            if( doc.data()["經度"]<max_lng && doc.data()["經度"]>min_lng){
              result.push(doc.data())
            }else{
              return
            }
            i++
        })  
        return new Promise((reslove,reject)=>{
          reslove('ok')
        })
        .then(()=>{
          setMarker_data(result)
        })
        .then(()=>{
          // console.log(marker_data)
          min_lat=Number((center['lat']-0.005).toFixed(6))
          min_lng=Number((center['lng']-0.005).toFixed(6))
          max_lat=Number((center['lat']+0.005).toFixed(6))
          max_lng=Number((center['lng']+0.005).toFixed(6))
          // const new_marker = result.filter(item => {
          //     return item['經度'] >= min_lng && item['經度'] <= max_lng && item['緯度'] >= min_lat && item['緯度'] <= max_lat
          // });
          const new_marker = result         // for testing
          return new_marker
        })
      }
    }

    // async function get_current_time(res){
    //   let day=new Date().getDay()
    //   let hours = new Date().getHours() // type Number
    //   let minutes = new Date().getMinutes() // type Number
    //   if (minutes<10){
    //     minutes='0'+minutes
    //   }
    //   let times=stringify(hours)+stringify(minutes)
    //   times=times.replace('"', '')
    //   times=times.replace('"', '')
    //   let filtered_marker=[]
    //   res.map(item=>{
    //     if (item.hasOwnProperty('weekday_text')){
    //       if(day===0){
    //         day=7
    //       }
    //       let time_num
    //       if(item['weekday_text'][day-1]===undefined){
    //         console.log('undefined')
    //       }else{
    //         time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")
    //       }
    //       let slice_time_to_num = (time_num) => {
    //         times=Number(times)
    //         if(times!=''){
    //           if(time_num.slice(24,32)){
    //             console.log('hi')
    //             if( times>=Number(time_num.slice(24,28)) && times<Number(time_num.slice(28,32)) ){
    //               item['opened']='ok'
    //               console.log('hi')
    //             }
    //           }
    //           if(time_num.slice(16,24)){
    //             console.log('hi')
    //             if( times>=Number(time_num.slice(16,20)) && times<Number(time_num.slice(20,24)) ){
    //               item['opened']='ok'
    //               console.log('hi')
    //             }
    //           }
    //           if(time_num.slice(8,16)){
    //             console.log('hi')
    //             if( times>=Number(time_num.slice(8,12)) && times<Number(time_num.slice(12,16)) ){
    //               item['opened']='ok'
    //               console.log('hi')
    //             }
    //           }
    //           if(time_num.slice(0,8)){
    //             console.log('llllll')
    //             let start = Number(time_num.slice(0,4))  //5
    //             let end = Number(time_num.slice(4,8))  //3 27
    //             if( start>end ){
    //               console.log('start>end')
    //               console.log(end)
    //               if (end==0){
    //                 if(times>=start && times<2400){
    //                   item['opened']='ok'
    //                   console.log('start>end')
    //                 }
    //               }else{
    //                 if( times>=start && times<2400 || times<end ){
    //                   item['opened']='ok'
    //                   console.log('start>end')
    //                 }
    //               }
    //               console.log(end)
    //             }else if( times>=start && times<end ){
    //               item['opened']='ok'
    //               console.log(Number(time_num.slice(0,4)))
    //               console.log(times)
    //               console.log(Number(time_num.slice(4,8)))
    //               console.log('llllllllllllll')
    //             }
    //           }

    //           if(item.hasOwnProperty('opened')===false){
    //             item['opened']='none'
    //           }
    //         }else{
    //           item['opened']='none'
    //         }
    //       }

    //       if(time_num=='24'){
    //         item['opened']='ok'
    //       }else if (item['weekday_text']=='none'){
    //         item['opened']='pending'
    //       }else if(item['weekday_text'][day-1].includes("休息")){
    //         console.log('休息')
    //         item['opened']='none'
    //       }else{
    //         slice_time_to_num(time_num)
    //       }
    //       filtered_marker.push(item)
    //     }
    //   })
    //   setFiltered_marker(filtered_marker)
    // }



    useEffect(()=>{           // 載入畫面，取的使用者定位後的地圖呈現
      get_your_location();
    },[])
   
    useEffect(()=>{               // 使用者點擊地圖後，中心點改變，需要去抓取新的臨近地標      // 會變成跑兩次，我在研究研究                  
      async function get_marker_info(){
        if ( center === '' || map_obj === undefined){
          return
        }else{
          let res = await get_data_from_firebase(center)
          if( JSON.stringify(res) === JSON.stringify([]) ){
            setBright({filter: 'brightness(0.8)'})
            error('哎呀！此地點位置的500公尺內 沒有任何廁所')
            setFiltered_marker([])
            setTimeout(()=>{
              setBright({filter: 'brightness(1.0)'})
              clear()
            },'2000')
            return
          }
          let next_step = new GetCurrentTime ( res , map_obj , setFiltered_marker)
          next_step.get_current_time()
        }
      }
      get_marker_info()
    },[center])


    const onMapLoad = useCallback((ori_map) => {
      map_obj.current=ori_map;
      setBack_to_center(ori_map)
    },[center])

    const libraries = ['places']
    const isLoaded = useLoadScript({                       // isLoaded 本身是 boolean, const { variable } = this.props.variable
      // googleMapsApiKey: process.env.REACT_APP_Maps_API_Key,  
      libraries,
    }).isLoaded

    if( !isLoaded ) {
      return (
        <Loading_effect loading_effect_height={loading_effect_height}/>
      )
    }

    return (
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={containerStyle}
        streetView={false}
        options={{
          gestureHandling: 'greedy',  // 手機單指就可以移動
          styles: googleMapStyles,
          streetViewControl:false,
          mapTypeControl:false,
        }}

        onLoad={ 
          onMapLoad         
        }

        onClick={(e) => {
          let newCenter={"lat":e.latLng.lat() , "lng":e.latLng.lng()}
          map_obj.current.panTo(newCenter)
          const interval = setInterval(() => {                          // 300 毫秒後再更改 setCenter
            setCenter({"lat":e.latLng.lat() , "lng":e.latLng.lng()})
            clearInterval(interval);
          }, 300);
        }}
        
        onCenterChanged={()=>{
          setIf_center_move(center)
          setMarker_info(<MarkerInfo info={''} center={center} inner={label} setMarker_info={setMarker_info}/>)  
        }}
      >
        { 
          filtered_marker.map(item => {
            let new_lat_lng={ "lat":item["緯度"], "lng":item["經度"] };
            let icon;
            let key_value=Number((item["緯度"]))+Number((item["經度"]))
            if(item['opened']=='ok'){
              icon=require('../../../source/current_opened.png')
            }else if(item['opened']=='pending'){
              icon=require('../../../source/current_pending.png')
            }else{
              icon=require('../../../source/current_closed.png')
            }
            return ( 
              <MarkerForToilet
                key={key_value}
                position={new_lat_lng}  
                icon={icon}
                key_value={key_value}
                center={new_lat_lng} 
                inner={item} 
                setMarker_info={setMarker_info} 
                setInfo_board={setInfo_board}
                info_board={info_board}
                map_obj={map_obj}
                loading={loading}
                setLoading={setLoading}
              />
            )
          })
        }
        <Marker 
          key={center['lat']+center['lng']+'main'}
          position={center}
          icon={require('../../../source/current_place.png')}
          onLoad={()=>{
            setMarker_info(<MarkerInfo center={center} inner={label} />)  
          }}

          onMouseOver={()=>{
          }}

          onClick={(e) => {
          }}
        >
        </Marker>
        {info_board}
        {marker_info}
          <BackToCurrent 
            if_center_move={if_center_move}  
            map_obj={map_obj} 
            filtered_marker={filtered_marker}
            setFiltered_marker={setFiltered_marker}
            bookmarks_click={bookmarks_click} 
            setBookmarks_click={setBookmarks_click}
            comments_click={comments_click}
            setComments_click={setComments_click}
          />
      </GoogleMap>
    )
}

export default MapFrame;



