import { Platform, StatusBar } from "react-native";

export const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
export const HEADER_HEIGHT = 56;