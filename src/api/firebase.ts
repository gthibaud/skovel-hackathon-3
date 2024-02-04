// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBCkTsp-VTbz9WVR7r4QQoiO7U7VOIfuxg',
    authDomain: 'skovel-hackathon-3.firebaseapp.com',
    projectId: 'skovel-hackathon-3',
    storageBucket: 'skovel-hackathon-3.appspot.com',
    messagingSenderId: '930907490170',
    appId: '1:930907490170:web:4a0fc20d2bc1613c6fb8c3',
    measurementId: 'G-VCWXD10RJ2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);
