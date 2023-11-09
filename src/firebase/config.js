// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjvxmniqGHmRYMg5WyIslY8vkKWaiK_Ag",
  authDomain: "twitter-clone-5629b.firebaseapp.com",
  projectId: "twitter-clone-5629b",
  storageBucket: "twitter-clone-5629b.appspot.com",
  messagingSenderId: "632877227784",
  appId: "1:632877227784:web:3ddd0c86accf8d6c28d6bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get authorization reference
export const auth = getAuth(app);

//google provider setup
export const provider = new GoogleAuthProvider();
