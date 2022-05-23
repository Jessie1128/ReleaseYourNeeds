import React from 'react'
import { useState , useEffect , useRef , useCallback , useMemo} from 'react'
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
import googleMapStyles from './googleMapStyles';
import { db } from "../../../connection_firebase/connection_firebase.js"
import { collection , getDocs , doc, setDoc , serverTimestamp , query, orderBy , where, startAfter , updateDoc , limit , startAt , arrayUnion } from "firebase/firestore";
import './mapFrame.css'
import MarkerInfo from '../MarkerInfo/MarkerInfo.js'
import MarkerInfoLabel from '../MarkerInfo/MarkerInfoLabel'
import { async, stringify } from '@firebase/util';
import Source from '../../../source/oriSource.json'
import { v4 } from 'uuid';

const containerStyle = {
  width: '600px',
  height: '600px',
  borderRadius: '5px',
};

const MapFrame = ({ setText , setBack_to_center , setIf_center_move }) => {

    const [ center , setCenter ] = useState ('')
    const [ label , setLabel ] = useState ('目前位置')
    // const [ map_obj , setMap_obj ] = useState ('')
    const [ filtered_marker , setFiltered_marker ] = useState ([])
    const [ marker_info , setMarker_info ] = useState('')
    const map_obj = useRef()

    const get_your_location = () => {
      if(navigator.geolocation) {                // 向使用者取得定位權限
        function error(e) {
          alert('無法取得你的位置',e);
          setLabel("預設位置")
          setCenter({ "lat":25.04478 , "lng":121.53668 })
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
        setCenter({ "lat":25.04478 , "lng":121.53668 })
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
        let get_res = collection(db, "source");
        // let res = query(get_res, limit(15)) 
        let res = query(get_res, where("緯度", ">=", min_lat), where("緯度", "<=", max_lat));  
        // ********** let res = query(get_res , orderBy("id") , startAt('ea68c5f2') , limit(200));  
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
              console.log(doc.data()["weekday_text"])
              new_marker.push(doc.data())
            }else{
              return
            }
            i++
            console.log(i)
        })
        return new_marker
      }
    }

    // const myRes=[]
    // const fetch_place_id=[]
    // ========================================================================= // for place search to get place_id START
    async function get_id(res){

        // async function start (){
          let p=0

          res.map(item=>{
            myRes.push({
              '公廁名稱':item['公廁名稱'],
              '公廁地址':item['公廁地址'],
              'id':item['id'],
              'lat':item['緯度'],
              'lng':item['經度']
            })
          })
          console.log("我希望這邊先全部執行完",myRes)

          // for( var i = 0; i < 5; i++ ) {

          //   // 為了凸顯差異，我們將傳入後的參數改名為 x
          //   // 當然由於 scope 的不同，要繼續在內部沿用 i 這個變數名也是可以的。
          //   (function(x){
          //     window.setTimeout(function() {
          //       console.log(x);
          //     }, 1000 * x );
          //   })(i);
          // }

          async function get_id_promise (place_name,place_address,data_id,place_lat,place_lng,myRes) {
            // console.log(place_name, place_address,data_id,place_lat,place_lng)
            console.log("我要開始了")
            let request = {         
              query: place_address+','+place_name,
              fields: ['place_id'],
              locationBias: {lat: place_lat, lng: place_lng} 
            }
      
            new Promise ((resolve,reject)=>{
              let service = new window.google.maps.places.PlacesService(map_obj.current);
              service.findPlaceFromQuery(request, (results, status) => {
                console.log(status)
                try {
                  if(status === window.google.maps.places.PlacesServiceStatus.OK) {
                    // console.log(results)
                    if(results.length==null){
                      fetch_place_id.push(
                        {
                          '公廁名稱':place_name,
                          '公廁地址':place_address,
                          'firebase_id':data_id,
                          '緯度':place_lat,
                          '經度':place_lng,
                          'place_id':'none',
                        })
                      console.log(`${place_address+place_name}沒有資料     res=0`)
                    }else if(results.length==1){
                      if(results[0].hasOwnProperty('place_id')){
                        fetch_place_id.push(
                          {
                            '公廁名稱':place_name,
                            '公廁地址':place_address,
                            'firebase_id':data_id,
                            '緯度':place_lat,
                            '經度':place_lng,
                            'place_id':results[0]['place_id'],
                          })
                      }else{
                        fetch_place_id.push(
                          {
                            '公廁名稱':place_name,
                            '公廁地址':place_address,
                            'firebase_id':data_id,
                            '緯度':place_lat,
                            '經度':place_lng,
                            'place_id':'none',
                          })
                        console.log(`${place_address+place_name}沒有資料     res=1 but no data`)
                      }
                    }else if(results.length==2){
                      if(results[0].hasOwnProperty('place_id')){
                        fetch_place_id.push(
                          {
                            '公廁名稱':place_name,
                            '公廁地址':place_address,
                            'firebase_id':data_id,
                            '緯度':place_lat,
                            '經度':place_lng,
                            'place_id':results[0]['place_id'],
                            'place_id 資料':'多於ㄧ',
                          })
                      }else{
                        fetch_place_id.push(
                          {
                            '公廁名稱':place_name,
                            '公廁地址':place_address,
                            'firebase_id':data_id,
                            '緯度':place_lat,
                            '經度':place_lng,
                            'place_id':'none',
                            'place_id 資料':'多於ㄧ',
                          })
                        console.log(`${place_address+place_name}沒有資料     res>1 but no data`)
                      }
                    }else{
                      fetch_place_id.push(
                        {
                          '公廁名稱':place_name,
                          '公廁地址':place_address,
                          'firebase_id':data_id,
                          '緯度':place_lat,
                          '經度':place_lng,
                          'place_id':'none',
                        })
                      console.log(`${place_address+place_name}沒有資料     status 正確 but no 需要查清楚`)
                    }
                    resolve(fetch_place_id)
                  }else{
                    console.log(`${place_address+place_name}有錯誤     status錯誤`)
                    fetch_place_id.push(
                      {
                        '公廁名稱':place_name,
                        '公廁地址':place_address,
                        'firebase_id':data_id,
                        '緯度':place_lat,
                        '經度':place_lng,
                        'place_id':'error',
                      })
                    resolve(fetch_place_id)
                  }
                } catch (error) {
                  console.log('error',error)
                  resolve('not ok')
                }
              })
              // update_placeID_to_firebase(fetch_place_id,p)
            })
            .then(()=>{
              // console.log('aaa')
              update_placeID_to_firebase (fetch_place_id)
            })
          }

          async function update_placeID_to_firebase (fetch_place_id) {
            let num=fetch_place_id.length
            console.log(num)
            let data=fetch_place_id[num-1]
            console.log(JSON.stringify(data))
            // console.log(data['firebase_id'])
            // console.log(data['place_id'])
            try {
              const newData = doc(db, "test-source", data['firebase_id']);
              await updateDoc(newData, {
                placeID: data['place_id']
              });
              console.log(`新增完畢 id:${data['firebase_id']} 公廁名稱:${data['公廁名稱']} 公廁地址:${data['公廁地址']}`)
            } catch (error) {
              console.log(`${error} ${fetch_place_id}`)
            }
          }

          for await ( let num of myRes ){
            (
              function(num,p){
                if( p > myRes.length ){
                  return
                }
                // }else if(p>myRes.length){
                //   return
                // }
                // console.log(p)
                window.setTimeout(function() {
                  let place_name=num['公廁名稱']
                  let place_address=num['公廁地址']
                  let data_id=num['id']
                  let place_lat=num['lat']
                  let place_lng=num['lng']
                  get_id_promise(place_name,place_address,data_id,place_lat,place_lng,myRes)
                }, 2000 * p );
              }
            )(num,p);
            p++
          }
          // console.log(myRes.length)
        // }
    }
    // ========================================================================= // for place search to get place_id END

    const myRes=[]
    const fetch_place_id=[]
    // ========================================================================= // for place details to get place_id START
    async function get_details(res){

      let p=0
      res.map(item=>{
        myRes.push({
          '公廁名稱':item['公廁名稱'],
          '公廁地址':item['公廁地址'],
          'id':item['id'],
          // 'lat':item['緯度'],
          // 'lng':item['經度'],
          'placeID':item['placeID'],
        })
      })
      console.log("我希望這邊先全部執行完",myRes)

      async function get_id_promise (place_name,place_address,data_id,placeID,myRes) {
        // console.log(place_name, place_address,data_id,place_lat,place_lng)
        console.log("我要開始了")
        let request = {        
          placeId: placeID,
          fields: [ 'name', 'formatted_address' , 'opening_hours' ]
        }
        // console.log(request)

        if( placeID==='none' || placeID==='error' ){
          console.log('我這邊要直接存進去資料庫')
        }else{
          new Promise ((resolve,reject)=>{
            let service = new window.google.maps.places.PlacesService(map_obj.current);
            service.getDetails(request, (place, status)=>{
              try {
                console.log(place)
                if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                  // console.log(place)
                  // console.log(place.hasOwnProperty('opening_hours'))
                  if(place.hasOwnProperty('opening_hours')){
                    fetch_place_id.push(
                      {
                        '公廁名稱':place_name,
                        '公廁地址':place_address,
                        'firebase_id':data_id,
                        'weekday_text':place['opening_hours']['weekday_text'],
                      }
                    )
                  }else{
                    fetch_place_id.push(
                      {
                        '公廁名稱':place_name,
                        '公廁地址':place_address,
                        'firebase_id':data_id,
                        'weekday_text':'none',
                      }
                    )
                    console.log(`${place_address+place_name}       'weekday_text'     沒有資料`)
                  }
                  resolve(fetch_place_id)
                }else{
                  console.log(`${place_address+place_name}有錯誤     status錯誤`)
                  fetch_place_id.push(
                    {
                      '公廁名稱':place_name,
                      '公廁地址':place_address,
                      'firebase_id':data_id,
                      'weekday_text':'error',
                    })
                  resolve(fetch_place_id)
                }
              } catch (error) {
                console.log('error',error)
                resolve('not ok')
              }            
            });
          })
          .then((data)=>{
            // console.log(data)
            // console.log(data[0]['weekday_text'][0])
            // console.log(data[0]['weekday_text'][2])
            // console.log('aaa')
            // console.log('測試完成')
            update_placeID_to_firebase (fetch_place_id)
          })
        }
      }

      async function update_placeID_to_firebase (fetch_place_id) {
        let num=fetch_place_id.length
        console.log(num)
        let data=fetch_place_id[num-1]
        console.log(JSON.stringify(data))
        // console.log(data['firebase_id'])
        // // console.log(data['place_id'])
        // console.log(data['weekday_text'])
        // let to_num = /\d+/;
        // let s =data['weekday_text'][0]
        // console.log(s.match(to_num));
        let str = data['weekday_text'][0]
        str = str.replace(/[^0-9]/g, "");
        console.log(str); // "500"
        // console.log(typeof(str))
        try {
          const newData = doc(db, "source", data['firebase_id']);
          if( data['weekday_text']=='none' ||  data['weekday_text']=='error' ){
            // console.log('空')
            await updateDoc(newData, {
              weekday_text: data['weekday_text']
            });
          }else{
            // console.log('有')
            await updateDoc(newData, {
              weekday_text: data['weekday_text']
            });
          }
          console.log(`新增完畢 id:${data['firebase_id']} 公廁名稱:${data['公廁名稱']} 公廁地址:${data['公廁地址']} 營業時間:${data['weekday_text']}`)
        } catch (error) {
          console.log(`${error} ${fetch_place_id}`)
        }
      }

      for await ( let num of myRes ){
        (
          function(num,p){
            if( p > myRes.length ){
              return
            }
            window.setTimeout(function() {
              let place_name=num['公廁名稱']
              let place_address=num['公廁地址']
              let data_id=num['id']
              let placeID=num['placeID']
              get_id_promise(place_name,place_address,data_id,placeID,myRes)
            }, 2000 * p );
          }
        )(num,p);
        p++
      }
    }
  // ========================================================================= // for place details to get place_id END

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
    console.log(times)
    // let abc='"12333"'
    // console.log(abc)
    // abc=abc.replace('"', '')
    // abc=abc.replace('"', '')
    // console.log(abc)
    let marker_with_time=[]


    res.map(item=>{
      // console.log(item['weekday_text'][day-1].includes("休息"))
      // console.log(item['weekday_text'][day-1])
      if (item.hasOwnProperty('weekday_text')){

        let time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")

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
        marker_with_time.push(item)
      }
    })
    console.log(JSON.stringify(marker_with_time))  
    setFiltered_marker(marker_with_time)
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
          // console.log(res[0]['weekday_text'][6])
          // get_id(res)
          // get_details(res)
          // setFiltered_marker(res)
        }
      }
      get_marker_info()
    },[center])


    const onMapLoad = useCallback((ori_map) => {
      map_obj.current=ori_map;
      setBack_to_center(ori_map)
      // console.log("有沒有重新渲染")
    },[])

    // const link = function (point, url) {     // 這邊只是我自己的小測試，無關專案
    //   // console.log(point==false)
    //   // console.log(typeof(point))
    //   point = false || 10
    //   url = url || 'http://google.com'
    //   // point = typeof point == 'undefined' ? 10 : point
    //   // url = typeof url !== 'undefined' ? url : 'http://google.com'
    //   // console.log(point)
    //   // console.log(url)
    // }

    const libraries = ['places']
    const isLoaded = useLoadScript({                       // isLoaded 本身是 boolean, const { variable } = this.props.variable
      googleMapsApiKey: process.env.REACT_APP_Maps_API_Key,  
      libraries,
    }).isLoaded

    if( !isLoaded ) {
      // console.log("正在跑啊 正在跑啊 正在跑啊 正在跑啊 正在跑啊")
      return (
        <div className='loading_effect'>
          <div className='loading_effect_inner'>Loading。。。</div>
        </div>
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
          // console.log('我有觸發')
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
          // console.log("中心點改變")
          setIf_center_move(center)
          // console.log(center)
          setMarker_info(<MarkerInfo info={''} center={center} inner={label} setMarker_info={setMarker_info}/>)  
        }}
      >
        {
          filtered_marker.map(item => {

            console.log("八巴巴阿巴巴",filtered_marker)
            let new_lat_lng={ "lat":item["緯度"], "lng":item["經度"] };
            let icon;
            // console.log(item)
            // console.log(item['優等級'])
            // console.log(item['opened'])
            {/* if(map_obj.current.zoom<=13){
              console.log()
            } */}

            if(item['opened']=='ok'){
              icon=require('../../../source/current_opened.png')
            }else if(item['opened']=='pending'){
              icon=require('../../../source/current_pending.png')
            }else{
              icon=require('../../../source/current_closed.png')
            }
            {/* let vis=true */}
            return ( 
              <Marker 
                position={new_lat_lng}  
                icon={icon}
                key={Number((item["緯度"]))+Number((item["經度"]))}
                // visible={{vis}}
                // useCallback()=>{

                // }
                onMouseOver={(e)=>{
                  console.log(Marker)
                  console.log(e)
                  // console.log("我的滑鼠移進來了")
                  // e.stopPropagation();
                  setMarker_info(
                    <MarkerInfoLabel 
                      center={new_lat_lng} 
                      inner={item['公廁名稱']} 
                      setMarker_info={setMarker_info} 
                      map_obj={map_obj}
                    />)  
                  // // console.log("這邊這邊",<MarkerInfoLabel />)
                }}

                // onMouseOut={()=>{
                //   // console.log("我的滑鼠移出去了")
                //   setMarker_info('')
                // }}
              /> 
            )
          })
        }
        <Marker 
          // key={}
          position={center}
          icon={require('../../../source/current_place.png')}
          // options={{
          //   icon: require('../../../source/current-pin.png'),
          //   scaledSize: new window.google.map.Size(100,100),
          // }}
          onLoad={()=>{
            // console.log("我載入了")
            setIf_center_move(center)
            setMarker_info(<MarkerInfo center={center} inner={label} />)  
          }}

          onMouseOver={()=>{
            // console.log("我的滑鼠移進來了")
            // setMarker_info(<MarkerInfo center={center} setMarker_info={setMarker_info}/>)  
            // console.log(<MarkerInfo />)
            setIf_center_move(center)
            setMarker_info(<MarkerInfo center={center} inner={label} />)  
          }}

          onClick={(e) => {
            // console.log(e.latLng)
            // console.log("latitude = ", e.latLng.lat());
            // console.log("longitude = ", e.latLng.lng());
          }}
        >
          {/* <MarkerInfo/> */}
          {marker_info}
        </Marker>
        {/* {marker_info} */}
      </GoogleMap>
    )
}

export default MapFrame;