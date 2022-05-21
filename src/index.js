import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './Component/base.css'
import MapPage from './MapPage/mapPage';
// import { firebaseConfig } from './connection_firebase/connection_firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <MapPage />
    // {/* <SimpleMap /> */}
  // </React.StrictMode>
);