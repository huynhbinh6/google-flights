import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { styles } from "./styles";
import Input from "@components/Input";
import { colors } from "@utils/colors";
import { ISignUpScreenProps } from "./types";
import { useViewModel } from "./viewModel";

const SignUpScreen = React.memo(({ navigation, route }: ISignUpScreenProps) => {
  const { loading, control, handleSubmit, errors, onSubmit, isButtonDisabled } =
    useViewModel({ navigation, route });
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.title}>FlightFinder</Text>
          <View style={styles.form}>
            <Text style={styles.subtitle}>Create an account?</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Name"
                  value={value}
                  placeholder="Bill Edwards"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  placeholder="joedoe17@gmail.com"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  placeholder="Enter your password"
                  isPassword
                />
              )}
            />

            {/* <Text style={styles.forgotPwd}>Forget password?</Text> */}

            <TouchableOpacity
              style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isButtonDisabled}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} size={"small"} />
              ) : (
                <Text style={styles.buttonText}>{"Sign Up"}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.linkButton}>
              <Text>
                Already have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={styles.signup}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
});

export default SignUpScreen;
