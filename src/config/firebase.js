// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEQ_YCYAbOsl9VM1xslVRADMmpk3fcpTk",
  authDomain: "diamond-6401b.firebaseapp.com",
  projectId: "diamond-6401b",
  storageBucket: "diamond-6401b.appspot.com",
  messagingSenderId: "702848777046",
  appId: "1:702848777046:web:5a2f1941a6f77b91a5b4f7",
  measurementId: "G-12BM7J208B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
