import { useEffect, useState } from "react";
import { IHomeScreenProps } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";

export const useViewModel = ({ navigation, route }: IHomeScreenProps) => {
  const [userData, setUserData] = useState<User>({} as User);
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("firebase_user");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  return {
    userData,
  };
};
