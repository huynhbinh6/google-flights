import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import React from "react";
import { colors } from "@utils/colors";

interface Input extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
}

const Input: React.FC<Input> = ({
  label,
  value,
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
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          errorMessage ? styles.inputError : null,
          isPassword ? { paddingRight: 40 } : {},
        ]}
        placeholder={placeholder || "Enter text"}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry || false}
        {...rest}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
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
