// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    await AsyncStorage.setItem("authToken", token);
  } else {
    await AsyncStorage.removeItem("authToken");
  }
});
export { auth };
