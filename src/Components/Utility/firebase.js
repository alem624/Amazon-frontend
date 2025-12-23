
import  firebase  from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAea4cF1wkoG85vNVj1JqWJ6E4cTJ1qN94",
  authDomain: "clone-d8466.firebaseapp.com",
  projectId: "clone-d8466",
  storageBucket: "clone-d8466.firebasestorage.app",
  messagingSenderId: "646725082202",
  appId: "1:646725082202:web:cb19501ecf3502c9958c63",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db= app.firestore()