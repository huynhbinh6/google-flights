import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HEADER_HEIGHT } from "@utils/responsive";
import { colors } from "@utils/colors";

const { width } = Dimensions.get("window");

const getTopPadding = () => {
  if (Platform.OS === "android") {
    return StatusBar.currentHeight || 0;
  }
  return Platform.OS === "ios" ? 44 : 0;
};

type Props = {
  title?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
};

const Header: React.FC<Props> = ({
  title,
  leftIconName,
  onBackPress,
  rightComponent,
}) => {
  const topPadding = getTopPadding();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: topPadding,
          height: HEADER_HEIGHT + topPadding,
        },
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.left}>
        <Ionicons name={leftIconName} size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.right}>
        {rightComponent ? rightComponent : <View style={{ width: 24 }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  left: {
    width: 40,
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  right: {
    width: 40,
    alignItems: "flex-end",
  },
});

export default Header;
