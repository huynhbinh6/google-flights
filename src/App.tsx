import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "@routes/MainNavigation";
import ResultsScreen from "@screens/result/ResultsScreen";
import BookingScreen from "@screens/booking/BookingScreen";
import LoginScreen from "@screens/login/LoginScreen";
import SignUpScreen from "@screens/sign-up/SignUpScreen";

const Stack = createStackNavigator();

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
};

type UserData = {
  token: string;
  email: string;
  name: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem("userToken", userData.token);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen name="Results" component={ResultsScreen} />
              <Stack.Screen name="Booking" component={BookingScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
