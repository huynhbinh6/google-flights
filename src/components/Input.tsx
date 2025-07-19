import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "@utils/colors";

interface Input extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  value: string;
  onRightIconPress?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
}

const Input: React.FC<Input> = ({
  leftIcon,
  rightIcon,
  label,
  value,
  onRightIconPress,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  errorMessage,
  isPassword = false,
  ...rest
}) => {
  return (
    <>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.container}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            errorMessage ? styles.inputError : null,
            isPassword ? { paddingRight: 40 } : {},
          ]}
          placeholder={placeholder || "Enter text"}
          value={value}
          placeholderTextColor={colors.gray}
          onChangeText={onChangeText}
          keyboardType={keyboardType || "default"}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry || false}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconRight}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 15,
    height: 50,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    fontSize: 16,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default Input;
