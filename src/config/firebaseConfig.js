import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    // Config learn-firebase
    // apiKey: "AIzaSyB5KlM5x8v_JUGWUMMcEpdDL4wKJoMihBM",
    // authDomain: "learn-firebase-80811.firebaseapp.com",
    // projectId: "learn-firebase-80811",
    // storageBucket: "learn-firebase-80811.appspot.com",
    // messagingSenderId: "525406362209",
    // appId: "1:525406362209:web:73a419cb41cd123f43a820",
    // measurementId: "G-CNHLLRS51R"
    
    // Config crud-react-firebase
    // apiKey: "AIzaSyBv6VOYX-Ngd7mF7rrKm4wMpm6zWkZ81lM",

    // authDomain: "crud-react-firebase-7067a.firebaseapp.com",

    // projectId: "crud-react-firebase-7067a",

    // storageBucket: "crud-react-firebase-7067a.appspot.com",

    // messagingSenderId: "117874537114",

    // appId: "1:117874537114:web:bb7a05f62fc97e0a7aa523",

    // measurementId: "G-JNM820M01G"

    // Config crud-firebase
    apiKey: "AIzaSyApkebjbF5JucECV1qdi7qh8tFsrJpWHgs",

    authDomain: "crud-firebase-51776.firebaseapp.com",
  
    projectId: "crud-firebase-51776",
  
    storageBucket: "crud-firebase-51776.appspot.com",
  
    messagingSenderId: "62952123485",
  
    appId: "1:62952123485:web:6ca106936d7ea06473b1b4",
  
    measurementId: "G-R08LVS7TDJ"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)