import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "@routes/MainNavigation";
import ResultsScreen from "@screens/result/ResultsScreen";
import BookingScreen from "@screens/booking/BookingScreen";
import LoginScreen from "@screens/login/LoginScreen";
import SignUpScreen from "@screens/sign-up/SignUpScreen";
import { useAuthStore } from "@middleware/authStore";
import { colors } from "@utils/colors";

const Stack = createStackNavigator();

export default function App() {
  const { isLoggedIn, checkAuth, isLoading, isAuthReady } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Subscribe to Firebase auth state on startup
  }, []);

  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
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
