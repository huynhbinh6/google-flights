import { NavigationProp, RouteProp } from "@react-navigation/native";

export type IResultScreenProps = {
  navigation: NavigationProp<any>;
  route: {
    params: {
      searchParams: {
        from: object;
        to: object;
        departDate: string;
        returnDate?: string;
        tripType: string | "one-way" | "round-trip";
        passengers: {
          adults: number;
          children: number;
          infants: number;
        };
      };
    };
  };
};
