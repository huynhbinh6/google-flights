import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ILoginScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};
