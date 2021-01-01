import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// const firebaseConfig = {
//   apiKey: "AIzaSyDzAEj7oARw3XiVwXbBvq3iAVt_BZBxPKc",
//   authDomain: "PROJECT_ID.firebaseapp.com",
//   databaseURL: "https://PROJECT_ID.firebaseio.com",
//   projectId: "PROJECT_ID",
//   storageBucket: "PROJECT_ID.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
//   measurementId: "G-MEASUREMENT_ID",
// };
// {/* <script src="/__/firebase/init.js"></script> */}

const firebaseConfig = {
  apiKey: "AIzaSyDzAEj7oARw3XiVwXbBvq3iAVt_BZBxPKc",
  authDomain: "vue3apps.firebaseapp.com",
  projectId: "vue3apps",
  storageBucket: "vue3apps.appspot.com",
  messagingSenderId: "197639812600",
  appId: "1:197639812600:web:560808e510ba3f90bdd20d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
