// Імпортуємо потрібні модулі з Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Твій конфіг
const firebaseConfig = {
  apiKey: "AIzaSyDB6u3zVXk2HeUze841RxpM4ueqdraUwDU",
  authDomain: "user-authentication-2a744.firebaseapp.com",
  projectId: "user-authentication-2a744",
  storageBucket: "user-authentication-2a744.appspot.com",
  messagingSenderId: "773879782012",
  appId: "1:773879782012:web:0a24a5fcd1636eec1fc7f9",
  measurementId: "G-Z9JNWXXR4Z",
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);

// Отримуємо екземпляр аутентифікації
export const auth = getAuth(app);
