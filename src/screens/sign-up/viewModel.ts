import { useAuthStore } from "@middleware/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ISignUpScreenProps, User } from "./types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@helpers/firebaseConfig";

export const useViewModel = ({ navigation, route }: ISignUpScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const loginWithFirebase = useAuthStore((state) => state.loginWithFirebase);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: User) => {
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = result.user;
      await updateProfile(user, {
        displayName: data.name,
      });
      await loginWithFirebase(user);
    } catch (err: any) {
      console.error(err);
    }

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
