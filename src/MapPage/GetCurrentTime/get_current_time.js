    class GetCurrentTime {

        constructor( res , map_obj , setFiltered_marker ) {
            this.res = res;
            this.map_obj = map_obj;
            this.setFiltered_marker = setFiltered_marker;
            // console.log(res)
            // console.log(map_obj)
            // console.log(setFiltered_marker)
        }
        

        get_current_time = async() => {
            let day=new Date().getDay()
            let hours = new Date().getHours() // type Number
            let minutes = new Date().getMinutes() // type Number
            if (minutes<10){
            minutes='0'+minutes
            }
            // console.log(day)
            // console.log(hours)
            // console.log(minutes) 
            // console.log(typeof(hours))
            // console.log(typeof(minutes))
            let times=JSON.stringify(hours)+JSON.stringify(minutes)
            times=times.replace('"', '')
            times=times.replace('"', '')
            // console.log(this.res)
            // console.log(this.map_obj)
            // console.log(this.setFiltered_marker)
            let res=this.res
            let map_obj=this.map_obj
            let setFiltered_marker = this.setFiltered_marker
            // console.log(res)
            // console.log(map_obj)
            // console.log(setFiltered_marker)
            let filtered_marker=[]
        
        
            res.map(item=>{
            // console.log(item['weekday_text'][day-1].includes("休息"))
            // console.log(item['weekday_text'][day-1])
                if (item.hasOwnProperty('weekday_text')){
                    if(day===0){
                    day=7
                    }
                    // console.log(day)
                    // console.log(item['weekday_text'])
                    // console.log(item['weekday_text'][day-1])
                    let time_num
                    if(item['weekday_text'][day-1]===undefined){
                    // console.log('undefined')
                    }else{
                    time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")
                    }
                    // console.log(item)
                    // let time_num = item['weekday_text'][day-1].replace(/[^0-9]/g, "")
            
                    let slice_time_to_num = (time_num) => {
                        // console.log(times) 
                        times=Number(times)
                        // console.log(typeof(times)) // Number
                        // console.log(times)
                        if(times!=''){
                            if(time_num.slice(24,32)){
                                if( times>=Number(time_num.slice(24,28)) && times<Number(time_num.slice(28,32)) ){
                                    item['opened']='ok'
                                    // console.log('hi')
                                }
                            }
                            if(time_num.slice(16,24)){
                                if( times>=Number(time_num.slice(16,20)) && times<Number(time_num.slice(20,24)) ){
                                    item['opened']='ok'
                                    // console.log('hi')
                                }
                            }
                            if(time_num.slice(8,16)){
                                if( times>=Number(time_num.slice(8,12)) && times<Number(time_num.slice(12,16)) ){
                                    item['opened']='ok'
                                    // console.log('hi')
                                }
                            }
                            if(time_num.slice(0,8)){
                            let start = Number(time_num.slice(0,4))  //5
                            let end = Number(time_num.slice(4,8))  //3 27
                                if( start>end ){
                                    // console.log('start>end')
                                    // console.log(end)
                                    if (end==0){
                                        if(times>=start && times<2400){
                                            item['opened']='ok'
                                            // console.log('start>end')
                                        }
                                    }else{
                                        if( times>=start && times<2400 || times<end ){
                                            item['opened']='ok'
                                            // console.log('start>end')
                                        }
                                    }
                                    console.log(end)
                                }else if( times>=start && times<end ){
                                    item['opened']='ok'
                                    // console.log(Number(time_num.slice(0,4)))
                                    // console.log(times)
                                    // console.log(Number(time_num.slice(4,8)))
                                    // console.log('llllllllllllll')
                                }
                            }
            
                            if(item.hasOwnProperty('opened')===false){
                                item['opened']='none'
                            }
                        // console.log(item['opened'])
                        }else{
                            item['opened']='none'
                        }
                    }
            
                    if(time_num=='24'){
                        item['opened']='ok'
                    }else if (item['weekday_text']=='none'){
                        item['opened']='pending'
                    }else if(item['weekday_text'][day-1].includes("休息")){
                        // console.log('休息')
                        item['opened']='none'
                    }else{
                        slice_time_to_num(time_num)
                    }
                        filtered_marker.push(item)
                }
            })
            setFiltered_marker(filtered_marker)
        }
    }

    export default GetCurrentTime