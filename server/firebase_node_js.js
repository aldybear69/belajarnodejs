// Import the functions you need from the SDKs you need
const app = require('firebase/app');
const database = require('firebase/database');

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
const myApp = app.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = database.getDatabase(myApp);
function writeUserData(userId, name, email) {
    database.set(database.ref(db, 'users/' + userId), {
        username: name,
        email: email,
    });
}

writeUserData(6, "AA", "AA@asu.com",);
writeUserData(7, "BB", "BB@asu.com",);
writeUserData(8, "CC", "CC@asu.com",);
writeUserData(9, "DD", "DD@asu.com",);
writeUserData(10, "EE", "EE@asu.com",);

console.log("CARA 2 DONE");