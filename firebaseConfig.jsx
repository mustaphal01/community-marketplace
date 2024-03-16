// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJb09pepnroJL4eKGBHpcQnC42C4FfGtQ",
  authDomain: "community-marketplace-d9553.firebaseapp.com",
  projectId: "community-marketplace-d9553",
  storageBucket: "community-marketplace-d9553.appspot.com",
  messagingSenderId: "244657941590",
  appId: "1:244657941590:web:e473651a807e51b1755ff7",
  measurementId: "G-P2LVC6VZ3Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
