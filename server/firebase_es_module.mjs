/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from 'firebase/database';

// jika menggunakan namespace seperti di bawah ini maka db.getDatabase, db.ref, db.set, dll.
// import * as db from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxvia_XUqaSnRkqo2qOBgqX1pCkK_cJbs",
    authDomain: "dartserver-a0206.firebaseapp.com",
    databaseURL: "https://dartserver-a0206-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dartserver-a0206",
    storageBucket: "dartserver-a0206.appspot.com",
    messagingSenderId: "826339216900",
    appId: "1:826339216900:web:a208682f8601022aaaaf51",
    measurementId: "G-56LSHMDSC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics
// const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
function writeUserData(userId, name, email) {
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
    });
}

writeUserData(1, "A", "A@asu.com",);
writeUserData(2, "B", "B@asu.com",);
writeUserData(3, "C", "C@asu.com",);
writeUserData(4, "D", "D@asu.com",);
writeUserData(5, "E", "E@asu.com",);

console.log("CARA 1 DONE");