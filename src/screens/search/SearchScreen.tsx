import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { styles } from "../home/styles";
import Header from "@components/Header";
import { colors } from "@utils/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Flight from "@components/Flight";
import CustomModal, { CustomModalRef } from "@components/CustomModal";
import { useViewModel } from "./viewModel";
import moment from "moment";
import { IDeparture } from "./types";

export default function SearchScreen({ navigation }: { navigation: any }) {
  const { isLoading, data } = useViewModel();
  const [from, setFrom] = useState<IDeparture | null>(null);
  const [to, setTo] = useState<IDeparture | null>(null);
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passengers, setPassengers] = useState("1");
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [showDepartDatePicker, setShowDepartDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const modalRef = useRef<CustomModalRef>(null);

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

  const handleOpenDeparture = () => {
    modalRef.current?.open(data, (resultFromModal) => {
      console.log("Received from modal:", resultFromModal);
      setFrom(resultFromModal);
    });
  };

  const handleOpenReturn = () => {
    modalRef.current?.open(data, (resultFromModal) => {
      console.log("Received from modal:", resultFromModal);
      setTo(resultFromModal);
    });
  };

  return (
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

          <View
            style={{
              marginBottom: 20,
              backgroundColor: colors.white,
              padding: 15,
              borderRadius: 8,
            }}
          >
            <Text style={styles.label}>Passengers</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>01</Text>
              <View style={{ marginLeft: 10 }}>
                <Text>Passenger</Text>
                <Text>1 adult</Text>
              </View>
            </View>
          </View>
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
      </ScrollView>
    </>
  );
}
