import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzsjxhzRjCUschbm1bOVNaNUbCetIWbSM",
  authDomain: "flights-9888f.firebaseapp.com",
  projectId: "flights-9888f",
  storageBucket: "flights-9888f.firebasestorage.app",
  messagingSenderId: "238887357526",
  appId: "1:238887357526:web:2c71b78712395a69d5fff7",
  measurementId: "G-2ETPX608ER",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
