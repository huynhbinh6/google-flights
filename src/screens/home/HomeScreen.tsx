import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@screens/home/styles";
import Header from "@components/Header";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";

type Props = {
  navigation: any;
};

type UserData = {
  token: string;
  email: string;
  name: string;
};

const HomeScreen = (props: Props) => {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const popularDestinations = [
    { id: 1, name: "New York", code: "NYC", price: "$299" },
    { id: 2, name: "London", code: "LHR", price: "$599" },
    { id: 3, name: "Tokyo", code: "NRT", price: "$899" },
    { id: 4, name: "Paris", code: "CDG", price: "$549" },
  ];
  return (
    <>
      <Header title="FlightFinder" />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome, {userData.name || "Guest"}!
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
            <Input
              value=""
              placeholder="Where to?"
              leftIcon={
                <Ionicons name="search-outline" size={24} color="black" />
              }
              editable={false}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            {popularDestinations.map((dest) => (
              <TouchableOpacity key={dest.id} style={styles.destinationCard}>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName}>{dest.name}</Text>
                  <Text style={styles.destinationCode}>{dest.code}</Text>
                </View>
                <Text style={styles.destinationPrice}>{dest.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No recent searches</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
