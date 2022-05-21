import React from 'react'
import { useState , useEffect , useRef , useCallback } from 'react'
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api';
import googleMapStyles from './googleMapStyles';
import { db } from "../../../connection_firebase/connection_firebase.js"
import { collection , getDocs , doc, setDoc , serverTimestamp , query, orderBy , where, startAfter , updateDoc , limit , limitToFirst , limitToLast , startAt , endAt } from "firebase/firestore";
import './mapFrame.css'
import MarkerInfo from '../MarkerInfo/MarkerInfo.js'
import MarkerInfoLabel from '../MarkerInfo/MarkerInfoLabel'
import { async, stringify } from '@firebase/util';
import Source from '../../../source/oriSource.json'

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
        let get_res = collection(db, "test-source");
        let res = query(get_res,limit(10)) 
        // let res = query(get_res, where("緯度", ">=", min_lat), where("緯度", "<=", max_lat));  
        // ****** let res = query(get_res , orderBy("id") , startAt('7528a5bf') , limit(0));  
        // let res = query(get_res,orderBy("id"), startAt(), endAt(),limit(10));  
        console.log(res) 
        // const first = query(collection(db, "cities"), orderBy("population"), limit(25));

        let snapshot = await getDocs(res);
        // let i=0
        let new_marker=[]
        snapshot.forEach((doc) => {
          new_marker.push(doc.data())
     
            // if( doc.data()["經度"]<max_lng && doc.data()["經度"]>min_lng){
            //   // // console.log( min_lng+'<'+doc.data()["經度"] +"<"+ max_lng )
            //   new_marker.push(doc.data())
            // }else{
            //   return
            // }


            // i++
            // // console.log(i)
        })
        // console.log(new_marker)
        // setFiltered_marker(new_marker)
        return new_marker
      }
    }
    
    // async function ttry () {
    //   console.log('這邊')
    //   // let new_marker=[]
    //   //   let get_res = collection(db, "test-source");
    //   //   let res = query(get_res);   
    //   //   let snapshot = await getDocs(res);
    //   //   snapshot.forEach((doc) => {
    //   //     console.log(doc.data())
    //   //     new_marker.push(doc.data()) 
    //   //   })
    //   async function get_place_id(request,toliet){
    //     console.log(toliet)
    //     return new Promise((resolve,reject) => {
    //       let service = new window.google.maps.places.PlacesService(map_obj.current);
    //         service.findPlaceFromQuery(request, (results, status) => {
    //         // console.log(request)
    //         // console.log(results)
    //         if(status === window.google.maps.places.PlacesServiceStatus.OK) {
    //           console.log(results)
    //           console.log(results.length)
    //           if(results.length==0){
    //             console.log("no資料")
    //             resolve("no資料")
    //           }else if(results.length==1){
    //             console.log("我只有一筆資料")
    //             get_id_from_firebase(toliet,resolve,results)           
    //             // resolve("我只有一筆資料")
    //           }else{
    //             console.log(results)
    //             console.log(request['query'])
    //             resolve(results)
    //           }
    //         }
    //       }) 
    //     })
    //   }

    //   for (let i=0;i<4;i++){
    //     console.log(Source[i]['公廁名稱'])
    //     console.log(Source[i]['公廁地址'])
    //     console.log(Source[i]['經度'])
    //     console.log(Source[i]['緯度'])
    //     let request = {
    //       query: Source[i]["公廁地址"]+','+Source[i]["公廁名稱"],
    //       fields: ["place_id"],
    //       locationBias: {lat: Number(Source[i]["緯度"]), lng: Number(Source[i]["經度"])} 
    //     }

    //     let wait=await get_place_id(request,Source[i]["公廁名稱"])
    //     console.log(wait)
    //   }
    // } 
    

    // async function get_id_from_firebase (toliet,resolve,results){
    //   collection(db, "test-source")
    //     .whereEqualTo("公廁名稱", toliet)
    //     .get()
    //     .await()
    //   // let q = query(get_res, where("公廁名稱", "==", toliet )); 
    //   // let res = await getDocs(q)
      
    //   // // .then((res)=>{
    //   // let id = res.forEach((doc) => {
    //   //   // doc.data() is never undefined for query doc snapshots
    //   //   console.log(doc.id, " => ", doc.data());
    //   //   doc.id;
    //   // })
    //   // console.log(id)
    //   // .then(data=>
    //   //     console.log(data)
    //   //   )
    //   // })
      
    //   // const querySnapshot = await getDocs(q);
    //   // const 

    //   // console.log(querySnapshot.docs)
    //   // querySnapshot.forEach((doc) => {
    //   //   // doc.data() is never undefined for query doc snapshots
    //   //   console.log(doc.id, " => ", doc.data());
    //   //   id=doc.id
    //   //   let data = doc.data()
    //   //   console.log(data)
    //   //   if(data.hasOwnProperty('place_id')){
    //   //     resolve(id)
    //   //     return 
    //   //   }
    //   // });
    //   // console.log(results)
    //   // console.log(id)
     
    //   // if(results[0].hasOwnProperty('place_id')){
    //   //   console.log(results[0]['place_id'])
    //   //   await setDoc(doc(db, "test-source", id), {
    //   //     place_id: results[0]['place_id'],
    //   //   });
    //   // }else{
    //   //   console.log(toliet,"沒有place_id")
    //   // }
     
    //   resolve("ok")
    // }

    const myRes=[]
    const fetch_place_id=[]

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
                          '緯度':place_lng,
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
                            '緯度':place_lng,
                            'place_id':results[0]['place_id'],
                          })
                      }else{
                        fetch_place_id.push(
                          {
                            '公廁名稱':place_name,
                            '公廁地址':place_address,
                            'firebase_id':data_id,
                            '緯度':place_lat,
                            '緯度':place_lng,
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
                            '緯度':place_lng,
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
                            '緯度':place_lng,
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
                          '緯度':place_lng,
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
                        '緯度':place_lng,
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
              const newData = doc(db, "source", data['firebase_id']);
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
  
    // async function get_marker_placce_info (res) {
    //   Promise.all(res.map((item)=>{ 
    //     return new Promise((resolve,reject) => {
    //       let request = {      
    //         query: item["公廁地址"],     
    //         // query: item["公廁地址"]+','+item["公廁名稱"],
    //         fields: ["opening_hours"],
    //         locationBias: {lat: item['緯度'], lng: item['經度']} 
    //       }
    //       let service = new window.google.maps.places.PlacesService(map_obj.current);
    //       service.findPlaceFromQuery(request, (results, status) => {
    //         console.log(status)
    //         // console.log(results)
    //         if(status === window.google.maps.places.PlacesServiceStatus.OK) {
    //           console.log(results)
    //           try {
    //             if(results.length==null){
    //               console.log('0')
    //               item['opened']='null' 
    //             }else if(results.length==1){
    //               console.log(results[0].hasOwnProperty('opening_hours'))
    //               if(results[0].hasOwnProperty('opening_hours')){
    //                 console.log(results[0]['opening_hours']['open_now'])
    //                 if(results[0]['opening_hours']['open_now']){
    //                   item['opened']=true
    //                   console.log('1')
    //                   // resolve("true")
    //                 }else{
    //                   item['opened']=false
    //                   console.log('1')
    //                   // resolve("false")
    //                 }
    //               }else{
    //                 item['opened']='null'
    //                 console.log('1')
    //                 // resolve("pending")
    //               }
    //             }else if(results.length<1){
    //               if(results[0].hasOwnProperty('opening_hours')){
    //                 if(results[0]['opening_hours']['open_now']){
    //                   item['opened']=true
    //                   console.log('2')
                      
    //                   // resolve("true")
    //                 }else{
    //                   item['opened']=false
    //                   console.log('2')
                  
    //                   // resolve("false")
    //                 }
    //               }else{
    //                 item['opened']='null'
    //                 console.log('2')
                   
    //                 // resolve("pending")
    //               }
    //             }else{
    //               item['opened']='null'
    //             }
    //           } catch (error) {
    //             console.log(error)
    //           }                   
    //         }  
    //         console.log(results)
    //         resolve("ok")
    //       })  
    //     })
    //   }))
    //   .then(data=>{
    //     console.log(JSON.stringify(data))
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     // setFiltered_marker(res)
    //   })
    // }       

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
          // ******* get_id(res)
          setFiltered_marker(res)
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
        zoom={16}
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
            let text;
            // console.log(item)
            // console.log(item['優等級'])
            // console.log(item['opened'])
            if(item['opened']){
              text='我開著'
            }else if(item['opened']===false){
              text='關了'
            }else if(item['opened']==='null'){
              text='待訂'
            }
            return ( 
              <Marker position={new_lat_lng} label={text} 

                onClick={(e) => {
                  // console.log(e.latLng)
                  // console.log("latitude = ", e.latLng.lat());
                  // console.log("longtitude = ", e.latLng.lng());
                }}

                onMouseOver={()=>{
                  // console.log("我的滑鼠移進來了")
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
          icon={require('../../../source/current-pin.png')}
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