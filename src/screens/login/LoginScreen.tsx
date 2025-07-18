import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  useForm,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { styles } from "./styles";
import Input from "@components/Input";
import { colors } from "@utils/colors";
import { AuthContext } from "../../App";

type Props = {
  navigation: any;
};

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const signIn = authContext?.signIn;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { email } = data;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userData = {
        token: "mock-token-" + Date.now(),
        email,
        name: email.split("@")[0],
      };
      if (signIn) {
        await signIn(userData);
      }
    } catch (error) {}

    setLoading(false);
  };

  const isButtonDisabled = !isValid || loading;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.title}>FlightFinder</Text>
          <View style={styles.form}>
            <Text style={styles.subtitle}>
              Welcome to FlightFinder login now!
            </Text>

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
                <Text style={styles.buttonText}>{"Sign In"}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.linkButton}>
              <Text>
                Don't have an account?{" "}
                <Text
                  onPress={() => props.navigation.navigate("SignUp")}
                  style={styles.signup}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
