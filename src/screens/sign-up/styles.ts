import { colors } from "@utils/colors";
import { STATUSBAR_HEIGHT } from "@utils/responsive";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  forgotPwd: {
    color: colors.primary,
    textAlign: "right",
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    alignItems: "center",
    marginTop: 20,
  },
  signup: {
    color: colors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
