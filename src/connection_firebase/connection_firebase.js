import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { v4 } from 'uuid'
import { collection , getDoc , getDocs , doc, setDoc , serverTimestamp , query, orderBy } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const connect = initializeApp(firebaseConfig);
const db = getFirestore(connect);
    
export { firebaseConfig , connect , db }