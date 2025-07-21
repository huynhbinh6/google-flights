import { useEffect, useRef, useState } from "react";
import { IDeparture, ISearchScreenProps, LocationData, Place } from "./types";
import { CustomModalRef } from "@components/CustomModal";
import { PassengerData, PassengerModalRef } from "@components/PassengersModal";
import { axiosClient } from "services/api/axiosClient";
import { BASE_URL } from "services/api/config";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { getNearByAirports } from "@services/api/airportService";
import { useAirportStore } from "@middleware/airportStore";
import { nearByAirports } from "@helpers/mockData";

export const useViewModel = ({ navigation, route }: ISearchScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState<Place>();
  const [to, setTo] = useState<Place>();
  const modalRef = useRef<CustomModalRef>(null);
  const passengerModalRef = useRef<PassengerModalRef>(null);
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [showDepartDatePicker, setShowDepartDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [passengers, setPassengers] = useState<PassengerData>({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [data, setData] = useState<Place[]>();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const airports = useAirportStore((state) => state.nearAirports);
  // const isLoading = useAirportStore((state) => state.isLoading);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const location: Location.LocationObject | null =
        await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      getNearByAirports(latitude, longitude);
    })();
  }, []);

  const tabRoundTripPicker = () => {
    setTripType("roundtrip");
  };
  const tabOneWayPicker = () => {
    setTripType("oneway");
  };

  const hideDatePicker = () => {
    setShowDepartDatePicker(false);
    setShowReturnDatePicker(false);
  };

  const handleOpenDepartureDatePicker = () => {
    setShowDepartDatePicker(true);
  };

  const handleOpenReturnDatePicker = () => {
    setShowReturnDatePicker(true);
  };

  const handleConfirmDepartureDate = (date: Date) => {
    setDepartDate(date);
    hideDatePicker();
  };
  const handleConfirmReturnDate = (date: Date) => {
    setReturnDate(date);
    hideDatePicker();
  };

  const handleOpenDeparture = () => {
    modalRef.current?.open(data, (resultFromModal) => {
      setFrom(resultFromModal);
    });
  };

  const handleOpenReturn = () => {
    modalRef.current?.open(data, (resultFromModal) => {
      setTo(resultFromModal);
    });
  };

  const handleSearch = async () => {
    if (!from || !to) {
      // Alert.alert("Error", "Please enter departure and destination cities");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to Sky Scraper API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to results with search parameters
      navigation.navigate("Results", {
        searchParams: {
          from,
          to,
          departDate: departDate.toISOString().split("T")[0],
          returnDate:
            tripType === "roundtrip"
              ? returnDate.toISOString().split("T")[0]
              : null,
          passengers,
          tripType,
        },
      });
    } catch (error) {
      //Alert.alert("Error", "Failed to search flights. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  const handleOpenPassengers = () => {
    passengerModalRef.current?.open(passengers, setPassengers);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching data from API...");

      //   const response = await axiosClient.get(
      //     `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US`
      //   );

      setData(nearByAirports.data.nearby);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    data,
    from,
    to,
    airports,
    modalRef,
    passengerModalRef,
    passengers,
    departDate,
    returnDate,
    tripType,
    showDepartDatePicker,
    showReturnDatePicker,
    handleOpenPassengers,
    handleOpenDeparture,
    handleOpenReturn,
    renderPassengerSummary,
    getTotalPassengers,
    hideDatePicker,
    tabRoundTripPicker,
    tabOneWayPicker,
    handleConfirmDepartureDate,
    handleConfirmReturnDate,
    handleOpenDepartureDatePicker,
    handleOpenReturnDatePicker,
    handleSearch,
  };
};
