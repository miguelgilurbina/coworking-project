// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBOmEnMxl5k4cCAo9RUaDrQJ_PtSB6IUE",
    authDomain: "coworking-3475e.firebaseapp.com",
    projectId: "coworking-3475e",
    storageBucket: "coworking-3475e.appspot.com",
    messagingSenderId: "518085540008",
    appId: "1:518085540008:web:5eeaab6939744e4d722a9d",
    measurementId: "G-7HTHGRRGZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth };
