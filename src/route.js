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
import { Brightness } from "./Component/ContextFolder/context_folder";
import { E_and_P_user } from "./Component/ContextFolder/context_folder";
import { ForDisplay } from "./Component/ContextFolder/context_folder";
import { ShouldReload } from "./Component/ContextFolder/context_folder";
import { Google_user } from "./Component/ContextFolder/context_folder";  
// import { AlertBox } from "./Component/AlertBox/alert_box";
// import { Alert_Box } from "./Component/ContextFolder/context_folder";
// import { AlertProvider } from "./Component/ContextFolder/context_folder";

const App = () => {


  const [ should_reload , setShould_reload ] = useState(null)

  const [ for_display , setFor_display ] = useState(null)   // ← 專門給登陸框用

  const [ google_user , setGoogle_user ] = useState(null)

  const [ e_and_p_user , setE_and_p_user ] = useState(null) 

  const [ throught , setThrought ] = useState(null) 
  // throught 的 value 目前有 ('google')→for google 登陸 ('E&P_login')→for登陸 ('E&P_register')→for註冊

  const [ bright , setBright ] = useState(null)

  const [ marker_data , setMarker_data ] = useState(null)
  const marker_data_value = useMemo(()=>({marker_data , setMarker_data}),[marker_data , setMarker_data])

  const [ alert_text, setAlert_text ] = useState(null);

  const [ alert_status , setAlert_status ] = useState(null);

  const success = (text) => {
    console.log('我有呼叫')
    setAlert_text(text);
    setAlert_status('SUCCESS');
  };
    
  const error = (text) => {
    console.log('我有呼叫')
    setAlert_text(text);
    setAlert_status('ERROR');
  };

  const loading = (text) => {
    setAlert_text(text);
    setAlert_status('LOADING');
  }

  // const go_login = (text) => {
  //   setAlert_text(text);
  //   setAlert_status('GO_LOGIN');
  // }

  const clear = () => {
    console.log('clear')
    setAlert_text(null);
    setAlert_status(null);
  };


  return (
    // <ShouldReload.Provider value={{ should_reload , setShould_reload }}>
    <AlertFrame.Provider value={{
      alert_status , setAlert_status , alert_text, setAlert_text , success , error , clear , loading 
    }}>
    <Google_user.Provider value={{ google_user , setGoogle_user }}>
    <E_and_P_user.Provider value={{ e_and_p_user , setE_and_p_user }}>
    <LoginThrouht.Provider value={{ throught , setThrought }}>
    <Brightness.Provider value={{ bright , setBright }}>
    <Marker_Data.Provider value={ marker_data_value }>
    <ForDisplay.Provider value={{ for_display , setFor_display }}>
      <div className="App">
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="map" element={<MapPage />} />
        </Routes>
      </div>
    </ForDisplay.Provider>
    </Marker_Data.Provider>
    </Brightness.Provider>
    </LoginThrouht.Provider>
    </E_and_P_user.Provider>
    </Google_user.Provider>
    </AlertFrame.Provider>
    // </ShouldReload.Provider>
  );
}


export default App