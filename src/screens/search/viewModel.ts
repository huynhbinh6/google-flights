import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { axiosClient } from "services/api/axiosClient";
import { BASE_URL } from "services/api/config";
import { IDeparture, ISearchScreenProps } from "./types";
import { CustomModalRef } from "@components/CustomModal";
import { PassengerData, PassengerModalRef } from "@components/PassengersModal";
import { set } from "@react-native-firebase/database";

export const useViewModel = ({ navigation, route }: ISearchScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState<IDeparture | null>(null);
  const [to, setTo] = useState<IDeparture | null>(null);
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
  const [data, setData] = useState<Array<{
    skyId: string;
    entityId: string;
    presentation: {
      title: string;
      suggestionTitle: string;
      subtitle: string;
    };
    navigation: {
      entityId: string;
      entityType: string;
      localizedName: string;
      relevantFlightParams: {
        skyId: string;
        entityId: string;
        flightPlaceType: string;
        localizedName: string;
      };
      relevantHotelParams: {
        entityId: string;
        entityType: string;
        localizedName: string;
      };
    };
  }> | null>(null);
  const mockData = {
    status: true,
    timestamp: 1752912171445,
    data: [
      {
        skyId: "NYCA",
        entityId: "27537542",
        presentation: {
          title: "New York",
          suggestionTitle: "New York (Any)",
          subtitle: "United States",
        },
        navigation: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York",
          relevantFlightParams: {
            skyId: "NYCA",
            entityId: "27537542",
            flightPlaceType: "CITY",
            localizedName: "New York",
          },
          relevantHotelParams: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
          },
        },
      },
      {
        skyId: "EWR",
        entityId: "95565059",
        presentation: {
          title: "New York Newark",
          suggestionTitle: "New York Newark (EWR)",
          subtitle: "United States",
        },
        navigation: {
          entityId: "95565059",
          entityType: "AIRPORT",
          localizedName: "New York Newark",
          relevantFlightParams: {
            skyId: "EWR",
            entityId: "95565059",
            flightPlaceType: "AIRPORT",
            localizedName: "New York Newark",
          },
          relevantHotelParams: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
          },
        },
      },
      {
        skyId: "JFK",
        entityId: "95565058",
        presentation: {
          title: "New York John F. Kennedy",
          suggestionTitle: "New York John F. Kennedy (JFK)",
          subtitle: "United States",
        },
        navigation: {
          entityId: "95565058",
          entityType: "AIRPORT",
          localizedName: "New York John F. Kennedy",
          relevantFlightParams: {
            skyId: "JFK",
            entityId: "95565058",
            flightPlaceType: "AIRPORT",
            localizedName: "New York John F. Kennedy",
          },
          relevantHotelParams: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
          },
        },
      },
      {
        skyId: "LGA",
        entityId: "95565057",
        presentation: {
          title: "New York LaGuardia",
          suggestionTitle: "New York LaGuardia (LGA)",
          subtitle: "United States",
        },
        navigation: {
          entityId: "95565057",
          entityType: "AIRPORT",
          localizedName: "New York LaGuardia",
          relevantFlightParams: {
            skyId: "LGA",
            entityId: "95565057",
            flightPlaceType: "AIRPORT",
            localizedName: "New York LaGuardia",
          },
          relevantHotelParams: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
          },
        },
      },
      {
        skyId: "SWF",
        entityId: "95566280",
        presentation: {
          title: "Stewart International",
          suggestionTitle: "Stewart International (SWF)",
          subtitle: "United States",
        },
        navigation: {
          entityId: "95566280",
          entityType: "AIRPORT",
          localizedName: "Stewart International",
          relevantFlightParams: {
            skyId: "SWF",
            entityId: "95566280",
            flightPlaceType: "AIRPORT",
            localizedName: "Stewart International",
          },
          relevantHotelParams: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
          },
        },
      },
      {
        skyId: "NCL",
        entityId: "95674044",
        presentation: {
          title: "Newcastle",
          suggestionTitle: "Newcastle (NCL)",
          subtitle: "United Kingdom",
        },
        navigation: {
          entityId: "95674044",
          entityType: "AIRPORT",
          localizedName: "Newcastle",
          relevantFlightParams: {
            skyId: "NCL",
            entityId: "95674044",
            flightPlaceType: "AIRPORT",
            localizedName: "Newcastle",
          },
          relevantHotelParams: {
            entityId: "27545092",
            entityType: "CITY",
            localizedName: "Newcastle",
          },
        },
      },
      {
        skyId: "NQY",
        entityId: "95673963",
        presentation: {
          title: "Newquay",
          suggestionTitle: "Newquay (NQY)",
          subtitle: "United Kingdom",
        },
        navigation: {
          entityId: "95673963",
          entityType: "AIRPORT",
          localizedName: "Newquay",
          relevantFlightParams: {
            skyId: "NQY",
            entityId: "95673963",
            flightPlaceType: "AIRPORT",
            localizedName: "Newquay",
          },
          relevantHotelParams: {
            entityId: "27545149",
            entityType: "CITY",
            localizedName: "Newquay",
          },
        },
      },
      {
        skyId: "NZ",
        entityId: "29475342",
        presentation: {
          title: "New Zealand",
          suggestionTitle: "New Zealand",
          subtitle: "",
        },
        navigation: {
          entityId: "29475342",
          entityType: "COUNTRY",
          localizedName: "New Zealand",
          relevantFlightParams: {
            skyId: "NZ",
            entityId: "29475342",
            flightPlaceType: "COUNTRY",
            localizedName: "New Zealand",
          },
          relevantHotelParams: {
            entityId: "29475342",
            entityType: "COUNTRY",
            localizedName: "New Zealand",
          },
        },
      },
    ],
  };

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

      setData(mockData.data);
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
