import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../home/styles";
import Header from "@components/Header";
import { colors } from "@utils/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Flight from "@components/Flight";
import CustomModal from "@components/CustomModal";
import { useViewModel } from "./viewModel";
import moment from "moment";
import { ISearchScreenProps } from "./types";
import PassengerModal from "@components/PassengersModal";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";

export default function SearchScreen({
  navigation,
  route,
}: ISearchScreenProps) {
  const {
    isLoading,
    data,
    airports,
    from,
    to,
    modalRef,
    passengerModalRef,
    passengers,
    departDate,
    returnDate,
    tripType,
    showDepartDatePicker,
    showReturnDatePicker,
    handleOpenPassengers,
    handleSearch,
    handleOpenDeparture,
    handleOpenReturn,
    renderPassengerSummary,
    handleConfirmDepartureDate,
    handleConfirmReturnDate,
    hideDatePicker,
    tabOneWayPicker,
    tabRoundTripPicker,
    handleOpenDepartureDatePicker,
    handleOpenReturnDatePicker,
    getTotalPassengers,
  } = useViewModel({ navigation, route });

  return (
    <>
      <Header
        title="Booking"
        leftIconName="chevron-back"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                tripType === "roundtrip" && styles.tripTypeButtonActive,
                { borderBottomLeftRadius: 8 },
              ]}
              onPress={tabRoundTripPicker}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === "roundtrip" && styles.tripTypeTextActive,
                ]}
              >
                Round Trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                { borderRightWidth: 0, borderBottomRightRadius: 8 },
                tripType === "oneway" && styles.tripTypeButtonActive,
              ]}
              onPress={tabOneWayPicker}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === "oneway" && styles.tripTypeTextActive,
                ]}
              >
                One Way
              </Text>
            </TouchableOpacity>
          </View>

          <Flight
            type="flight"
            flightType={tripType}
            from={"Departure"}
            fromValue={from?.navigation.relevantFlightParams.skyId}
            fromSubValue={from?.presentation?.title}
            to={"Destination"}
            toValue={to?.navigation.relevantFlightParams.skyId}
            toSubValue={to?.presentation?.title}
            onPressFrom={handleOpenDeparture}
            onPressTo={handleOpenReturn}
          />

          <Flight
            type="date"
            flightType={tripType}
            from={"Departure Date"}
            to={"Return Date"}
            fromValue={departDate.toLocaleDateString()}
            toValue={returnDate.toLocaleDateString()}
            fromSubValue={moment(departDate).format("dddd")}
            toSubValue={moment(returnDate).format("dddd")}
            onPressFrom={handleOpenDepartureDatePicker}
            onPressTo={handleOpenReturnDatePicker}
          />

          <View style={styles.promoCodeContainer}>
            <Text style={styles.label}>Passengers</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {getTotalPassengers(passengers)}
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <Text>Passenger</Text>
                  <Text>{renderPassengerSummary(passengers)}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleOpenPassengers}>
                <Ionicons name="chevron-down" size={16} color={colors.gray} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.promoCodeContainer}>
            <Text style={styles.label}>Promo code (Optional)</Text>
            <Input value={""} placeholder="Enter promo code" />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search Flight</Text>
          </TouchableOpacity>
        </View>

        {showDepartDatePicker && (
          <DateTimePickerModal
            pickerContainerStyleIOS={{
              justifyContent: "center",
              alignItems: "center",
            }}
            customHeaderIOS={() => (
              <Text style={styles.textPickerModal}>Departure</Text>
            )}
            isVisible={showDepartDatePicker}
            mode="date"
            onConfirm={handleConfirmDepartureDate}
            onCancel={hideDatePicker}
          />
        )}

        {showReturnDatePicker && (
          <DateTimePickerModal
            pickerContainerStyleIOS={{
              justifyContent: "center",
              alignItems: "center",
            }}
            customHeaderIOS={() => (
              <Text style={styles.textPickerModal}>Return</Text>
            )}
            isVisible={showReturnDatePicker}
            mode="date"
            onConfirm={handleConfirmReturnDate}
            onCancel={hideDatePicker}
          />
        )}
        <CustomModal ref={modalRef} />
        <PassengerModal ref={passengerModalRef} />
      </ScrollView>
    </>
  );
}
