import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "../home/styles";
import { ISearchScreenProps } from "@screens/search/types";
import { IResultScreenProps } from "./types";
import FlightTicket from "@components/FlightTicket";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@utils/colors";
import FlightDateHeader from "@components/FlightDateHeader";
import Header from "@components/Header";

export default function ResultsScreen({
  route,
  navigation,
}: IResultScreenProps) {
  const { searchParams } = route.params;

  const [flights, setFlights] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      // Simulate API call to Sky Scraper API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock flight data
      const mockFlights = [
        {
          id: 1,
          airline: "American Airlines",
          flightNumber: "AA123",
          date: "20/7/2025",
          departure: { time: "08:00", airport: searchParams.from?.skyId },
          arrival: { time: "12:00", airport: searchParams.to?.skyId },
          duration: "4h 00m",
          price: "$299",
          stops: 0,
        },
        {
          id: 2,
          airline: "Delta Air Lines",
          flightNumber: "DL456",
          date: "20/7/2025",
          departure: { time: "14:30", airport: searchParams.from?.skyId },
          arrival: { time: "18:45", airport: searchParams.to?.skyId },
          duration: "4h 15m",
          price: "$359",
          stops: 0,
        },
        {
          id: 3,
          airline: "United Airlines",
          flightNumber: "UA789",
          date: "20/7/2025",
          departure: { time: "10:15", airport: searchParams.from?.skyId },
          arrival: { time: "16:30", airport: searchParams.to?.skyId },
          duration: "6h 15m",
          price: "$249",
          stops: 1,
        },
      ];

      setFlights(mockFlights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Searching for flights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <FlightDateHeader /> */}
      <Header
        title={`${searchParams.from?.skyId} → ${searchParams.to?.skyId}`}
        leftIconName="chevron-back"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.flightList}>
        {flights.map((flight: any) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCard}
            onPress={() =>
              navigation.navigate("Booking", { flight, searchParams })
            }
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.flightHeader}>
                  <Ionicons name="airplane" size={14} color={colors.gray} />
                  <View>
                    <Text style={styles.airline}>{flight.airline}</Text>
                    <Text style={[styles.airport, { marginLeft: 10 }]}>
                      {flight.date}
                    </Text>
                  </View>
                </View>
                <View style={styles.flightDetails}>
                  <View style={styles.timeInfo}>
                    <Text style={styles.time}>{flight.departure.time}</Text>
                    <Text style={styles.airport}>
                      {flight.departure.airport}
                    </Text>
                  </View>

                  <View style={styles.flightPath}>
                    <Text style={styles.duration}>{flight.duration}</Text>
                    <Text style={styles.stops}>
                      {flight.stops === 0
                        ? "-Nonstop-"
                        : `${flight.stops} stop(s)`}
                    </Text>
                  </View>

                  <View style={styles.timeInfo}>
                    <Text style={styles.time}>{flight.arrival.time}</Text>
                    <Text style={styles.airport}>{flight.arrival.airport}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#fb8a36",
                    }}
                  >
                    Economy Classic
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.price}>{flight.price}</Text>
              </View>
            </View>
            {/* <FlightTicket
              from={flight.departure.airport}
              to={flight.arrival.airport}
              departureTime={flight.departure.time}
              flightCode={flight.airline}
              duration={flight.duration}
              price={flight.price}
            /> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
