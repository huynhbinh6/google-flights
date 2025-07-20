import { auth } from "@helpers/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@middleware/authStore";
import { ILoginScreenProps, User } from "./types";
import _ from "lodash";

export const useViewModel = ({ navigation, route }: ILoginScreenProps) => {
  const loginWithFirebase = useAuthStore((state) => state.loginWithFirebase);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    defaultValues: {
      id: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = result.user;
      console.log(user);
      await loginWithFirebase(user);
    } catch (error) {}

    setLoading(false);
  };

  const isButtonDisabled = !isValid || loading;

  return {
    loading,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isButtonDisabled,
  };
};
