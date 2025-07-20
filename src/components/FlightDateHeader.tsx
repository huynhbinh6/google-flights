// FlightDateHeader.tsx
import { colors } from "@utils/colors";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type DayType = {
  day: string;
  month: string;
  fullDate: string;
  display: string;
  price: number;
};

const generateNextDays = (count: number): DayType[] => {
  const today = new Date();
  const daysArray: DayType[] = [];

  for (let i = 0; i < count; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const day = nextDay.getDate().toString().padStart(2, "0");
    const month = nextDay.toLocaleString("default", { month: "short" });
    const fullDate = nextDay.toISOString().split("T")[0];
    const display = `${day} ${month}`; // <- "21 Jun"

    daysArray.push({ day, month, fullDate, display, price: 2000 });
  }

  return daysArray;
};

const FlightDateHeader = () => {
  const days = generateNextDays(14); // next 14 days
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to selected index
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0.5, // Center it
    });
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
      {/* Horizontal Date Picker */}
      <FlatList
        ref={flatListRef}
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
        keyExtractor={(item) => item.fullDate}
        getItemLayout={(data, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              style={[styles.dateItem, isSelected && styles.selectedDate]}
              onPress={() => setSelectedIndex(index)}
            >
              <Text style={[styles.month, isSelected && styles.selectedText]}>
                {item.display}
              </Text>
              <Text style={[styles.month, isSelected && styles.selectedText]}>
                {item.price}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FlightDateHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  dateList: {
    paddingHorizontal: 4,
  },
  dateItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: colors.primary,
  },
  month: {
    fontSize: 14,
    color: colors.black,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  selectedText: {
    color: "white",
  },
});
