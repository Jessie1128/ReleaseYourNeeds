import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './HomePage/homePage'
import MapPage from './MapPage/mapPage'
// import AlertBox from "./Component/AlertBox/alert_box";
// import { useState } from "react";
// import "./App.css";
 
const App = () => {

  // const [ alert , set_alert ] = useState ('測試看看')
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="map" element={<MapPage />} />
      </Routes>
    </div>
  );
}


export default App