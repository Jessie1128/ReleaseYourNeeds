import React from 'react';
import ReactDOM from 'react-dom/client';
import './Component/base.css'
import { BrowserRouter , useState } from "react-router-dom";
import APP from './route'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  // <React.StrictMode>
  // <Marker_Data.Provider value={'marker_data'}>
    <BrowserRouter>
        <APP />
    </BrowserRouter>
  // </Marker_Data.Provider>
    // {/* <SimpleMap /> */}
  // </React.StrictMode>
);