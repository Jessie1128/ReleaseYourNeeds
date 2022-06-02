import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './Component/base.css'
import { BrowserRouter } from "react-router-dom";
import APP from './route'
// import HomePage from './HomePage/homePage';
// import MapPage from './MapPage/mapPage';
// import { Routes, Route } from "react-router-dom";
// import { firebaseConfig } from './connection_firebase/connection_firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>

    <BrowserRouter>
        <APP />
    </BrowserRouter>
    // {/* <SimpleMap /> */}
  // </React.StrictMode>
);