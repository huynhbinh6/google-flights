import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../home/styles";
import Header from "@components/Header";
import { useAuthStore } from "@middleware/authStore";
import { User } from "firebase/auth";
import { colors } from "@utils/colors";

export default function ProfileScreen() {
  const [userData, setUserData] = useState<User | null>();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    loadUserData();
  }, []);

  const { user } = useAuthStore();

  const loadUserData = async () => {
    try {
      setUserData(user);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => logout && logout() },
    ]);
  };

  return (
    <>
      <Header title={"Profile"} />
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <View
            style={{
              backgroundColor: colors.background,
              width: 80,
              height: 80,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.name}>
              {userData?.displayName?.charAt(0).slice(0, 1) || "U"}
            </Text>
          </View>
          <Text style={styles.name}>{userData?.displayName || "User"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Booking History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Payment Methods</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
