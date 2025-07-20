import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "../home/styles";
import Header from "@components/Header";
import { colors } from "@utils/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Flight from "@components/Flight";
import CustomModal, { CustomModalRef } from "@components/CustomModal";
import { useViewModel } from "./viewModel";
import moment from "moment";
import { IDeparture } from "./types";
import PassengerModal, {
  PassengerData,
  PassengerModalRef,
} from "@components/PassengersModal";
import { set } from "@react-native-firebase/database";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";

export default function SearchScreen({ navigation }: { navigation: any }) {
  const {
    isLoading,
    data,
    from,
    to,
    modalRef,
    passengerModalRef,
    handleSearch,
    handleOpenDeparture,
    handleOpenReturn,
  } = useViewModel();
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passengers, setPassengers] = useState<PassengerData>({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [showDepartDatePicker, setShowDepartDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const hideDatePicker = () => {
    setShowDepartDatePicker(false);
    setShowReturnDatePicker(false);
  };

  const handleConfirmDepartureDate = (date: Date) => {
    setDepartDate(date);
    console.log(date);

    hideDatePicker();
  };
  const handleConfirmReturnDate = (date: Date) => {
    setReturnDate(date);
    hideDatePicker();
  };

  const renderPassengerSummary = (data: PassengerData) => {
    const parts = [`${data.adult} adult`];

    if (data.child > 0) {
      parts.push(`${data.child} child`);
    }

    if (data.infant > 0) {
      parts.push(`${data.infant} infant`);
    }

    return parts.join(", ");
  };

  const getTotalPassengers = (data: {
    adult: number;
    child: number;
    infant: number;
  }) => {
    const total = data.adult + data.child + data.infant;
    if (total < 10) {
      return `0${total}`;
    }
    return total;
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      ) : (
        <>
          <Header title="Booking" leftIconName="chevron-back" />
          <ScrollView style={styles.container}>
            <View style={styles.content}>
              <View style={styles.tripTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.tripTypeButton,
                    tripType === "roundtrip" && styles.tripTypeButtonActive,
                    { borderBottomLeftRadius: 8 },
                  ]}
                  onPress={() => setTripType("roundtrip")}
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
                  onPress={() => setTripType("oneway")}
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
                fromValue={from?.skyId}
                fromSubValue={from?.presentation?.title}
                to={"Destination"}
                toValue={to?.skyId}
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
                onPressFrom={() => {
                  setShowDepartDatePicker(true);
                }}
                onPressTo={() => {
                  setShowReturnDatePicker(true);
                }}
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
                  <TouchableOpacity
                    onPress={() =>
                      passengerModalRef.current?.open(passengers, setPassengers)
                    }
                  >
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={colors.gray}
                    />
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
      )}
    </>
  );
}
