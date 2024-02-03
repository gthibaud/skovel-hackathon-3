import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAYDRtCU2Y6dcoq6DVZ-TOAoXHNDeclRog',
    authDomain: 'skovel-prod.firebaseapp.com',
    projectId: 'skovel-prod',
    storageBucket: 'skovel-prod.appspot.com',
    messagingSenderId: '674601598209',
    appId: '1:674601598209:web:1b6d0ad05c92e4c8092f00',
    measurementId: 'G-1H0T6V6Z7G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
if (typeof window !== 'undefined') {
    initializeFirestore(app, {
        localCache: persistentLocalCache(/*settings*/ { tabManager: persistentMultipleTabManager() }),
    });
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// export const functions = getFunctions(app, 'europe-west3');

// export const messaging = getMessaging(app);
// export const messagingToken = getToken(messaging, {
//     vapidKey: "BHR5mOGu14KGUEeikCy-Wizgf482F66M6XMKYxgJaMzFSCw_Edt5-qbwhq-FqH1MGHPzaiGH-HThYYtpy_JLLcs"
// })

// export const remoteConfig = getRemoteConfig(app);

// if (typeof window !== 'undefined') {

//     remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
//     remoteConfig.defaultConfig = {
//         startDate: '1683961200',
//         timestampOffset: '0',
//         benjiMaprogressID: 'todo',
//         finishDate: '1684746000',
//     };
// }
