import React from 'react'
import { useState , useEffect , useRef , useCallback , useMemo} from 'react'
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
import googleMapStyles from './googleMapStyles';
import { db } from "../../../connection_firebase/connection_firebase.js"
import { collection , getDocs , doc, query, orderBy , where, startAfter , updateDoc , limit , startAt , arrayUnion } from "firebase/firestore";
import './mapFrame.css'
import MarkerInfo from '../MarkerInfo/MarkerInfo.js'
import MarkerInfoLabel from '../MarkerInfo/MarkerInfoLabel'
import { async, stringify } from '@firebase/util';
import Source from '../../../source/oriSource.json'
import Loading_effect from '../../../Component/LoadingEffect/loadingEffect';
import { v4 } from 'uuid';
import MarkerForToilet from './MarkerForToilet/marker_for_toilet';
import BackToCurrent from '../../BackToCurrent/back_to_current';

const containerStyle = {
  width: '800px',
  height: '600px',
  borderRadius: '5px',
};

const MapFrame = ({ setText , setBack_to_center }) => {

    const [ center , setCenter ] = useState ('')
    const [ label , setLabel ] = useState ('目前位置')
    // const [ map_obj , setMap_obj ] = useState ('')
    const [ filtered_marker , setFiltered_marker ] = useState ([])
    const [ marker_info , setMarker_info ] = useState('')
    const [ info_board , setInfo_board] = useState('')
    const [ if_center_move , setIf_center_move ] = useState('')
    const map_obj = useRef()
    const [ loading , setLoading ] = useState(<Loading_effect />)

    const get_your_location = () => {
      if(navigator.geolocation) {                // 向使用者取得定位權限
        function error(e) {
          alert('無法取得你的位置',e);
          setLabel("預設位置")
          setCenter({ "lat":25.09648 , "lng":121.52955 })
          // setCenter({ "lat":25.04478 , "lng":121.53668 })
        }
        function success(position) {
          let your_location={ "lat":position.coords.latitude, "lng":position.coords.longitude}
          // console.log(your_location)
          setCenter(your_location)
        }
        navigator.geolocation.getCurrentPosition(success, error);  // 跟使用者拿所在位置的權限
        setText('')
      } else {
        alert('Sorry, 你的裝置不支援地理位置功能。')
        setLabel("預設位置")
        setCenter({ "lat":25.09648 , "lng":121.52955 })
        // setCenter({ "lat":25.04478 , "lng":121.53668 })
        setText('')
      }
    }

    async function get_data_from_firebase (center) {
      if (center === ''){
        // console.log("空的")
        return "none"
      }else{
        let min_lat=Number((center['lat']-0.003).toFixed(6))
        let min_lng=Number((center['lng']-0.003).toFixed(6))
        let max_lat=Number((center['lat']+0.003).toFixed(6))
        let max_lng=Number((center['lng']+0.003).toFixed(6))
        let get_res = collection(db, "test-source");
        let res = query(get_res, where("緯度", ">=", min_lat), where("緯度", "<=", max_lat));  
        // let res = query(get_res , orderBy("id") , limit(15));  
        // let res = query(get_res , orderBy("") )
        console.log(res) 
        // const first = query(collection(db, "cities"), orderBy("population"), limit(25));
        let snapshot = await getDocs(res);
        let i=0
        let new_marker=[]
        console.log(new_marker)
        snapshot.forEach((doc) => {
          // new_marker.push(doc.data()) 
            if( doc.data()["經度"]<max_lng && doc.data()["經度"]>min_lng){
              // console.log( min_lng+'<'+doc.data()["經度"] +"<"+ max_lng )
              // console.log(doc.data()["weekday_text"])
              new_marker.push(doc.data())
            }else{
              return
            }
            i++
            console.log(i)
        })
        console.log(JSON.stringify(new_marker))
        return new_marker
      }
    }

    async function get_current_time(res){
      let day=new Date().getDay()
      let hours = new Date().getHours() // type Number
      let minutes = new Date().getMinutes() // type Number
      if (minutes<10){
        minutes='0'+minutes
      }
      console.log(hours)
      console.log(minutes) 
      console.log(typeof(hours))
      console.log(typeof(minutes))
      let times=stringify(hours)+stringify(minutes)
      times=times.replace('"', '')
      times=times.replace('"', '')
      let filtered_marker=[]


      res.map(item=>{
        // console.log(item['weekday_text'][day-1].includes("休息"))
        // console.log(item['weekday_text'][day-1])
        if (item.hasOwnProperty('weekday_text')){
          if(day===0){
            day=7
          }
          console.log(day)
          console.log(item['weekday_text'])
          console.log(item['weekday_text'][day-1])
          let time_num
          if(item['weekday_text'][day-1]===undefined){
            console.log('undefined')
          }else{
            time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")
          }
          // console.log(item)
          // let time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")

          let slice_time_to_num = (time_num) => {
            console.log(times) 
            times=Number(times)
            console.log(typeof(times)) // Number
            console.log(times)
            if(times!=''){
              if(time_num.slice(24,32)){
                console.log('hi')
                if( times>=Number(time_num.slice(24,28)) && times<Number(time_num.slice(28,32)) ){
                  item['opened']='ok'
                  console.log('hi')
                }
              }
              if(time_num.slice(16,24)){
                console.log('hi')
                if( times>=Number(time_num.slice(16,20)) && times<Number(time_num.slice(20,24)) ){
                  item['opened']='ok'
                  console.log('hi')
                }
              }
              if(time_num.slice(8,16)){
                console.log('hi')
                if( times>=Number(time_num.slice(8,12)) && times<Number(time_num.slice(12,16)) ){
                  item['opened']='ok'
                  console.log('hi')
                }
              }
              if(time_num.slice(0,8)){
                console.log('llllll')
                let start = Number(time_num.slice(0,4))  //5
                let end = Number(time_num.slice(4,8))  //3 27
                if( start>end ){
                  console.log('start>end')
                  console.log(end)
                  if (end==0){
                    if(times>=start && times<2400){
                      item['opened']='ok'
                      console.log('start>end')
                    }
                  }else{
                    if( times>=start && times<2400 || times<end ){
                      item['opened']='ok'
                      console.log('start>end')
                    }
                  }
                  console.log(end)
                }else if( times>=start && times<end ){
                  item['opened']='ok'
                  console.log(Number(time_num.slice(0,4)))
                  console.log(times)
                  console.log(Number(time_num.slice(4,8)))
                  console.log('llllllllllllll')
                }
              }

              if(item.hasOwnProperty('opened')===false){
                item['opened']='none'
              }
              console.log(item['opened'])
            }else{
              item['opened']='none'
            }
          }

          if(time_num=='24'){
            item['opened']='ok'
          }else if (item['weekday_text']=='none'){
            item['opened']='pending'
          }else if(item['weekday_text'][day-1].includes("休息")){
            console.log('休息')
            item['opened']='none'
          }else{
            slice_time_to_num(time_num)
          }
          filtered_marker.push(item)
        }
      })
      
      console.log(JSON.stringify(filtered_marker))  
      console.log('好了')
      setFiltered_marker(filtered_marker)
      console.log('好了好了好了')
    }



    useEffect(()=>{           // 載入畫面，取的使用者定位後的地圖呈現
      get_your_location();
    },[])
   
    useEffect(()=>{               // 使用者點擊地圖後，中心點改變，需要去抓取新的臨近地標      // 會變成跑兩次，我在研究研究                  
      async function get_marker_info(){
        if ( center === '' || map_obj === undefined){
          console.log('還不用執行')
          return
        }else{
          let res = await get_data_from_firebase(center)
          console.log("成功吧寶貝",res)
          get_current_time(res)
        }
      }
      get_marker_info()
    },[center])


    const onMapLoad = useCallback((ori_map) => {
      map_obj.current=ori_map;
      setBack_to_center(ori_map)
      console.log("有沒有重新渲染")
      console.log(map_obj.current)
      // let request = {        
      //   placeId: 'ChIJU8ZsNJKuQjQR7ZnSqz69TYk',
      //   fields: [ 'photos' ]
      // }
      //   new Promise ((resolve,reject)=>{
      //     let service = new window.google.maps.places.PlacesService(map_obj.current);
      //     service.getDetails(request, (place, status)=>{
      //       console.log(place)
      //       let a=place['photos'].map(item=>item.getUrl())
      //       console.log(a)
      //     })
      //   })
    },[center])

    const libraries = ['places']
    const isLoaded = useLoadScript({                       // isLoaded 本身是 boolean, const { variable } = this.props.variable
      googleMapsApiKey: process.env.REACT_APP_Maps_API_Key,  
      libraries,
    }).isLoaded

    if( !isLoaded ) {
      // console.log("正在跑啊 正在跑啊 正在跑啊 正在跑啊 正在跑啊")
      return (
        <Loading_effect />
        // <div className='loading_effect'>
          // <div className='loading_effect_inner'>Loading。。。</div>
        // </div>
      )
    } //else {
    //   // console.log("跑出來了 跑出來了 跑出來了 跑出來了 跑出來了")
    //   // console.log(isLoaded)
    // }

    // if( loadError ) return 'Error when Loading !'

    return (
      // <div style={{
      //   width: '600px',
      //   height: '600px',
      //   // background: '#fff',
      //   borderRadius: '5px',
      // }}>88888888</div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={containerStyle}
        streetView={false}
        options={{
          styles: googleMapStyles,
          streetViewControl:false,
          mapTypeControl:false,
        }}

         //這邊還要詳細研究～～～～～～～～～～～～
        onLoad={ 
          onMapLoad
          // (ori_map)=>{                   //這邊還要詳細研究～～～～～～～～～～～～
          // setMap_obj(ori_map)                             //Why useCallback
          // // console.log(ori_map)
          // setBack_to_center(ori_map)}          
        }
        
        // onZoomChanged={()=>{
        //   if(map_obj.current.zoom===undefined){
        //     return
        //   }else{
        //     if(map_obj.current.zoom<=13){
        //       setFiltered_marker(<Marker option={{visible: false}}/>)
        //     }
        //   }
        //   // console.log('change')
        //   // console.log(map_obj.current.zoom)
        // }}

        // onDrag={()=>{
        //   // console.log("我正在拖曳")

        // }}


        onClick={(e) => {
          console.log('google map 被點擊')
          let newCenter={"lat":e.latLng.lat() , "lng":e.latLng.lng()}
          map_obj.current.panTo(newCenter)
          const interval = setInterval(() => {                          // 300 毫秒後再更改 setCenter
            setCenter({"lat":e.latLng.lat() , "lng":e.latLng.lng()})
            clearInterval(interval);
          }, 300);
          // setIf_center_move(newCenter)
          // setMarker_info(<MarkerInfo info={''} center={center} inner={label} setMarker_info={setMarker_info}/>)  
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
            let key=Number((item["緯度"]))+Number((item["經度"]))
            console.log(key)
            if(item['opened']=='ok'){
              icon=require('../../../source/current_opened.png')
            }else if(item['opened']=='pending'){
              icon=require('../../../source/current_pending.png')
            }else{
              icon=require('../../../source/current_closed.png')
            }
            return ( 
              <MarkerForToilet
                position={new_lat_lng}  
                icon={icon}
                key={Number((item["緯度"]))+Number((item["經度"]))}
                center={new_lat_lng} 
                inner={item} 
                setMarker_info={setMarker_info} 
                // map_obj={map_obj}
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
            // setIf_center_move(center)
            setMarker_info(<MarkerInfo center={center} inner={label} />)  
          }}

          onMouseOver={()=>{
            console.log('rrrrrrr')
            // setIf_center_move(center)
            // setMarker_info(<MarkerInfo center={center} inner={label} />)  
          }}

          onClick={(e) => {
            // console.log(e.latLng)
            // console.log("latitude = ", e.latLng.lat());
            // console.log("longitude = ", e.latLng.lng());
          }}
        >
        </Marker>
        {/* {loading} */}
        {info_board}
        {marker_info}
        <div className='bottom_function'>
          {/* {my_collection} */}
          <BackToCurrent if_center_move={if_center_move}  map_obj={map_obj} />
        </div>
      </GoogleMap>
    )
}

export default MapFrame;




{/* <Marker 
  position={new_lat_lng}  
  icon={icon}
  key={Number((item["緯度"]))+Number((item["經度"]))}
  onMouseOver={(e)=>{
    console.log('觸發')
    setMarker_info(
      <MarkerInfoLabel 
        center={new_lat_lng} 
        inner={item} 
        setMarker_info={setMarker_info} 
        // map_obj={map_obj}
        setInfo_board={setInfo_board}
        info_board={info_board}
        map_itself={map_obj}
        loading={loading}
        setLoading={setLoading}
      />
    )  
  }}
/>  */}