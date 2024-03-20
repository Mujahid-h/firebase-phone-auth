import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6lIgQ-h4B91oDKdkv7xNGMUGHE-rI8jk",
  authDomain: "login-credentials-3f8c8.firebaseapp.com",
  projectId: "login-credentials-3f8c8",
  storageBucket: "login-credentials-3f8c8.appspot.com",
  messagingSenderId: "7322772351",
  appId: "1:7322772351:web:b8889c39e53b4e4ca8704a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
