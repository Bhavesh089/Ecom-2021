// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtfGjt22_x82sm4WUL19pqgNRFDZm0bSk",
  authDomain: "ecommerce-e7905.firebaseapp.com",
  projectId: "ecommerce-e7905",
  storageBucket: "ecommerce-e7905.appspot.com",
  messagingSenderId: "438745544590",
  appId: "1:438745544590:web:418333661b51eb93c356df",
};
// Initialize Firebase
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
