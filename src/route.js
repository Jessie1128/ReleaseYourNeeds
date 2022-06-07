import * as React from "react";
import { useState , useMemo } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './HomePage/homePage'
import MapPage from './MapPage/mapPage'
// import { useState } from "react";
// import "./App.css";
import { Marker_Data } from "./Component/ContextFolder/context_folder";
import { Map_Marker } from "./Component/ContextFolder/context_folder";
import { AlertFrame } from "./Component/ContextFolder/context_folder";
import { LoginThrouht } from "./Component/ContextFolder/context_folder";
// import { AlertBox } from "./Component/AlertBox/alert_box";
// import { Alert_Box } from "./Component/ContextFolder/context_folder";
// import { AlertProvider } from "./Component/ContextFolder/context_folder";

const App = () => {
  const [ marker_data , setMarker_data ] = useState(null)
  // const [ map_marker , setMap_Marker ] = useState(null)
  const marker_data_value = useMemo(()=>({marker_data , setMarker_data}),[marker_data , setMarker_data])

  const [ alert_text, setAlert_text ] = useState(null);
  const [ alert_status , setAlert_status ] = useState(null);
  const success = (text) => {
    setAlert_text(text);
    setAlert_status('SUCCESS');
  };
    
  const error = (text) => {
    console.log('我有呼叫')
  // window.scroll(0, 0);
    setAlert_text(text);
    setAlert_status('ERROR');
  };

  const loading = (text) => {
    setAlert_text(text);
    setAlert_status('LOADING');
  }

  const clear = () => {
    console.log('clear')
    setAlert_text(null);
    setAlert_status(null);
  };
  // const [ alert , set_alert ] = useState ('測試看看')
  // const [ alert_status , setAlert_status ] = useState(null);
  // const [ alert_text, setAlert_text ] = useState(null);
  
  // const success = (text) => {
  //   // window.scroll(0, 0);
  //   setAlert_text(text);
  //   setAlert_status('SUCCESS');
  // };

  // const error = (text) => {
  //   // window.scroll(0, 0);
  //   setAlert_text(text);
  //   setAlert_status('ERROR');
  // };
  
  // const clear = () => {
  //   setAlert_text(null);
  //   setAlert_status(null);
  // };

  // const NotificationProvider = (props) => {
  //   // const [notification, setNotification] = useState(null);
  //   // const [notificationText, setNotificationText] = useState(null);
  //   // const success = (text) => {
  //   //     window.scroll(0, 0);
  //   //     setNotificationText(text);
  //   //     setNotification(STATES.SUCCESS);
  //   // };
  //   // const error = (text) => {
  //   //     window.scroll(0, 0);
  //   //     setNotificationText(text);
  //   //     setNotification(STATES.ERROR);
  //   // };
  //   // const clear = () => {
  //   //     setNotificationText(null);
  //   //     setNotification(null);
  //   // };
  //   // return (
  //   //     <NotificationContext.Provider
  //   //     value={{
  //   //         success, error, clear, notification, notificationText,
  //   //     }}
  //   //     >
  //   //     {props.children}
  //   //     </NotificationContext.Provider>
  //   // );
  //   };

  const [ throught , setThrought ] = useState(null) 
  // throught 的 value 目前有 ('google') ('E&P_login') ('E&P_register')


  return (
    <LoginThrouht.Provider value={{ throught , setThrought }}>
    <AlertFrame.Provider value={{
      alert_status , setAlert_status , alert_text, setAlert_text , success , error , clear , loading
    }}>
    <Marker_Data.Provider value={ marker_data_value }>
    {/* <AlertProvider> */}
    {/* <Alert_Box.Provider> */}
    {/* <Map_Marker.Provider value={{  map_marker , setMap_Marker }}> */}
      <div className="App">
      {/* <AlertBox> */}
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="map" element={<MapPage />} />
        </Routes>
      {/* </AlertBox> */}
      </div>
    {/* </Map_Marker.Provider> */}
    {/* </Alert_Box.Provider> */}
    {/* </AlertProvider> */}
    </Marker_Data.Provider>
    </AlertFrame.Provider>
    </LoginThrouht.Provider>
  );
}


export default App