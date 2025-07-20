import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../home/styles";
import Header from "@components/Header";

export default function BookingScreen({ route, navigation }: any) {
  const { flight, searchParams } = route.params;
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!passengerName || !email || !phone) {
      Alert.alert("Error", "Please fill in all passenger details");
      return;
    }

    setLoading(true);
    try {
      // Simulate booking API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Booking Confirmed!",
        `Your flight ${flight.flightNumber} has been booked successfully.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Main"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={`Book Flight`}
        leftIconName="chevron-back"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.flightSummary}>
          <Text style={styles.sectionTitle}>Flight Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.airline}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
            <Text style={styles.route}>
              {flight.departure.airport} → {flight.arrival.airport}
            </Text>
            <Text style={styles.time}>
              {flight.departure.time} - {flight.arrival.time}
            </Text>
            <Text style={styles.price}>{flight.price}</Text>
          </View>
        </View>

        <View style={styles.passengerDetails}>
          <Text style={styles.sectionTitle}>Passenger Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter passenger name"
              value={passengerName}
              onChangeText={setPassengerName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, loading && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={loading}
        >
          <Text style={styles.bookButtonText}>
            {loading ? "Processing..." : `Book Flight - ${flight.price}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
