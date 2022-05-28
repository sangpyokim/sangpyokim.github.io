// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC29pJHURWnFaxQ7xJ1BnTv0_-U0-Qfh8A",
  authDomain: "imagemakers-c1554.firebaseapp.com",
  projectId: "imagemakers-c1554",
  storageBucket: "imagemakers-c1554.appspot.com",
  messagingSenderId: "94555420898",
  appId: "1:94555420898:web:41b9aadd4e737eb7e7c6bb",
  measurementId: "G-52VX082RR3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)