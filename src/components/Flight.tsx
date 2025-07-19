import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@utils/colors";
import { Feather } from "@expo/vector-icons";

type Props = {
  type?: "flight" | "date";
  flightType?: "oneway" | "roundtrip";
  from: string;
  fromValue?: string;
  fromSubValue?: string;
  to: string;
  toValue?: string;
  toSubValue?: string;
  onPressFrom?: () => void;
  onPressTo?: () => void;
};

const Flight = (props: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderRightWidth: 1, borderColor: colors.borderInput },
        ]}
        onPress={props.onPressFrom}
      >
        <Text style={styles.header}>{props.from}</Text>
        {props.fromValue ? (
          <>
            <Text
              style={[styles.title, props.type === "date" && { fontSize: 14 }]}
            >
              {props.fromValue}
            </Text>
            <Text style={styles.subtitle}>{props.fromSubValue}</Text>
          </>
        ) : (
          <Feather name="plus-circle" size={20} color={colors.gray} />
        )}
      </TouchableOpacity>
      {props.flightType === "roundtrip" && props.type === "date" ? (
        <TouchableOpacity style={styles.button} onPress={props.onPressTo}>
          <Text style={styles.header}>{props.to}</Text>

          {props.toValue ? (
            <>
              <Text
                style={[
                  styles.title,
                  props.type === "date" && { fontSize: 14 },
                ]}
              >
                {props.toValue}
              </Text>
              <Text style={styles.subtitle}>{props.toSubValue}</Text>
            </>
          ) : (
            <Feather name="plus-circle" size={20} color={colors.gray} />
          )}
        </TouchableOpacity>
      ) : props.type === "flight" ? (
        <TouchableOpacity style={styles.button} onPress={props.onPressTo}>
          <Text style={styles.header}>{props.to}</Text>

          {props.toValue ? (
            <>
              <Text style={[styles.title]}>{props.toValue}</Text>
              <Text style={styles.subtitle}>{props.toSubValue}</Text>
            </>
          ) : (
            <Feather name="plus-circle" size={20} color={colors.gray} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 18,
  },
  header: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "300",
  },
});

export default Flight;
