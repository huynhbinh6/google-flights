import { create } from "zustand";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@helpers/firebaseConfig";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAuthReady: boolean;
  loginWithFirebase: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  isAuthReady: false,

  loginWithFirebase: async (user) => {
    await AsyncStorage.setItem("firebase_user", JSON.stringify(user));
    set({ user, isLoggedIn: true, isLoading: false });
  },

  logout: async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("firebase_user");
    set({ user: null, isLoggedIn: false, isLoading: false });
  },

  checkAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: firebaseUser,
          isLoggedIn: true,
          isLoading: false,
          isAuthReady: true,
        });
        await AsyncStorage.setItem(
          "firebase_user",
          JSON.stringify(firebaseUser)
        );
      } else {
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false,
          isAuthReady: true,
        });
        await AsyncStorage.removeItem("firebase_user");
      }
    });
  },
}));
