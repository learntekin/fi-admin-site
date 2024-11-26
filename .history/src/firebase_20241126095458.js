import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCMAs8cyM68K1JfVseIjU_nNgEeyXBxL-s",
  authDomain: "financefrenzy-biz.firebaseapp.com",
  databaseURL: "https://financefrenzy-biz-default-rtdb.firebaseio.com",
  projectId: "financefrenzy-biz",
  storageBucket: "financefrenzy-biz.appspot.com",
  messagingSenderId: "580011627408",
  appId: "1:580011627408:web:47e0a3be92ebb7c2995915",
  measurementId: "G-T14QWMKGD7"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("Firebase initialized");
// Initialize Firebase



export default firebase;
