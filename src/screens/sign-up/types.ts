import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ISignUpScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

export type User = {
  name: string;
  email: string;
  password: string;
};