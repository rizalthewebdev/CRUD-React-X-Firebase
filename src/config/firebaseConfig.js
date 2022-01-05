import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB5KlM5x8v_JUGWUMMcEpdDL4wKJoMihBM",
    authDomain: "learn-firebase-80811.firebaseapp.com",
    projectId: "learn-firebase-80811",
    storageBucket: "learn-firebase-80811.appspot.com",
    messagingSenderId: "525406362209",
    appId: "1:525406362209:web:73a419cb41cd123f43a820",
    measurementId: "G-CNHLLRS51R"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)