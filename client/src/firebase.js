// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env?.VITE_FIREBASE_API_KEY ||
    "AIzaSyBQJa6Z1csMKuC76QGERXcM3eImaBLpKo",
  authDomain: "blog-app-ee0cb.firebaseapp.com",
  projectId: "blog-app-ee0cb",
  storageBucket: "blog-app-ee0cb.appspot.com",
  messagingSenderId: "763422485100",
  appId: "1:763422485100:web:6af29836fa7604a353c649",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
