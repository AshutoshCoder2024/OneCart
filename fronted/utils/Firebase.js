 import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-e99e6.firebaseapp.com",
  projectId: "login-e99e6",
  storageBucket: "login-e99e6.firebasestorage.app",
  messagingSenderId: "277115057283",
  appId: "1:277115057283:web:8b95a9e7d0e8ade24657b6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };  