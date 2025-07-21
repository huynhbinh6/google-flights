import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { styles } from "../home/styles";
import { ISearchScreenProps } from "@screens/search/types";
import { IResultScreenProps } from "./types";
import FlightTicket from "@components/FlightTicket";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@utils/colors";
import FlightDateHeader from "@components/FlightDateHeader";
import Header from "@components/Header";
import { searchFlights } from "@helpers/mockData";
import moment from "moment";
import { convertMinutesToHM } from "@utils/convertMinsToHours";

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

      setFlights(searchFlights.data.itineraries);
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
        title={`${searchParams.from.navigation.relevantFlightParams.skyId} → ${searchParams.to.navigation.relevantFlightParams.skyId}`}
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
                  {flight.legs[0].carriers.marketing[0].logoUrl ? (
                    <Image
                      source={{
                        uri: flight.legs[0].carriers.marketing[0].logoUrl,
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Ionicons name="airplane" size={14} color={colors.gray} />
                  )}
                  <View>
                    <Text style={styles.airline}>
                      {flight.legs[0].carriers.marketing[0].name}
                    </Text>
                    <Text style={[styles.airport, { marginLeft: 10 }]}>
                      {moment(flight.legs[0].departure).format("MM/DD/YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.flightDetails}>
                  <View style={styles.timeInfo}>
                    <Text style={styles.time}>
                      {moment(flight.legs[0].departure).format("HH:mm")}
                    </Text>
                    <Text style={styles.airport}>
                      {flight.legs[0].origin.displayCode}
                    </Text>
                  </View>

                  <View style={styles.flightPath}>
                    <Text style={styles.duration}>
                      {convertMinutesToHM(flight.legs[0].durationInMinutes)}
                    </Text>
                    <Text style={styles.stops}>
                      {flight.legs[0].stopCount === 0
                        ? "-Nonstop-"
                        : `${flight.legs[0].stopCount} stop(s)`}
                    </Text>
                  </View>

                  <View style={styles.timeInfo}>
                    <Text style={styles.time}>
                      {moment(flight.legs[0].arrival).format("HH:mm")}
                    </Text>
                    <Text style={styles.airport}>
                      {flight.legs[0].destination.displayCode}
                    </Text>
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
                <Text style={styles.price}>{flight.price.formatted}</Text>
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
