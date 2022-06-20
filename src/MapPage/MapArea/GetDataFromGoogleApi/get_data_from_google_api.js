    // import react , { Component } from "react"
    // import { useLoadScript } from '@react-google-maps/api';

    class GetData {
        constructor( inner,map_obj ) {
            this.inner = inner;
            this.map_obj = map_obj;
            this.myRes = []
            this.fetch_place_id = []
            // this.isLoaded=isLoaded
        }

        // ========================================================================= // for place details to get photos async START
        get_photos = async() => {
            // console.log('Hi, I am ' + this.inner['placeID']);
            // console.log('Hi, I am ' + this.map_obj.current);

            let request = {        
                placeId: this.inner['placeID'],
                fields: [ 'photos' ]
            }
            // console.log(request)

            return new Promise ((resolve,reject)=>{
                try {
                    let service = new window.google.maps.places.PlacesService(this.map_obj);
                    // console.log(service)
                    // console.log(service.getDetails)
                    service.getDetails(request, (place, status)=>{
                        if(status === window.google.maps.places.PlacesServiceStatus.OK){
                            // console.log(place)
                            let i=0
                            let url = place['photos'].map ( item => { 
                                if(i>=1){
                                    return 
                                }
                                i++
                                return item.getUrl({ maxWidth: 500, maxHeight: 500 })
                            })
                            // console.log(url[0])
                            resolve(url[0])
                        }else{
                            // console.log('api failed')
                            resolve('no')
                        }
                    })
                }catch(error){
                    // console.log(error+' & api failed')
                    reject(error)
                }
            })
        }

        // 從 google api 取的資料的函示，先隱藏
        // ========================================================================= // for place details to get photos async END

        
        // ========================================================================= // for place details to get photo START
        // get_photo_stop = async(res) => {

        // let p=0
        // res.map(item=>{
        //     myRes.push({
        //     '公廁名稱':item['公廁名稱'],
        //     '公廁地址':item['公廁地址'],
        //     'id':item['id'],
        //     // 'lat':item['緯度'],
        //     // 'lng':item['經度'],
        //     'placeID':item['placeID'],
        //     })
        // })
        // console.log("我希望這邊先全部執行完",myRes)

        // async function get_id_promise (place_name,place_address,data_id,placeID,myRes) {
        //     // console.log(place_name, place_address,data_id,place_lat,place_lng)
        //     console.log("我要開始了")
        //     let request = {        
        //     placeId: placeID,
        //     fields: [ 'photos' ]
        //     }
        //     // console.log(request)

        //     if( placeID=='none' || placeID=='error' ){
        //     console.log('我這邊要直接存進去資料庫')
        //     return
        //     }else{
        //     new Promise ((resolve,reject)=>{
        //         let service = new window.google.maps.places.PlacesService(map_obj.current);
        //         service.getDetails(request, (place, status)=>{
        //         try {
        //             console.log(place)
        //             if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        //             // console.log(place)
        //             // console.log(place.hasOwnProperty('opening_hours'))
        //             if(place.hasOwnProperty('photos')){
        //                 if(place.photos.length>=3){
        //                 let url=place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 let url1=place.photos[1].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 let url2=place.photos[2].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 console.log(url)
        //                 fetch_place_id.push(
        //                     {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'photoUrl':[url,url1,url2],
        //                     }
        //                 )
        //                 }else if(place.photos.length==2){
        //                 let url=place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 let url1=place.photos[1].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 fetch_place_id.push(
        //                     {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'photoUrl':[url,url1],
        //                     }
        //                 )
        //                 }else{
        //                 let url=place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })
        //                 fetch_place_id.push(
        //                     {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'photoUrl':[url],
        //                     }
        //                 )
        //                 }
        //             }else{
        //                 fetch_place_id.push(
        //                 {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'photoUrl':'none',
        //                 }
        //                 )
        //                 console.log(`${place_address+place_name}       'photoUrl'     沒有資料`)
        //             }
        //             resolve(fetch_place_id)
        //             }else{
        //             console.log(`${place_address+place_name}有錯誤     status錯誤`)
        //             fetch_place_id.push(
        //                 {
        //                 '公廁名稱':place_name,
        //                 '公廁地址':place_address,
        //                 'firebase_id':data_id,
        //                 'photoUrl':'error',
        //                 })
        //             resolve(fetch_place_id)
        //             }
        //         } catch (error) {
        //             console.log('error',error)
        //             resolve('not ok')
        //         }            
        //         });
        //     })
        //     .then((data)=>{
        //         // console.log(data)
        //         // console.log(data[0]['weekday_text'][0])
        //         // console.log(data[0]['weekday_text'][2])
        //         // console.log('aaa')
        //         // console.log('測試完成')
        //         update_placeID_to_firebase (fetch_place_id)
        //     })
        //     }
        // }

        // async function update_placeID_to_firebase (fetch_place_id) {
        //     let num=fetch_place_id.length
        //     console.log(num)
        //     let data=fetch_place_id[num-1]
        //     console.log(JSON.stringify(data))
        //     // console.log(data['firebase_id'])
        //     // // console.log(data['place_id'])
        //     // console.log(data['weekday_text'])
        //     // let to_num = /\d+/;
        //     // let s =data['weekday_text'][0]
        //     // console.log(s.match(to_num));
        //     // let str = data['weekday_text'][0]
        //     // str = str.replace(/[^0-9]/g, "");
        //     // console.log(str); // "500"
        //     // console.log(typeof(str))
        //     try {
        //     const newData = doc(db, "source", data['firebase_id']);
        //     if( data['photoUrl']=='none' ||  data['photoUrl']=='error' ){
        //         // console.log('空')
        //         await updateDoc(newData, {
        //         photoUrl: data['photoUrl']
        //         });
        //     }else{
        //         // console.log('有')
        //         await updateDoc(newData, {
        //         photoUrl: data['photoUrl']
        //         });
        //     }
        //     console.log(`新增完畢 id:${data['firebase_id']} 公廁名稱:${data['公廁名稱']} 公廁地址:${data['公廁地址']} 照片:${data['photoUrl']}`)
        //     } catch (error) {
        //     console.log(`${error} ${fetch_place_id}`)
        //     }
        // }

        // for await ( let num of myRes ){
        //     (
        //     function(num,p){
        //         if( p > myRes.length ){
        //         return
        //         }
        //         window.setTimeout(function() {
        //         let place_name=num['公廁名稱']
        //         let place_address=num['公廁地址']
        //         let data_id=num['id']
        //         let placeID=num['placeID']
        //         get_id_promise(place_name,place_address,data_id,placeID,myRes)
        //         }, 2000 * p );
        //     }
        //     )(num,p);
        //     p++
        // }
        // }  
        // ========================================================================= // for place details to get photo END
        


        // ========================================================================= // for place search to get place_id START
        // get_id_stop = async(res) => {

        //     // async function start (){
        //     let p=0

        //     res.map(item=>{
        //         myRes.push({
        //         '公廁名稱':item['公廁名稱'],
        //         '公廁地址':item['公廁地址'],
        //         'id':item['id'],
        //         'lat':item['緯度'],
        //         'lng':item['經度']
        //         })
        //     })
        //     console.log("我希望這邊先全部執行完",myRes)

        //     // for( var i = 0; i < 5; i++ ) {

        //     //   // 為了凸顯差異，我們將傳入後的參數改名為 x
        //     //   // 當然由於 scope 的不同，要繼續在內部沿用 i 這個變數名也是可以的。
        //     //   (function(x){
        //     //     window.setTimeout(function() {
        //     //       console.log(x);
        //     //     }, 1000 * x );
        //     //   })(i);
        //     // }

        //     async function get_id_promise (place_name,place_address,data_id,place_lat,place_lng,myRes) {
        //         // console.log(place_name, place_address,data_id,place_lat,place_lng)
        //         console.log("我要開始了")
        //         let request = {         
        //         query: place_address+','+place_name,
        //         fields: ['place_id'],
        //         locationBias: {lat: place_lat, lng: place_lng} 
        //         }
        
        //         new Promise ((resolve,reject)=>{
        //         let service = new window.google.maps.places.PlacesService(map_obj.current);
        //         service.findPlaceFromQuery(request, (results, status) => {
        //             console.log(status)
        //             try {
        //             if(status === window.google.maps.places.PlacesServiceStatus.OK) {
        //                 // console.log(results)
        //                 if(results.length==null){
        //                 fetch_place_id.push(
        //                     {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     '緯度':place_lat,
        //                     '經度':place_lng,
        //                     'place_id':'none',
        //                     })
        //                 console.log(`${place_address+place_name}沒有資料     res=0`)
        //                 }else if(results.length==1){
        //                 if(results[0].hasOwnProperty('place_id')){
        //                     fetch_place_id.push(
        //                     {
        //                         '公廁名稱':place_name,
        //                         '公廁地址':place_address,
        //                         'firebase_id':data_id,
        //                         '緯度':place_lat,
        //                         '經度':place_lng,
        //                         'place_id':results[0]['place_id'],
        //                     })
        //                 }else{
        //                     fetch_place_id.push(
        //                     {
        //                         '公廁名稱':place_name,
        //                         '公廁地址':place_address,
        //                         'firebase_id':data_id,
        //                         '緯度':place_lat,
        //                         '經度':place_lng,
        //                         'place_id':'none',
        //                     })
        //                     console.log(`${place_address+place_name}沒有資料     res=1 but no data`)
        //                 }
        //                 }else if(results.length==2){
        //                 if(results[0].hasOwnProperty('place_id')){
        //                     fetch_place_id.push(
        //                     {
        //                         '公廁名稱':place_name,
        //                         '公廁地址':place_address,
        //                         'firebase_id':data_id,
        //                         '緯度':place_lat,
        //                         '經度':place_lng,
        //                         'place_id':results[0]['place_id'],
        //                         'place_id 資料':'多於ㄧ',
        //                     })
        //                 }else{
        //                     fetch_place_id.push(
        //                     {
        //                         '公廁名稱':place_name,
        //                         '公廁地址':place_address,
        //                         'firebase_id':data_id,
        //                         '緯度':place_lat,
        //                         '經度':place_lng,
        //                         'place_id':'none',
        //                         'place_id 資料':'多於ㄧ',
        //                     })
        //                     console.log(`${place_address+place_name}沒有資料     res>1 but no data`)
        //                 }
        //                 }else{
        //                 fetch_place_id.push(
        //                     {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     '緯度':place_lat,
        //                     '經度':place_lng,
        //                     'place_id':'none',
        //                     })
        //                 console.log(`${place_address+place_name}沒有資料     status 正確 but no 需要查清楚`)
        //                 }
        //                 resolve(fetch_place_id)
        //             }else{
        //                 console.log(`${place_address+place_name}有錯誤     status錯誤`)
        //                 fetch_place_id.push(
        //                 {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     '緯度':place_lat,
        //                     '經度':place_lng,
        //                     'place_id':'error',
        //                 })
        //                 resolve(fetch_place_id)
        //             }
        //             } catch (error) {
        //             console.log('error',error)
        //             resolve('not ok')
        //             }
        //         })
        //         // update_placeID_to_firebase(fetch_place_id,p)
        //         })
        //         .then(()=>{
        //         // console.log('aaa')
        //         update_placeID_to_firebase (fetch_place_id)
        //         })
        //     }

        //     async function update_placeID_to_firebase (fetch_place_id) {
        //         let num=fetch_place_id.length
        //         console.log(num)
        //         let data=fetch_place_id[num-1]
        //         console.log(JSON.stringify(data))
        //         // console.log(data['firebase_id'])
        //         // console.log(data['place_id'])
        //         try {
        //         const newData = doc(db, "test-source", data['firebase_id']);
        //         await updateDoc(newData, {
        //             placeID: data['place_id']
        //         });
        //         console.log(`新增完畢 id:${data['firebase_id']} 公廁名稱:${data['公廁名稱']} 公廁地址:${data['公廁地址']}`)
        //         } catch (error) {
        //         console.log(`${error} ${fetch_place_id}`)
        //         }
        //     }

        //     for await ( let num of myRes ){
        //         (
        //         function(num,p){
        //             if( p > myRes.length ){
        //             return
        //             }
        //             // }else if(p>myRes.length){
        //             //   return
        //             // }
        //             // console.log(p)
        //             window.setTimeout(function() {
        //             let place_name=num['公廁名稱']
        //             let place_address=num['公廁地址']
        //             let data_id=num['id']
        //             let place_lat=num['lat']
        //             let place_lng=num['lng']
        //             get_id_promise(place_name,place_address,data_id,place_lat,place_lng,myRes)
        //             }, 2000 * p );
        //         }
        //         )(num,p);
        //         p++
        //     }
        //     // console.log(myRes.length)
        //     // }
        // }
        // ========================================================================= // for place search to get place_id END



        // ========================================================================= // for place details to get place_id START
        // get_details_stop = async(res) => {

        // let p=0
        // res.map(item=>{
        //     myRes.push({
        //     '公廁名稱':item['公廁名稱'],
        //     '公廁地址':item['公廁地址'],
        //     'id':item['id'],
        //     // 'lat':item['緯度'],
        //     // 'lng':item['經度'],
        //     'placeID':item['placeID'],
        //     })
        // })
        // console.log("我希望這邊先全部執行完",myRes)

        // async function get_id_promise (place_name,place_address,data_id,placeID,myRes) {
        //     // console.log(place_name, place_address,data_id,place_lat,place_lng)
        //     console.log("我要開始了")
        //     let request = {        
        //     placeId: placeID,
        //     fields: [ 'name', 'formatted_address' , 'opening_hours' ]
        //     }
        //     // console.log(request)

        //     if( placeID==='none' || placeID==='error' ){
        //     console.log('我這邊要直接存進去資料庫')
        //     }else{
        //     new Promise ((resolve,reject)=>{
        //         let service = new window.google.maps.places.PlacesService(map_obj.current);
        //         service.getDetails(request, (place, status)=>{
        //         try {
        //             console.log(place)
        //             if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        //             // console.log(place)
        //             // console.log(place.hasOwnProperty('opening_hours'))
        //             if(place.hasOwnProperty('opening_hours')){
        //                 fetch_place_id.push(
        //                 {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'weekday_text':place['opening_hours']['weekday_text'],
        //                 }
        //                 )
        //             }else{
        //                 fetch_place_id.push(
        //                 {
        //                     '公廁名稱':place_name,
        //                     '公廁地址':place_address,
        //                     'firebase_id':data_id,
        //                     'weekday_text':'none',
        //                 }
        //                 )
        //                 console.log(`${place_address+place_name}       'weekday_text'     沒有資料`)
        //             }
        //             resolve(fetch_place_id)
        //             }else{
        //             console.log(`${place_address+place_name}有錯誤     status錯誤`)
        //             fetch_place_id.push(
        //                 {
        //                 '公廁名稱':place_name,
        //                 '公廁地址':place_address,
        //                 'firebase_id':data_id,
        //                 'weekday_text':'error',
        //                 })
        //             resolve(fetch_place_id)
        //             }
        //         } catch (error) {
        //             console.log('error',error)
        //             resolve('not ok')
        //         }            
        //         });
        //     })
        //     .then((data)=>{
        //         // console.log(data)
        //         // console.log(data[0]['weekday_text'][0])
        //         // console.log(data[0]['weekday_text'][2])
        //         // console.log('aaa')
        //         // console.log('測試完成')
        //         update_placeID_to_firebase (fetch_place_id)
        //     })
        //     }
        // }

        // async function update_placeID_to_firebase (fetch_place_id) {
        //     let num=fetch_place_id.length
        //     console.log(num)
        //     let data=fetch_place_id[num-1]
        //     console.log(JSON.stringify(data))
        //     // console.log(data['firebase_id'])
        //     // // console.log(data['place_id'])
        //     // console.log(data['weekday_text'])
        //     // let to_num = /\d+/;
        //     // let s =data['weekday_text'][0]
        //     // console.log(s.match(to_num));
        //     let str = data['weekday_text'][0]
        //     str = str.replace(/[^0-9]/g, "");
        //     console.log(str); // "500"
        //     // console.log(typeof(str))
        //     try {
        //     const newData = doc(db, "test-source", data['firebase_id']);
        //     if( data['weekday_text']=='none' ||  data['weekday_text']=='error' ){
        //         // console.log('空')
        //         await updateDoc(newData, {
        //         weekday_text: data['weekday_text']
        //         });
        //     }else{
        //         // console.log('有')
        //         await updateDoc(newData, {
        //         weekday_text: data['weekday_text']
        //         });
        //     }
        //     console.log(`新增完畢 id:${data['firebase_id']} 公廁名稱:${data['公廁名稱']} 公廁地址:${data['公廁地址']} 營業時間:${data['weekday_text']}`)
        //     } catch (error) {
        //     console.log(`${error} ${fetch_place_id}`)
        //     }
        // }

        // for await ( let num of myRes ){
        //     (
        //     function(num,p){
        //         if( p > myRes.length ){
        //         return
        //         }
        //         window.setTimeout(function() {
        //         let place_name=num['公廁名稱']
        //         let place_address=num['公廁地址']
        //         let data_id=num['id']
        //         let placeID=num['placeID']
        //         get_id_promise(place_name,place_address,data_id,placeID,myRes)
        //         }, 2000 * p );
        //     }
        //     )(num,p);
        //     p++
        // }
        // }
        // ========================================================================= // for place details to get place_id END

    }

    export default GetData
    
    