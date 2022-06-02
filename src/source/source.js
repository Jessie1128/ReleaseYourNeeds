import { v4 } from 'uuid'
import { db } from '../connection_firebase/connection_firebase'
import { collection , getDocs , doc, setDoc } from "firebase/firestore";
const oriSource = require("./oriSource.json");

const Source = () => { 

    //刪掉了 廁所名稱：海光公園
    //刪掉了 廁所名稱：統一超商臺北市福順店 25.08342202 , 121.5118533
    //刪掉了 公廁名稱：臺北市稅捐稽徵處大同分處
    //刪掉了 公廁名稱：財政部臺北國稅局大同稽徵所
    //刪掉了 公廁名稱：臺北市大同區公所
    //刪掉了 其中一個 大安捷運站
    //刪掉了 其中一個 統一超商臺北市黎元店
    //刪掉了 財政部臺北國稅局大安分局
    //刪掉了 臺北市稅捐稽徵處大安分處
    //刪掉了 臺北市大安區公所
    //刪掉了 其中一個松江南京捷運站
    //刪掉了 美麗華大直影城
    //刪掉了 其中一個統一超商臺北市江陵店
    //刪掉了 欣欣秀泰影城
    //刪掉了 財政部臺北國稅局中南稽徵所
    //刪掉了 其中一個統一超商臺北市中航店
    //刪掉了 內湖16號
    //刪掉了 華越文化廣場
    //刪掉了 玉泉區民活動中心
    //刪掉了 信義8號 (臺北市信義區松山路184巷1號前)


    // 測試有沒有重複的資料 ============================================================
    const test3 = () =>{
        let i=0
        oriSource.map(elem=>{
            console.log(i)
            for(let x=0;x<oriSource.length;x++){
                if( elem.公廁地址==oriSource[x]['公廁地址'] ){
                    if(i!=x){
                        console.log(elem.公廁名稱)
                        console.log(elem.公廁地址)
                    }
                }
            }
            i++
        })
    }

    // 存資料進去 firestore ==========================================================
    const test1 = () =>{
        let i=0
        oriSource.map(elem=>{
            if(i>19){
                return
            }
            i++
            // let res = insert_data_to_firebase(elem,i)
            // console.log(res)
        })
    }

    async function insert_data_to_firebase(elem,i) {
        console.log(i)
        let id=v4()
        let column=Object.keys(elem)
        let value=Object.values(elem)
        try {
            await setDoc(doc(db, "test-source", id),{
                [column[0]]: value[0],
                [column[1]]: value[1],
                [column[2]]: value[2],
                [column[3]]: value[3],
                [column[4]]: value[4],
                [column[5]]: Number(elem["經度"]),
                [column[6]]: Number(elem["緯度"]),
                [column[7]]: value[7],
                [column[8]]: Number(elem["座數"]),
                [column[9]]: value[9],
                [column[10]]: value[10],
                [column[11]]: value[11],
                [column[12]]: value[12],
                [column[13]]: value[13],
                [column[14]]:  Number(elem["無障礙廁所座數"]),
                [column[15]]:  Number(elem["親子廁所座數"]),
                [column[16]]:  Number(elem["貼心公廁"]),
                "id":id
            });
            console.log("新增成功",i);
            return "ok";
        } catch (error) {
            console.error(`資料沒有新增成功:${error} i`);
            return `failed:${error}`;
        }
    }

    // 確認 firestore 裡面有沒有資料 ===================================================
    const test2 = () => {
        async function get_data_from_firebase (){
            const querySnapshot = await getDocs(collection(db, "source"));
            console.log(querySnapshot)
            console.log(querySnapshot.size)
            if(querySnapshot.size!==0){
                console.log("有資料")
                return;
            }else{
                console.log("空的")
                // insert_data_to_firebase()
            }
        }
        get_data_from_firebase()
    }

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
}

export default Source
