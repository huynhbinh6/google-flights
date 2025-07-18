import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
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

type Props = {
  navigation: any;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUpScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    //API call to login

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
                pattern: {
                  value: /^[a-zA-Z\\s]+$/,
                  message: "Invalid email format",
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
                  onPress={() => props.navigation.navigate("Login")}
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
};

export default SignUpScreen;
